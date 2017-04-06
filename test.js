var Anonymize = require('./anonymize.js');

var anoymizedData = 
  Anonymize.removePersonalData("Je vais visiter Massongy ce weekend, puis j'irais a paris, et mon 06 est 0670464711 ou 0033 4 50 36 54 88 ou 0540145458", "fr");

var unAnoymizedData = Anonymize.restorePersonalData(anoymizedData.text, anoymizedData.data);

console.log(annoymizedData, restored);