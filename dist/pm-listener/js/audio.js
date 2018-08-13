//pm_log("Setting up audio js...")

var AudioAnalyzer = function() {
    //used after init
    this.isFunctional = true
    this.hasMicrophoneAccess = false
    this.errorMessages = []

    this.sourceNode = null
    this.analyzer = null
    this.audioContext = null
    this.buflen = 1024 //should set this to 512 for other instruments, 1024 for low
    this.buf = new Float32Array(this.buflen)
    this.rafID = null

    //setup the Web Audio API streaming stuff
    this.setupMedia = function() {
        if (window.AudioContext == undefined) {
            this.errorMessages += 'Could not find audio context'
            this.isFunctional = false

            displayFlashMessages([
                {
                    type: 'danger',
                    message:
                        "Couldn't setup microphone access.  Please make sure you are using either Chrome or Firefox.",
                },
            ])

            return
        }

        navigator.mediaDevices.enumerateDevices().then(function(deviceInfos) {
            for (var i = 0; i !== deviceInfos.length; ++i) {
                console.log(deviceInfos[i])
            }
        })

        this.audioContext = new AudioContext()
        var constraints = { audio: { latency: 0.002 }, video: false }
        var analyzerObj = this
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(stream) {
                /* use the stream */
                pm_log('Using the stream')
                analyzerObj.isFunctional = true
                analyzerObj.hasMicrophoneAccess = true
                analyzerObj.gotStream(stream)
            })
            .catch(function(err) {
                /* handle the error */
                analyzerObj.errorMessages += err
                analyzerObj.isFunctional = false
                displayFlashMessages([
                    {
                        type: 'danger',
                        message:
                            "Couldn't get access to microphone stream:" + err,
                    },
                ])
                console.log(err.stack)
                pm_log('Error: ' + err, 10)
            })
    }

    this.getSampleRate = function() {
        return this.audioContext.sampleRate
    }

    this.gotStream = function(stream) {
        console.log('Got stream')
        // Create an AudioNode from the stream.

        // Connect it to the destination.
        this.analyzer = this.audioContext.createAnalyser()
        this.scriptProcessor = this.audioContext.createScriptProcessor(
            this.buflen,
            1,
            1
        )
        this.pitchDetector = new (Module()).AubioPitch(
            'default',
            this.buflen,
            1,
            this.audioContext.sampleRate
        )

        this.audioContext.createMediaStreamSource(stream).connect(this.analyzer)
        this.analyzer.connect(this.scriptProcessor)
        this.scriptProcessor.connect(this.audioContext.destination)

        this.scriptProcessor.addEventListener(
            'audioprocess',
            function(event) {
                var frequency = this.pitchDetector.do(
                    event.inputBuffer.getChannelData(0)
                )
                //console.log(frequency)
                this.storedPitch = frequency
            }.bind(this)
        )
    }

    this.updatePitch = function() {
        return this.storedPitch
    }
    this.storedPitch = -1

}
var audioAnalyzer = new AudioAnalyzer()
