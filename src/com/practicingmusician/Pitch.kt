package com.practicingmusician

/**
 * Created by jn on 6/5/17.
 */


//outdated -- use PitchTracker


class Pitch : TimeKeeperSteppable {

    var currentPitch : Double = -1.0

    fun setup() {
        setupMedia()
    }

    override fun start() {
        state = TimeKeeper.TimeKeeperState.Running
    }

    override fun stop() {
        state = TimeKeeper.TimeKeeperState.Stopped
    }

    override var state: TimeKeeper.TimeKeeperState = TimeKeeper.TimeKeeperState.Stopped


    override fun step(timestamp: Double, timeKeeper: TimeKeeper) {
        val ac = updatePitch(timestamp)
        println("Pitch: " + ac)

        //the pitch for the buffer of length buflen was ac -- we should store that time
        val lengthOfBuffer = (buflen / 2.0) / getSampleRate().toDouble() //this result is in seconds
        val timestampOfPitch = timestamp - lengthOfBuffer * 1000.0 //convert seconds to MS

        println("At timestamp: " + timestampOfPitch)

        currentPitch = ac
    }


}