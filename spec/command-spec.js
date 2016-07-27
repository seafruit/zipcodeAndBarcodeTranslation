/**
 * Created by yoyo on 16-7-26.
 */

let allCommand = require('../src/command');

describe('Take out food', function () {

  it('mainCommand',function(){
    let result = allCommand.mainCommand('main');
    expect(result).toEqual({text:`1. Translate zip code to bar code
    2. Translate bar code to zip code
    3. Quit
    Please input your choices(1~3)`});
  });

  it('inputDigitalCommand',function(){
    let result = allCommand.inputDigitalCommand('1');
    let expetItem ={
      text:'Please input zip code:',
      newMapping:{'*':allCommand.transDigitalCommand}
    };
    expect(result).toEqual(expetItem);
  });
  it('transRightDigitalCommand',function(){
    let input = '12345';
    let result = allCommand.transDigitalCommand(input);
    let expetItem ={
      text:'the barcode is :'+'|:::||::|:|::||::|::|:|:|::|:|:|',
      next:null,
      reset:true
    };
    expect(result).toEqual(expetItem);
  });
  it('transWrongDigitalCommand',function(){
    let input = '1234555';
    let result = allCommand.transDigitalCommand(input);
    let expetItem ={
      text:'Please give right input',
      next: allCommand.inputDigitalCommand,
      reset: false
    };
    expect(result).toEqual(expetItem);
  });


  it('inputBarcodeCommand',function(){
    let result = allCommand.inputBarcodeCommand('2');
    let expetItem ={
      text: 'Please input bar code:',
      newMapping: {'*': allCommand.transBarcodeCommand}
    };
    expect(result).toEqual(expetItem);
  });
  it('transRightBarcode',function(){
    let input = '|:::||::|:|::||::|::|:|:|::|:|:|';
    let result = allCommand.transBarcodeCommand(input);
    let expetItem = {
      text: 'the zipcode is :'+'123455',
      next: null,
      reset:true
    };
    expect(result).toEqual(expetItem);
  });
  it('transWrongBarcode',function(){
    let input = '|:::|:|::||::|::|:|:|::|:|:|';
    let result = allCommand.transBarcodeCommand(input);
    let expetItem = {
      text: 'Please give right input',
      next: allCommand.inputBarcodeCommand,
      reset:false
    };
    expect(result).toEqual(expetItem);
  });

  it('otherInput',function() {
    let result = allCommand.otherInputCommand('other');
    let expectItem = {
      text: 'byebye',
      next: allCommand.mainCommand,
      reset: true
    };
    expect(result).toEqual(expectItem);
  });
});
