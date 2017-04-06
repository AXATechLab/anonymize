
var fs = require('fs');

var DICTIONARIES = {};


var DATA_VAULT = {};


function removePersonalData(text, language) {
  var rules = DICTIONARIES[language.toLowerCase()];
  var data = {};
  for (var i = 0; rules && i < rules.length; ++i) {
    var rule = rules[i];
    if (rule.type == 'list') {
      for (var j = 0; j < rule.data.length; ++j) {
        var text2 = text.toLowerCase().replace(/[\ \.\,\?\;\!\)\(]/g, " ") + " ";
        while (text2.indexOf(" " + rule.data[j] + " ") > -1) {
          var start = text2.indexOf(" " + rule.data[j] + " ");
          var len = rule.data[j].length;
          var value = text.substring(start + 1, start + len + 1);
          var key = rule.name + '_' + (Math.random() * 100000 | 0);
          data[key] = value;
          text = text.substring(0, start + 1) + key  + text.substring(start + len + 1);
          text2 = text.toLowerCase().replace(/[\ \.\,\?\;\!\)\(]/g, " ") + " ";
        }
      }
    }
    if (rule.type == 'regexp') {
      var matches = text.match(rule.data);
      
      for (var j =0;matches && j < matches.length; ++j) {
        var key = rule.name + '_' + (Math.random() * 100000 | 0);
        data[key] = matches[j];
        text = text.replace(matches[j], key);
      }

    }
  }

  return {
    text: text,
    data : data
  }
}

function restorePersonalData(text, data) {
  for (var key in data) {
    text = text.replace(key, data[key]);
  }
  return text;
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


module.exports = {
  removePersonalData,
  restorePersonalData
}

function laodDictionaries() {
  var languages = fs.readdirSync(__dirname + "/dictionary");

  for (var i = 0; i < languages.length; ++i) {
    var dictionary = [];

    var wordLists = fs.readdirSync(__dirname + "/dictionary/" +languages[i])

    for (var j = 0; j < wordLists.length; ++j) {
      var data = fs.readFileSync(__dirname + "/dictionary/" + languages[i] + "/" + wordLists[j], 'utf8');
      var item = {
        name : wordLists[j].split('.')[0],
        type : wordLists[j].split('.')[1]
      }

      if (item.type == 'list') {
        item.data = data.toLowerCase().split('\n');
      }
      if (item.type == 'regexp') {
        item.data = new RegExp(data, 'ig');
      }
      dictionary.push(item);
    }

    DICTIONARIES[languages[i].toLowerCase()] = dictionary;
  }

}

laodDictionaries();