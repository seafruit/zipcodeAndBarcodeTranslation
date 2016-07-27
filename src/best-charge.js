let allItem = require('./items');
let _ = require('lodash');

function checkDigitalFormat(digital){
  let hasHypken = digital.includes('-')&&digital.indexOf('-')===digital.lastIndexOf('-');
  let isNumber = /^[0-9]*$/.test(digital.replace('-',''));
  if((hasHypken && digital.length===10 && isNumber)||(isNumber &&(digital.length===5||digital.length===9))){
    return {digital,type:true}
  }
    return {digital,type:false}
}
function dropHypken(digital){
  return digital.replace('-','');
}
function digtialIntoArray(formatedDigital){
  return formatedDigital.split('').map((item)=>+item)
}
function calculateCheckCode(digitalArray){
  let sum = _.sum(digitalArray);
  let checkCode = sum%10==0?0:10-sum%10;
  digitalArray.push(checkCode);
  return digitalArray
}
function matchBarcode(digitalAndCheckCode,allItems){
  return digitalAndCheckCode.map((digitalItem)=>{
    let found=allItems.find((item)=>item.digital===digitalItem);
    return found.barcode
  })
}
function addStartAndEnd(barcodes){
  return '|'+barcodes.join('')+'|'
}
function digitalToBarcode(digital){
  let returnInformation=checkDigitalFormat(digital);
  if(returnInformation.type===true){
    let allItems=allItem();
    let formattedDigital=dropHypken(digital);
    let digitalArray = digtialIntoArray(formattedDigital);
    let digitalAndCheckCode = calculateCheckCode(digitalArray);
    let barcodes=matchBarcode(digitalAndCheckCode,allItems);
    let barcodeString=addStartAndEnd(barcodes);
    return {barcode:barcodeString,type:true}
  }
    return returnInformation
}

function formattedBarcode(input){
  return input.substring(1,input.length-1);
}
function barcodeIntoArrar(formattedBarcode){
  return _.words(formattedBarcode,/.{5}/g);
}
function matchDigital(barcodeArrar,allItems){
  return barcodeArrar.map((barcode)=>{
    let found=allItems.find((item)=>item.barcode===barcode);
    return found.digital
  })
}
function isTrueCheckCode(digitals){
  return _.sum(digitals)%10===0
}
function addHypken(digital){
  if(digital.length===9){
    digital.splice(5,0,'-');
  }
  return digital.join('');
}
function checkBarcodeFormat(input){
  let startAndEnd=_.endsWith(input, '|')&&input.indexOf('|')===0;
  if(startAndEnd && input.length===32||input.length===52) {
    let barcode = input.substring(1, input.length - 1);
    let barcodeArray = barcodeIntoArrar(barcode);
    let exit = true;
    for (let item of barcodeArray) {
      if (item.match(/\|/g).length !== 2 && item.match(/:/g).length !== 3) {
        exit = false;
      }
    }
    if (exit) {
      return {barcode: input, type: true}
    }
    return {barcode: input, type: false}
  }else{
    return {barcode: input, type: false}
  }
}
function tanslateBarcode(input){
  let allItems=allItem();
  let isFormattedBarcode=checkBarcodeFormat(input);
  console.log(isFormattedBarcode);
  if(isFormattedBarcode.type){
    // debugger;
    let formatBarcode=formattedBarcode(input);
    let barcodeArray=barcodeIntoArrar(formatBarcode);
    let digitals=matchDigital(barcodeArray,allItems);
    let isRight=isTrueCheckCode(digitals);
    if(!isRight) return false
    let digital=addHypken(digitals);
    return {digital,type:true}
  }else{
    return isFormattedBarcode
  }
}
module.exports={
  checkDigitalFormat,
  calculateCheckCode,
  dropHypken,
  digtialIntoArray,
  tanslateBarcode,
  matchBarcode,
  addStartAndEnd,
  digitalToBarcode,
  formattedBarcode,
  barcodeIntoArrar,
  matchDigital,
  isTrueCheckCode,
  addHypken,
  checkBarcodeFormat
};
