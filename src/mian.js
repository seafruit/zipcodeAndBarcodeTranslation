/**
 * Created by yoyo on 16-7-27.
 */
 let readlineSync = require("readline-sync");

 let route = require('./router');

 let result = route("main");

 console.log(result);

 while(true){
 doOneRound(readlineSync, console.log);
 }

 function doOneRound(read, log){
 let input = read();
 result = route(input);
 log(result);
 }

 function read(){
 return "1"
 }


 function log(result){
 expect(result).to.equal("")
 }
