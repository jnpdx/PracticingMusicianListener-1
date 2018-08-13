/******************************************** LANDMARK CONVERSION *************************/

function convertNotesToLandmarks(notes, bpm) {
    return notes.reduce(
        function(acc, note) {
            acc.landmarks.push({
                type: 'begin',
                noteNumber: note.noteNumber,
                position: acc.positionCounter,
                duration: note.duration,
                durationInSamples: note.duration * (60.0 / bpm) * 44100,
                freq: noteNumberToFrequency(note.noteNumber),
            })

            acc.positionCounter += note.duration

            return acc
        },
        {
            landmarks: [],
            positionCounter: 0,
        }
    ).landmarks
}

function convertSampleCollectionsToLandmarks(sampleCollections, bpm) {
    return sampleCollections.reduce(
        function(acc, sampleCollection) {
            acc.landmarks.push({
                type: 'begin',
                freq: sampleCollection.freq,
                noteNumber: closestNoteToFrequency(sampleCollection.freq),
                duration:
                    sampleCollection.lengthInSamples / 44100 / (60.0 / bpm),
                durationInSamples: sampleCollection.lengthInSamples,
                position: acc.positionCounterInSamples / 44100 / (60.0 / bpm),
            })

            acc.positionCounterInSamples += sampleCollection.lengthInSamples
            return acc
        },
        {
            landmarks: [],
            positionCounterInSamples: 0,
        }
    ).landmarks
}

/***************************************** TO RECREATE IN LISTENER ***********************************/

function compareLandmarkArrays(
    idealLandmarks,
    testLandmarks,
    tolerances,
    isRunning
) {
    if (testLandmarks.length == 0) return []
    return idealLandmarks.reduce(
        function(acc, landmark) {
            //try to find it in the test array
            //It shouldn't have been measured already, or come before any measured items

            if (
                isRunning &&
                landmark.position + landmark.duration >=
                    testLandmarks[testLandmarks.length - 1].position
            ) {
                return acc
            }

            acc.results.push({
                landmark: landmark,
                closeItems: testLandmarks.reduce(
                    function(testAcc, testItem, index) {
                        //see if we're within one beat either way
                        if (
                            Math.abs(landmark.position - testItem.position) <=
                                tolerances.acceptableBeatDistance &&
                            testItem.duration > tolerances.minDurationInBeats
                        ) {
                            testAcc.results.push({
                                ...testItem,
                                index,
                            })
                        }

                        return testAcc
                    },
                    {
                        item: null,
                        results: [],
                    }
                ).results,
            })

            return acc
        },
        {
            results: [],
        }
    ).results
}

function findBestMatch(landmark, options, comparisonFlags, factorWeights) {
    return options
        .map(function(item) {
            const centsDiff = centsDifferent(
                landmark.noteNumber,
                landmark.freq,
                item.freq
            )

            return {
                ...item,
                differences: {
                    distance: comparisonFlags.testRhythm
                        ? Math.abs(landmark.position - item.position)
                        : 0,
                    duration: comparisonFlags.testDuration
                        ? Math.abs(landmark.duration - item.duration)
                        : 0,
                    note: comparisonFlags.testPitch
                        ? Math.abs(landmark.noteNumber - item.noteNumber)
                        : 0,

                    pitch: comparisonFlags.testPitch ? centsDiff : 0,
                },
            }
        })
        .map(function(item) {
            //generate a score based on how close it is
            //like golf, the lowest score is the best

            const rhythmAmount =
                item.differences.distance * factorWeights.rhythmFactor
            const noteAmount = item.differences.note * factorWeights.noteFactor
            const durationAmount =
                item.differences.duration * factorWeights.durationFactor

            const restVsNoteAmount =
                (landmark.noteNumber == -1 && item.noteNumber != -1) ||
                (landmark.noteNumber != -1 && item.noteNumber == -1)
                    ? Number.MAX_VALUE
                    : 0

            return {
                ...item,
                score:
                    restVsNoteAmount +
                    rhythmAmount +
                    noteAmount +
                    durationAmount,
            }
        })
        .sort(function(a, b) {
            if (a.score < b.score) return -1
            if (a.score > b.score) return 1
            return 0
        })[0]
}

function closestLandmarkToPosition(landmarks, position) {
    return landmarks.reduce(function(acc, landmark) {
        if (acc == undefined) {
            return landmark
        }

        if (
            Math.abs(landmark.position - position) <
            Math.abs(acc.position - position)
        ) {
            return landmark
        }

        return acc
    }, undefined)
}

