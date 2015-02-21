//TODO better sync
function sayEverything(parts, index){
    if(index >= parts.length){
          return;
    }
    // reader = window.frames[0].window.pageSay(parts[index]);
    $(saySomething(parts[index])).on("ended",function(){
        sayEverything(parts, index + 1);
    });
}

function saySomething(word){
  reader = window.frames[0].window.pageSay(word);
  return reader;
}
var js = 'function pageSay(text)'+
    '{'+
'reader = document.getElementById("reader");'+
        'reader.src = "http://translate.google.com/translate_tts?tl=en&q=" + encodeURI(text);'+
        'reader.play();'+
'return reader;'+
    '}';

setTimeout(function(){
window.frames[0].document.body.innerHTML = "<video id='reader' src='http://translate.google.com/translate_tts?tl=en&q=Lorem%20ipsum%20dolor%20sit%20amet' controls></video>";
},1000);
setTimeout(function(){
window.frames[0].window.eval(js);
},2000);

