package com.practicingmusician.steppable

/**
 * Created by jn on 6/7/17.
 */


external fun setupMedia()
external fun updatePitch(timestamp: Double) : Double
external fun getSampleRate() : Int

var buflen : Int = 1024

data class SampleCollection(val freq : Double, val lengthInSamples : Int)

class PitchTracker : TimeKeeperSteppable {

    //sample rate of the microphone should be static
    val sampleRate = 44100.0

    //length of the preroll to ignore before we start tracking the pitch
    var lengthOfPrerollToIgnore = 0.0

    //this is assumed to start at timestamp 0
    val samples = mutableListOf<SampleCollection>()

    /* State */

    var samplesRecorded = 0

    /* End state */

    fun setup() {

    }

    override fun start() {
        samplesRecorded = 0
        state = TimeKeeper.TimeKeeperState.Running
    }

    override fun stop() {
        state = TimeKeeper.TimeKeeperState.Stopped
    }

    override var state: TimeKeeper.TimeKeeperState = TimeKeeper.TimeKeeperState.Stopped

    override fun step(timestamp: Double, timeKeeper: TimeKeeper) {

        //get the pitch at the current timestamp
        val correlatedFrequency = com.practicingmusician.steppable.updatePitch(timestamp)
        println("Timestamp: " + timestamp)
        println("Pitch: " + correlatedFrequency)
        val lengthOfBuffer = (com.practicingmusician.steppable.buflen / 2.0) //this result is in seconds

        val latencyTime = 180
        stepWithFrequency(timestamp, correlatedFrequency, lengthOfBuffer, latencyTime, timeKeeper)
    }

    fun stepWithFrequency(timestamp: Double, correlatedFrequency: Double, lengthOfBufferInSamples : Double, latencyTime : Int, timeKeeper: TimeKeeper) {

        val timestampOfPitch = timestamp - (lengthOfBufferInSamples / 44100.0 * 1000.0) - latencyTime

        println("Timestamp that the buffer starts at $timestampOfPitch")

        val currentTimestampOfSamplesBuffer = samplesRecorded / sampleRate * 1000.0

        println("Current endpoint of the samples buffer : $currentTimestampOfSamplesBuffer")

        val timestampAccountingForPreroll = timestampOfPitch - lengthOfPrerollToIgnore

        println("Timestamp accounting for preroll $timestampAccountingForPreroll")

        var samplesToFill = lengthOfBufferInSamples - samplesRecorded + timestampAccountingForPreroll * 44.1

        if (samplesToFill < 0) {
            println("Not filling yet...")
            return
        }

        println("Filling " + samplesToFill + " with $correlatedFrequency")

        samples.add(SampleCollection(correlatedFrequency, samplesToFill.toInt()))

        samplesRecorded += samplesToFill.toInt()
    }

    fun OLDstepWithFrequency(timestamp: Double, correlatedFrequency: Double, lengthOfBuffer : Double, timeKeeper: TimeKeeper) {
        //the pitch for the buffer of length buflen was ac -- we should store that time
        val timestampOfPitch = timestamp - (lengthOfBuffer / 44100.0 * 1000.0) //convert seconds to MS

        println("Buffer started at timestamp: " + timestampOfPitch)

        //timestamp at the end of the samples array
        val currentTimestampOfSamplesBuffer = samplesRecorded / sampleRate * 1000.0

        println("Current timestamp of samples buffer : $currentTimestampOfSamplesBuffer")

        //remove the offset of the preroll
        var timestampOffsetWithPreroll = timestamp - lengthOfPrerollToIgnore

        println("Timestamp offset with preroll $timestampOffsetWithPreroll")

        //the number of samples that we should fill with the new frequency value
        val samplesToFill = lengthOfBuffer - samplesRecorded + timestampOfPitch * 44.1 //TODO: Timestamp of pitch?

        if (samplesToFill < 0) {
            println("Not filling yet...")
            return
        }

        //fill the samples buffer with the correct number of frequency items
        //Basically, if someone played the note A(440) for one second, we should have 44100 items in the samples buffer
        //that are all equal to 440.0 (or variations when the intonation varies)
        println("Filling " + samplesToFill)
//        for (i in 0 until samplesToFill.toInt()) {
//            samples.add(correlatedFrequency)
//        }
        samples.add(SampleCollection(correlatedFrequency, samplesToFill.toInt()))

        samplesRecorded += samplesToFill.toInt()
    }

}