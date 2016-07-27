/**
 * Created by yoyo on 16-7-26.
 */
let translate = require('./best-charge');
// let translateBarcode = require('../src/best-charge.js/tanslateBarcode');


function mainCommand(input){
  return {text:`1. Translate zip code to bar code
    2. Translate bar code to zip code
    3. Quit
    Please input your choices(1~3)`}
}

function inputDigitalCommand(input){
  return {
    text:'Please input zip code:',
    newMapping:{'*':transDigitalCommand}
  }
}
function transDigitalCommand(input){
  let text = translate.digitalToBarcode(input);
  if(text.type) {
    return {
      text:'the barcode is :'+text.barcode,
      next: null,
      reset: true
    }
  }else{
    return {
      text:'Please give right input',
      next: inputDigitalCommand,
      reset: false
    }
  }
}

function inputBarcodeCommand(input) {
  return {
    text: 'Please input bar code:',
    newMapping: {'*': transBarcodeCommand}
  }
}
function transBarcodeCommand(input) {
  let text = translate.tanslateBarcode(input);
  if(text.type){
    return {
      text: 'the zipcode is :'+text.digital,
      next: null,
      reset:true
    }
  }else{
    return {
      text: 'Please give right input',
      next: inputBarcodeCommand,
      reset:false
    }
  }
}

function exitCommand(input){
  return {
    text:'byebye',
    next:null,
  }
}
function otherInputCommand(input){
  return {
    text:'byebye',
    next:mainCommand,
    reset:true
  }
}
module.exports={
  mainCommand,
  inputDigitalCommand,
  transDigitalCommand,
  inputBarcodeCommand,
  transBarcodeCommand,
  exitCommand,
  otherInputCommand
};
