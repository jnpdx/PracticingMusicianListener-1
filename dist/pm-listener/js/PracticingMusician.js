if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'PracticingMusician'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'PracticingMusician'.");
}
var PracticingMusician = function (_, Kotlin) {
  'use strict';
  var throwUPAE = Kotlin.throwUPAE;
  var Unit = Kotlin.kotlin.Unit;
  var toList = Kotlin.kotlin.collections.toList_us0mfu$;
  var throwCCE = Kotlin.throwCCE;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var toList_0 = Kotlin.kotlin.collections.toList_7wnvza$;
  var removeAll = Kotlin.kotlin.collections.removeAll_qafx1e$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var equals = Kotlin.equals;
  var kotlin_js_internal_DoubleCompanionObject = Kotlin.kotlin.js.internal.DoubleCompanionObject;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var toString = Kotlin.toString;
  var reversed = Kotlin.kotlin.collections.reversed_7wnvza$;
  var numberToInt = Kotlin.numberToInt;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var split = Kotlin.kotlin.text.split_o64adg$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var average = Kotlin.kotlin.collections.average_l63kqw$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  TunerModes.prototype = Object.create(Enum.prototype);
  TunerModes.prototype.constructor = TunerModes;
  FeedbackType.prototype = Object.create(Enum.prototype);
  FeedbackType.prototype.constructor = FeedbackType;
  TimeKeeper$TimeKeeperState.prototype = Object.create(Enum.prototype);
  TimeKeeper$TimeKeeperState.prototype.constructor = TimeKeeper$TimeKeeperState;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  function ListenerApp() {
    this.scoreUtil_sw9y4h$_0 = this.scoreUtil_sw9y4h$_0;
    this.exercise_wu0215$_0 = this.exercise_wu0215$_0;
    this.parameters_nqwyif$_0 = this.parameters_nqwyif$_0;
    this.audioManager_332yye$_0 = this.audioManager_332yye$_0;
    this.exerciseManager_kzt272$_0 = this.exerciseManager_kzt272$_0;
    this.tuner_jfg0op$_0 = this.tuner_jfg0op$_0;
    this.currentFeedbackItems = ArrayList_init();
  }
  ListenerApp.prototype.setTempoForTests = function (t) {
    UserSettings_getInstance().setTempo_8555vt$(t, true);
  };
  Object.defineProperty(ListenerApp.prototype, 'scoreUtil', {
    get: function () {
      if (this.scoreUtil_sw9y4h$_0 == null)
        return throwUPAE('scoreUtil');
      return this.scoreUtil_sw9y4h$_0;
    },
    set: function (scoreUtil) {
      this.scoreUtil_sw9y4h$_0 = scoreUtil;
    }
  });
  Object.defineProperty(ListenerApp.prototype, 'exercise', {
    get: function () {
      if (this.exercise_wu0215$_0 == null)
        return throwUPAE('exercise');
      return this.exercise_wu0215$_0;
    },
    set: function (exercise) {
      this.exercise_wu0215$_0 = exercise;
    }
  });
  Object.defineProperty(ListenerApp.prototype, 'parameters', {
    get: function () {
      if (this.parameters_nqwyif$_0 == null)
        return throwUPAE('parameters');
      return this.parameters_nqwyif$_0;
    },
    set: function (parameters) {
      this.parameters_nqwyif$_0 = parameters;
    }
  });
  Object.defineProperty(ListenerApp.prototype, 'audioManager', {
    get: function () {
      if (this.audioManager_332yye$_0 == null)
        return throwUPAE('audioManager');
      return this.audioManager_332yye$_0;
    },
    set: function (audioManager) {
      this.audioManager_332yye$_0 = audioManager;
    }
  });
  Object.defineProperty(ListenerApp.prototype, 'exerciseManager', {
    get: function () {
      if (this.exerciseManager_kzt272$_0 == null)
        return throwUPAE('exerciseManager');
      return this.exerciseManager_kzt272$_0;
    },
    set: function (exerciseManager) {
      this.exerciseManager_kzt272$_0 = exerciseManager;
    }
  });
  Object.defineProperty(ListenerApp.prototype, 'tuner', {
    get: function () {
      if (this.tuner_jfg0op$_0 == null)
        return throwUPAE('tuner');
      return this.tuner_jfg0op$_0;
    },
    set: function (tuner) {
      this.tuner_jfg0op$_0 = tuner;
    }
  });
  ListenerApp.prototype.getTempo = function () {
    return UserSettings_getInstance().tempo;
  };
  ListenerApp.prototype.createNotes = function () {
    Note$Companion_getInstance().createAllNotes();
  };
  ListenerApp.prototype.getMetronomeAudio = function () {
    return UserSettings_getInstance().metronomeAudioOn;
  };
  ListenerApp.prototype.runTuner = function (parameters) {
    console.log('Running with parameters:');
    console.log(parameters);
    this.createNotes();
    this.tuner.audioAnalyzer = audioAnalyzer;
    this.tuner.run();
  };
  ListenerApp.prototype.runBasicTuner = function () {
    this.tuner = new Tuner();
    this.tuner.audioAnalyzer = audioAnalyzer;
    this.tuner.run();
  };
  function ListenerApp$runApp$lambda(this$ListenerApp, closure$parameters) {
    return function (callbackData) {
      console.log('Callback:');
      var converter = new jsMusicXMLConverter();
      var json = converter.convertXMLToJSON(callbackData);
      console.log('JSON:');
      var jsCode = converter.convertJSON(json);
      this$ListenerApp.parameters.comparisonFlags = jsCode.easyScoreInfo.comparisonFlags;
      this$ListenerApp.exercise = jsCode.easyScoreInfo;
      this$ListenerApp.finishRunApp_pjzheq$(closure$parameters);
      return Unit;
    };
  }
  ListenerApp.prototype.runApp = function (parameters) {
    this.parameters = parameters;
    console.log('paramters:');
    console.log(this.parameters);
    loadXml(parameters.xmlUrl, ListenerApp$runApp$lambda(this, parameters));
  };
  ListenerApp.prototype.finishRunApp_pjzheq$ = function (parameters) {
    this.audioManager = new AudioManager();
    this.exerciseManager = new ExerciseManager(this.audioManager);
    this.scoreUtil = new EasyScoreUtil();
    this.createNotes();
    audioAnalyzer.setupMedia();
    var prefs = new AppPreferences(parameters.metronomeSound, parameters.bpm, parameters.transposition, parameters.pitch);
    UserSettings_getInstance().setTempo_8555vt$(this.exercise.tempo, true);
    this.alterPreferences(prefs);
    this.exerciseManager.loadExercise();
    this.makeDomElements();
    this.runBasicTuner();
  };
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  ListenerApp.prototype.alterPreferences = function (preferences) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    console.log('Altering preferences...');
    console.log(preferences);
    this.exerciseManager.stop();
    if ((tmp$ = preferences.metronomeSound) != null) {
      UserSettings_getInstance().metronomeAudioOn = tmp$;
    }
    if ((tmp$_0 = preferences.bpm) != null) {
      console.log('Setting bpm to ' + tmp$_0);
      UserSettings_getInstance().setTempo_8555vt$(tmp$_0, tmp$_0 === listenerApp.exercise.tempo);
      if (this.scoreUtil.exercise != null) {
        this.scoreUtil.setupMetronome(this.parameters.metronomeContainerName);
      }
    }
    if ((tmp$_1 = preferences.pitch) != null) {
      UserSettings_getInstance().pitch = tmp$_1;
    }
    if ((tmp$_2 = preferences.transposition) != null) {
      UserSettings_getInstance().transposition = tmp$_2;
      var tmp$_3 = this.exercise;
      var $receiver = toList(this.exercise.notes);
      var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
      var tmp$_4;
      tmp$_4 = $receiver.iterator();
      loop_label: while (tmp$_4.hasNext()) {
        var item = tmp$_4.next();
        var tmp$_5 = destination.add_11rb$;
        var transform$result;
        transform$break: do {
          if (UserSettings_getInstance().transposition !== 0) {
            var newNote = new SimpleJSNoteObject(item.noteNumber + UserSettings_getInstance().transposition | 0, item.duration, item.id);
            transform$result = newNote;
            break transform$break;
          }
          transform$result = item;
        }
         while (false);
        tmp$_5.call(destination, transform$result);
      }
      tmp$_3.notes = copyToArray(destination);
    }
  };
  ListenerApp.prototype.makeDomElements = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    pm_log('Making window w/ container: ' + this.parameters.notationContainerName, 10);
    var container = Kotlin.isType(tmp$ = document.getElementById(this.parameters.notationContainerName), HTMLElement) ? tmp$ : throwCCE();
    container.className = container.className + 'notationBodyContainer';
    var indicatorCanvasName = 'indicatorCanvas';
    var indicatorCanvasObj = Kotlin.isType(tmp$_0 = document.createElement('canvas'), HTMLElement) ? tmp$_0 : throwCCE();
    indicatorCanvasObj.style.position = 'absolute';
    indicatorCanvasObj.id = indicatorCanvasName;
    (tmp$_1 = document.getElementById(this.parameters.notationContainerName)) != null ? tmp$_1.appendChild(indicatorCanvasObj) : null;
    pm_log('Made indicator canvas on notation body: ', 10);
    pm_log(Kotlin.isType(tmp$_2 = document.getElementById(this.parameters.notationContainerName), HTMLElement) ? tmp$_2 : throwCCE());
    var feedbackCanvasName = 'feedbackCanvas';
    var feedbackCanvasObj = Kotlin.isType(tmp$_3 = document.createElement('canvas'), HTMLElement) ? tmp$_3 : throwCCE();
    feedbackCanvasObj.style.position = 'absolute';
    feedbackCanvasObj.id = feedbackCanvasName;
    (tmp$_4 = document.getElementById(this.parameters.notationContainerName)) != null ? tmp$_4.appendChild(feedbackCanvasObj) : null;
    this.makeScore_puj7f4$(this.parameters.notationContainerName, this.parameters.controlsContainerName);
  };
  ListenerApp.prototype.makeScore_puj7f4$ = function (containerElementName, controlsElementName) {
    this.scoreUtil = new EasyScoreUtil();
    this.scoreUtil.containerElementName = this.parameters.notationContainerName;
    this.scoreUtil.exercise = this.exercise;
    pm_log('Setting up score on ' + containerElementName);
    this.scoreUtil.setupOnElement(containerElementName);
    this.scoreUtil.setupControls(controlsElementName);
    this.scoreUtil.setupMetronome(this.parameters.metronomeContainerName);
    this.scoreUtil.buildTitleElements(containerElementName);
    this.scoreUtil.notateExercise();
  };
  ListenerApp.prototype.toggleState = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    this.parameters.tolerances.allowableCentsMargin = toDouble((Kotlin.isType(tmp$ = document.getElementById('allowableCentsMargin'), HTMLInputElement) ? tmp$ : throwCCE()).value);
    this.parameters.tolerances.allowableRhythmMargin = toDouble((Kotlin.isType(tmp$_0 = document.getElementById('allowableRhythmMargin'), HTMLInputElement) ? tmp$_0 : throwCCE()).value);
    this.parameters.tolerances.allowableDurationRatio = toDouble((Kotlin.isType(tmp$_1 = document.getElementById('allowableDurationRatio'), HTMLInputElement) ? tmp$_1 : throwCCE()).value);
    this.parameters.minimumSizes.minDurationInBeats = toDouble((Kotlin.isType(tmp$_2 = document.getElementById('minDurationInBeats'), HTMLInputElement) ? tmp$_2 : throwCCE()).value);
    switch (this.exerciseManager.timeKeeper.state.name) {
      case 'Stopped':
        if (!audioAnalyzer.isFunctional || !audioAnalyzer.hasMicrophoneAccess) {
          displayFlashMessages([new FlashMessage('danger', 'Audio not working.  Please make sure you are using either Chrome or Firefox and have enabled microphone access.')]);
          return;
        }

        this.scoreUtil.reset();
        this.exerciseManager.createSteppables();
        this.exerciseManager.setup();
        this.exerciseManager.loadExercise();
        this.exerciseManager.run();
        break;
      case 'Running':
        this.exerciseManager.stop();
        break;
      case 'Completed':
        break;
    }
  };
  ListenerApp.prototype.doResizeActions = function () {
    var tmp$;
    pm_log('Resized window w/ container: ' + this.parameters.notationContainerName, 10);
    var oldSVG = document.getElementsByTagName('svg')[0];
    (tmp$ = oldSVG != null ? oldSVG.parentNode : null) != null ? tmp$.removeChild(oldSVG) : null;
    listenerApp.makeScore_puj7f4$(this.parameters.notationContainerName, this.parameters.controlsContainerName);
    var copyOfFeedbackItems = toList_0(listenerApp.currentFeedbackItems);
    listenerApp.clearFeedbackItems();
    var tmp$_0;
    tmp$_0 = copyOfFeedbackItems.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      listenerApp.addFeedbackItem_775p9r$(element);
    }
  };
  ListenerApp.prototype.moveToPosition_14dthe$ = function (beat) {
    var tmp$;
    var indicatorCanvas = Kotlin.isType(tmp$ = document.getElementById('indicatorCanvas'), HTMLCanvasElement) ? tmp$ : null;
    this.scoreUtil.showPageNumber(this.scoreUtil.getPageForBeat(beat));
    this.scoreUtil.drawIndicatorLine(indicatorCanvas, beat);
  };
  ListenerApp.prototype.highlightMetronomeItem_za3lpa$ = function (itemNumber) {
    var tmp$, tmp$_0;
    var metronomeItems = document.getElementsByClassName('metronomeItem');
    tmp$ = metronomeItems.length;
    for (var index = 0; index < tmp$; index++) {
      var item = Kotlin.isType(tmp$_0 = metronomeItems[index], HTMLElement) ? tmp$_0 : throwCCE();
      item.className = 'metronomeItem';
      if (itemNumber === index)
        item.className = item.className + ' highlighted';
    }
  };
  function ListenerApp$clearFeedbackItems$lambda(it) {
    return true;
  }
  ListenerApp.prototype.clearFeedbackItems = function () {
    var tmp$;
    removeAll(this.currentFeedbackItems, ListenerApp$clearFeedbackItems$lambda);
    pm_log('Clearing');
    var items = document.getElementsByClassName('feedbackItem');
    while (items.length > 0) {
      var it = Kotlin.isType(tmp$ = items[0], HTMLElement) ? tmp$ : throwCCE();
      var tmp$_0;
      (tmp$_0 = it.parentNode) != null ? tmp$_0.removeChild(it) : null;
    }
  };
  ListenerApp.prototype.addFeedbackItem_775p9r$ = function (feedbackItem) {
    if (this.currentFeedbackItems.indexOf_11rb$(feedbackItem) === -1) {
      this.currentFeedbackItems.add_11rb$(feedbackItem);
    }
    this.scoreUtil.createFeedbackHTMLElement(feedbackItem.type, feedbackItem.metrics, feedbackItem.beat);
  };
  ListenerApp.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ListenerApp',
    interfaces: []
  };
  function DialogParams(modalType, image, message, metric) {
    this.modalType = modalType;
    this.image = image;
    this.message = message;
    this.metric = metric;
  }
  DialogParams.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'DialogParams',
    interfaces: []
  };
  DialogParams.prototype.component1 = function () {
    return this.modalType;
  };
  DialogParams.prototype.component2 = function () {
    return this.image;
  };
  DialogParams.prototype.component3 = function () {
    return this.message;
  };
  DialogParams.prototype.component4 = function () {
    return this.metric;
  };
  DialogParams.prototype.copy_w74nik$ = function (modalType, image, message, metric) {
    return new DialogParams(modalType === void 0 ? this.modalType : modalType, image === void 0 ? this.image : image, message === void 0 ? this.message : message, metric === void 0 ? this.metric : metric);
  };
  DialogParams.prototype.toString = function () {
    return 'DialogParams(modalType=' + Kotlin.toString(this.modalType) + (', image=' + Kotlin.toString(this.image)) + (', message=' + Kotlin.toString(this.message)) + (', metric=' + Kotlin.toString(this.metric)) + ')';
  };
  DialogParams.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.modalType) | 0;
    result = result * 31 + Kotlin.hashCode(this.image) | 0;
    result = result * 31 + Kotlin.hashCode(this.message) | 0;
    result = result * 31 + Kotlin.hashCode(this.metric) | 0;
    return result;
  };
  DialogParams.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.modalType, other.modalType) && Kotlin.equals(this.image, other.image) && Kotlin.equals(this.message, other.message) && Kotlin.equals(this.metric, other.metric)))));
  };
  function FlashMessage(type, message) {
    this.type = type;
    this.message = message;
  }
  FlashMessage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FlashMessage',
    interfaces: []
  };
  FlashMessage.prototype.component1 = function () {
    return this.type;
  };
  FlashMessage.prototype.component2 = function () {
    return this.message;
  };
  FlashMessage.prototype.copy_puj7f4$ = function (type, message) {
    return new FlashMessage(type === void 0 ? this.type : type, message === void 0 ? this.message : message);
  };
  FlashMessage.prototype.toString = function () {
    return 'FlashMessage(type=' + Kotlin.toString(this.type) + (', message=' + Kotlin.toString(this.message)) + ')';
  };
  FlashMessage.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.message) | 0;
    return result;
  };
  FlashMessage.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.message, other.message)))));
  };
  function ConverterOutput(easyScoreInfo) {
    this.easyScoreInfo = easyScoreInfo;
  }
  ConverterOutput.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ConverterOutput',
    interfaces: []
  };
  ConverterOutput.prototype.component1 = function () {
    return this.easyScoreInfo;
  };
  ConverterOutput.prototype.copy_izl8xn$ = function (easyScoreInfo) {
    return new ConverterOutput(easyScoreInfo === void 0 ? this.easyScoreInfo : easyScoreInfo);
  };
  ConverterOutput.prototype.toString = function () {
    return 'ConverterOutput(easyScoreInfo=' + Kotlin.toString(this.easyScoreInfo) + ')';
  };
  ConverterOutput.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.easyScoreInfo) | 0;
    return result;
  };
  ConverterOutput.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.easyScoreInfo, other.easyScoreInfo))));
  };
  function ComparisonFlags(testPitch, testRhythm, testDuration) {
    this.testPitch = testPitch;
    this.testRhythm = testRhythm;
    this.testDuration = testDuration;
  }
  ComparisonFlags.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ComparisonFlags',
    interfaces: []
  };
  ComparisonFlags.prototype.component1 = function () {
    return this.testPitch;
  };
  ComparisonFlags.prototype.component2 = function () {
    return this.testRhythm;
  };
  ComparisonFlags.prototype.component3 = function () {
    return this.testDuration;
  };
  ComparisonFlags.prototype.copy_ws0pad$ = function (testPitch, testRhythm, testDuration) {
    return new ComparisonFlags(testPitch === void 0 ? this.testPitch : testPitch, testRhythm === void 0 ? this.testRhythm : testRhythm, testDuration === void 0 ? this.testDuration : testDuration);
  };
  ComparisonFlags.prototype.toString = function () {
    return 'ComparisonFlags(testPitch=' + Kotlin.toString(this.testPitch) + (', testRhythm=' + Kotlin.toString(this.testRhythm)) + (', testDuration=' + Kotlin.toString(this.testDuration)) + ')';
  };
  ComparisonFlags.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.testPitch) | 0;
    result = result * 31 + Kotlin.hashCode(this.testRhythm) | 0;
    result = result * 31 + Kotlin.hashCode(this.testDuration) | 0;
    return result;
  };
  ComparisonFlags.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.testPitch, other.testPitch) && Kotlin.equals(this.testRhythm, other.testRhythm) && Kotlin.equals(this.testDuration, other.testDuration)))));
  };
  function AppPreferences(metronomeSound, bpm, transposition, pitch) {
    this.metronomeSound = metronomeSound;
    this.bpm = bpm;
    this.transposition = transposition;
    this.pitch = pitch;
  }
  AppPreferences.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AppPreferences',
    interfaces: []
  };
  AppPreferences.prototype.component1 = function () {
    return this.metronomeSound;
  };
  AppPreferences.prototype.component2 = function () {
    return this.bpm;
  };
  AppPreferences.prototype.component3 = function () {
    return this.transposition;
  };
  AppPreferences.prototype.component4 = function () {
    return this.pitch;
  };
  AppPreferences.prototype.copy_ho9xxj$ = function (metronomeSound, bpm, transposition, pitch) {
    return new AppPreferences(metronomeSound === void 0 ? this.metronomeSound : metronomeSound, bpm === void 0 ? this.bpm : bpm, transposition === void 0 ? this.transposition : transposition, pitch === void 0 ? this.pitch : pitch);
  };
  AppPreferences.prototype.toString = function () {
    return 'AppPreferences(metronomeSound=' + Kotlin.toString(this.metronomeSound) + (', bpm=' + Kotlin.toString(this.bpm)) + (', transposition=' + Kotlin.toString(this.transposition)) + (', pitch=' + Kotlin.toString(this.pitch)) + ')';
  };
  AppPreferences.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.metronomeSound) | 0;
    result = result * 31 + Kotlin.hashCode(this.bpm) | 0;
    result = result * 31 + Kotlin.hashCode(this.transposition) | 0;
    result = result * 31 + Kotlin.hashCode(this.pitch) | 0;
    return result;
  };
  AppPreferences.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.metronomeSound, other.metronomeSound) && Kotlin.equals(this.bpm, other.bpm) && Kotlin.equals(this.transposition, other.transposition) && Kotlin.equals(this.pitch, other.pitch)))));
  };
  function AppSetupParameters() {
  }
  AppSetupParameters.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AppSetupParameters',
    interfaces: []
  };
  function AudioAnalyzer() {
  }
  AudioAnalyzer.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AudioAnalyzer',
    interfaces: []
  };
  function EasyScoreCode() {
  }
  EasyScoreCode.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'EasyScoreCode',
    interfaces: []
  };
  function SimpleJSNoteObject(noteNumber, duration, id) {
    if (id === void 0)
      id = '';
    this.noteNumber = noteNumber;
    this.duration = duration;
    this.id = id;
  }
  SimpleJSNoteObject.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SimpleJSNoteObject',
    interfaces: []
  };
  SimpleJSNoteObject.prototype.component1 = function () {
    return this.noteNumber;
  };
  SimpleJSNoteObject.prototype.component2 = function () {
    return this.duration;
  };
  SimpleJSNoteObject.prototype.component3 = function () {
    return this.id;
  };
  SimpleJSNoteObject.prototype.copy_oyjwvu$ = function (noteNumber, duration, id) {
    return new SimpleJSNoteObject(noteNumber === void 0 ? this.noteNumber : noteNumber, duration === void 0 ? this.duration : duration, id === void 0 ? this.id : id);
  };
  SimpleJSNoteObject.prototype.toString = function () {
    return 'SimpleJSNoteObject(noteNumber=' + Kotlin.toString(this.noteNumber) + (', duration=' + Kotlin.toString(this.duration)) + (', id=' + Kotlin.toString(this.id)) + ')';
  };
  SimpleJSNoteObject.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.noteNumber) | 0;
    result = result * 31 + Kotlin.hashCode(this.duration) | 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    return result;
  };
  SimpleJSNoteObject.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.noteNumber, other.noteNumber) && Kotlin.equals(this.duration, other.duration) && Kotlin.equals(this.id, other.id)))));
  };
  function BeatPosition(x, y, page) {
    this.x = x;
    this.y = y;
    this.page = page;
  }
  BeatPosition.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BeatPosition',
    interfaces: []
  };
  BeatPosition.prototype.component1 = function () {
    return this.x;
  };
  BeatPosition.prototype.component2 = function () {
    return this.y;
  };
  BeatPosition.prototype.component3 = function () {
    return this.page;
  };
  BeatPosition.prototype.copy_syxxoe$ = function (x, y, page) {
    return new BeatPosition(x === void 0 ? this.x : x, y === void 0 ? this.y : y, page === void 0 ? this.page : page);
  };
  BeatPosition.prototype.toString = function () {
    return 'BeatPosition(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', page=' + Kotlin.toString(this.page)) + ')';
  };
  BeatPosition.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.page) | 0;
    return result;
  };
  BeatPosition.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.page, other.page)))));
  };
  function MinimumSizes(acceptableBeatDistance, minDurationInBeats) {
    this.acceptableBeatDistance = acceptableBeatDistance;
    this.minDurationInBeats = minDurationInBeats;
  }
  MinimumSizes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MinimumSizes',
    interfaces: []
  };
  MinimumSizes.prototype.component1 = function () {
    return this.acceptableBeatDistance;
  };
  MinimumSizes.prototype.component2 = function () {
    return this.minDurationInBeats;
  };
  MinimumSizes.prototype.copy_lu1900$ = function (acceptableBeatDistance, minDurationInBeats) {
    return new MinimumSizes(acceptableBeatDistance === void 0 ? this.acceptableBeatDistance : acceptableBeatDistance, minDurationInBeats === void 0 ? this.minDurationInBeats : minDurationInBeats);
  };
  MinimumSizes.prototype.toString = function () {
    return 'MinimumSizes(acceptableBeatDistance=' + Kotlin.toString(this.acceptableBeatDistance) + (', minDurationInBeats=' + Kotlin.toString(this.minDurationInBeats)) + ')';
  };
  MinimumSizes.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.acceptableBeatDistance) | 0;
    result = result * 31 + Kotlin.hashCode(this.minDurationInBeats) | 0;
    return result;
  };
  MinimumSizes.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.acceptableBeatDistance, other.acceptableBeatDistance) && Kotlin.equals(this.minDurationInBeats, other.minDurationInBeats)))));
  };
  function FactorWeights(rhythmFactor, noteFactor, durationFactor) {
    this.rhythmFactor = rhythmFactor;
    this.noteFactor = noteFactor;
    this.durationFactor = durationFactor;
  }
  FactorWeights.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FactorWeights',
    interfaces: []
  };
  FactorWeights.prototype.component1 = function () {
    return this.rhythmFactor;
  };
  FactorWeights.prototype.component2 = function () {
    return this.noteFactor;
  };
  FactorWeights.prototype.component3 = function () {
    return this.durationFactor;
  };
  FactorWeights.prototype.copy_yvo9jy$ = function (rhythmFactor, noteFactor, durationFactor) {
    return new FactorWeights(rhythmFactor === void 0 ? this.rhythmFactor : rhythmFactor, noteFactor === void 0 ? this.noteFactor : noteFactor, durationFactor === void 0 ? this.durationFactor : durationFactor);
  };
  FactorWeights.prototype.toString = function () {
    return 'FactorWeights(rhythmFactor=' + Kotlin.toString(this.rhythmFactor) + (', noteFactor=' + Kotlin.toString(this.noteFactor)) + (', durationFactor=' + Kotlin.toString(this.durationFactor)) + ')';
  };
  FactorWeights.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.rhythmFactor) | 0;
    result = result * 31 + Kotlin.hashCode(this.noteFactor) | 0;
    result = result * 31 + Kotlin.hashCode(this.durationFactor) | 0;
    return result;
  };
  FactorWeights.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.rhythmFactor, other.rhythmFactor) && Kotlin.equals(this.noteFactor, other.noteFactor) && Kotlin.equals(this.durationFactor, other.durationFactor)))));
  };
  function CorrectLevels(correctCentsMargin, correctRhythmMargin, correctDurationMargin, correctDurationInSeconds) {
    this.correctCentsMargin = correctCentsMargin;
    this.correctRhythmMargin = correctRhythmMargin;
    this.correctDurationMargin = correctDurationMargin;
    this.correctDurationInSeconds = correctDurationInSeconds;
  }
  CorrectLevels.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CorrectLevels',
    interfaces: []
  };
  CorrectLevels.prototype.component1 = function () {
    return this.correctCentsMargin;
  };
  CorrectLevels.prototype.component2 = function () {
    return this.correctRhythmMargin;
  };
  CorrectLevels.prototype.component3 = function () {
    return this.correctDurationMargin;
  };
  CorrectLevels.prototype.component4 = function () {
    return this.correctDurationInSeconds;
  };
  CorrectLevels.prototype.copy_6y0v78$ = function (correctCentsMargin, correctRhythmMargin, correctDurationMargin, correctDurationInSeconds) {
    return new CorrectLevels(correctCentsMargin === void 0 ? this.correctCentsMargin : correctCentsMargin, correctRhythmMargin === void 0 ? this.correctRhythmMargin : correctRhythmMargin, correctDurationMargin === void 0 ? this.correctDurationMargin : correctDurationMargin, correctDurationInSeconds === void 0 ? this.correctDurationInSeconds : correctDurationInSeconds);
  };
  CorrectLevels.prototype.toString = function () {
    return 'CorrectLevels(correctCentsMargin=' + Kotlin.toString(this.correctCentsMargin) + (', correctRhythmMargin=' + Kotlin.toString(this.correctRhythmMargin)) + (', correctDurationMargin=' + Kotlin.toString(this.correctDurationMargin)) + (', correctDurationInSeconds=' + Kotlin.toString(this.correctDurationInSeconds)) + ')';
  };
  CorrectLevels.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.correctCentsMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.correctRhythmMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.correctDurationMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.correctDurationInSeconds) | 0;
    return result;
  };
  CorrectLevels.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.correctCentsMargin, other.correctCentsMargin) && Kotlin.equals(this.correctRhythmMargin, other.correctRhythmMargin) && Kotlin.equals(this.correctDurationMargin, other.correctDurationMargin) && Kotlin.equals(this.correctDurationInSeconds, other.correctDurationInSeconds)))));
  };
  function Tolerances(allowableCentsMargin, allowableRhythmMargin, allowableDurationRatio) {
    this.allowableCentsMargin = allowableCentsMargin;
    this.allowableRhythmMargin = allowableRhythmMargin;
    this.allowableDurationRatio = allowableDurationRatio;
  }
  Tolerances.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Tolerances',
    interfaces: []
  };
  Tolerances.prototype.component1 = function () {
    return this.allowableCentsMargin;
  };
  Tolerances.prototype.component2 = function () {
    return this.allowableRhythmMargin;
  };
  Tolerances.prototype.component3 = function () {
    return this.allowableDurationRatio;
  };
  Tolerances.prototype.copy_yvo9jy$ = function (allowableCentsMargin, allowableRhythmMargin, allowableDurationRatio) {
    return new Tolerances(allowableCentsMargin === void 0 ? this.allowableCentsMargin : allowableCentsMargin, allowableRhythmMargin === void 0 ? this.allowableRhythmMargin : allowableRhythmMargin, allowableDurationRatio === void 0 ? this.allowableDurationRatio : allowableDurationRatio);
  };
  Tolerances.prototype.toString = function () {
    return 'Tolerances(allowableCentsMargin=' + Kotlin.toString(this.allowableCentsMargin) + (', allowableRhythmMargin=' + Kotlin.toString(this.allowableRhythmMargin)) + (', allowableDurationRatio=' + Kotlin.toString(this.allowableDurationRatio)) + ')';
  };
  Tolerances.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.allowableCentsMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.allowableRhythmMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.allowableDurationRatio) | 0;
    return result;
  };
  Tolerances.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.allowableCentsMargin, other.allowableCentsMargin) && Kotlin.equals(this.allowableRhythmMargin, other.allowableRhythmMargin) && Kotlin.equals(this.allowableDurationRatio, other.allowableDurationRatio)))));
  };
  function TunerModes(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function TunerModes_initFields() {
    TunerModes_initFields = function () {
    };
    TunerModes$TUNER_instance = new TunerModes('TUNER', 0);
    TunerModes$STOPWATCH_instance = new TunerModes('STOPWATCH', 1);
  }
  var TunerModes$TUNER_instance;
  function TunerModes$TUNER_getInstance() {
    TunerModes_initFields();
    return TunerModes$TUNER_instance;
  }
  var TunerModes$STOPWATCH_instance;
  function TunerModes$STOPWATCH_getInstance() {
    TunerModes_initFields();
    return TunerModes$STOPWATCH_instance;
  }
  TunerModes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TunerModes',
    interfaces: [Enum]
  };
  function TunerModes$values() {
    return [TunerModes$TUNER_getInstance(), TunerModes$STOPWATCH_getInstance()];
  }
  TunerModes.values = TunerModes$values;
  function TunerModes$valueOf(name) {
    switch (name) {
      case 'TUNER':
        return TunerModes$TUNER_getInstance();
      case 'STOPWATCH':
        return TunerModes$STOPWATCH_getInstance();
      default:throwISE('No enum constant com.practicingmusician.TunerModes.' + name);
    }
  }
  TunerModes.valueOf_61zpoe$ = TunerModes$valueOf;
  function TunerParameters(mode, acceptableCentsRange, msToIgnore, noteNameItem, diffItem, stopwatchTimerItem) {
    this.mode = mode;
    this.acceptableCentsRange = acceptableCentsRange;
    this.msToIgnore = msToIgnore;
    this.noteNameItem = noteNameItem;
    this.diffItem = diffItem;
    this.stopwatchTimerItem = stopwatchTimerItem;
  }
  TunerParameters.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TunerParameters',
    interfaces: []
  };
  TunerParameters.prototype.component1 = function () {
    return this.mode;
  };
  TunerParameters.prototype.component2 = function () {
    return this.acceptableCentsRange;
  };
  TunerParameters.prototype.component3 = function () {
    return this.msToIgnore;
  };
  TunerParameters.prototype.component4 = function () {
    return this.noteNameItem;
  };
  TunerParameters.prototype.component5 = function () {
    return this.diffItem;
  };
  TunerParameters.prototype.component6 = function () {
    return this.stopwatchTimerItem;
  };
  TunerParameters.prototype.copy_944rws$ = function (mode, acceptableCentsRange, msToIgnore, noteNameItem, diffItem, stopwatchTimerItem) {
    return new TunerParameters(mode === void 0 ? this.mode : mode, acceptableCentsRange === void 0 ? this.acceptableCentsRange : acceptableCentsRange, msToIgnore === void 0 ? this.msToIgnore : msToIgnore, noteNameItem === void 0 ? this.noteNameItem : noteNameItem, diffItem === void 0 ? this.diffItem : diffItem, stopwatchTimerItem === void 0 ? this.stopwatchTimerItem : stopwatchTimerItem);
  };
  TunerParameters.prototype.toString = function () {
    return 'TunerParameters(mode=' + Kotlin.toString(this.mode) + (', acceptableCentsRange=' + Kotlin.toString(this.acceptableCentsRange)) + (', msToIgnore=' + Kotlin.toString(this.msToIgnore)) + (', noteNameItem=' + Kotlin.toString(this.noteNameItem)) + (', diffItem=' + Kotlin.toString(this.diffItem)) + (', stopwatchTimerItem=' + Kotlin.toString(this.stopwatchTimerItem)) + ')';
  };
  TunerParameters.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.mode) | 0;
    result = result * 31 + Kotlin.hashCode(this.acceptableCentsRange) | 0;
    result = result * 31 + Kotlin.hashCode(this.msToIgnore) | 0;
    result = result * 31 + Kotlin.hashCode(this.noteNameItem) | 0;
    result = result * 31 + Kotlin.hashCode(this.diffItem) | 0;
    result = result * 31 + Kotlin.hashCode(this.stopwatchTimerItem) | 0;
    return result;
  };
  TunerParameters.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.mode, other.mode) && Kotlin.equals(this.acceptableCentsRange, other.acceptableCentsRange) && Kotlin.equals(this.msToIgnore, other.msToIgnore) && Kotlin.equals(this.noteNameItem, other.noteNameItem) && Kotlin.equals(this.diffItem, other.diffItem) && Kotlin.equals(this.stopwatchTimerItem, other.stopwatchTimerItem)))));
  };
  function PMTuner(parameters) {
    this.parameters = parameters;
    this.state_jz20zy$_0 = TimeKeeper$TimeKeeperState$Stopped_getInstance();
    this.audioAnalyzer_en07nr$_0 = this.audioAnalyzer_en07nr$_0;
    this.timekeeper = new TimeKeeper();
    this.longTermNote_10o4gn$_0 = null;
    this.longTermStartTime = 0.0;
    this.currentNote_7nv2wo$_0 = null;
    this.currentDiff = 0.0;
    this.timerStartTime = 0.0;
    this.timekeeper.steppables.add_11rb$(this);
  }
  Object.defineProperty(PMTuner.prototype, 'state', {
    get: function () {
      return this.state_jz20zy$_0;
    },
    set: function (state) {
      this.state_jz20zy$_0 = state;
    }
  });
  Object.defineProperty(PMTuner.prototype, 'audioAnalyzer', {
    get: function () {
      if (this.audioAnalyzer_en07nr$_0 == null)
        return throwUPAE('audioAnalyzer');
      return this.audioAnalyzer_en07nr$_0;
    },
    set: function (audioAnalyzer) {
      this.audioAnalyzer_en07nr$_0 = audioAnalyzer;
    }
  });
  Object.defineProperty(PMTuner.prototype, 'longTermNote', {
    get: function () {
      return this.longTermNote_10o4gn$_0;
    },
    set: function (value) {
      this.longTermStartTime = window.performance.now();
      this.longTermNote_10o4gn$_0 = value;
    }
  });
  Object.defineProperty(PMTuner.prototype, 'currentNote', {
    get: function () {
      return this.currentNote_7nv2wo$_0;
    },
    set: function (value) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
      if (((tmp$_0 = (tmp$ = this.currentNote_7nv2wo$_0) != null ? tmp$.note : null) != null ? tmp$_0.noteNumber : null) != ((tmp$_1 = value != null ? value.note : null) != null ? tmp$_1.noteNumber : null)) {
        this.timerStartTime = window.performance.now();
      }
       else {
        if (window.performance.now() - this.timerStartTime >= this.parameters.msToIgnore) {
          if (((tmp$_3 = (tmp$_2 = this.currentNote_7nv2wo$_0) != null ? tmp$_2.note : null) != null ? tmp$_3.noteNumber : null) != ((tmp$_5 = (tmp$_4 = this.longTermNote) != null ? tmp$_4.note : null) != null ? tmp$_5.noteNumber : null)) {
            this.longTermNote = this.currentNote_7nv2wo$_0;
          }
        }
      }
      this.currentNote_7nv2wo$_0 = value;
    }
  });
  PMTuner.prototype.setup = function () {
  };
  PMTuner.prototype.start = function () {
    this.state = TimeKeeper$TimeKeeperState$Running_getInstance();
  };
  PMTuner.prototype.stop = function () {
    this.state = TimeKeeper$TimeKeeperState$Stopped_getInstance();
  };
  PMTuner.prototype.step_zgkg49$ = function (timestamp, timeKeeper) {
    var tmp$, tmp$_0, tmp$_1;
    var correlatedFrequency = this.audioAnalyzer.updatePitch(timestamp);
    if (equals(correlatedFrequency, undefined)) {
      this.currentNote = null;
      return;
    }
    var noteWithDiff = Note$Companion_getInstance().closestNoteWithDiff_14dthe$(correlatedFrequency);
    this.currentDiff = noteWithDiff.differenceInFreq;
    this.currentNote = noteWithDiff;
    var timeOnCurrentLongNote = (window.performance.now() - this.longTermStartTime) / 1000.0;
    var longTermNoteName = (tmp$_0 = (tmp$ = this.longTermNote) != null ? tmp$.note : null) != null ? tmp$_0.noteName() : null;
    if (longTermNoteName != null) {
      var tmp$_2;
      (tmp$_2 = document.getElementById(this.parameters.noteNameItem)) != null ? (tmp$_2.innerHTML = longTermNoteName) : null;
    }
    if (equals(this.parameters.mode, TunerModes$STOPWATCH_getInstance().name)) {
      (tmp$_1 = document.getElementById(this.parameters.stopwatchTimerItem)) != null ? (tmp$_1.innerHTML = timeOnCurrentLongNote.toString()) : null;
    }
    switch (TunerModes$valueOf(this.parameters.mode).name) {
      case 'STOPWATCH':
        this.calculateStopwatchMedals_14dthe$(timeOnCurrentLongNote);
        break;
      case 'TUNER':
        this.calculateTunerMedals();
        break;
    }
  };
  PMTuner.prototype.calculateTunerMedals = function () {
  };
  PMTuner.prototype.calculateStopwatchMedals_14dthe$ = function (timeOnCurrentLongNote) {
    if (timeOnCurrentLongNote > 7) {
      console.log('Gold');
      return;
    }
    if (timeOnCurrentLongNote > 5) {
      console.log('Silver');
      return;
    }
    if (timeOnCurrentLongNote > 3) {
      console.log('Bronze');
      return;
    }
  };
  PMTuner.prototype.run = function () {
    this.start();
    this.timekeeper.runForTime = kotlin_js_internal_DoubleCompanionObject.MAX_VALUE;
    this.timekeeper.start();
  };
  PMTuner.prototype.setInitialOffset_14dthe$ = function (offset) {
  };
  PMTuner.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PMTuner',
    interfaces: [TimeKeeperSteppable]
  };
  function UserSettings() {
    UserSettings_instance = this;
    this.transposition = 0;
    this.tempo_o3p6u1$_0 = -1.0;
    this.isDefaultTempo_ve41v2$_0 = true;
    this.metronomeAudioOn = true;
    this.pitch = 440.0;
  }
  Object.defineProperty(UserSettings.prototype, 'tempo', {
    get: function () {
      return this.tempo_o3p6u1$_0;
    },
    set: function (tempo) {
      this.tempo_o3p6u1$_0 = tempo;
    }
  });
  Object.defineProperty(UserSettings.prototype, 'isDefaultTempo', {
    get: function () {
      return this.isDefaultTempo_ve41v2$_0;
    },
    set: function (isDefaultTempo) {
      this.isDefaultTempo_ve41v2$_0 = isDefaultTempo;
    }
  });
  UserSettings.prototype.setTempo_8555vt$ = function (bpm, isDefault) {
    this.tempo = bpm;
    this.isDefaultTempo = isDefault;
  };
  UserSettings.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'UserSettings',
    interfaces: []
  };
  var UserSettings_instance = null;
  function UserSettings_getInstance() {
    if (UserSettings_instance === null) {
      new UserSettings();
    }
    return UserSettings_instance;
  }
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function AudioManager() {
    this.loadedAudio = LinkedHashMap_init();
    this.timeoutKeys = ArrayList_init();
  }
  AudioManager.prototype.loadAudioFile_puj7f4$ = function (filename, key) {
    var audio = new Audio(filename);
    this.loadedAudio.put_xwzc9p$(key, audio);
    return audio;
  };
  AudioManager.prototype.playAudioNow_61zpoe$ = function (key) {
    pm_log('**** (( Playing...', 6);
    var audio = this.loadedAudio.get_11rb$(key);
    audio != null ? (audio.currentTime = 0) : null;
    audio != null ? (audio.play(), Unit) : null;
  };
  function AudioManager$playAudio$lambda(closure$atTime, closure$audio) {
    return function () {
      pm_log('(( Playing...' + toString(closure$atTime), 6);
      closure$audio != null ? (closure$audio.currentTime = 0) : null;
      return closure$audio != null ? (closure$audio.play(), Unit) : null;
    };
  }
  AudioManager.prototype.playAudio_bm4lxs$ = function (key, atTime) {
    var audio = this.loadedAudio.get_11rb$(key);
    var timeoutKey = window.setTimeout(AudioManager$playAudio$lambda(atTime, audio), atTime);
    this.timeoutKeys.add_11rb$(timeoutKey);
  };
  function AudioManager$cancelAllAudio$lambda(it) {
    return true;
  }
  AudioManager.prototype.cancelAllAudio = function () {
    var tmp$;
    tmp$ = reversed(this.timeoutKeys).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      pm_log('Cancelling item... ' + element);
      window.clearTimeout(element);
    }
    removeAll(this.timeoutKeys, AudioManager$cancelAllAudio$lambda);
  };
  AudioManager.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AudioManager',
    interfaces: []
  };
  function ExerciseDefinition() {
    this.notes = ArrayList_init();
    this.prerollLengthInBeats = 4.0;
  }
  var UnsupportedOperationException_init = Kotlin.kotlin.UnsupportedOperationException_init_pdl1vj$;
  ExerciseDefinition.prototype.getLength = function () {
    var beatSize = 1000.0 * 60.0 / listenerApp.getTempo();
    var $receiver = this.notes;
    var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.duration);
    }
    var iterator = destination.iterator();
    if (!iterator.hasNext())
      throw UnsupportedOperationException_init("Empty collection can't be reduced.");
    var accumulator = iterator.next();
    while (iterator.hasNext()) {
      var acc = accumulator;
      accumulator = iterator.next() + acc;
    }
    return accumulator * beatSize;
  };
  ExerciseDefinition.prototype.prerollLength = function () {
    var beatSize = 1000.0 * 60.0 / listenerApp.getTempo();
    return beatSize * this.prerollLengthInBeats;
  };
  ExerciseDefinition.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ExerciseDefinition',
    interfaces: []
  };
  function ExerciseManager(am) {
    this.currentExercise = null;
    this.timeKeeper = new TimeKeeper();
    this.metronome = new Metronome();
    this.pitchTracker = new PitchTracker();
    this.bufferManager = new IncrementalBufferManager();
    this.comparisonEngine = new IncrementalComparisonEngine();
    this.audioManager = am;
    pm_log('Init');
    this.lastAnalysisTimestamp = kotlin_js_internal_DoubleCompanionObject.MIN_VALUE;
  }
  ExerciseManager.prototype.createSteppables = function () {
    this.timeKeeper = new TimeKeeper();
    this.metronome = new Metronome();
    this.pitchTracker = new PitchTracker();
    this.bufferManager = new IncrementalBufferManager();
    this.comparisonEngine = new IncrementalComparisonEngine();
    this.lastAnalysisTimestamp = kotlin_js_internal_DoubleCompanionObject.MIN_VALUE;
  };
  function ExerciseManager$setup$lambda$lambda$lambda(closure$results) {
    return function () {
      var percentage = closure$results.correct / closure$results.attempted;
      if (percentage > 0.85) {
        return 'medal-gold-icon';
      }
      if (percentage > 0.7) {
        return 'medal-silver-icon';
      }
      if (percentage > 0.55) {
        return 'medal-bronze-icon';
      }
      return 'medal-fail-icon';
    };
  }
  function ExerciseManager$setup$lambda(this$ExerciseManager) {
    return function (it) {
      listenerApp.scoreUtil.changePlayButton('stopped');
      listenerApp.scoreUtil.reset();
      this$ExerciseManager.audioManager.cancelAllAudio();
      this$ExerciseManager.metronome.cancelAllUIUpdates();
      if (this$ExerciseManager.currentExercise != null) {
        var this$ExerciseManager_0 = this$ExerciseManager;
        pm_log('Comparing...');
        var combinedComparisonFlags = new ComparisonFlags(listenerApp.exercise.comparisonFlags.testPitch, listenerApp.exercise.comparisonFlags.testRhythm, listenerApp.parameters.comparisonFlags.testDuration);
        var results = runComparison(false, listenerApp.exercise.notes, copyToArray(this$ExerciseManager_0.pitchTracker.samples), numberToInt(listenerApp.getTempo()), listenerApp.parameters.minimumSizes, listenerApp.parameters.factorWeights, listenerApp.parameters.correctLevels, listenerApp.parameters.tolerances, combinedComparisonFlags);
        listenerApp.clearFeedbackItems();
        var $receiver = results.feedbackItems;
        var tmp$;
        for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
          var element = $receiver[tmp$];
          listenerApp.addFeedbackItem_775p9r$(element);
        }
        var iconType = ExerciseManager$setup$lambda$lambda$lambda(results)();
        listenerApp.parameters.displaySiteDialog(new DialogParams('results', iconType, 'Overall accuracy', '' + toString(results.correct) + '/' + toString(results.attempted)));
        listenerApp.scoreUtil.displayMedal(iconType);
        console.log('Final results:');
        console.log(results);
        ListenerNetworkManager_getInstance().buildAndSendRequest_fhpv3e$(results);
      }
      return Unit;
    };
  }
  ExerciseManager.prototype.setup = function () {
    pm_log('Setup');
    listenerApp.clearFeedbackItems();
    this.metronome.audioManager = this.audioManager;
    this.timeKeeper.steppables.add_11rb$(this.metronome);
    this.timeKeeper.steppables.add_11rb$(this.pitchTracker);
    this.timeKeeper.analyzers.add_11rb$(this);
    this.timeKeeper.finishedActions.add_11rb$(ExerciseManager$setup$lambda(this));
    this.metronome.setup();
    this.pitchTracker.setup();
  };
  ExerciseManager.prototype.run = function () {
    this.metronome.start();
    this.pitchTracker.start();
    this.timeKeeper.start();
    listenerApp.scoreUtil.changePlayButton('playing');
  };
  ExerciseManager.prototype.stop = function () {
    this.timeKeeper.stop();
    this.metronome.stop();
    this.pitchTracker.stop();
    listenerApp.scoreUtil.changePlayButton('stopped');
  };
  ExerciseManager.prototype.jsNotesToList = function (jsNotes) {
    var destination = ArrayList_init_0(jsNotes.length);
    var tmp$;
    for (tmp$ = 0; tmp$ !== jsNotes.length; ++tmp$) {
      var item = jsNotes[tmp$];
      destination.add_11rb$(new Note(item.noteNumber, item.duration));
    }
    return toMutableList(destination);
  };
  ExerciseManager.prototype.loadExercise = function () {
    var tmp$;
    pm_log('Loading exericse:');
    var exercise = listenerApp.exercise;
    var exerciseDefinition = new ExerciseDefinition();
    exerciseDefinition.prerollLengthInBeats = exercise.count_off;
    var jsNotes = exercise.notes;
    exerciseDefinition.notes = this.jsNotesToList(jsNotes);
    pm_log('Loaded ' + toString(exerciseDefinition.notes.size) + ' notes');
    pm_log(exerciseDefinition.notes);
    this.currentExercise = exerciseDefinition;
    if ((tmp$ = this.currentExercise) != null) {
      console.log('Testing time sig:');
      console.log(exercise);
      this.metronome.timeSignature = toInt(first(split(exercise.time_signature, Kotlin.charArrayOf(47))));
      this.metronome.prerollBeats = exercise.count_off;
      this.timeKeeper.runForTime = tmp$.getLength() + tmp$.prerollLength() + this.pitchTracker.latencyTime;
      this.pitchTracker.lengthOfPrerollToIgnore = tmp$.prerollLength();
      pm_log('Loaded exercise of length ' + toString(this.timeKeeper.runForTime));
    }
  };
  ExerciseManager.prototype.analyze_14dthe$ = function (timestamp) {
    if (timestamp - this.lastAnalysisTimestamp > 200) {
      this.lastAnalysisTimestamp = timestamp;
    }
     else {
      return;
    }
    var combinedComparisonFlags = new ComparisonFlags(listenerApp.exercise.comparisonFlags.testPitch, listenerApp.exercise.comparisonFlags.testRhythm, listenerApp.parameters.comparisonFlags.testDuration);
    if (this.currentExercise != null) {
      pm_log('Samples length: ' + toString(this.pitchTracker.samples.size));
      var results = runComparison(true, listenerApp.exercise.notes, copyToArray(this.pitchTracker.samples), numberToInt(listenerApp.getTempo()), listenerApp.parameters.minimumSizes, listenerApp.parameters.factorWeights, listenerApp.parameters.correctLevels, listenerApp.parameters.tolerances, combinedComparisonFlags);
      listenerApp.clearFeedbackItems();
      var $receiver = results.feedbackItems;
      var tmp$;
      for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
        var element = $receiver[tmp$];
        listenerApp.addFeedbackItem_775p9r$(element);
      }
    }
  };
  ExerciseManager.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ExerciseManager',
    interfaces: [TimeKeeperAnalyzer]
  };
  function FeedbackMetric(missed, type, value, amount) {
    this.missed = missed;
    this.type = type;
    this.value = value;
    this.amount = amount;
  }
  FeedbackMetric.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FeedbackMetric',
    interfaces: []
  };
  FeedbackMetric.prototype.component1 = function () {
    return this.missed;
  };
  FeedbackMetric.prototype.component2 = function () {
    return this.type;
  };
  FeedbackMetric.prototype.component3 = function () {
    return this.value;
  };
  FeedbackMetric.prototype.component4 = function () {
    return this.amount;
  };
  FeedbackMetric.prototype.copy_o97whb$ = function (missed, type, value, amount) {
    return new FeedbackMetric(missed === void 0 ? this.missed : missed, type === void 0 ? this.type : type, value === void 0 ? this.value : value, amount === void 0 ? this.amount : amount);
  };
  FeedbackMetric.prototype.toString = function () {
    return 'FeedbackMetric(missed=' + Kotlin.toString(this.missed) + (', type=' + Kotlin.toString(this.type)) + (', value=' + Kotlin.toString(this.value)) + (', amount=' + Kotlin.toString(this.amount)) + ')';
  };
  FeedbackMetric.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.missed) | 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    result = result * 31 + Kotlin.hashCode(this.amount) | 0;
    return result;
  };
  FeedbackMetric.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.missed, other.missed) && Kotlin.equals(this.type, other.type) && Kotlin.equals(this.value, other.value) && Kotlin.equals(this.amount, other.amount)))));
  };
  function FeedbackType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function FeedbackType_initFields() {
    FeedbackType_initFields = function () {
    };
    FeedbackType$Correct_instance = new FeedbackType('Correct', 0);
    FeedbackType$Incorrect_instance = new FeedbackType('Incorrect', 1);
    FeedbackType$Missed_instance = new FeedbackType('Missed', 2);
  }
  var FeedbackType$Correct_instance;
  function FeedbackType$Correct_getInstance() {
    FeedbackType_initFields();
    return FeedbackType$Correct_instance;
  }
  var FeedbackType$Incorrect_instance;
  function FeedbackType$Incorrect_getInstance() {
    FeedbackType_initFields();
    return FeedbackType$Incorrect_instance;
  }
  var FeedbackType$Missed_instance;
  function FeedbackType$Missed_getInstance() {
    FeedbackType_initFields();
    return FeedbackType$Missed_instance;
  }
  FeedbackType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FeedbackType',
    interfaces: [Enum]
  };
  function FeedbackType$values() {
    return [FeedbackType$Correct_getInstance(), FeedbackType$Incorrect_getInstance(), FeedbackType$Missed_getInstance()];
  }
  FeedbackType.values = FeedbackType$values;
  function FeedbackType$valueOf(name) {
    switch (name) {
      case 'Correct':
        return FeedbackType$Correct_getInstance();
      case 'Incorrect':
        return FeedbackType$Incorrect_getInstance();
      case 'Missed':
        return FeedbackType$Missed_getInstance();
      default:throwISE('No enum constant com.practicingmusician.finals.FeedbackType.' + name);
    }
  }
  FeedbackType.valueOf_61zpoe$ = FeedbackType$valueOf;
  function FeedbackItem(type, beat, metrics) {
    this.type = type;
    this.beat = beat;
    this.metrics = metrics;
  }
  FeedbackItem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FeedbackItem',
    interfaces: []
  };
  FeedbackItem.prototype.component1 = function () {
    return this.type;
  };
  FeedbackItem.prototype.component2 = function () {
    return this.beat;
  };
  FeedbackItem.prototype.component3 = function () {
    return this.metrics;
  };
  FeedbackItem.prototype.copy_asfhbw$ = function (type, beat, metrics) {
    return new FeedbackItem(type === void 0 ? this.type : type, beat === void 0 ? this.beat : beat, metrics === void 0 ? this.metrics : metrics);
  };
  FeedbackItem.prototype.toString = function () {
    return 'FeedbackItem(type=' + Kotlin.toString(this.type) + (', beat=' + Kotlin.toString(this.beat)) + (', metrics=' + Kotlin.toString(this.metrics)) + ')';
  };
  FeedbackItem.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.beat) | 0;
    result = result * 31 + Kotlin.hashCode(this.metrics) | 0;
    return result;
  };
  FeedbackItem.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.beat, other.beat) && Kotlin.equals(this.metrics, other.metrics)))));
  };
  function CompareResults(correct, attempted, feedbackItems, notePerformances) {
    if (correct === void 0)
      correct = 0;
    if (attempted === void 0)
      attempted = 0;
    this.correct = correct;
    this.attempted = attempted;
    this.feedbackItems = feedbackItems;
    this.notePerformances = notePerformances;
  }
  CompareResults.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CompareResults',
    interfaces: []
  };
  CompareResults.prototype.component1 = function () {
    return this.correct;
  };
  CompareResults.prototype.component2 = function () {
    return this.attempted;
  };
  CompareResults.prototype.component3 = function () {
    return this.feedbackItems;
  };
  CompareResults.prototype.component4 = function () {
    return this.notePerformances;
  };
  CompareResults.prototype.copy_8kjmrp$ = function (correct, attempted, feedbackItems, notePerformances) {
    return new CompareResults(correct === void 0 ? this.correct : correct, attempted === void 0 ? this.attempted : attempted, feedbackItems === void 0 ? this.feedbackItems : feedbackItems, notePerformances === void 0 ? this.notePerformances : notePerformances);
  };
  CompareResults.prototype.toString = function () {
    return 'CompareResults(correct=' + Kotlin.toString(this.correct) + (', attempted=' + Kotlin.toString(this.attempted)) + (', feedbackItems=' + Kotlin.toString(this.feedbackItems)) + (', notePerformances=' + Kotlin.toString(this.notePerformances)) + ')';
  };
  CompareResults.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.correct) | 0;
    result = result * 31 + Kotlin.hashCode(this.attempted) | 0;
    result = result * 31 + Kotlin.hashCode(this.feedbackItems) | 0;
    result = result * 31 + Kotlin.hashCode(this.notePerformances) | 0;
    return result;
  };
  CompareResults.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.correct, other.correct) && Kotlin.equals(this.attempted, other.attempted) && Kotlin.equals(this.feedbackItems, other.feedbackItems) && Kotlin.equals(this.notePerformances, other.notePerformances)))));
  };
  function generateResultForDatabase($receiver) {
    var $receiver_0 = $receiver.notePerformances;
    var destination = ArrayList_init_0($receiver_0.length);
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver_0.length; ++tmp$) {
      var item = $receiver_0[tmp$];
      destination.add_11rb$(item.idealPitch - item.actualPitch);
    }
    var pitch = average(destination);
    var $receiver_1 = $receiver.notePerformances;
    var destination_0 = ArrayList_init_0($receiver_1.length);
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver_1.length; ++tmp$_0) {
      var item_0 = $receiver_1[tmp$_0];
      destination_0.add_11rb$(item_0.idealBeat - item_0.actualBeat);
    }
    var rhythm = average(destination_0);
    var $receiver_2 = $receiver.notePerformances;
    var destination_1 = ArrayList_init_0($receiver_2.length);
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== $receiver_2.length; ++tmp$_1) {
      var item_1 = $receiver_2[tmp$_1];
      destination_1.add_11rb$(item_1.idealDuration - item_1.actualDuration);
    }
    var duration = average(destination_1);
    return new ResultsForDatabase(void 0, void 0, void 0, void 0, void 0, void 0, $receiver.correct, $receiver.attempted, pitch, rhythm, duration, $receiver.notePerformances);
  }
  function ToleranceLevels(allowableCentsMargin, allowableRhythmMargin, allowableDurationRatio, largestBeatDifference, largestDurationRatioDifference, minDurationInBeats) {
    this.allowableCentsMargin = allowableCentsMargin;
    this.allowableRhythmMargin = allowableRhythmMargin;
    this.allowableDurationRatio = allowableDurationRatio;
    this.largestBeatDifference = largestBeatDifference;
    this.largestDurationRatioDifference = largestDurationRatioDifference;
    this.minDurationInBeats = minDurationInBeats;
  }
  ToleranceLevels.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ToleranceLevels',
    interfaces: []
  };
  ToleranceLevels.prototype.component1 = function () {
    return this.allowableCentsMargin;
  };
  ToleranceLevels.prototype.component2 = function () {
    return this.allowableRhythmMargin;
  };
  ToleranceLevels.prototype.component3 = function () {
    return this.allowableDurationRatio;
  };
  ToleranceLevels.prototype.component4 = function () {
    return this.largestBeatDifference;
  };
  ToleranceLevels.prototype.component5 = function () {
    return this.largestDurationRatioDifference;
  };
  ToleranceLevels.prototype.component6 = function () {
    return this.minDurationInBeats;
  };
  ToleranceLevels.prototype.copy_30umf0$ = function (allowableCentsMargin, allowableRhythmMargin, allowableDurationRatio, largestBeatDifference, largestDurationRatioDifference, minDurationInBeats) {
    return new ToleranceLevels(allowableCentsMargin === void 0 ? this.allowableCentsMargin : allowableCentsMargin, allowableRhythmMargin === void 0 ? this.allowableRhythmMargin : allowableRhythmMargin, allowableDurationRatio === void 0 ? this.allowableDurationRatio : allowableDurationRatio, largestBeatDifference === void 0 ? this.largestBeatDifference : largestBeatDifference, largestDurationRatioDifference === void 0 ? this.largestDurationRatioDifference : largestDurationRatioDifference, minDurationInBeats === void 0 ? this.minDurationInBeats : minDurationInBeats);
  };
  ToleranceLevels.prototype.toString = function () {
    return 'ToleranceLevels(allowableCentsMargin=' + Kotlin.toString(this.allowableCentsMargin) + (', allowableRhythmMargin=' + Kotlin.toString(this.allowableRhythmMargin)) + (', allowableDurationRatio=' + Kotlin.toString(this.allowableDurationRatio)) + (', largestBeatDifference=' + Kotlin.toString(this.largestBeatDifference)) + (', largestDurationRatioDifference=' + Kotlin.toString(this.largestDurationRatioDifference)) + (', minDurationInBeats=' + Kotlin.toString(this.minDurationInBeats)) + ')';
  };
  ToleranceLevels.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.allowableCentsMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.allowableRhythmMargin) | 0;
    result = result * 31 + Kotlin.hashCode(this.allowableDurationRatio) | 0;
    result = result * 31 + Kotlin.hashCode(this.largestBeatDifference) | 0;
    result = result * 31 + Kotlin.hashCode(this.largestDurationRatioDifference) | 0;
    result = result * 31 + Kotlin.hashCode(this.minDurationInBeats) | 0;
    return result;
  };
  ToleranceLevels.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.allowableCentsMargin, other.allowableCentsMargin) && Kotlin.equals(this.allowableRhythmMargin, other.allowableRhythmMargin) && Kotlin.equals(this.allowableDurationRatio, other.allowableDurationRatio) && Kotlin.equals(this.largestBeatDifference, other.largestBeatDifference) && Kotlin.equals(this.largestDurationRatioDifference, other.largestDurationRatioDifference) && Kotlin.equals(this.minDurationInBeats, other.minDurationInBeats)))));
  };
  function ResultsForDatabase(api_version, userID, exerciseID, toleranceLevels, tempo, isDefaultTempo, correct, attempted, exerciseAveragePitch, exerciseAverageRhythm, exerciseAverageDuration, notePerformances) {
    if (api_version === void 0)
      api_version = 3;
    if (userID === void 0)
      userID = -1;
    if (exerciseID === void 0)
      exerciseID = -1;
    if (toleranceLevels === void 0)
      toleranceLevels = new ToleranceLevels(0, 0.0, 0.0, 0.0, 0.0, 0.0);
    if (tempo === void 0)
      tempo = -1.0;
    if (isDefaultTempo === void 0)
      isDefaultTempo = true;
    this.api_version = api_version;
    this.userID = userID;
    this.exerciseID = exerciseID;
    this.toleranceLevels = toleranceLevels;
    this.tempo = tempo;
    this.isDefaultTempo = isDefaultTempo;
    this.correct = correct;
    this.attempted = attempted;
    this.exerciseAveragePitch = exerciseAveragePitch;
    this.exerciseAverageRhythm = exerciseAverageRhythm;
    this.exerciseAverageDuration = exerciseAverageDuration;
    this.notePerformances = notePerformances;
  }
  ResultsForDatabase.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ResultsForDatabase',
    interfaces: []
  };
  ResultsForDatabase.prototype.component1 = function () {
    return this.api_version;
  };
  ResultsForDatabase.prototype.component2 = function () {
    return this.userID;
  };
  ResultsForDatabase.prototype.component3 = function () {
    return this.exerciseID;
  };
  ResultsForDatabase.prototype.component4 = function () {
    return this.toleranceLevels;
  };
  ResultsForDatabase.prototype.component5 = function () {
    return this.tempo;
  };
  ResultsForDatabase.prototype.component6 = function () {
    return this.isDefaultTempo;
  };
  ResultsForDatabase.prototype.component7 = function () {
    return this.correct;
  };
  ResultsForDatabase.prototype.component8 = function () {
    return this.attempted;
  };
  ResultsForDatabase.prototype.component9 = function () {
    return this.exerciseAveragePitch;
  };
  ResultsForDatabase.prototype.component10 = function () {
    return this.exerciseAverageRhythm;
  };
  ResultsForDatabase.prototype.component11 = function () {
    return this.exerciseAverageDuration;
  };
  ResultsForDatabase.prototype.component12 = function () {
    return this.notePerformances;
  };
  ResultsForDatabase.prototype.copy_dmhvve$ = function (api_version, userID, exerciseID, toleranceLevels, tempo, isDefaultTempo, correct, attempted, exerciseAveragePitch, exerciseAverageRhythm, exerciseAverageDuration, notePerformances) {
    return new ResultsForDatabase(api_version === void 0 ? this.api_version : api_version, userID === void 0 ? this.userID : userID, exerciseID === void 0 ? this.exerciseID : exerciseID, toleranceLevels === void 0 ? this.toleranceLevels : toleranceLevels, tempo === void 0 ? this.tempo : tempo, isDefaultTempo === void 0 ? this.isDefaultTempo : isDefaultTempo, correct === void 0 ? this.correct : correct, attempted === void 0 ? this.attempted : attempted, exerciseAveragePitch === void 0 ? this.exerciseAveragePitch : exerciseAveragePitch, exerciseAverageRhythm === void 0 ? this.exerciseAverageRhythm : exerciseAverageRhythm, exerciseAverageDuration === void 0 ? this.exerciseAverageDuration : exerciseAverageDuration, notePerformances === void 0 ? this.notePerformances : notePerformances);
  };
  ResultsForDatabase.prototype.toString = function () {
    return 'ResultsForDatabase(api_version=' + Kotlin.toString(this.api_version) + (', userID=' + Kotlin.toString(this.userID)) + (', exerciseID=' + Kotlin.toString(this.exerciseID)) + (', toleranceLevels=' + Kotlin.toString(this.toleranceLevels)) + (', tempo=' + Kotlin.toString(this.tempo)) + (', isDefaultTempo=' + Kotlin.toString(this.isDefaultTempo)) + (', correct=' + Kotlin.toString(this.correct)) + (', attempted=' + Kotlin.toString(this.attempted)) + (', exerciseAveragePitch=' + Kotlin.toString(this.exerciseAveragePitch)) + (', exerciseAverageRhythm=' + Kotlin.toString(this.exerciseAverageRhythm)) + (', exerciseAverageDuration=' + Kotlin.toString(this.exerciseAverageDuration)) + (', notePerformances=' + Kotlin.toString(this.notePerformances)) + ')';
  };
  ResultsForDatabase.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.api_version) | 0;
    result = result * 31 + Kotlin.hashCode(this.userID) | 0;
    result = result * 31 + Kotlin.hashCode(this.exerciseID) | 0;
    result = result * 31 + Kotlin.hashCode(this.toleranceLevels) | 0;
    result = result * 31 + Kotlin.hashCode(this.tempo) | 0;
    result = result * 31 + Kotlin.hashCode(this.isDefaultTempo) | 0;
    result = result * 31 + Kotlin.hashCode(this.correct) | 0;
    result = result * 31 + Kotlin.hashCode(this.attempted) | 0;
    result = result * 31 + Kotlin.hashCode(this.exerciseAveragePitch) | 0;
    result = result * 31 + Kotlin.hashCode(this.exerciseAverageRhythm) | 0;
    result = result * 31 + Kotlin.hashCode(this.exerciseAverageDuration) | 0;
    result = result * 31 + Kotlin.hashCode(this.notePerformances) | 0;
    return result;
  };
  ResultsForDatabase.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.api_version, other.api_version) && Kotlin.equals(this.userID, other.userID) && Kotlin.equals(this.exerciseID, other.exerciseID) && Kotlin.equals(this.toleranceLevels, other.toleranceLevels) && Kotlin.equals(this.tempo, other.tempo) && Kotlin.equals(this.isDefaultTempo, other.isDefaultTempo) && Kotlin.equals(this.correct, other.correct) && Kotlin.equals(this.attempted, other.attempted) && Kotlin.equals(this.exerciseAveragePitch, other.exerciseAveragePitch) && Kotlin.equals(this.exerciseAverageRhythm, other.exerciseAverageRhythm) && Kotlin.equals(this.exerciseAverageDuration, other.exerciseAverageDuration) && Kotlin.equals(this.notePerformances, other.notePerformances)))));
  };
  function IndividualNotePerformanceInfo(idealBeat, actualBeat, idealPitch, actualPitch, idealDuration, actualDuration) {
    this.idealBeat = idealBeat;
    this.actualBeat = actualBeat;
    this.idealPitch = idealPitch;
    this.actualPitch = actualPitch;
    this.idealDuration = idealDuration;
    this.actualDuration = actualDuration;
  }
  IndividualNotePerformanceInfo.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IndividualNotePerformanceInfo',
    interfaces: []
  };
  IndividualNotePerformanceInfo.prototype.component1 = function () {
    return this.idealBeat;
  };
  IndividualNotePerformanceInfo.prototype.component2 = function () {
    return this.actualBeat;
  };
  IndividualNotePerformanceInfo.prototype.component3 = function () {
    return this.idealPitch;
  };
  IndividualNotePerformanceInfo.prototype.component4 = function () {
    return this.actualPitch;
  };
  IndividualNotePerformanceInfo.prototype.component5 = function () {
    return this.idealDuration;
  };
  IndividualNotePerformanceInfo.prototype.component6 = function () {
    return this.actualDuration;
  };
  IndividualNotePerformanceInfo.prototype.copy_15yvbs$ = function (idealBeat, actualBeat, idealPitch, actualPitch, idealDuration, actualDuration) {
    return new IndividualNotePerformanceInfo(idealBeat === void 0 ? this.idealBeat : idealBeat, actualBeat === void 0 ? this.actualBeat : actualBeat, idealPitch === void 0 ? this.idealPitch : idealPitch, actualPitch === void 0 ? this.actualPitch : actualPitch, idealDuration === void 0 ? this.idealDuration : idealDuration, actualDuration === void 0 ? this.actualDuration : actualDuration);
  };
  IndividualNotePerformanceInfo.prototype.toString = function () {
    return 'IndividualNotePerformanceInfo(idealBeat=' + Kotlin.toString(this.idealBeat) + (', actualBeat=' + Kotlin.toString(this.actualBeat)) + (', idealPitch=' + Kotlin.toString(this.idealPitch)) + (', actualPitch=' + Kotlin.toString(this.actualPitch)) + (', idealDuration=' + Kotlin.toString(this.idealDuration)) + (', actualDuration=' + Kotlin.toString(this.actualDuration)) + ')';
  };
  IndividualNotePerformanceInfo.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.idealBeat) | 0;
    result = result * 31 + Kotlin.hashCode(this.actualBeat) | 0;
    result = result * 31 + Kotlin.hashCode(this.idealPitch) | 0;
    result = result * 31 + Kotlin.hashCode(this.actualPitch) | 0;
    result = result * 31 + Kotlin.hashCode(this.idealDuration) | 0;
    result = result * 31 + Kotlin.hashCode(this.actualDuration) | 0;
    return result;
  };
  IndividualNotePerformanceInfo.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.idealBeat, other.idealBeat) && Kotlin.equals(this.actualBeat, other.actualBeat) && Kotlin.equals(this.idealPitch, other.idealPitch) && Kotlin.equals(this.actualPitch, other.actualPitch) && Kotlin.equals(this.idealDuration, other.idealDuration) && Kotlin.equals(this.actualDuration, other.actualDuration)))));
  };
  function NotePlacement(note, positionInBeats) {
    this.note = note;
    this.positionInBeats = positionInBeats;
  }
  NotePlacement.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NotePlacement',
    interfaces: []
  };
  NotePlacement.prototype.component1 = function () {
    return this.note;
  };
  NotePlacement.prototype.component2 = function () {
    return this.positionInBeats;
  };
  NotePlacement.prototype.copy_uilc1j$ = function (note, positionInBeats) {
    return new NotePlacement(note === void 0 ? this.note : note, positionInBeats === void 0 ? this.positionInBeats : positionInBeats);
  };
  NotePlacement.prototype.toString = function () {
    return 'NotePlacement(note=' + Kotlin.toString(this.note) + (', positionInBeats=' + Kotlin.toString(this.positionInBeats)) + ')';
  };
  NotePlacement.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.note) | 0;
    result = result * 31 + Kotlin.hashCode(this.positionInBeats) | 0;
    return result;
  };
  NotePlacement.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.note, other.note) && Kotlin.equals(this.positionInBeats, other.positionInBeats)))));
  };
  function IncrementalBufferManager() {
    this.sampleRate = 44100.0;
    this.minDurationInBeats = 0.0;
  }
  IncrementalBufferManager.prototype.arrayToList = function (arr) {
    return toList(arr);
  };
  IncrementalBufferManager.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IncrementalBufferManager',
    interfaces: []
  };
  function IncrementalComparisonEngine() {
    this.largestDurationRatioDifference = 0.0;
    this.largestBeatDifference = 0.0;
  }
  IncrementalComparisonEngine.prototype.arrayToList = function (arr) {
    return toList(arr);
  };
  IncrementalComparisonEngine.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IncrementalComparisonEngine',
    interfaces: []
  };
  function ListenerNetworkManager() {
    ListenerNetworkManager_instance = this;
  }
  ListenerNetworkManager.prototype.makePostRequest_l6nar7$ = function (urlString, data) {
    networkRequest(urlString, data);
  };
  ListenerNetworkManager.prototype.buildAndSendRequest_fhpv3e$ = function (results) {
    var tmp$, tmp$_0;
    var dbResults = generateResultForDatabase(results);
    dbResults.userID = listenerApp.parameters.userID;
    dbResults.exerciseID = listenerApp.parameters.exerciseID;
    dbResults.tempo = UserSettings_getInstance().tempo;
    dbResults.isDefaultTempo = UserSettings_getInstance().isDefaultTempo;
    tmp$ = numberToInt(listenerApp.parameters.tolerances.allowableCentsMargin);
    tmp$_0 = listenerApp.parameters.tolerances.allowableDurationRatio;
    dbResults.toleranceLevels = new ToleranceLevels(tmp$, listenerApp.parameters.tolerances.allowableRhythmMargin, tmp$_0, -1.0, -1.0, listenerApp.parameters.minimumSizes.minDurationInBeats);
    var performanceWrapper = new PerformanceWrapper(dbResults);
    ListenerNetworkManager_getInstance().makePostRequest_l6nar7$(listenerApp.parameters.databaseEndpoint, performanceWrapper);
  };
  ListenerNetworkManager.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'ListenerNetworkManager',
    interfaces: []
  };
  var ListenerNetworkManager_instance = null;
  function ListenerNetworkManager_getInstance() {
    if (ListenerNetworkManager_instance === null) {
      new ListenerNetworkManager();
    }
    return ListenerNetworkManager_instance;
  }
  function PerformanceWrapper(performance) {
    this.performance = performance;
  }
  PerformanceWrapper.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PerformanceWrapper',
    interfaces: []
  };
  PerformanceWrapper.prototype.component1 = function () {
    return this.performance;
  };
  PerformanceWrapper.prototype.copy_w32kyh$ = function (performance) {
    return new PerformanceWrapper(performance === void 0 ? this.performance : performance);
  };
  PerformanceWrapper.prototype.toString = function () {
    return 'PerformanceWrapper(performance=' + Kotlin.toString(this.performance) + ')';
  };
  PerformanceWrapper.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.performance) | 0;
    return result;
  };
  PerformanceWrapper.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.performance, other.performance))));
  };
  function Note(value, dur, textVal) {
    Note$Companion_getInstance();
    if (textVal === void 0)
      textVal = 'none';
    this.noteNumber = value;
    this.duration = dur;
    this.textValue = textVal;
    this.freq = null;
  }
  Note.prototype.getFrequency = function () {
    return Note$Companion_getInstance().getFrequencyForNoteNumber_za3lpa$(this.noteNumber);
  };
  function Note$noteName$lambda(value) {
    if (value < 0) {
      return (value + 12 | 0) % 12;
    }
     else {
      return value % 12;
    }
  }
  Note.prototype.noteName = function () {
    if (this.noteNumber === -1) {
      return 'NaN';
    }
    var baseNote = Note$noteName$lambda(this.noteNumber - global_transposition | 0);
    if (baseNote >= Note$Companion_getInstance().noteNames.length) {
      console.warn('Invalid note');
      return 'NaN';
    }
    return Note$Companion_getInstance().noteNames[baseNote];
  };
  function Note$Companion() {
    Note$Companion_instance = this;
    this.noteNames = ['C', 'C#', 'D', 'E\u266D', 'E', 'F', 'F#', 'G', 'A\u266D', 'A', 'B\u266D', 'B'];
  }
  Note$Companion.prototype.getNoteNumber_14dthe$ = function (frequency) {
    if (frequency === -1.0)
      return -1;
    return this.closestNoteToFrequency_14dthe$(frequency);
  };
  var Math_0 = Math;
  Note$Companion.prototype.getFrequencyForNoteNumber_za3lpa$ = function (noteNumber) {
    if (noteNumber === -1) {
      return -1.0;
    }
    var A440_NoteNumber = 69.0;
    var tmp$ = UserSettings_getInstance().pitch;
    var x = noteNumber - A440_NoteNumber / 12.0;
    var equalTemperamentPitch = tmp$ * Math_0.pow(2.0, x);
    return equalTemperamentPitch;
  };
  Note$Companion.prototype.createAllNotes = function () {
    ALL_NOTES = ArrayList_init();
    for (var i = 30; i < 110; i++) {
      ALL_NOTES.add_11rb$(new Note(i, 1.0));
    }
  };
  Note$Companion.prototype.closestNoteToFrequency_14dthe$ = function (frequency) {
    var tmp$;
    var closestFrequency = kotlin_js_internal_DoubleCompanionObject.MAX_VALUE;
    var closestNoteValue = -1;
    tmp$ = ALL_NOTES.iterator();
    while (tmp$.hasNext()) {
      var note = tmp$.next();
      var x = note.getFrequency() - frequency;
      var diff = Math_0.abs(x);
      if (diff < closestFrequency) {
        closestFrequency = diff;
        closestNoteValue = note.noteNumber;
      }
       else if (diff > closestFrequency) {
        break;
      }
    }
    if (closestNoteValue === 30) {
      console.log('RETURNING 30 for ' + toString(frequency));
    }
    return closestNoteValue;
  };
  function Note$Companion$NoteWithDiff(note, differenceInFreq, differenceInCents, tuningDirection, frequency) {
    this.note = note;
    this.differenceInFreq = differenceInFreq;
    this.differenceInCents = differenceInCents;
    this.tuningDirection = tuningDirection;
    this.frequency = frequency;
  }
  Note$Companion$NoteWithDiff.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NoteWithDiff',
    interfaces: []
  };
  Note$Companion$NoteWithDiff.prototype.component1 = function () {
    return this.note;
  };
  Note$Companion$NoteWithDiff.prototype.component2 = function () {
    return this.differenceInFreq;
  };
  Note$Companion$NoteWithDiff.prototype.component3 = function () {
    return this.differenceInCents;
  };
  Note$Companion$NoteWithDiff.prototype.component4 = function () {
    return this.tuningDirection;
  };
  Note$Companion$NoteWithDiff.prototype.component5 = function () {
    return this.frequency;
  };
  Note$Companion$NoteWithDiff.prototype.copy_ldj78l$ = function (note, differenceInFreq, differenceInCents, tuningDirection, frequency) {
    return new Note$Companion$NoteWithDiff(note === void 0 ? this.note : note, differenceInFreq === void 0 ? this.differenceInFreq : differenceInFreq, differenceInCents === void 0 ? this.differenceInCents : differenceInCents, tuningDirection === void 0 ? this.tuningDirection : tuningDirection, frequency === void 0 ? this.frequency : frequency);
  };
  Note$Companion$NoteWithDiff.prototype.toString = function () {
    return 'NoteWithDiff(note=' + Kotlin.toString(this.note) + (', differenceInFreq=' + Kotlin.toString(this.differenceInFreq)) + (', differenceInCents=' + Kotlin.toString(this.differenceInCents)) + (', tuningDirection=' + Kotlin.toString(this.tuningDirection)) + (', frequency=' + Kotlin.toString(this.frequency)) + ')';
  };
  Note$Companion$NoteWithDiff.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.note) | 0;
    result = result * 31 + Kotlin.hashCode(this.differenceInFreq) | 0;
    result = result * 31 + Kotlin.hashCode(this.differenceInCents) | 0;
    result = result * 31 + Kotlin.hashCode(this.tuningDirection) | 0;
    result = result * 31 + Kotlin.hashCode(this.frequency) | 0;
    return result;
  };
  Note$Companion$NoteWithDiff.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.note, other.note) && Kotlin.equals(this.differenceInFreq, other.differenceInFreq) && Kotlin.equals(this.differenceInCents, other.differenceInCents) && Kotlin.equals(this.tuningDirection, other.tuningDirection) && Kotlin.equals(this.frequency, other.frequency)))));
  };
  Note$Companion.prototype.closestNoteWithDiff_14dthe$ = function (frequency) {
    var tmp$;
    var closestFrequency = kotlin_js_internal_DoubleCompanionObject.MAX_VALUE;
    var closestNote = new Note(-1, 0.0);
    var distanceInCents = 0.0;
    if (frequency < ALL_NOTES.get_za3lpa$(0).getFrequency() * 0.67 || frequency > last(ALL_NOTES).getFrequency() * 1.3) {
      return new Note$Companion$NoteWithDiff(closestNote, closestFrequency, distanceInCents, 0, frequency);
    }
    tmp$ = ALL_NOTES.iterator();
    while (tmp$.hasNext()) {
      var note = tmp$.next();
      var x = note.getFrequency() - frequency;
      var diff = Math_0.abs(x);
      if (diff < closestFrequency) {
        closestFrequency = diff;
        closestNote = note;
      }
       else if (diff > closestFrequency) {
        break;
      }
    }
    var idealItemFrequency = closestNote.getFrequency();
    var noteAboveFrequency = Note$Companion_getInstance().getFrequencyForNoteNumber_za3lpa$(closestNote.noteNumber + 1 | 0);
    var noteBelowFrequency = Note$Companion_getInstance().getFrequencyForNoteNumber_za3lpa$(closestNote.noteNumber - 1 | 0);
    var tuningDirection = 0;
    if (frequency - idealItemFrequency > 0) {
      tuningDirection = 1;
      var distanceInHz = noteAboveFrequency - idealItemFrequency;
      distanceInCents = (frequency - idealItemFrequency) / distanceInHz * 100.0;
    }
     else if (frequency - idealItemFrequency < 0) {
      tuningDirection = -1;
      var distanceInHz_0 = idealItemFrequency - noteBelowFrequency;
      distanceInCents = (idealItemFrequency - frequency) / distanceInHz_0 * 100.0;
    }
    return new Note$Companion$NoteWithDiff(closestNote, closestFrequency, distanceInCents, tuningDirection, frequency);
  };
  Note$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Note$Companion_instance = null;
  function Note$Companion_getInstance() {
    if (Note$Companion_instance === null) {
      new Note$Companion();
    }
    return Note$Companion_instance;
  }
  Note.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Note',
    interfaces: []
  };
  var ALL_NOTES;
  function Metronome() {
    this.downbeatAudioKey = 'downbeatSound';
    this.beatAudioKey = 'beatSound';
    this.audioManager_r62mrl$_0 = this.audioManager_r62mrl$_0;
    this.state_ae2qj7$_0 = TimeKeeper$TimeKeeperState$Stopped_getInstance();
    this.timeSignature = 4;
    this.prerollBeats = 4.0;
    this.currentBeat = 0;
    this.beatTimes = ArrayList_init();
    this.lastBeatOccuredAt = -1.0;
    this.timeoutKeys = ArrayList_init();
  }
  Object.defineProperty(Metronome.prototype, 'audioManager', {
    get: function () {
      if (this.audioManager_r62mrl$_0 == null)
        return throwUPAE('audioManager');
      return this.audioManager_r62mrl$_0;
    },
    set: function (audioManager) {
      this.audioManager_r62mrl$_0 = audioManager;
    }
  });
  Object.defineProperty(Metronome.prototype, 'state', {
    get: function () {
      return this.state_ae2qj7$_0;
    },
    set: function (state) {
      this.state_ae2qj7$_0 = state;
    }
  });
  Metronome.prototype.setup = function () {
    this.audioManager.loadAudioFile_puj7f4$(listenerApp.parameters.url + listenerApp.parameters.audioAssetPath + 'Cowbell.wav', this.downbeatAudioKey);
    this.audioManager.loadAudioFile_puj7f4$(listenerApp.parameters.url + listenerApp.parameters.audioAssetPath + 'Woodblock.wav', this.beatAudioKey);
  };
  Metronome.prototype.start = function () {
    this.state = TimeKeeper$TimeKeeperState$Running_getInstance();
  };
  Metronome.prototype.stop = function () {
    this.state = TimeKeeper$TimeKeeperState$Stopped_getInstance();
  };
  Metronome.prototype.setInitialOffset_14dthe$ = function (offset) {
    var beatSize = 1000.0 * 60.0 / listenerApp.getTempo();
    this.lastBeatOccuredAt = offset - beatSize;
  };
  Metronome.prototype.step_zgkg49$ = function (timestamp, timeKeeper) {
    var beatSize = 1000.0 * 60.0 / listenerApp.getTempo();
    if (timeKeeper.runForTime - timestamp < beatSize / 2) {
      pm_log('Less than beat size..');
      return;
    }
    if (this.lastBeatOccuredAt === -1.0) {
      this.lastBeatOccuredAt = timestamp - beatSize;
    }
    var nextBeatTime = this.lastBeatOccuredAt + beatSize;
    var absoluteBeatPosition = timestamp / beatSize;
    this.updateIndicatorUI_14dthe$(absoluteBeatPosition);
    if (timestamp >= nextBeatTime) {
      if (UserSettings_getInstance().metronomeAudioOn) {
        if (this.currentBeat % this.timeSignature === 0) {
          this.audioManager.playAudioNow_61zpoe$(this.downbeatAudioKey);
        }
         else {
          this.audioManager.playAudioNow_61zpoe$(this.beatAudioKey);
        }
      }
      this.lastBeatOccuredAt = nextBeatTime;
      this.updateMetronomeUI_za3lpa$(this.currentBeat);
      this.currentBeat = this.currentBeat + 1 | 0;
    }
  };
  function Metronome$cancelAllUIUpdates$lambda(it) {
    return true;
  }
  Metronome.prototype.cancelAllUIUpdates = function () {
    var tmp$;
    tmp$ = reversed(this.timeoutKeys).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      pm_log('Cancelling item... ' + element);
      window.clearTimeout(element);
    }
    removeAll(this.timeoutKeys, Metronome$cancelAllUIUpdates$lambda);
  };
  Metronome.prototype.updateIndicatorUI_14dthe$ = function (beat) {
    listenerApp.moveToPosition_14dthe$(beat - this.prerollBeats);
  };
  Metronome.prototype.updateMetronomeUI_za3lpa$ = function (beat) {
    listenerApp.highlightMetronomeItem_za3lpa$(beat % this.timeSignature);
  };
  Metronome.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Metronome',
    interfaces: [TimeKeeperSteppable]
  };
  var buflen;
  function SampleCollection(freq, lengthInSamples, timestampInSamples) {
    this.freq = freq;
    this.lengthInSamples = lengthInSamples;
    this.timestampInSamples = timestampInSamples;
  }
  SampleCollection.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SampleCollection',
    interfaces: []
  };
  SampleCollection.prototype.component1 = function () {
    return this.freq;
  };
  SampleCollection.prototype.component2 = function () {
    return this.lengthInSamples;
  };
  SampleCollection.prototype.component3 = function () {
    return this.timestampInSamples;
  };
  SampleCollection.prototype.copy_mqu1mq$ = function (freq, lengthInSamples, timestampInSamples) {
    return new SampleCollection(freq === void 0 ? this.freq : freq, lengthInSamples === void 0 ? this.lengthInSamples : lengthInSamples, timestampInSamples === void 0 ? this.timestampInSamples : timestampInSamples);
  };
  SampleCollection.prototype.toString = function () {
    return 'SampleCollection(freq=' + Kotlin.toString(this.freq) + (', lengthInSamples=' + Kotlin.toString(this.lengthInSamples)) + (', timestampInSamples=' + Kotlin.toString(this.timestampInSamples)) + ')';
  };
  SampleCollection.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.freq) | 0;
    result = result * 31 + Kotlin.hashCode(this.lengthInSamples) | 0;
    result = result * 31 + Kotlin.hashCode(this.timestampInSamples) | 0;
    return result;
  };
  SampleCollection.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.freq, other.freq) && Kotlin.equals(this.lengthInSamples, other.lengthInSamples) && Kotlin.equals(this.timestampInSamples, other.timestampInSamples)))));
  };
  function PitchTracker() {
    this.sampleRate = 44100.0;
    this.lengthOfPrerollToIgnore = 0.0;
    this.latencyTime = 180;
    this.samples = ArrayList_init();
    this.samplesRecorded = 0;
    this.state_do8ydl$_0 = TimeKeeper$TimeKeeperState$Stopped_getInstance();
  }
  PitchTracker.prototype.setup = function () {
  };
  PitchTracker.prototype.setInitialOffset_14dthe$ = function (offset) {
  };
  PitchTracker.prototype.start = function () {
    this.samplesRecorded = 0;
    this.state = TimeKeeper$TimeKeeperState$Running_getInstance();
  };
  PitchTracker.prototype.stop = function () {
    this.state = TimeKeeper$TimeKeeperState$Stopped_getInstance();
  };
  Object.defineProperty(PitchTracker.prototype, 'state', {
    get: function () {
      return this.state_do8ydl$_0;
    },
    set: function (state) {
      this.state_do8ydl$_0 = state;
    }
  });
  PitchTracker.prototype.step_zgkg49$ = function (timestamp, timeKeeper) {
    var correlatedFrequency = audioAnalyzer.updatePitch(timestamp);
    pm_log('Timestamp: ' + toString(timestamp));
    pm_log('Pitch: ' + toString(correlatedFrequency));
    var lengthOfBuffer = buflen / 2.0;
    this.stepWithFrequency_88ee24$(timestamp, correlatedFrequency, lengthOfBuffer, this.latencyTime);
  };
  PitchTracker.prototype.stepWithFrequency_88ee24$ = function (timestamp, correlatedFrequency, lengthOfBufferInSamples, latencyTime) {
    var timestampOfPitch = timestamp - lengthOfBufferInSamples / this.sampleRate * 1000.0 - latencyTime;
    var timestampAccountingForPreroll = timestampOfPitch - this.lengthOfPrerollToIgnore;
    pm_log('Timestamp accounting for preroll ' + timestampAccountingForPreroll);
    var samplesToFill = lengthOfBufferInSamples - this.samplesRecorded + timestampAccountingForPreroll * 44.1;
    if (samplesToFill < 0) {
      pm_log('Not filling yet...');
      return;
    }
    pm_log('Filling ' + toString(samplesToFill) + (' with ' + correlatedFrequency));
    this.samples.add_11rb$(new SampleCollection(correlatedFrequency, numberToInt(samplesToFill), this.samplesRecorded));
    this.samplesRecorded = this.samplesRecorded + numberToInt(samplesToFill) | 0;
  };
  PitchTracker.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PitchTracker',
    interfaces: [TimeKeeperSteppable]
  };
  function TimeKeeper() {
    this.finishedActions = ArrayList_init();
    this.state_bn5kxc$_0 = TimeKeeper$TimeKeeperState$Stopped_getInstance();
    this.steppables = ArrayList_init();
    this.analyzers = ArrayList_init();
    this.timeOffSet = -1.0;
    this.runForTime = 4100.0;
  }
  function TimeKeeper$TimeKeeperState(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function TimeKeeper$TimeKeeperState_initFields() {
    TimeKeeper$TimeKeeperState_initFields = function () {
    };
    TimeKeeper$TimeKeeperState$Stopped_instance = new TimeKeeper$TimeKeeperState('Stopped', 0);
    TimeKeeper$TimeKeeperState$Running_instance = new TimeKeeper$TimeKeeperState('Running', 1);
    TimeKeeper$TimeKeeperState$Completed_instance = new TimeKeeper$TimeKeeperState('Completed', 2);
  }
  var TimeKeeper$TimeKeeperState$Stopped_instance;
  function TimeKeeper$TimeKeeperState$Stopped_getInstance() {
    TimeKeeper$TimeKeeperState_initFields();
    return TimeKeeper$TimeKeeperState$Stopped_instance;
  }
  var TimeKeeper$TimeKeeperState$Running_instance;
  function TimeKeeper$TimeKeeperState$Running_getInstance() {
    TimeKeeper$TimeKeeperState_initFields();
    return TimeKeeper$TimeKeeperState$Running_instance;
  }
  var TimeKeeper$TimeKeeperState$Completed_instance;
  function TimeKeeper$TimeKeeperState$Completed_getInstance() {
    TimeKeeper$TimeKeeperState_initFields();
    return TimeKeeper$TimeKeeperState$Completed_instance;
  }
  TimeKeeper$TimeKeeperState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TimeKeeperState',
    interfaces: [Enum]
  };
  function TimeKeeper$TimeKeeperState$values() {
    return [TimeKeeper$TimeKeeperState$Stopped_getInstance(), TimeKeeper$TimeKeeperState$Running_getInstance(), TimeKeeper$TimeKeeperState$Completed_getInstance()];
  }
  TimeKeeper$TimeKeeperState.values = TimeKeeper$TimeKeeperState$values;
  function TimeKeeper$TimeKeeperState$valueOf(name) {
    switch (name) {
      case 'Stopped':
        return TimeKeeper$TimeKeeperState$Stopped_getInstance();
      case 'Running':
        return TimeKeeper$TimeKeeperState$Running_getInstance();
      case 'Completed':
        return TimeKeeper$TimeKeeperState$Completed_getInstance();
      default:throwISE('No enum constant com.practicingmusician.steppable.TimeKeeper.TimeKeeperState.' + name);
    }
  }
  TimeKeeper$TimeKeeperState.valueOf_61zpoe$ = TimeKeeper$TimeKeeperState$valueOf;
  Object.defineProperty(TimeKeeper.prototype, 'state', {
    get: function () {
      return this.state_bn5kxc$_0;
    },
    set: function (value) {
      if (value === TimeKeeper$TimeKeeperState$Completed_getInstance()) {
        pm_log('Completed', 10);
        this.state_bn5kxc$_0 = TimeKeeper$TimeKeeperState$Stopped_getInstance();
        var tmp$;
        tmp$ = this.finishedActions.iterator();
        while (tmp$.hasNext()) {
          var element = tmp$.next();
          element(true);
        }
      }
       else {
        this.state_bn5kxc$_0 = value;
      }
    }
  });
  TimeKeeper.prototype.start = function () {
    this.state = TimeKeeper$TimeKeeperState$Running_getInstance();
    var tmp$;
    tmp$ = this.steppables.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.setInitialOffset_14dthe$(0.0);
    }
    this.requestNextStep();
  };
  TimeKeeper.prototype.stop = function () {
    this.state = TimeKeeper$TimeKeeperState$Stopped_getInstance();
    this.timeOffSet = -1.0;
  };
  function TimeKeeper$requestNextStep$lambda(this$TimeKeeper) {
    return function (it) {
      this$TimeKeeper.step_14dthe$(it);
      return Unit;
    };
  }
  TimeKeeper.prototype.requestNextStep = function () {
    window.requestAnimationFrame(TimeKeeper$requestNextStep$lambda(this));
  };
  TimeKeeper.prototype.step_14dthe$ = function (nonOffsetTimestamp) {
    if (this.timeOffSet === -1.0) {
      this.timeOffSet = nonOffsetTimestamp;
    }
    var timestamp = nonOffsetTimestamp - this.timeOffSet;
    pm_log('Calling step at : ' + toString(timestamp) + (' (raw: ' + nonOffsetTimestamp + ')'));
    var tmp$;
    tmp$ = this.steppables.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.state === TimeKeeper$TimeKeeperState$Running_getInstance())
        element.step_zgkg49$(timestamp, this);
    }
    var tmp$_0;
    tmp$_0 = this.analyzers.iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      element_0.analyze_14dthe$(timestamp);
    }
    if (timestamp >= this.runForTime) {
      pm_log('STOPPED ((((((((((((((((((((((((((((((())))))))))))))))))', 9);
      this.state = TimeKeeper$TimeKeeperState$Completed_getInstance();
    }
    if (this.state !== TimeKeeper$TimeKeeperState$Stopped_getInstance())
      this.requestNextStep();
  };
  TimeKeeper.prototype.currentTime = function () {
    return window.performance.now() - this.timeOffSet;
  };
  TimeKeeper.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TimeKeeper',
    interfaces: []
  };
  function TimeKeeperSteppable() {
  }
  TimeKeeperSteppable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'TimeKeeperSteppable',
    interfaces: []
  };
  function TimeKeeperAnalyzer() {
  }
  TimeKeeperAnalyzer.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'TimeKeeperAnalyzer',
    interfaces: []
  };
  function Tuner() {
    this.state_jpo3xx$_0 = TimeKeeper$TimeKeeperState$Stopped_getInstance();
    this.audioAnalyzer_84r3cm$_0 = this.audioAnalyzer_84r3cm$_0;
    this.timekeeper = new TimeKeeper();
    this.timekeeper.steppables.add_11rb$(this);
  }
  Object.defineProperty(Tuner.prototype, 'state', {
    get: function () {
      return this.state_jpo3xx$_0;
    },
    set: function (state) {
      this.state_jpo3xx$_0 = state;
    }
  });
  Object.defineProperty(Tuner.prototype, 'audioAnalyzer', {
    get: function () {
      if (this.audioAnalyzer_84r3cm$_0 == null)
        return throwUPAE('audioAnalyzer');
      return this.audioAnalyzer_84r3cm$_0;
    },
    set: function (audioAnalyzer) {
      this.audioAnalyzer_84r3cm$_0 = audioAnalyzer;
    }
  });
  Tuner.prototype.runTunerTest = function () {
    for (var freq = 380; freq <= 400; freq++) {
      var noteWithDiff = Note$Companion_getInstance().closestNoteWithDiff_14dthe$(freq);
      pm_log('Testing note (' + freq + '): ' + noteWithDiff.note.noteName(), 10);
      pm_log('Diff in hz: ' + toString(noteWithDiff.differenceInFreq), 10);
      pm_log('Diff in cents: ' + toString(noteWithDiff.differenceInCents), 10);
    }
  };
  Tuner.prototype.setup = function () {
  };
  Tuner.prototype.start = function () {
    this.state = TimeKeeper$TimeKeeperState$Running_getInstance();
  };
  Tuner.prototype.stop = function () {
    this.state = TimeKeeper$TimeKeeperState$Stopped_getInstance();
  };
  Tuner.prototype.step_zgkg49$ = function (timestamp, timeKeeper) {
    var tmp$;
    var correlatedFrequency = this.audioAnalyzer.updatePitch(timestamp);
    if (equals(correlatedFrequency, undefined)) {
      return;
    }
    var noteWithDiff = Note$Companion_getInstance().closestNoteWithDiff_14dthe$(correlatedFrequency);
    var tunerString = {v: ''};
    var it = noteWithDiff.note.noteName();
    if (!equals(it, 'NaN')) {
      if (noteWithDiff.tuningDirection === 1) {
        placeTuner(numberToInt(noteWithDiff.differenceInCents));
      }
       else {
        placeTuner(0 - numberToInt(noteWithDiff.differenceInCents) | 0);
      }
      tunerString.v = it;
    }
     else {
      placeTuner(0);
    }
    (tmp$ = window.document.getElementById('tuner_note_label')) != null ? (tmp$.innerHTML = tunerString.v) : null;
  };
  Tuner.prototype.run = function () {
    this.start();
    this.timekeeper.runForTime = kotlin_js_internal_DoubleCompanionObject.MAX_VALUE;
    this.timekeeper.start();
  };
  Tuner.prototype.setInitialOffset_14dthe$ = function (offset) {
  };
  Tuner.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Tuner',
    interfaces: [TimeKeeperSteppable]
  };
  function main(args) {
  }
  var package$com = _.com || (_.com = {});
  var package$practicingmusician = package$com.practicingmusician || (package$com.practicingmusician = {});
  package$practicingmusician.ListenerApp = ListenerApp;
  package$practicingmusician.DialogParams = DialogParams;
  package$practicingmusician.FlashMessage = FlashMessage;
  package$practicingmusician.ConverterOutput = ConverterOutput;
  package$practicingmusician.ComparisonFlags = ComparisonFlags;
  package$practicingmusician.AppPreferences = AppPreferences;
  package$practicingmusician.AppSetupParameters = AppSetupParameters;
  package$practicingmusician.AudioAnalyzer = AudioAnalyzer;
  package$practicingmusician.EasyScoreCode = EasyScoreCode;
  package$practicingmusician.SimpleJSNoteObject = SimpleJSNoteObject;
  package$practicingmusician.BeatPosition = BeatPosition;
  package$practicingmusician.MinimumSizes = MinimumSizes;
  package$practicingmusician.FactorWeights = FactorWeights;
  package$practicingmusician.CorrectLevels = CorrectLevels;
  package$practicingmusician.Tolerances = Tolerances;
  Object.defineProperty(TunerModes, 'TUNER', {
    get: TunerModes$TUNER_getInstance
  });
  Object.defineProperty(TunerModes, 'STOPWATCH', {
    get: TunerModes$STOPWATCH_getInstance
  });
  package$practicingmusician.TunerModes = TunerModes;
  package$practicingmusician.TunerParameters = TunerParameters;
  package$practicingmusician.PMTuner = PMTuner;
  Object.defineProperty(package$practicingmusician, 'UserSettings', {
    get: UserSettings_getInstance
  });
  var package$audio = package$practicingmusician.audio || (package$practicingmusician.audio = {});
  package$audio.AudioManager = AudioManager;
  var package$exercises = package$practicingmusician.exercises || (package$practicingmusician.exercises = {});
  package$exercises.ExerciseDefinition = ExerciseDefinition;
  package$exercises.ExerciseManager = ExerciseManager;
  var package$finals = package$practicingmusician.finals || (package$practicingmusician.finals = {});
  package$finals.FeedbackMetric = FeedbackMetric;
  Object.defineProperty(FeedbackType, 'Correct', {
    get: FeedbackType$Correct_getInstance
  });
  Object.defineProperty(FeedbackType, 'Incorrect', {
    get: FeedbackType$Incorrect_getInstance
  });
  Object.defineProperty(FeedbackType, 'Missed', {
    get: FeedbackType$Missed_getInstance
  });
  package$finals.FeedbackType = FeedbackType;
  package$finals.FeedbackItem = FeedbackItem;
  package$finals.CompareResults = CompareResults;
  package$finals.generateResultForDatabase_gyilvf$ = generateResultForDatabase;
  package$finals.ToleranceLevels = ToleranceLevels;
  package$finals.ResultsForDatabase = ResultsForDatabase;
  package$finals.IndividualNotePerformanceInfo = IndividualNotePerformanceInfo;
  package$finals.NotePlacement = NotePlacement;
  package$finals.IncrementalBufferManager = IncrementalBufferManager;
  package$finals.IncrementalComparisonEngine = IncrementalComparisonEngine;
  var package$network = package$practicingmusician.network || (package$practicingmusician.network = {});
  Object.defineProperty(package$network, 'ListenerNetworkManager', {
    get: ListenerNetworkManager_getInstance
  });
  package$network.PerformanceWrapper = PerformanceWrapper;
  Note$Companion.prototype.NoteWithDiff = Note$Companion$NoteWithDiff;
  Object.defineProperty(Note, 'Companion', {
    get: Note$Companion_getInstance
  });
  var package$notes = package$practicingmusician.notes || (package$practicingmusician.notes = {});
  package$notes.Note = Note;
  Object.defineProperty(package$notes, 'ALL_NOTES', {
    get: function () {
      return ALL_NOTES;
    },
    set: function (value) {
      ALL_NOTES = value;
    }
  });
  var package$steppable = package$practicingmusician.steppable || (package$practicingmusician.steppable = {});
  package$steppable.Metronome = Metronome;
  Object.defineProperty(package$steppable, 'buflen', {
    get: function () {
      return buflen;
    },
    set: function (value) {
      buflen = value;
    }
  });
  package$steppable.SampleCollection = SampleCollection;
  package$steppable.PitchTracker = PitchTracker;
  Object.defineProperty(TimeKeeper$TimeKeeperState, 'Stopped', {
    get: TimeKeeper$TimeKeeperState$Stopped_getInstance
  });
  Object.defineProperty(TimeKeeper$TimeKeeperState, 'Running', {
    get: TimeKeeper$TimeKeeperState$Running_getInstance
  });
  Object.defineProperty(TimeKeeper$TimeKeeperState, 'Completed', {
    get: TimeKeeper$TimeKeeperState$Completed_getInstance
  });
  TimeKeeper.TimeKeeperState = TimeKeeper$TimeKeeperState;
  package$steppable.TimeKeeper = TimeKeeper;
  package$steppable.TimeKeeperSteppable = TimeKeeperSteppable;
  package$steppable.TimeKeeperAnalyzer = TimeKeeperAnalyzer;
  package$practicingmusician.Tuner = Tuner;
  _.main_kand9s$ = main;
  ALL_NOTES = ArrayList_init();
  buflen = 1024;
  main([]);
  Kotlin.defineModule('PracticingMusician', _);
  return _;
}(typeof PracticingMusician === 'undefined' ? {} : PracticingMusician, kotlin);
