/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

var Alexa   = require('alexa-sdk');
var APP_ID  = process.env.APP_ID;

var languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'math championship',
            START_MSG: 'Welcome to math championship. Let us play tables game. I will ask you multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score.',
            HELP_MSG: 'Math championship is a simple quiz about multiplication tables. You can say, begin a quiz, and I will ask you ten multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score. Apart from this, you can also start a quiz for certain tables, for example you can say, ask me table of four, and i will ask you table of four. And finally, if you want to learn a table first, you can say, Tell me table of six, and then i will read aloud table of four for you.',
            STOP_MSG: 'Goodbye!',
            REPROMPT: 'Okay, what would you like to do? For example, say begin a quiz to start playing.',
            WINNING_MSG: [
              'Wow!',
              'That is great!',
              'Outstanding!',
              'Brilliant!',
              'Rocking!',
              'Correct!',
              'Awesome!',
              'Genius!',
            ],
            LOOSING_MSG: [
              'Wrong!',
              'It could be better!',
              'Well, nope!',
              'Nope!',
              'Try little harder next time!',
            ],
            BEFORE_START:'Great. Lets begin!',
            ENDGAME_MSG: 'Thank you.'
        },
    },
    'en-GB': {
        translation: {
            SKILL_NAME: 'math championship',
            START_MSG: 'Welcome to math championship. Let us play tables game. I will ask you multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score.',
            HELP_MSG: 'Math championship is a simple quiz about multiplication tables. You can say, begin a quiz, and I will ask you ten multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score. Apart from this, you can also start a quiz for certain tables, for example you can say, ask me table of four, and i will ask you table of four. And finally, if you want to learn a table first, you can say, Tell me table of six, and then i will read aloud table of four for you.',
            STOP_MSG: 'Goodbye!',
            REPROMPT: 'Okay, what would you like to do? For example, say begin a quiz to start playing.',
            WINNING_MSG: [
              'Wow!',
              'That is great!',
              'Outstanding!',
              'Brilliant!',
              'Rocking!',
              'Correct!',
              'Awesome!',
              'Genius!',
            ],
            LOOSING_MSG: [
              'Wrong!',
              'It could be better!',
              'Well, nope!',
              'Nope!',
              'Try little harder next time!',
            ],
            BEFORE_START:'Great. Lets begin!',
            ENDGAME_MSG: 'Thank you.'
        },
    },
    'en-CA': {
        translation: {
            SKILL_NAME: 'math championship',
            START_MSG: 'Welcome to math championship. Let us play tables game. I will ask you multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score.',
            HELP_MSG: 'Math championship is a simple quiz about multiplication tables. You can say, begin a quiz, and I will ask you ten multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score. Apart from this, you can also start a quiz for certain tables, for example you can say, ask me table of four, and i will ask you table of four. And finally, if you want to learn a table first, you can say, Tell me table of six, and then i will read aloud table of four for you.',
            STOP_MSG: 'Goodbye!',
            REPROMPT: 'Okay, what would you like to do? For example, say begin a quiz to start playing.',
            WINNING_MSG: [
              'Wow!',
              'That is great!',
              'Outstanding!',
              'Brilliant!',
              'Rocking!',
              'Correct!',
              'Awesome!',
              'Genius!',
            ],
            LOOSING_MSG: [
              'Wrong!',
              'It could be better!',
              'Well, nope!',
              'Nope!',
              'Try little harder next time!',
            ],
            BEFORE_START:'Great. Lets begin!',
            ENDGAME_MSG: 'Thank you.'
        },
    },
    'en-In': {
        translation: {
            SKILL_NAME: 'math championship',
            START_MSG: 'Welcome to math championship. Let us play tables game. I will ask you multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score.',
            HELP_MSG: 'Math championship is a simple quiz about multiplication tables. You can say, begin a quiz, and I will ask you ten multiplication questions. For example, i will ask you what is three into two. You can say, it is six. At the end of a quiz, i will tell you your score. Apart from this, you can also start a quiz for certain tables, for example you can say, ask me table of four, and i will ask you table of four. And finally, if you want to learn a table first, you can say, Tell me table of six, and then i will read aloud table of four for you.',
            STOP_MSG: 'Goodbye!',
            REPROMPT: 'Okay, what would you like to do? For example, say begin a quiz to start playing.',
            WINNING_MSG: [
              'Wow!',
              'That is great!',
              'Outstanding!',
              'Brilliant!',
              'Rocking!',
              'Correct!',
              'Awesome!',
              'Genius!',
            ],
            LOOSING_MSG: [
              'Wrong!',
              'It could be better!',
              'Well, nope!',
              'Nope!',
              'Try little harder next time!',
            ],
            BEFORE_START:'Great. Lets begin!',
            ENDGAME_MSG: 'Thank you.'
        },
    }
};

