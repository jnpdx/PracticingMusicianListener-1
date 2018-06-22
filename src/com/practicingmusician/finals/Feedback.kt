package com.practicingmusician.finals

/**
 * Created by jn on 6/23/17.
 */

//This is an individual metric (like Pitch or Duration) that gets sent to EasyScore
data class FeedbackMetric(val missed: Boolean, val type: String, val value: String, val amount: Double)

enum class FeedbackType {
  Correct, Incorrect, Missed
}

data class FeedbackItem(val type: String, val beat: Double, var metrics: Array<FeedbackMetric>)

data class CompareResults(val correct: Int = 0, val attempted: Int = 0, val feedbackItems: Array<FeedbackItem>, val finalResults: Array<IndividualNotePerformanceInfo>)

fun CompareResults.generateResultForDatabase(): ResultsForDatabase {
  val pitch = finalResults.map { it.idealPitch - it.actualPitch }.average()
  val rhythm = finalResults.map { it.idealBeat - it.actualBeat }.average()
  val duration = finalResults.map { it.idealDuration - it.actualDuration }.average()

  return ResultsForDatabase(
    correct = this.correct,
    attempted = this.attempted,
    exerciseAveragePitch = pitch,
    exerciseAverageRhythm = rhythm,
    exerciseAverageDuration = duration,
    notePerformances = finalResults
  )
}

data class ToleranceLevels(val allowableCentsMargin: Int, val allowableRhythmMargin: Double, val allowableDurationRatio: Double, val largestBeatDifference: Double, val largestDurationRatioDifference: Double, val minDurationInBeats: Double)

data class ResultsForDatabase(var api_version: Int = 2, var userID: Int = -1, var exerciseID: Int = -1, var toleranceLevels: ToleranceLevels = ToleranceLevels(0, 0.0, 0.0, 0.0, 0.0, 0.0), var tempo: Double = -1.0, var isDefaultTempo: Boolean = true, val correct: Int, val attempted: Int, val exerciseAveragePitch: Double, val exerciseAverageRhythm: Double, val exerciseAverageDuration: Double, val notePerformances: Array<IndividualNotePerformanceInfo>)

data class IndividualNotePerformanceInfo(val idealBeat: Double, val actualBeat: Double, val idealPitch: Double, val actualPitch: Double, val idealDuration: Double, val actualDuration: Double)
