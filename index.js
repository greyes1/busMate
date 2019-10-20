//updated code
'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

//Import XMLRequest
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

//Cannot make external calls, as I don't have a paid plan 

/*
function compareDir(comp){
  	let res;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
		return true;
        //res = xhttp.responseXML;
      }
    };
    xhttp.open("GET", "http://ctabustracker.com/bustime/api/v2/getdirections?key=2v6eeKdRybxdXdNrwp4kfvuzn&rt=35", true);
    xhttp.send();
  return xhttp.readyState;
  
  
  //if(res != null){
  //  return true;
	
    //bustime-response
    let currDir = res.getElementsByTagName("bustime-response");
    if(currDir[0].getElementsbyTagName("dir") == comp){
       return comp;
    }else if(currDir[1].getElementsbyTagName("dir") == comp){
      return comp;
    }else{
      //error
      return false;
    }
  //}
}
*/

// The intent collects a parameter named 'bus_number'.
let num;
let comp;
let dir;
app.intent('choose_bus_route', (conv, {bus_number}) => {
  	num = bus_number;
    //conv.add("Your bus is coming in" + minutes + "minutes");

	//List the user's bus number
    conv.add('First call: Your bus number is ' + num);
    conv.ask('Goin in which direction?');
});

app.intent('choose_bus_route - custom', (conv, {direction}) => {
  	comp = direction;
    //conv.add('Compare begins');
  	//Cannot compare against real stops
    /*
    if(compareDir(comp) == true){
       conv.add('Compare succesful');
    }*/
  
  //conv.add();
    
  //conv.add('Your bus number is ' + num);
  conv.close('Your bus direction is headed' + comp);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);