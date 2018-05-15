package com.practicingmusician

import com.practicingmusician.notes.Note
import com.practicingmusician.steppable.TimeKeeper
import com.practicingmusician.steppable.TimeKeeperSteppable
import org.w3c.dom.HTMLElement
import kotlin.browser.document
import kotlin.browser.window

/**
 * Created by jn on 8/23/17.
 */

class Tuner constructor() : TimeKeeperSteppable {

  //current state of the Metronome
  override var state = TimeKeeper.TimeKeeperState.Stopped

  lateinit var audioAnalyzer: AudioAnalyzer

  val timekeeper = TimeKeeper()

  /* End state */

  init {
    timekeeper.steppables.add(this)
    //runTunerTest()
  }

  fun runTunerTest() {
    //val freq = 439.0
    for (freq in 380..400) {
      val noteWithDiff = Note.closestNoteWithDiff(freq.toDouble())
      pm_log("Testing note ($freq): " + noteWithDiff.note.noteName(), 10)
      pm_log("Diff in hz: " + noteWithDiff.differenceInFreq, 10)
      pm_log("Diff in cents: " + noteWithDiff.differenceInCents, 10)
    }
  }

  fun setup() {}

  override fun start() {
    state = TimeKeeper.TimeKeeperState.Running
  }

  override fun stop() {
    state = TimeKeeper.TimeKeeperState.Stopped
  }

  override fun step(timestamp: Double, timeKeeper: TimeKeeper) {

    val correlatedFrequency = this.audioAnalyzer.updatePitch(timestamp)

    if (correlatedFrequency == undefined) {
      return
    }

    //The closest note to the played frequency
    val noteWithDiff = Note.closestNoteWithDiff(correlatedFrequency)

    var tunerString = ""
    noteWithDiff.note?.noteName().let {
      if (it != "NaN") {

        if (noteWithDiff.tuningDirection == 1) {
          placeTuner(noteWithDiff.differenceInCents.toInt())
        } else {
          placeTuner(0 - noteWithDiff.differenceInCents.toInt())
        }

        tunerString = it
//        if (noteWithDiff.differenceInCents > 10.0) {
//          if (noteWithDiff.tuningDirection == 1) {
//            tunerString += "+" + noteWithDiff.differenceInCents.toInt() + " SHARP"
//          } else if (noteWithDiff.tuningDirection == -1) {
//            tunerString += "-" + noteWithDiff.differenceInCents.toInt() + " FLAT"
//          }
//        }

      } else {
        placeTuner(0)
      }
      //pm_log(it + " " + noteWithDiff.differenceInCents + " " + noteWithDiff.tuningDirection + " " + noteWithDiff.frequency,10)
    }
    // "" + (correlatedFrequency * 10.0).toInt() +
    window.document.getElementById("tuner_note_label")?.innerHTML = tunerString


  }


  fun run() {

    this.start()
    timekeeper.runForTime = Double.MAX_VALUE
    timekeeper.start()

  }

  override fun setInitialOffset(offset: Double) {
    //Don't have to do anything, since we're just tuning
  }

}