var GAME_MODE = [
  { name: 'normal' },
  { name: 'range', start: 2, end: 20 },
  { name: 'table', table: 2}
];

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', this.t('HELP_MSG'), this.t('REPROMPT'));
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t('HELP_MSG'), this.t('REPROMPT'));
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MSG'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MSG'));
    },
    'BeginGame': function () {
        var tempGameMode = GAME_MODE[0];

        this.attributes["GAME_MODE"] = tempGameMode;
        this.attributes["QUE_ASKED_COUNT"] = 0;
        this.attributes["INCORRECT_COUNT"] = 0;
        this.attributes["ASKED"] = [];
        

        return toDo(this.attributes, this.emit, this.t);
    },
    'BeginGameRange': function () { 
        var NumStart = this.event.request.intent.slots.NumStart.value;
        var NumEnd = this.event.request.intent.slots.NumEnd.value;

        var tempGameMode = GAME_MODE[1];
        tempGameMode.start = NumStart;
        tempGameMode.end = NumEnd;

        this.attributes["GAME_MODE"] = tempGameMode;
        this.attributes["QUE_ASKED_COUNT"] = 0;
        this.attributes["INCORRECT_COUNT"] = 0;
        this.attributes["ASKED"] = [];

        return toDo(this.attributes, this.emit, this.t);
    },
    'BeginGameTable': function () {
        var Num = this.event.request.intent.slots.Num.value;
        
        var tempGameMode = GAME_MODE[2];
        tempGameMode.table = Num;

        this.attributes["GAME_MODE"] = tempGameMode;
        this.attributes["QUE_ASKED_COUNT"] = 0;
        this.attributes["INCORRECT_COUNT"] = 0;
        this.attributes["ASKED"] = [];

        return toDo(this.attributes, this.emit, this.t);
    },
    'Ans': function () { 
        try{
            var Num = this.event.request.intent.slots.Num.value;
            //console.log(Num)
            if(Num == undefined || Num == null)
                throw 'Slot empty'
            if(Num == '')
                throw 'Slot empty'

            var aa = Num.toString();
            var bb = this.attributes["ANS"].ans.toString();

            var prependResponse = '';

            this.attributes["QUE_ASKED_COUNT"] = this.attributes["QUE_ASKED_COUNT"] + 1;
            
            
            if(aa == bb) {
                prependResponse = this.t('WINNING_MSG')[Math.floor(Math.random()*this.t('WINNING_MSG').length)] + ' ';
            } 
            else {
              console.log(this.attributes["ANS"]);
                
                this.attributes["INCORRECT_COUNT"] = this.attributes["INCORRECT_COUNT"] + 1;
                prependResponse = this.t('LOOSING_MSG')[Math.floor(Math.random()*this.t('LOOSING_MSG').length)] + ' ' + this.attributes["ANS"].a.toString() +' into ' + this.attributes["ANS"].b.toString() + ' is ' + this.attributes["ANS"].ans.toString() + '. ';
            }
            //this.event.response
            return toDo(this.attributes, this.emit, this.t, prependResponse,this.event.response);
        }
        catch(e){

            this.emit(':ask', "I expect a number, try again, "+this.attributes["CURR_QUE"]);
        }    
    },
    'TellTable': function () { 
        var Num = this.event.request.intent.slots.Num.value;

        Num = parseInt(Num);

        var response = 'Ok, let us study the table of ' + Num.toString() + '. ' +
        Num.toString() + ' into one is '    + (Num*1).toString() + '. ' +
        Num.toString() + ' into two is '    + (Num*2).toString() + '. ' + 
        Num.toString() + ' into three is '  + (Num*3).toString() + '. ' +
        Num.toString() + ' into four is '   + (Num*4).toString() + '. ' +
        Num.toString() + ' into five is '   + (Num*5).toString() + '. ' +
        Num.toString() + ' into six is '    + (Num*6).toString() + '. ' +
        Num.toString() + ' into seven is '  + (Num*7).toString() + '. ' + 
        Num.toString() + ' into eight is '  + (Num*8).toString() + '. ' + 
        Num.toString() + ' into nine is '   + (Num*9).toString() + '. ' + 
        Num.toString() + ' into ten is '    + (Num*10).toString() + '. ';
        
        this.emit(':tell', response);
    },
};