function generateFeedbackFromMatch(
    landmark,
    testItem,
    correctLevels,
    tolerances
) {
    const feedbackItems = []

    //it's a rest, let's not sweat the details
    if (
        (landmark.noteNumber == -1 && testItem == undefined) ||
        (landmark.noteNumber == -1 && testItem.noteNumber == -1)
    ) {
        return feedbackItems
    }

    if (testItem == undefined) {
        feedbackItems.push({
            missed: true,
            type: 'MISSING',
            value: 'NOT PLAYED',
            amount: 0,
        })
        return feedbackItems
    }

    const restVsNote =
        (landmark.noteNumber == -1 && testItem.noteNumber != -1) ||
        (landmark.noteNumber != -1 && testItem.noteNumber == -1)

    if (restVsNote) {
        feedbackItems.push({
            missed: true,
            type: 'PITCH',
            value: 'Not played',
            amount: testItem.differences.note,
        })
        return feedbackItems
    }

    if (testItem.differences.pitch != 0) {
        if (testItem.differences.note != 0) {
            feedbackItems.push({
                missed: true,
                type: 'PITCH',
                value: 'WRONG NOTE',
                amount: noteName(testItem.differences.note),
            })
        } else {
            //same note, test the pitch difference
            //see if it's within the tolerance

            if (testItem.differences.pitch > correctLevels.correctCentsMargin) {
                feedbackItems.push({
                    missed:
                        testItem.differences.pitch >
                        tolerances.allowableCentsMargin,
                    type: 'PITCH',
                    value: landmark.freq < testItem.freq ? 'SHARP' : 'FLAT',
                    amount: testItem.differences.pitch,
                })
            }
        }
    }

    if (testItem.differences.duration != 0) {
        const ratioDifference = testItem.duration / landmark.duration

        //ignore it if the duration difference in seconds is too small
        const durationDifferenceInSeconds =
            Math.abs(testItem.durationInSamples - landmark.durationInSamples) /
            44100.0

        if (
            durationDifferenceInSeconds >
                correctLevels.correctDurationInSeconds &&
            (ratioDifference > 1.0 + correctLevels.correctDurationMargin ||
                ratioDifference < 1.0 - correctLevels.correctDurationMargin)
        ) {
            feedbackItems.push({
                missed:
                    ratioDifference > 1.0 + tolerances.allowableDurationRatio ||
                    ratioDifference < 1.0 - tolerances.allowableDurationRatio,
                type: 'DURATION',
                value: ratioDifference > 1.0 ? 'LONG' : 'SHORT',
                amount: ratioDifference,
            })
        }
    }

    if (
        testItem.differences.distance != 0 &&
        testItem.differences.distance > correctLevels.correctRhythmMargin
    ) {
        //see if it's within the tolerance
        feedbackItems.push({
            missed:
                testItem.differences.distance >
                tolerances.allowableRhythmMargin,
            type: 'SPEED',
            value: testItem.position < landmark.position ? 'EARLY' : 'LATE',
            amount: testItem.differences.distance,
        })
    }

    return feedbackItems
}

function conjoinSampleCollections(sampleCollections, bpm, tolerances) {
    var finalSet = sampleCollections
    while (true) {
        const combined = finalSet.reduce(function(acc, sampleCollection) {
            //combine all like-values

            if (acc.length == 0) {
                acc.push(sampleCollection)
                return acc
            }
            const lastItem = acc[acc.length - 1]
            if (sampleCollection.noteNumber == lastItem.noteNumber) {
                //combine them
                lastItem.freq =
                    (lastItem.freq * lastItem.lengthInSamples +
                        sampleCollection.freq *
                            sampleCollection.lengthInSamples) /
                    (lastItem.lengthInSamples +
                        sampleCollection.lengthInSamples)

                lastItem.lengthInSamples += sampleCollection.lengthInSamples
            } else {
                acc.push(sampleCollection)
            }

            return acc
        }, [])
        //TODO: have to add this back in and add the time to something on either side
        //
        // .reduce(function(acc, sampleCollection) {
        //     //remove all that are too small
        //     if (
        //         sampleCollection.lengthInSamples <
        //         tolerances.minDurationInBeats * (60.0 / bpm) * 44100
        //     ) {
        //         return acc
        //     }
        //     acc.push(sampleCollection)
        //     return acc
        // }, [])

        if (combined.length < finalSet.length) {
            //try combining them again
            finalSet = combined
            continue
        } else {
            break
        }
    }

    return finalSet
}

function addNoteDataToSampleCollection(sampleCollections) {
    return sampleCollections.map(function(sampleCollection) {
        return {
            ...sampleCollection,
            noteNumber: closestNoteToFrequency(sampleCollection.freq),
        }
    })
}

/******************************** FUNCTIONS FOR TESTING ***********************************/

function noteNumberToFrequency(noteNumber) {
    if (noteNumber == -1) {
        return -1.0
    }
    const A440_NoteNumber = 69.0
    const equalTemperamentPitch =
        440.0 * Math.pow(2.0, (noteNumber - A440_NoteNumber) / 12.0)
    return equalTemperamentPitch
}

