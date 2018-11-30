package com.practicingmusician

import com.practicingmusician.finals.CompareResults
import com.practicingmusician.finals.FeedbackMetric
import com.practicingmusician.steppable.SampleCollection


/**
 * Created by jn on 6/27/17.
 *
 * These are interfaces so that Kotlin can talk to the JavaScript objects easily
 *
 */

external fun pm_log(msg: Any, level: Int = definedExternally)

external fun displayFlashMessages(messages: Array<FlashMessage>)

external fun placeTuner(position: Int)

external var global_transposition: Int

data class DialogParams(val modalType: String, val image: String, val message: String, val metric: String)

data class FlashMessage(val type: String, val message: String)

data class ConverterOutput(val easyScoreInfo: EasyScoreCode)

external class jsMusicXMLConverter {
  fun convertXMLToJSON(xmlString: String): dynamic
  fun convertJSON(input: dynamic): ConverterOutput
}

data class ComparisonFlags(
  val testPitch: Boolean,
  val testRhythm: Boolean,
  val testDuration: Boolean
)

data class AppPreferences(
  val metronomeSound: Boolean?,
  val bpm: Int?,
  val transposition: Int?,
  val pitch: Double?
)

interface AppSetupParameters {
  //DOM element IDs
  val notationContainerName: String
  val metronomeContainerName: String
  val controlsContainerName: String

  val userID: Int
  val exerciseID: Int

  //database endpoint for storing performance data
  val databaseEndpoint: String

  //base URL of the app
  val url: String

  //directory in which audio assets are stored
  val audioAssetPath: String

  var comparisonFlags: ComparisonFlags
  val minimumSizes: MinimumSizes
  val factorWeights: FactorWeights
  val correctLevels: CorrectLevels
  val tolerances: Tolerances

  //path to the XML file to load
  val xmlUrl: String

  val displaySiteDialog: (params: DialogParams) -> Unit

  //normally would get set in alterPreferences, but can get set here too
  val metronomeSound: Boolean?
  val bpm: Int?
  val transposition: Int?
  val pitch: Double?
}

interface AudioAnalyzer {
  var isFunctional: Boolean
  var hasMicrophoneAccess: Boolean
  fun setupMedia()
  @JsName("updatePitch")
  fun updatePitch(timestamp: Double): Double
}

external class Audio(filename: String) {
  var currentTime: Int
  fun play()
}


interface EasyScoreCode {
  val title: String
  val author: String
  val time_signature: String
  val count_off: Double
  var tempo: Double
  val comparisonFlags: ComparisonFlags
  val copyrightInfo: String
  val systems: Array<dynamic>
  var notes: Array<SimpleJSNoteObject>
}

data class SimpleJSNoteObject(val noteNumber: Int, val duration: Double, val id: String = "")

external class EasyScoreUtil {
  var exercise: EasyScoreCode?
  lateinit var containerElementName: String

  fun changePlayButton(buttonClass: String)

  fun displayMedal(medalClass: String)

  fun reset()

  fun setupOnElement(elementID: String)

  fun setupMetronome(elementID: String)

  fun setupControls(elementID: String)

  fun buildTitleElements(elementID: String)

  fun notateExercise()
  fun drawIndicatorLine(canvas: dynamic, beat: Double)

  fun getPageForBeat(beat: Double): Int
  fun showPageNumber(pageNumber: Int)

  fun getPositionForBeat(beat: Double): BeatPosition
  fun getFeedbackYPosition(staveTopY: Double): Double

  fun createFeedbackHTMLElement(type: String, items: Array<FeedbackMetric>, beat: Double)
}

data class BeatPosition(val x: Double, val y: Double, val page: Int)

//Comparison utility

data class MinimumSizes(val acceptableBeatDistance: Double,
                        var minDurationInBeats: Double)

data class FactorWeights(val rhythmFactor: Double,
                         val noteFactor: Double,
                         val durationFactor: Double)

data class CorrectLevels(val correctCentsMargin: Double,
                         val correctRhythmMargin: Double,
                         val correctDurationMargin: Double,
                         val correctDurationInSeconds: Double)

data class Tolerances(var allowableCentsMargin: Double,
                      var allowableRhythmMargin: Double,
                      var allowableDurationRatio: Double)

external fun runComparison(
  isRunning: Boolean,
  exerciseNotes: Array<SimpleJSNoteObject>,
  sampleCollections: Array<SampleCollection>,
  bpm: Int,
  minimumSizes: MinimumSizes,
  factorWeights: FactorWeights,
  correctLevels: CorrectLevels,
  tolerances: Tolerances,
  comparisonFlags: ComparisonFlags
): CompareResults
