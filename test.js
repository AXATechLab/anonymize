var Shield = require('./anonymize.js');

var anon = Shield.removePersonalData("Je vais visiter Massongy ce weekend, puis j'irais a paris, et mon 06 est 0670464711 ou 0033 4 50 36 54 88 ou 0540145458", "fr");

var restored = Shield.restorePersonalData(anon.text, anon.data);

console.log(anon, restored);