var toDo = function(_attributeObj, _emit, _t, _prependResponse='', _response){
    var GAME_MODE       = _attributeObj["GAME_MODE"];
    var QUE_ASKED_COUNT = _attributeObj["QUE_ASKED_COUNT"];
    var INCORRECT_COUNT = _attributeObj["INCORRECT_COUNT"];

    if(QUE_ASKED_COUNT == 0){
      _prependResponse = 'Great. Lets begin! '
    }

    if(QUE_ASKED_COUNT == 10) {
        //summarize
        //return _emit(':ask',  _t('SUMMARIZE')(INCORRECT_COUNT))
        //
        //response
        _emit(':tell', _prependResponse + "Your score is " + ((10-INCORRECT_COUNT)*10).toString())
        return _response.shouldEndSession(true);
        
    }
    else {
        var a = 1, 
            b = 1;
        
        if(GAME_MODE.name == 'normal') {
          a = getRandomInt(2,10); //Math.floor(Math.random() * 10) + 2;
          b = getRandomInt(2,10); //Math.floor(Math.random() * 10) + 2;
          
          while(_attributeObj["ASKED"].indexOf(a.toString()+'_'+b.toString()) != -1){
            a = getRandomInt(2,10);
            b = getRandomInt(2,10);
          }
          
        }
        else if(GAME_MODE.name == 'range') {
          a = getRandomInt(GAME_MODE.start, GAME_MODE.end); //Math.floor(Math.random() * GAME_MODE.end) + GAME_MODE.start;
          b = getRandomInt(GAME_MODE.start, GAME_MODE.end); //Math.floor(Math.random() * GAME_MODE.end) + GAME_MODE.start;
          
          while(_attributeObj["ASKED"].indexOf(a.toString()+'_'+b.toString()) != -1){
            a = getRandomInt(GAME_MODE.start, GAME_MODE.end);
            b = getRandomInt(GAME_MODE.start, GAME_MODE.end);
          }
          
        }
        else if(GAME_MODE.name == 'table') {
          a = QUE_ASKED_COUNT + 1;
          b = GAME_MODE.table;
        }

        _attributeObj["ANS"] = {a:a, b:b, ans:a*b};
        _attributeObj["ASKED"].push(a.toString()+'_'+b.toString())
        
          
        //var response = _prependResponse + _t('QUESTION')(a,b); 
        //"What is "+_a+" into "+_b;

        var que = "What is "+a.toString()+" into "+b.toString();
        _attributeObj["CURR_QUE"] = que
        var response = _prependResponse + que;
        return _emit(':ask', response);
    }
};

var getRandomInt = function (_startInclusive, _endInclusive) {
    return Math.floor(Math.random() * _endInclusive) + _startInclusive;
};

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
