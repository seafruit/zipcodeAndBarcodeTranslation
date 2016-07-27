/**
 * Created by yoyo on 16-7*/

let {route,reset} = require('../src/router');
describe('postnet', function () {
  beforeEach(()=>reset());
  it('input 1', function () {

   let response = route("1");
   let expected =  'Please input zip code:';
   expect(response).toEqual(expected)
   });

  it('input 2', function () {
    let response = route("2");
    let expected =  'Please input bar code:';
    expect(response).toEqual(expected)
  });

  it('input 3', function () {
    let response = route("3");
    let expected =  'byebye';
    expect(response).toEqual(expected)
  });

  it('input other', function () {
    let response=route("5");
    expect(response).toEqual("no command");
  });

  it('translate', function () {
    route("1");
    let response = route("95713");
    expect(response).toEqual("the barcode is :||:|:::|:|:|:::|:::||::||::|:|:|");
  });
  it('translate wrong', function () {
    route("1");
    let response = route("9713");
    expect(response).toEqual("Please give right input"+'Please input zip code:');
  });

  it('translate', function () {
    route("2");
    let response = route("||:|:::|:|:|:::|:::||::||::|:|:|");
    expect(response).toEqual("the zipcode is :957135");
  });
  it('translate wrong', function () {
    route("2");
    let response = route("||:|:::|:|:|::::||::||::|:|:|");
    expect(response).toEqual("Please give right input"+"Please input bar code:");
  });

  it('start', function () {
    let response = route("main");
    let expected =`1. Translate zip code to bar code
    2. Translate bar code to zip code
    3. Quit
    Please input your choices(1~3)`;
    expect(response).toEqual(expected);
  });
});






