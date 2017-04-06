# Anonymize
 A tool to anonymize personal data. This is usefull when you want to send your data to an external services (like api.ai) without exposing your user true data.
 
 # Installation

```
 npm install anonymize-personal-data --save
```

# Example of Usage
```javascript
var Anonymize = require('anonymize-personal-data');
 
var anonymizedData = 
  Anonymize.removePersonalData("Je vais a Paris ce weekend et mon email est foo@bar.com", "fr");
 
var unAnoymizedData = Anonymize.restorePersonalData(anonymizedData.text, anonymizedData.data);
 
console.log(anonymizedData, unAnoymizedData);

```

# Reference

This module contain 2 methods :

## removePersonalData

This method take a string in entry and a local and return an object with a text field containing an anonymized string
```javascript
var data =  Anonymize.removePersonalData("STRING", "local");
console.log(data)
```

## restorePersonalData

This method allow for easy de-anonynization of a string.
```javascript
var originalString = Anonymize.restorePersonalData(anoymizedData.text, anoymizedData.data);
```

# Language support

For now the tool support the local 'fr' (France) with the following data :
- All French name and lastname according to insee
- All French City name
- All French zipcode
- All French Phone number
- All email address

# Extending to more language / type of data

To add a new local, create a new directory in dictionary named with local name. Then add in this directory some list or regexp file.
List files are list of keyword to replace, separate by a \n (ex : city name).
Regexp files contain a regexp matching a data you want to replace (ex : email address)
