/**
 * Created by yoyo on 16-7-27.
 */
let {
  mainCommand,
  inputDigitalCommand,
  inputBarcodeCommand,
  exitCommand,
  otherInputCommand
} = require('../src/command');

let mapping = {
  '1':inputDigitalCommand,
  '2':inputBarcodeCommand,
  '3':exitCommand,
  'main':mainCommand
};
function route(input){
  let command = mapping[input];
  let result = '';
  let response;
  if(command){
    response = command(input);
    result += response.text;
  }else if(mapping['*']){
    response=mapping['*'](input);
    result += response.text;
  }else{
    return 'no command';
  }

  if(response.next){
    let newResponse={};
    do{
      newResponse = response.next();
      result+=newResponse.text;
    }while(newResponse.next);
  }

  if(response.reset){
    reset();
  }
  if(response.newMapping){
    mapping = response.newMapping;
  }
  return result;
}


let reset = function(){
  mapping = {
    '1':inputDigitalCommand,
    '2':inputBarcodeCommand,
    '3':exitCommand,
    'main':mainCommand
  }
};

module.exports = {route,reset};
