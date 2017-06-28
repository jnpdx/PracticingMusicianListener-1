package com.practicingmusician


/**
 * Created by jn on 6/27/17.
 *
 * These are interfaces so that Kotlin can talk to the JavaScript objects easily
 *
 */

external fun pm_log(msg : Any, level : Int = definedExternally)

interface AudioAnalyzer {
    fun setupMedia()
    @JsName("updatePitch")
    fun updatePitch(timestamp : Double) : Double
}

interface GeneratedExercise {
    var tempo : Double
    var notes : Array<SimpleJSNoteObject>
}

external class Audio(filename : String) {
    var currentTime : Int
    fun play()
}


interface EasyScoreCode {
    val bars : Array<dynamic>
}

data class SimpleJSNoteObject(val noteNumber : Int, val duration : Double)

external class EasyScoreUtil  {
    var exercise : EasyScoreCode
    lateinit var generatedExercise : GeneratedExercise

    fun setupOnElement(elementID : String)
    fun notateExercise()
    fun drawIndicatorLine(canvas : dynamic, beat : Double)

    fun getPositionForBeat(beat: Double) : BeatPosition
    fun getFeedbackYPosition(staveTopY : Double) : Double

    fun createFeedbackHTMLElement(items : Array<String>, x : Double, y : Double)
}

data class BeatPosition(val x : Double, val y : Double)