function centsDifferent(idealNoteNumber, idealFrequency, testFrequency) {
    if (idealFrequency < testFrequency) {
        //test frequency is sharp
        const higherNoteFreq = noteNumberToFrequency(idealNoteNumber + 1)
        const distanceInHz = higherNoteFreq - idealFrequency
        const distanceInCents =
            ((testFrequency - idealFrequency) / distanceInHz) * 100.0
        return distanceInCents
    } else if (idealFrequency > testFrequency) {
        //test freq flat
        const lowerNoteFreq = noteNumberToFrequency(idealNoteNumber - 1)
        const distanceInHz = lowerNoteFreq - idealFrequency
        const distanceInCents =
            ((idealFrequency - testFrequency) / distanceInHz) * 100.0
        return distanceInCents
    } else {
        //same
        return 0
    }
}

var noteNames = [
    'C',
    'C#',
    'D',
    'E♭',
    'E',
    'F',
    'F#',
    'G',
    'A♭',
    'A',
    'B♭',
    'B',
]

ALL_NOTES = []
for (var i = 30; i <= 110; i++) {
    ALL_NOTES.push({ noteNumber: i })
}

function noteName(noteNumber) {
    if (noteNumber == -1) {
        return 'NaN'
    }
    let baseNote = (function(value) {
        if (value < 0) {
            return (value + 12) % 12
        } else {
            return value % 12
        }
    })(noteNumber - window.global_transposition)

    if (baseNote >= noteNames.length) {
        console.warn('Invalid note')
        return 'NaN'
    }
    return noteNames[baseNote]
}

function closestNoteToFrequency(frequency) {
    if (frequency <= 0) return -1

    var closestFrequency = Number.MAX_VALUE
    var closestNoteValue = -1

    for (i in ALL_NOTES) {
        const note = ALL_NOTES[i]
        var diff = Math.abs(noteNumberToFrequency(note.noteNumber) - frequency)
        if (diff < closestFrequency) {
            closestFrequency = diff
            closestNoteValue = note.noteNumber
        } else if (diff > closestFrequency) {
            break
        }
    }

    if (closestNoteValue == 30) {
        console.log('RETURNING 30 for ' + frequency)
    }

    return closestNoteValue
}

/*************************************** COMBINE ********************************* */
function runComparison(
    isRunning,
    exerciseNotes,
    sampleCollections,
    bpm,
    minimumSizes,
    factorWeights,
    correctLevels,
    tolerances,
    comparisonFlags
) {
    //take sample collection

    const landmarksFromIdeal = convertNotesToLandmarks(exerciseNotes, bpm)

    const conjoinedSamples = conjoinSampleCollections(
        addNoteDataToSampleCollection(sampleCollections),
        bpm,
        minimumSizes
    )

    const landmarksFromSamples = convertSampleCollectionsToLandmarks(
        conjoinedSamples,
        bpm
    )

    if (landmarksFromSamples == undefined || landmarksFromSamples.length == 0) {
        return {
            feedbackItems: [],
        }
    }

    const closeItems = compareLandmarkArrays(
        landmarksFromIdeal,
        landmarksFromSamples,
        minimumSizes,
        isRunning
    )

    const allFeedback = closeItems.reduce(
        function(acc, item) {
            const bestMatch = findBestMatch(
                item.landmark,
                item.closeItems,
                comparisonFlags,
                factorWeights
            )

            const feedback = generateFeedbackFromMatch(
                item.landmark,
                bestMatch,
                correctLevels,
                tolerances
            )

            // if (feedback.length > 0) {
            //     console.log('Best match:')
            //     console.log('landmark:')
            //     console.log(item.landmark)
            //     console.log('best:')
            //     console.log(bestMatch)
            //     console.log('from options:')
            //     console.log(item.closeItems)
            //     console.log('result:')
            //     console.log(feedback)
            //     console.log('\n')
            // }

            acc.feedbackItems.push({
                type:
                    feedback.length == 0
                        ? 'CORRECT'
                        : feedback.find(function(item) {
                              return item.missed
                          })
                            ? 'MISSED'
                            : 'INCORRECT',
                beat: item.landmark.position,
                metrics: feedback,
            })

            acc.notePerformances.push({
                idealBeat: item.landmark.position,
                actualBeat: (bestMatch && bestMatch.position) || -1,
                idealPitch: item.landmark.freq,
                actualPitch: (bestMatch && bestMatch.freq) || -1,
                idealDuration: item.landmark.duration,
                actualDuration: (bestMatch && bestMatch.duration) || -1,
            })

            return acc
        },
        {
            feedbackItems: [],
            notePerformances: [],
        }
    )

    const itemsWithFeedback = allFeedback.feedbackItems.reduce(function(
        acc,
        item
    ) {
        if (item.metrics.length > 0) return acc + 1
        return acc
    },
    0)

    return {
        correct: closeItems.length - itemsWithFeedback,
        attempted: closeItems.length,
        feedbackItems: allFeedback.feedbackItems,
        notePerformances: allFeedback.notePerformances,
    }
}

module.exports = {
    convertNotesToLandmarks,
    convertSampleCollectionsToLandmarks,
    compareLandmarkArrays,
    conjoinSampleCollections,
    addNoteDataToSampleCollection,
    findBestMatch,
    generateFeedbackFromMatch,
    runComparison,
}
