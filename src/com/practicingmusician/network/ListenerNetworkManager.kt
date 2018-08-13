package com.practicingmusician.network

import com.practicingmusician.ListenerApp
import com.practicingmusician.UserSettings
import com.practicingmusician.finals.CompareResults
import com.practicingmusician.finals.ResultsForDatabase
import com.practicingmusician.finals.ToleranceLevels
import com.practicingmusician.finals.generateResultForDatabase


/**
 * Created by jn on 7/5/17.
 */

external fun networkRequest(url: String, data: dynamic)

external val listenerApp: ListenerApp

object ListenerNetworkManager {

  fun makePostRequest(urlString: String, data: PerformanceWrapper) {
    networkRequest(urlString, data) //call the javascript
  }

  fun buildAndSendRequest(results: CompareResults) {

    val dbResults = results.generateResultForDatabase()
    dbResults.userID = listenerApp.parameters.userID
    dbResults.exerciseID = listenerApp.parameters.exerciseID

    dbResults.tempo = UserSettings.tempo
    dbResults.isDefaultTempo = UserSettings.isDefaultTempo

    //TODO: update this to send more values to the database
    dbResults.toleranceLevels = ToleranceLevels(
      allowableCentsMargin = listenerApp.parameters.tolerances.allowableCentsMargin.toInt(),
      allowableDurationRatio = listenerApp.parameters.tolerances.allowableDurationRatio,
      allowableRhythmMargin = listenerApp.parameters.tolerances.allowableRhythmMargin,
      largestBeatDifference = -1.0,
      largestDurationRatioDifference = -1.0,
      minDurationInBeats = listenerApp.parameters.minimumSizes.minDurationInBeats
    )

    val performanceWrapper = PerformanceWrapper(performance = dbResults)

    ListenerNetworkManager.makePostRequest(listenerApp.parameters.databaseEndpoint, performanceWrapper)
  }

}

data class PerformanceWrapper(val performance: ResultsForDatabase)
