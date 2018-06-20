package com.practicingmusician.finals

import com.practicingmusician.ListenerApp
import com.practicingmusician.notes.Note

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

  @JsName("arrayToList")
  fun js_arrayToList(arr: Array<Note>): List<Note> {
    return arr.toList()
  }


}
