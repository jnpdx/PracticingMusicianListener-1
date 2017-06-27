/*
 * This is a helper that should be the interface to most of what the app does with VexFlow,
 * specifically using the EasyScore system
 *
 * Written as a global variable, but it does store some state information, since the notation should
 * only be done once
 */

VF = Vex.Flow;

//helper function
function concat(a, b) { return a.concat(b); }


var EasyScoreUtil = {

    //the current position that systems are being placed on the screen
    scorePositionInitialX : 60,
    scorePositionInitialY : 20,

    scorePositionX : 0,
    scorePositionY : 0,
    positionInLine: 0,

    scorePositionCurrentLine: 0,
    measureCounter : 0,

    //gets set later with the current exercise (from notesFromKotlinNotationItems())
    exercise: null,

    //VexFlow variables that need to be stored
    vf : null,
    registry: null,

    //these three are just bind-ed functions
    score: null,
    voice: null,
    beam: null,

    //formatting info for the notation
    canvasWidth: 1024,
    barWidth : 200, //TODO: change dynamically based on window size?
    barHeight: 160,
    firstBarAddition: 40,
    barsPerLine: 4,

    //counter so that we can get an individual ID for each note
    noteIDNumber: 0,

    //array of systems (really measures...) that have been added to the screen
    //useful for getting placement information later
    systems: Array(),

    //setup the basic notation stuff
    setupOnElement: function(elementID) {
        var totalLines = Math.ceil(this.exercise.bars.length / this.barsPerLine)
        var totalWidthWillBe = this.barsPerLine * this.barWidth + this.firstBarAddition

        if (totalLines <= 1) {
            totalWidthWillBe = this.exercise.bars.length * this.barWidth + this.firstBarAddition
        }

        this.scorePositionInitialX = (this.canvasWidth / 2) - (totalWidthWillBe / 2)

        pm_log("Total width will be " + totalWidthWillBe)
        pm_log("Total height will be " + totalLines * this.barHeight)

        this.vf = new Vex.Flow.Factory({
                renderer: {selector: elementID, width: this.canvasWidth, height: totalLines * this.barHeight}
                });

        this.registry = new VF.Registry();
        VF.Registry.enableDefaultRegistry(this.registry);

        this.score = this.vf.EasyScore({ throwOnError: true });

        this.voice = this.score.voice.bind(this.score);
        this.notes = this.score.notes.bind(this.score);
        this.beam = this.score.beam.bind(this.score);
    },

    //make a new system (measure) of a given width
    makeSystem: function () {

        this.positionInLine = this.measureCounter % this.barsPerLine

        var width = this.barWidth


        pm_log("Width: " + width)

        if (this.positionInLine == 0) {
            //pm_log("NEW LINE")
            width += this.firstBarAddition
            this.scorePositionX = this.scorePositionInitialX
            if (this.scorePositionY == 0) {
                this.scorePositionY = this.scorePositionInitialY
            } else {
                this.scorePositionY += this.barHeight
            }
        } else {
            //pm_log("SAME LINE")
        }
//
//        pm_log("Creating at x " + this.scorePositionX)
//        pm_log("Creating at y " + this.scorePositionY)

        var system = this.vf.System({ x: this.scorePositionX, y: this.scorePositionY, width: width, spaceBetweenStaves: 10 });

        this.measureCounter += 1
        this.scorePositionX += width;

        return system;
    },

    //helper function to get easy access to notes later on
    id: function (id) { return this.registry.getElementById(id); },

    //Take the current exercise (as generated by generateExerciseEasyScoreCode) and notate it on the screen,
    notateExercise:function() {
        for (barIndex in this.exercise.bars) {
            var curBar = this.exercise.bars[barIndex]

            var system = EasyScoreUtil.makeSystem()

            this.systems.push(system)

            var notesArray = Array()
            //add all the notes
            for (groupIndex in curBar.groups) {
                var curGroup = curBar.groups[groupIndex]

                var notesString = ""

                //take the notes and make a string that EasyScore can read, while giving each note a unique ID
                for (var noteIndex in curGroup.notes) {
                    var note = curGroup.notes[noteIndex]

                    if (noteIndex > 0) {
                        notesString += ","
                    }
                    notesString += note

                    notesString += "[id=\"note" + this.noteIDNumber + "\"]"

                    this.noteIDNumber++
                }

                var additionalInfo = {}

                if (curGroup.stem_direction != undefined) {
                    additionalInfo.stem = curGroup.stem_direction
                }

                var notes = this.notes(notesString,additionalInfo)

                //check if it's beamed
                if (curGroup.beam === true) {
                    notes = this.beam(notes)
                }

                notesArray.push(
                    notes
                )

            }

            //create the measure and connect all the groups with the reduce(concat) function
            var stave = system.addStave({ voices: [this.voice(
                            notesArray.reduce(concat)
                            )] });

            //get the extra_attributes if there are any
            if (curBar.extra_attributes != undefined) {
                for (attributeIndex in curBar.extra_attributes) {
                    var attr = curBar.extra_attributes[attributeIndex]
                    switch(attr.name) {
                        case "time_signature":
                            stave.addTimeSignature(attr.value)
                            break
                        case "clef":
                            stave.addClef(attr.value)
                            break
                        case "key_signature":
                            stave.addKeySignature(attr.value)
                            break
                        default:
                            println("Unknown attribute")
                            break
                    }
                }
            }

            //if it's the last bar, make the bar line the correct end bar
            if (barIndex == this.exercise.bars.length - 1) {
                stave.setEndBarType(VF.Barline.type.END)
            }
        }

        //draw it to the screen
        this.vf.draw();
        VF.Registry.disableDefaultRegistry();
    },

    //given a certain beat, return the elements (notes) that surround it.
    //So, in a bar of quarter notes, 1.5 should return the first and second items, with
    //percent at 0.5
    getElementsForBeat: function(beat) {

            //current position to scan
            var currentPosition = 0

            //these will be the elements we store and return
            var beginningItemIndex = null
            var endingItemIndex = null

            //the beat positions of those elements
            var firstItemBeatPosition = 0
            var lastItemBeatPosition = 0

            //percentage between the elements that the beat exists in
            var percent = null

            //pm_log("Searching for beat " + beat + " in")
            //pm_log(this.exercise.rawNotes)

            //this pulls from generatedExercise, which is the non-EasyScore set of notes and durations
            for (index in generatedExercise.notes) {
                var item = generatedExercise.notes[index]

                var duration = item.duration

                if (currentPosition <= beat) {
                    beginningItemIndex = index
                    endingItemIndex = index

                    firstItemBeatPosition = currentPosition
                    lastNoteBeatPosition = currentPosition
                } else {
                    if (beginningItemIndex == null) {
                        beginningItemIndex = index
                        firstItemBeatPosition = currentPosition
                    }
                    //set the end item index
                    endingItemIndex = index
                    lastItemBeatPosition = currentPosition

                    if (currentPosition >= beat) {
                        break
                    }
                }

                currentPosition += duration

            }

            var distanceBetween = lastItemBeatPosition - firstItemBeatPosition
            var beatDistanceFromFirstItem = beat - firstItemBeatPosition

            percent = beatDistanceFromFirstItem / distanceBetween

            if (percent < 0 || isNaN(percent)) percent = 0

            //pm_log("End pos: " + currentPosition)
            return {
                "currentItemIndex": beginningItemIndex, //item at or before the beat
                "nextItemIndex": endingItemIndex, //item after the beat
                "percent" : percent //percent that describes the distance
            }
     },

    //get the position (coordinates) for a certain beat
    getPositionForBeat: function(beat) {
        //get the elements on either side
        var ts = EasyScoreUtil.getElementsForBeat(beat)

        //use the ids to get the actual elements
        var currentItem = EasyScoreUtil.id("note" + ts.currentItemIndex)
        var nextItem = EasyScoreUtil.id("note" + ts.nextItemIndex)

        var staveYPos = currentItem.stave.getYForLine(0)
        var initialPos = EasyScoreUtil.middlePositionOfItem(currentItem)

        //find the middles of the items
        var distance = EasyScoreUtil.middlePositionOfItem(nextItem) - EasyScoreUtil.middlePositionOfItem(currentItem)


        if (currentItem.stave.getBoundingBox().y != nextItem.stave.getBoundingBox().y) {
            //the nextItem appears on the next line

            distance = currentItem.stave.end_x - EasyScoreUtil.middlePositionOfItem(currentItem)
        }

        return {
                x: (initialPos + distance * ts.percent),
                y: staveYPos
            }


      },

    //helper function to find the middle of an item
     middlePositionOfItem: function(item) {
              return item.getAbsoluteX() + item.getBoundingBox().w / 2.0
      },

    //get the current staff
    //WARNING: currently just returns the first one
    getCurrentStave : function() {
        return this.systems[0].parts[0].stave
    },

    getStaveForBeat: function(beat) {
        var ts = EasyScoreUtil.getElementsForBeat(beat)
        var currentItem = EasyScoreUtil.id("note" + ts.currentItemIndex)
        var stave = currentItem.stave
        return stave
    },

    //draw the indicator line (blue line that shows current position)
    drawIndicatorLine: function(canvas, beat) {

            var indicatorPosition = EasyScoreUtil.getPositionForBeat(beat)

            var indicatorOverflow = 20

            var stave = EasyScoreUtil.getCurrentStave()
            var staveHeight = stave.getYForLine(4) - stave.getYForLine(0)

            var topY = indicatorPosition.y - indicatorOverflow
            var bottomY = indicatorPosition.y + staveHeight + indicatorOverflow

            if (canvas.getContext) {

            	   // use getContext to use the canvas for drawing
            	   var ctx = canvas.getContext('2d');

                   ctx.strokeStyle = '#4990E2';
                   ctx.lineWidth = 3;

            	   // Stroked path
            	   ctx.beginPath();
            	   ctx.moveTo(indicatorPosition.x,bottomY);
            	   ctx.lineTo(indicatorPosition.x,topY);
            	   ctx.closePath();
            	   ctx.stroke();

              }
        },

    //get the Y coordinate for feedback items
    getFeedbackYPosition : function(topStaveY) {
        var stave = EasyScoreUtil.getCurrentStave()
        var pos = stave.height + topStaveY
        return pos
    },

    //draw feedback item at a given position
    drawFeedbackAtPosition(canvas,feedbackItemType,x,y) {

            var ctx = canvas.getContext('2d');

            ctx.font = "16px Arial"
            ctx.textAlign = "center"
            ctx.textBaseline = "top";
            ctx.fillText(feedbackItemType,x,y)

            //to test location
//            ctx.strokeStyle = '#4990E2';
//                               ctx.lineWidth = 3;
//
//                        	   // Stroked triangle
//                        	   ctx.beginPath();
//                        	   ctx.moveTo(x,y);
//                        	   ctx.lineTo(x + 2,y);
//                        	   ctx.closePath();
//                        	   ctx.stroke();
    },

    createFeedbackHTMLElement(feedbackItemType,x,y) {
        var obj = document.createElement('div');
        obj.className = "feedbackItem"
        obj.textContent = feedbackItemType
        obj.style.position = "absolute"
        obj.style.top = "" + y + "px"
        obj.style.left = "" + x - (16 / 2) + "px"
        document.getElementById("notationBody").appendChild(obj)
    },

}