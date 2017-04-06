var Anonymize = require('./anonymize.js');

var anonymizedData =  Anonymize.removePersonalData("Je vais a Lyon ce weekend et mon email est foo@bar.com", "fr");
 
var unAnoymizedData = Anonymize.restorePersonalData(anonymizedData.text, anonymizedData.data);
 
console.log(anonymizedData, unAnoymizedData);
