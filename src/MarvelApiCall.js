import $ from 'jquery';

var CryptoJS = require("crypto-js");

// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "288eae268b3e607de16bfa7da9897853ca4bea0c";
var PUBLIC_KEY = "c92750c0b3658afe9b399abdcb57a904";

 const GetMarvelResponse = (characterId, elementIdToUpdate) => {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  // the api deals a lot in ids rather than just the strings you want to use
  //var characterId = '1009220'; // capt amer                                                                             

  var url = 'https://gateway.marvel.com/v1/public/characters';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    id: characterId
    })
    .done(function(data) {
      // sort of a long dump you will need to sort through
      console.log(data);
    
      document.getElementById(elementIdToUpdate).src = data.data.results[0].thumbnail.path + "/standard_fantastic." + data.data.results[0].thumbnail.extension;
      document.getElementById("BadguyName").innerText = data.data.results[0].name;
    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
};

export default GetMarvelResponse;