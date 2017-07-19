package com.practicingmusician.finals

import com.practicingmusician.ComparisonFlags
import com.practicingmusician.ListenerApp
import com.practicingmusician.notes.Note
import com.practicingmusician.pm_log
import kotlin.browser.window
import kotlin.js.Math

/**
 * Created by jn on 6/23/17.
 *
 * This should take a given set of notes generated from the samples and compare it to the ideal
 * (generated from the exercise)
 *
 */

external val listenerApp: ListenerApp

class IncrementalComparisonEngine {

  //largest differences before notes become "Missed"
  val largestDurationDifference = 1.0
  val largestBeatDifference = 1.0
  /* State information about what has been compared */

//    var results = CompareResults() //the results of the comparison
//    var curBeatPosition : Double = 0.0 //current beat position that is being compared
//
//    var idealIndexPosition = 0 //the ideal index to test against, so we don't start at the beginning each time
//    var testPositionIndex = 0 //don't search before here in the test positions


  /* End state */

  //Comapares the ideal (which should be generated from the exercise) to the toTest
  //which should be generated from the microphone samples
  fun compareNoteArrays(comparisonFlags: ComparisonFlags, ideal: List<Note>, toTest: List<NotePlacement>, isCurrentlyRunning : Boolean = false): CompareResults {

    val results = CompareResults()
    var curBeatPosition: Double = 0.0
    var lastTestedIndexInTest = -1


    var doNotTestBeyond = 0.0
    if (toTest.count() > 0) {
      doNotTestBeyond = toTest.last().positionInBeats
      if (!isCurrentlyRunning) {
        doNotTestBeyond += toTest.last().note.duration
      }
    }

    val functionStartTimestamp = window.performance.now()

    //loop through the ideal items to test against
    //don't start before the stuff that we've already analyzed (based on idealIndexPosition)
    for (index in 0 until ideal.count()) {
      val idealValue = ideal[index]


      //find the corresponding item in toTest based on our beat position
      var indexOnToTest = -1 //this will store the index on toTest that we will compare
      var toTestBeatPositionAtIndexToTest = 0.0 //the beat position at that index
      var toTestBeatPosition: Double //the current beat position on toTest
      var diffFromIdealBeatPosition = Double.MAX_VALUE //the difference in position from the ideal to the test subject

      //loop through the test items
      //don't start before the ones we've already tested (based on testPositionIndex)
      for (i in 0 until toTest.count()) {
        val item = toTest[i]

        toTestBeatPosition = item.positionInBeats

        //find the difference between the current beat position (where we are in the ideal)
        //and the test beat position
        val diff = Math.abs(curBeatPosition - toTestBeatPosition)

        //if the difference is less than the smallest difference we've found so far (it starts at Double.MAX_VALUE)
        //than this is the best candidate for now
        if (diff < diffFromIdealBeatPosition) {
          indexOnToTest = i
          toTestBeatPositionAtIndexToTest = toTestBeatPosition
          diffFromIdealBeatPosition = diff
        }

        //increment the current position of toTest
      }

      if (curBeatPosition >= doNotTestBeyond) {
        //pm_log("Too far",10)
        break
      }

      if (indexOnToTest <= lastTestedIndexInTest) {
        pm_log("Already tested here...... $indexOnToTest <= $lastTestedIndexInTest")
        //TODO: Fix this? -- need new method for seeing how far to test
        //break
      }

      lastTestedIndexInTest = indexOnToTest

      pm_log("Going to compare ideal index $index to test index $indexOnToTest")

      //This is the feedback item that will store the information (flat, sharp, etc)
      //generated by this comparison
      val feedbackItemTypes = mutableListOf<FeedbackMetric>()


      //basically the marker for it
      val feedbackItem = FeedbackItem(FeedbackType.Correct, curBeatPosition, feedbackItemTypes)

      //add it to the results -- we still have a reference, so the version in the list
      //will get altered
      results.feedbackItems.add(feedbackItem)

      //TODO: not sure if we should do this, or just stop
      if (indexOnToTest == -1) {
        pm_log("No index found to test", 10)
        continue
      }

      //TODO: For speed reasons, do I need to implement this again?
      //don't test before this index later on
      //testPositionIndex = indexOnToTest

      //no matter what happens, we know it's an attempt
      results.attempted += 1


      val idealItem = idealValue

      var testItem = toTest[indexOnToTest]

      pm_log("Durations : " + idealItem.duration + " | " + testItem.note.duration,0)

      if (comparisonFlags.testDuration) {
        //test the durations of the notes

        val durationDifference = (idealItem.duration - testItem.note.duration)
        val durationDifferenceRounded = Math.round(durationDifference * 100.0) / 100.0

        if (durationDifference > listenerApp.parameters.allowableLengthMargin) {
          pm_log("Test subject too short by " + durationDifferenceRounded,0)

          feedbackItemTypes.add(FeedbackMetric("duration", "-" + durationDifferenceRounded))

          feedbackItem.throwSafeIncorrectSwitch()
        } else if (durationDifference < -listenerApp.parameters.allowableLengthMargin) {
          pm_log("Test subject too long by " + durationDifferenceRounded,0)

          feedbackItemTypes.add(FeedbackMetric("duration", "+" + Math.abs(durationDifferenceRounded)))

          feedbackItem.throwSafeIncorrectSwitch()
        } else {
          pm_log("PERFECT DURATION",0)
        }

        if (durationDifference > largestDurationDifference) {
          feedbackItem.type = FeedbackType.Missed
        }
      }



      pm_log("Starting points : " + curBeatPosition + " | " + toTestBeatPositionAtIndexToTest)

      val distanceAway = -(curBeatPosition - toTestBeatPositionAtIndexToTest)

      val distanceAwayRounded = Math.round(distanceAway * 100.0) / 100.0

      if (comparisonFlags.testRhythm) {
        //test the start time of the notes (rushing vs. dragging)
        if (distanceAway > listenerApp.parameters.allowableRhythmMargin) {
          pm_log("Test subject rushing")

          feedbackItemTypes.add(FeedbackMetric("speed", "+" + distanceAwayRounded))

          feedbackItem.throwSafeIncorrectSwitch()
        } else if (distanceAway < -listenerApp.parameters.allowableRhythmMargin) {
          pm_log("Test subject dragging")


          feedbackItemTypes.add(FeedbackMetric("speed", "" + distanceAwayRounded))

          feedbackItem.throwSafeIncorrectSwitch()
        } else {
          pm_log("PERFECT")
        }

        //TODO -- test to see if it's way outside the rhythm bounds
        if (Math.abs(distanceAway) > largestBeatDifference) {
          feedbackItem.type = FeedbackType.Missed
        }
      }


      pm_log("Notes : " + idealItem.noteNumber + " | " + testItem.note.noteNumber)

      //normalize octaves?
      if (testItem.note.noteNumber == idealItem.noteNumber + 12 || testItem.note.noteNumber == idealItem.noteNumber - 12) {
        //pm_log("Octave shifted",10)
        val n = Note(idealItem.noteNumber, testItem.note.duration)
        if (testItem.note.noteNumber < idealItem.noteNumber) {
          n.avgFreq = testItem.note.avgFreq?.times(2)
        } else {
          n.avgFreq = testItem.note.avgFreq?.div(2)
        }
        testItem = NotePlacement(n, testItem.positionInBeats)
        //testItem.note.noteNumber = idealItem.noteNumber
      }

      //are they the same note?
      if (idealItem.noteNumber == testItem.note.noteNumber) {
        //now test the pitch
      } else {
        //it's a wrong note
        pm_log("WRONG NOTE *&*&*&*&*&*&*&*")
        feedbackItem.type = FeedbackType.Missed
      }

      pm_log("Pitch : " + idealItem.getFrequency() + " | " + testItem.note.getFrequency(),0)

      //pm_log(idealItem.noteNumber,10)
      //pm_log(testItem.note.noteNumber,10)

      pm_log("Avg freq of test item: " + testItem.note.avgFreq)

      //test the intonation of the notes
      val avgFreq = testItem.note.avgFreq

      if (avgFreq != null && comparisonFlags.testPitch) {
        val idealItemFrequency = idealItem.getFrequency()
        val noteAboveFrequency = Note.getFrequencyForNoteNumber(idealItem.noteNumber + 1)
        val noteBelowFrequency = Note.getFrequencyForNoteNumber(idealItem.noteNumber - 1)

        if (avgFreq - idealItemFrequency > 0) {
          val distanceInHz = noteAboveFrequency - idealItemFrequency
          val distanceInCents = ((avgFreq - idealItemFrequency) / distanceInHz) * 100.0
          pm_log("Sharp by $distanceInHz ($distanceInCents cents)")
          if (distanceInCents > listenerApp.parameters.allowableCentsMargin) {
            pm_log("Test subject sharp")

            feedbackItemTypes.add(FeedbackMetric("pitch", "+" + distanceInHz.toInt()))

            feedbackItem.throwSafeIncorrectSwitch()
          }
        } else if (avgFreq - idealItem.getFrequency() < 0) {
          val distanceInHz = idealItemFrequency - noteBelowFrequency
          val distanceInCents = ((idealItemFrequency - avgFreq) / distanceInHz) * 100.0
          pm_log("Flat by $distanceInHz ($distanceInCents cents)")
          if (distanceInCents > listenerApp.parameters.allowableCentsMargin) {
            pm_log("Test subject flat")

            feedbackItemTypes.add(FeedbackMetric("pitch", "-" + distanceInHz.toInt()))

            feedbackItem.throwSafeIncorrectSwitch()
          }
        } else {
          pm_log("PERFECT")
        }
      }

      //feedbackItemTypes.add("" + testItem.note.noteNumber)
      //feedbackItemTypes += FeedbackMetric("Note #","" + testItem.note.noteNumber)

      //increment the current position based on the duration of the ideal

      //if it's correct, increment that counter -- if not, do nothing
      if (feedbackItem.type == FeedbackType.Correct) {
        results.correct += 1
      }

      curBeatPosition += idealValue.duration


      val notePerformance = IndividualNotePerformanceInfo(
        idealBeat = curBeatPosition,
        actualBeat = toTestBeatPositionAtIndexToTest,
        idealPitch = idealItem.getFrequency(),
        actualPitch = testItem.note.avgFreq ?: -1.0,
        idealDuration = idealItem.duration,
        actualDuration = testItem.note.duration
      )
      results.finalResults.add(notePerformance)
    }


    //pm_log("---- Results : " + results.correct + "/" + results.attempted,10)
    //pm_log(results.finalResults.toTypedArray(),10)

    val functionEndTimestamp = window.performance.now()

    pm_log("Function total time: " + (functionEndTimestamp - functionStartTimestamp))

    return results

  }

}
