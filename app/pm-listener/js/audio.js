//pm_log("Setting up audio js...")

var AudioAnalyzer = function() {

    //used after init
    this.isFunctional = true
    this.hasMicrophoneAccess = false
    this.errorMessages = []

    this.sourceNode = null;
    this.analyzer = null;
    this.audioContext = null;
    this.buflen = 4096;
    this.buf = new Float32Array( this.buflen );
    this.rafID = null;

    //setup the Web Audio API streaming stuff
    this.setupMedia = function() {
            if (window.AudioContext == undefined) {
              this.errorMessages += "Could not find audio context"
              this.isFunctional = false

              displayFlashMessages(
                [{type:"danger",
                  message:"Couldn't setup microphone access.  Please make sure you are using either Chrome or Firefox."
                }]
              )

              return
            }

            navigator.mediaDevices.enumerateDevices().then(function(deviceInfos) {
              for (var i = 0; i !== deviceInfos.length; ++i) {
                console.log(deviceInfos[i])
              }
            })

            this.audioContext = new AudioContext();
            var constraints = { audio: {latency: 0.002}, video: false }
            var analyzerObj = this
            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                /* use the stream */
                pm_log("Using the stream")
                analyzerObj.isFunctional = true
                analyzerObj.hasMicrophoneAccess = true
                analyzerObj.gotStream(stream)
            }).catch(function(err) {
                /* handle the error */
                analyzerObj.errorMessages += err
                analyzerObj.isFunctional = false
                displayFlashMessages(
                [{type:"danger",
                  message:"Couldn't get access to microphone stream:" + err
                }]
              )
                console.log(err.stack)
                pm_log("Error: " + err,10)
            });
    }

    this.getSampleRate = function() {
        return this.audioContext.sampleRate
    }


    this.gotStream = function(stream) {
        console.log("Got stream")
        // Create an AudioNode from the stream.

        // Connect it to the destination.
        this.analyzer = this.audioContext.createAnalyser();
        //this.analyzer.fftSize = 2048;
        this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1)
        this.pitchDetector = new (Module().AubioPitch)(
          'default', 4096, 1, this.audioContext.sampleRate)

//        mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
//        mediaStreamSource.connect( this.analyzer );

      this.audioContext.createMediaStreamSource(stream).connect(this.analyzer)
      this.analyzer.connect(this.scriptProcessor)
      this.scriptProcessor.connect(this.audioContext.destination)

      this.scriptProcessor.addEventListener('audioprocess', function (event) {
      var frequency = this.pitchDetector.do(event.inputBuffer.getChannelData(0))
      console.log(frequency)
//      if (frequency && self.onNoteDetected) {
//        var note = self.getNote(frequency)
//        self.onNoteDetected({
//          name: self.noteStrings[note % 12],
//          value: note,
//          cents: self.getCents(frequency, note),
//          numbered: parseInt(note / 12) - 1,
//          frequency: frequency,
//        })
//      }
      }.bind(this))
    }

    //get the current pitch
    this.updatePitch = function(timestamp) {
        if (this.analyzer == null)
            return

        //pm_log("Updating pitch")

        var cycles = new Array;
        this.analyzer.getFloatTimeDomainData( this.buf );

        //calculate the amplitude
        //var avg = this.buf.reduce(function(sum, a) { return sum + a },0)/(this.buf.length||1);
        //console.log("Average: " + avg)

        var ac = this.autoCorrelate( this.buf, this.audioContext.sampleRate );

        return ac
    }


    this.autoCorrelate = function(a,r){var e=a.length;var t=Math.floor(e/2);var n=-1;var o=0;var u=0;var i=false;var l=new Array(t);for(var v=0;v<e;v++){var f=a[v];u+=f*f}u=Math.sqrt(u/e);if(u<thresholdAmount)return-1;var c=1;for(var s=MIN_SAMPLES;s<t;s++){var d=0;for(var v=0;v<t;v++){d+=Math.abs(a[v]-a[v+s])}d=1-d/t;l[s]=d;if(d>GOOD_ENOUGH_CORRELATION&&d>c){i=true;if(d>o){o=d;n=s}}else if(i){var m=(l[n+1]-l[n-1])/l[n];return r/(n+8*m)}c=d}if(o>.01){return r/n}return-1}
}
var thresholdAmount = 0.01

var MIN_SAMPLES=0;var GOOD_ENOUGH_CORRELATION=0.9;
var audioAnalyzer = new AudioAnalyzer()


