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
  var largestDurationRatioDifference = 0.0
  var largestBeatDifference = 0.0
  /* State information about what has been compared */

//    var results = CompareResults() //the results of the comparison
//    var curBeatPosition : Double = 0.0 //current beat position that is being compared
//
//    var idealIndexPosition = 0 //the ideal index to test against, so we don't start at the beginning each time
//    var testPositionIndex = 0 //don't search before here in the test positions


  /* End state */

  //Compares the ideal (which should be generated from the exercise) to the toTest
  //which should be generated from the microphone samples
  @JsName("compareNoteArrays")
  fun compareNoteArrays(comparisonFlags: ComparisonFlags, ideal: List<Note>, toTest: List<NotePlacement>, isCurrentlyRunning: Boolean = false, testBeginningBeat: Double = 0.0, testEndingBeat: Double = Double.MAX_VALUE): CompareResults {

    this.largestDurationRatioDifference = listenerApp.parameters.largestDurationRatioDifference
    this.largestBeatDifference = listenerApp.parameters.largestBeatDifference

    val results = CompareResults()
    var curBeatPosition: Double = 0.0
    var lastTestedIndexInTest = -1


    var doNotTestBeyond = 0.0
    if (toTest.count() > 1) {
      doNotTestBeyond = toTest[toTest.count() - 2].positionInBeats
      //doNotTestBeyond = toTest.last().positionInBeats
    }
    if (!isCurrentlyRunning && toTest.count() > 0) {
      doNotTestBeyond = toTest.last().positionInBeats + toTest.last().note.duration
    }

    if (testEndingBeat < doNotTestBeyond) {
      doNotTestBeyond = testEndingBeat
    }

    //console.log("Comparing: ")
    //console.log(ideal)
    //console.log("To:")
    //console.log(toTest)

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

      if (curBeatPosition <= testBeginningBeat) {
        //TODO: reimplement this for segment
        //console.log("Returned because curBeatPosition <= testBeginningBeat")
        //continue
      }

      if (curBeatPosition >= doNotTestBeyond) {
        pm_log("Too far ($curBeatPosition vs $doNotTestBeyond)", 0)
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

      pm_log("Durations : " + idealItem.duration + " | " + testItem.note.duration, 0)

      if (comparisonFlags.testDuration) {
        //test the durations of the notes

        /*

          Duration rules:
          Shouldn't be X seconds different
          OR 1 beat difference if note is => 2 beats

         */

        //val idealItemLengthInSec = idealItem.duration * 60.0 / listenerApp.globalTempo
        //val testItemLengthInSec = testItem.note.duration * 60 / listenerApp.globalTempo


        val durationDifferenceRatio = testItem.note.duration / idealItem.duration
        val durationDifferenceRatioRounded = Math.round(durationDifferenceRatio * 100.0) / 100.0

        //feedbackItemTypes.add(FeedbackMetric(name = "dur.",value = "" + durationDifferenceRatioRounded + " " + testItem.note.duration))

        if (durationDifferenceRatio < listenerApp.parameters.allowableDurationRatio) {
          pm_log("Test subject too short by " + durationDifferenceRatioRounded, 0)


          //feedbackItemTypes.add(FeedbackMetric("duration", "" + durationDifferenceRatioRounded))
          feedbackItemTypes.add(FeedbackMetric("duration", "SHORT"))

          feedbackItem.throwSafeIncorrectSwitch()
        } else if (durationDifferenceRatio > (1.0 / listenerApp.parameters.allowableDurationRatio)) {
          pm_log("Test subject too long by " + durationDifferenceRatioRounded, 0)

          //feedbackItemTypes.add(FeedbackMetric("duration", "" + Math.abs(durationDifferenceRatioRounded)))
          feedbackItemTypes.add(FeedbackMetric("duration", "LONG"))

          feedbackItem.throwSafeIncorrectSwitch()
        } else {
          pm_log("PERFECT DURATION", 0)
        }

        //see if the duration is too far outside of the bounds
        if (durationDifferenceRatio < largestDurationRatioDifference || durationDifferenceRatio > (1.0 / largestDurationRatioDifference)) {
          feedbackItem.type = FeedbackType.Missed
        }
      }



      pm_log("Starting points : " + curBeatPosition + " | " + toTestBeatPositionAtIndexToTest, 10)

      val distanceAway = -(curBeatPosition - toTestBeatPositionAtIndexToTest)

      val distanceAwayRounded = Math.round(distanceAway * 100.0) / 100.0

      if (comparisonFlags.testRhythm) {
        //test the start time of the notes (rushing vs. dragging)
        if (distanceAway > listenerApp.parameters.allowableRhythmMargin) {
          pm_log("Test subject rushing")

          feedbackItemTypes.add(FeedbackMetric("speed", "EARLY"))
          //feedbackItemTypes.add(FeedbackMetric("speed", "+" + distanceAwayRounded))

          feedbackItem.throwSafeIncorrectSwitch()
        } else if (distanceAway < -listenerApp.parameters.allowableRhythmMargin) {
          pm_log("Test subject dragging")

          feedbackItemTypes.add(FeedbackMetric("speed", "LATE"))
          //feedbackItemTypes.add(FeedbackMetric("speed", "" + distanceAwayRounded))

          feedbackItem.throwSafeIncorrectSwitch()
        } else {
          pm_log("PERFECT")
        }

        //test to see if it's too far outside the rhythm bounds
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



      pm_log("Pitch : " + idealItem.getFrequency() + " | " + testItem.note.getFrequency(), 0)

      //pm_log(idealItem.noteNumber,10)
      //pm_log(testItem.note.noteNumber,10)

      pm_log("Avg freq of test item: " + testItem.note.avgFreq)

      //test the intonation of the notes
      val avgFreqOfTestItem = testItem.note.avgFreq

      if (avgFreqOfTestItem == null) {
        feedbackItem.type = FeedbackType.Missed
      }

      //test for rest vs. note
      if (
      (testItem.note.noteNumber == -1 && idealItem.noteNumber != -1) ||
        (testItem.note.noteNumber != -1 && idealItem.noteNumber == -1)
        ) {
        console.log("MISMATCHED!")

        if (idealItem.noteNumber != -1) {

          if (comparisonFlags.testPitch)
            feedbackItemTypes.add(FeedbackMetric("pitch", "Not played"))
          else
            feedbackItemTypes.add(FeedbackMetric("speed","Not played"))

        } else {
          feedbackItemTypes.add(FeedbackMetric("duration", "rest"))
        }

        feedbackItem.throwSafeIncorrectSwitch()
        feedbackItem.type = FeedbackType.Missed
      }

      if (avgFreqOfTestItem != null && avgFreqOfTestItem != -1.0 && comparisonFlags.testPitch) {
        //are they the same note?
        if (idealItem.noteNumber != testItem.note.noteNumber) {
          //it's a wrong note
          pm_log("WRONG NOTE *&*&*&*&*&*&*&*")
          feedbackItem.type = FeedbackType.Missed
        }

        val idealItemFrequency = idealItem.getFrequency()
        val noteAboveFrequency = Note.getFrequencyForNoteNumber(idealItem.noteNumber + 1)
        val noteBelowFrequency = Note.getFrequencyForNoteNumber(idealItem.noteNumber - 1)

        if (avgFreqOfTestItem - idealItemFrequency > 0) {
          val distanceInHz = noteAboveFrequency - idealItemFrequency
          val distanceInCents = ((avgFreqOfTestItem - idealItemFrequency) / distanceInHz) * 100.0
          pm_log("Sharp by $distanceInHz ($distanceInCents cents)")
          if (distanceInCents > listenerApp.parameters.allowableCentsMargin) {
            pm_log("Test subject sharp")

            if (distanceInCents < 50) {
              feedbackItemTypes.add(FeedbackMetric("pitch", "SHARP"))
            } else {
              feedbackItemTypes.add(FeedbackMetric("pitch", testItem.note.noteName()))
            }
            //feedbackItemTypes.add(FeedbackMetric("pitch", "+" + distanceInHz.toInt()))

//            console.log("Sharp compared to ideal:")
//            console.log(idealItem)
//            console.log("test:")
//            console.log(testItem.note)

            feedbackItem.throwSafeIncorrectSwitch()
          }
        } else if (avgFreqOfTestItem - idealItemFrequency < 0) {
          val distanceInHz = idealItemFrequency - noteBelowFrequency
          val distanceInCents = ((idealItemFrequency - avgFreqOfTestItem) / distanceInHz) * 100.0
          pm_log("Flat by $distanceInHz ($distanceInCents cents)")
          if (distanceInCents > listenerApp.parameters.allowableCentsMargin) {
            pm_log("Test subject flat")

//            console.log("Flat compared to ideal:")
//            console.log(idealItem)
//            console.log("test:")
//            console.log(testItem.note)

            if (distanceInCents < 50) {
              feedbackItemTypes.add(FeedbackMetric("pitch", "FLAT"))
            } else {
              feedbackItemTypes.add(FeedbackMetric("pitch", testItem.note.noteName()))
            }
            //feedbackItemTypes.add(FeedbackMetric("pitch", "-" + distanceInHz.toInt()))

            feedbackItem.throwSafeIncorrectSwitch()
          }
        } else {
          pm_log("PERFECT")
        }
      }

      //IGNORE RESTS
      if (idealItem.noteNumber == -1) {
        feedbackItem.type = FeedbackType.Correct
      }


      //feedbackItemTypes.add("" + testItem.note.noteNumber)
      //feedbackItemTypes += FeedbackMetric("Note #","" + testItem.note.noteNumber)

      //increment the current position based on the duration of the ideal

      //if it's correct, increment that counter -- if not, do nothing
      if (feedbackItem.type == FeedbackType.Correct) {
        results.correct += 1
      }

      //store the individual peroformance data on each note
      val notePerformance = IndividualNotePerformanceInfo(
        idealBeat = curBeatPosition,
        actualBeat = toTestBeatPositionAtIndexToTest,
        idealPitch = idealItem.getFrequency(),
        actualPitch = testItem.note.avgFreq ?: -1.0,
        idealDuration = idealItem.duration,
        actualDuration = testItem.note.duration
      )
      //This should happen after storing the data -- otherwise the values are off by one
      curBeatPosition += idealValue.duration


      results.finalResults.add(notePerformance)
    }


    //pm_log("---- Results : " + results.correct + "/" + results.attempted,10)
    //pm_log(results.finalResults.toTypedArray(),10)
    

    return results

  }

}
