let allItem = require('../src/items');
let promotions = require('../src/promotions');
let allCharge = require('../src/best-charge');
describe('Take out food', function () {
  it ('checkDigitalFormat',function(){
    let input = '12345';
    let result = allCharge.checkDigitalFormat(input);
    let expectItem ={digital:'12345',type: true};
    expect(result).toEqual(expectItem);
  });
  it ('checkDigitalFormat',function(){
    let input = '123456789';
    let result = allCharge.checkDigitalFormat(input);
    let expectItem ={digital:'123456789',type: true};
    expect(result).toEqual(expectItem);
  });
  it ('checkDigitalFormat',function(){
    let input = '12345-6789';
    let result = allCharge.checkDigitalFormat(input);
    let expectItem ={digital:'12345-6789',type: true};
    expect(result).toEqual(expectItem);
  });
  it ('checkDigitalFormat',function(){
    let input = 'shdui2839-23';
    let result = allCharge.checkDigitalFormat(input);
    let expectItem ={digital:'shdui2839-23',type: false};
    expect(result).toEqual(expectItem);
  });

  it('dropHypken',function(){
    let input = '12345-6789';
    let result = allCharge.dropHypken(input);
    let expectItem = '123456789';
    expect(result).toEqual(expectItem);
  });
  it('digtialIntoArray',function(){
    let input = '123456789';
    let result = allCharge.digtialIntoArray(input);
    let expectItem = [1,2,3,4,5,6,7,8,9];
    expect(result).toEqual(expectItem);
  });
  it('calculateCheckCode',function(){
    let input = [1,2,3,4,5];
    let result = allCharge.calculateCheckCode(input);
    let expectItem = [1,2,3,4,5,5];
    expect(result).toEqual(expectItem);
  });
  it('matchBarcode',function(){
    let input = [1,2,3,4,5,5];
    let allItems=allItem();
    let result = allCharge.matchBarcode(input,allItems);
    let expectItem = [':::||','::|:|','::||:',':|::|',':|:|:',':|:|:'];
    expect(result).toEqual(expectItem);
  });
  it('addStartAndEnd',function(){
    let input = [':::||','::|:|','::||:',':|::|',':|:|:',':|:|:'];
    let result = allCharge.addStartAndEnd(input);
    let expectItem = '|:::||::|:|::||::|::|:|:|::|:|:|';
    expect(result).toEqual(expectItem);
  });

  it('digitalConversionToBarcode',function(){
    let input = '12345';
    let result = allCharge.digitalToBarcode(input);
    let expectItem ={barcode:'|:::||::|:|::||::|::|:|:|::|:|:|',type:true};
    expect(result).toEqual(expectItem);
  });
  it('digitalConversionToBarcode',function(){
    let input = '1234555';
    let result = allCharge.digitalToBarcode(input);
    let expectItem ={digital:'1234555',type:false};
    expect(result).toEqual(expectItem);
  });

  it('checkBarcodeFormat',function(){
    let input = '|:::||::|:|::||::|::|:|:|::|:|:|';
    let result = allCharge.checkBarcodeFormat(input);
    let expectItem ={barcode:'|:::||::|:|::||::|::|:|:|::|:|:|',type:true};
    expect(result).toEqual(expectItem);
  });
  it('checkBarcodeFormat',function(){
    let input = '|:::||::|:|::||::|::|:|:|';
    let result = allCharge.checkBarcodeFormat(input);
    let expectItem ={barcode:'|:::||::|:|::||::|::|:|:|',type:false};
    expect(result).toEqual(expectItem);
  });
  it('checkBarcodeFormat',function(){
    let input = '|:::||::|:|::||::|::|:|:|sdfsdgthggfewrtukiggfb';
    let result = allCharge.checkBarcodeFormat(input);
    let expectItem ={barcode:'|:::||::|:|::||::|::|:|:|sdfsdgthggfewrtukiggfb',type:false};
    expect(result).toEqual(expectItem);
  });

  it('formattedBarcode',function(){
    let input = '|:::||::|:|::||::|::|:|:|::|:|:|';
    let result = allCharge.formattedBarcode(input);
    let expectItem =':::||::|:|::||::|::|:|:|::|:|:';
    expect(result).toEqual(expectItem);
  });

   it('barcodeIntoArrar',function(){
     let input = ':::||::|:|::||::|::|:|:|::|:|:';
     let result = allCharge.barcodeIntoArrar(input);
     let expectItem =[':::||','::|:|','::||:',':|::|',':|:|:',':|:|:'];
     expect(result).toEqual(expectItem);
   });

  it('matchDigital',function(){
    let allItems=allItem();
    let input = [':::||','::|:|','::||:',':|::|',':|:|:',':|:|:'];
    let result = allCharge.matchDigital(input,allItems);
    let expectItem =[1,2,3,4,5,5];
    expect(result).toEqual(expectItem);
  });

  it('isTrueCheckCode',function(){
    let input = [1,2,3,4,5,5];
    let result = allCharge.isTrueCheckCode(input);
    let expectItem =true;
    expect(result).toEqual(expectItem);
  });

  it('addHypken',function(){
    let input =[1,2,3,4,5,6,7,8,9];
    let result= allCharge.addHypken(input);
    let expectItem='12345-6789';
    expect(result).toEqual(expectItem);
  });

  it('tanslateBarcode',function(){
    let input='|:::||::|:|::||::|::|:|:|::|:|:|';
    let result=allCharge.tanslateBarcode(input);
    let expectItem={digital:'123455',type:true};
    expect(result).toEqual(expectItem);
  });
  it('tanslateBarcode',function(){
    let input='|:::||::|:|::||::|::|:|:sddcws';
    let result= allCharge.tanslateBarcode(input);
    let expectItem={barcode:'|:::||::|:|::||::|::|:|:sddcws',type:false};
    expect(result).toEqual(expectItem);
  });
});
