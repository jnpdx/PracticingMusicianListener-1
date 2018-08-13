package com.practicingmusician.finals

import com.practicingmusician.notes.Note
import com.practicingmusician.steppable.SampleCollection

/**
 * Created by jn on 6/23/17.
 *
 *
 * This class deals with converting the microphone samples into notes and notes into samples
 *
 */

data class NotePlacement(val note: Note, val positionInBeats: Double)

class IncrementalBufferManager {

  //must be set so that it knows how long a beat should be
  //var tempo = 0.0

  //sample rate should be constant
  val sampleRate = 44100.0

  //the minimum duration a note is assumed to be
  //so, if there's a note that is 0.1 beats long, we assume that it's an anomaly and ignore it
  var minDurationInBeats: Double = 0.0

  //this stores the notes that have been converted from samples


  /* State information about what has been converted */

  //the position in the sample array that has been convered so far

  /* End state */

  @JsName("arrayToList")
  fun js_arrayToList(arr: Array<SampleCollection>): List<SampleCollection> {
    return arr.toList()
  }

  //This takes samples from the microphone and attempts to convert them into meaningful Notes
  //It attempts to do some smart analysis, including getting rid of short values
  //and then stitching the remaining like-values together


}
