//  function a(){
//     console.log("Hello");
//  }
// //  a();funciton provocation and one execution context is made and now a() is run form the stack and then gec means then 
//  console.log("End"); // then this console will print as when function is created the execution window is created so it flow accoedin to the the value present in the stack\


// set time out

// console.log("Start");

// setTimeout(function cb(){ // go amd call web api amd give the feature of timer
//     console.log("callback");
// },5000);

// console.log("end");

// the main thing is js is a ssl first it run console and after that it goes to setTimeout and timers start after that it goes to console and end and gec works done and it pops after the timer set to 0 then that cb function goes to callback queue so even tloop start it checks if there any think in the callback queue then send it to callback stack and call back stack immedeatelu execute it so even loop act as a mediator between queue and stack

// console.log("start")

// document.getElementById("btn")?.addEventListener("click",function cb(){
//     console.log("Callback");
// });
// console.log("end");

// add is the power given to js engine by the web browser throw the window object in form of a webapi which is dom api  it sits in the callback queue untill its  turn comes and event loop see if stack is empty and then it takequeue to stack and immediatelu ot get executed