var AudioAnalyzer=function(){this.isFunctional=!0,this.hasMicrophoneAccess=!1,this.errorMessages=[],this.sourceNode=null,this.analyzer=null,this.audioContext=null,this.buflen=1024,this.buf=new Float32Array(this.buflen),this.rafID=null,this.setupMedia=function(){if(void 0==window.AudioContext)return this.errorMessages+="Could not find audio context",this.isFunctional=!1,void displayFlashMessages([{type:"danger",message:"Couldn't setup microphone access.  Please make sure you are using either Chrome or Firefox."}]);this.audioContext=new AudioContext;var e={audio:{latency:.002},video:!1},t=this;navigator.mediaDevices.getUserMedia(e).then(function(e){pm_log("Using the stream"),t.isFunctional=!0,t.hasMicrophoneAccess=!0,t.gotStream(e)}).catch(function(e){t.errorMessages+=e,t.isFunctional=!1,displayFlashMessages([{type:"danger",message:"Couldn't get access to microphone stream"}]),pm_log("Error: "+e,10)})},this.getSampleRate=function(){return this.audioContext.sampleRate},this.gotStream=function(e){console.log("Got stream"),mediaStreamSource=this.audioContext.createMediaStreamSource(e),this.analyzer=this.audioContext.createAnalyser(),this.analyzer.fftSize=2048,mediaStreamSource.connect(this.analyzer)},this.updatePitch=function(e){if(null!=this.analyzer){new Array;return this.analyzer.getFloatTimeDomainData(this.buf),this.autoCorrelate(this.buf,this.audioContext.sampleRate)}},this.autoCorrelate=function(e,t){for(var a=e.length,i=Math.floor(a/2),s=-1,o=0,r=0,n=!1,u=new Array(i),h=0;h<a;h++){var l=e[h];r+=l*l}if((r=Math.sqrt(r/a))<.01)return-1;for(var c=1,d=MIN_SAMPLES;d<i;d++){for(var f=0,h=0;h<i;h++)f+=Math.abs(e[h]-e[h+d]);if(f=1-f/i,u[d]=f,f>GOOD_ENOUGH_CORRELATION&&f>c)n=!0,f>o&&(o=f,s=d);else if(n)return t/(s+8*((u[s+1]-u[s-1])/u[s]));c=f}return o>.01?t/s:-1}},MIN_SAMPLES=0,GOOD_ENOUGH_CORRELATION=.9,audioAnalyzer=new AudioAnalyzer;