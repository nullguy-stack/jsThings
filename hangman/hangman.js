var tries = [];
var word = "";
var state = 0;
var w = 0;
var wordArray = word.split('');
var array = [];
function print(s, w){
    var image = document.getElementById("image");
    document.getElementById("image").style = "background-image: url('imgs/"+s+".svg')";
    var tr = document.getElementById("tries");
    tr.innerHTML = "Tries: ";
    tries.forEach(t=>{
        tr.innerHTML += t + ", ";
    });
    var result = document.getElementById("result");
    if(!s) result.innerHTML = "";
    if(!w) result.innerHTML = "";
    if(s==6) result.innerHTML = "<div class='fail'><strong>You lose the word was: </strong>"+word+"</div>";
    if(w==1) result.innerHTML = "<div class='win'><strong>You win the word was: </strong>"+word+"</div>";
    var wordHtml = document.getElementById("word");
    wordHtml.innerHTML = "";
    wordHtml.innerHTML += "<div class='words'>";
    array.forEach(letter => {
        if(letter != ' ')
            wordHtml.innerHTML += "<p class='letter'>"+letter+"</p>";
        else
            wordHtml.innerHTML += "<p class='letter-blank'>"+letter+"</p>";
    });
    wordHtml.innerHTML += "</div>";
};
function check(e){
    if(e.key == 'Enter') return;
    if(status == 6) return;
    let j=0;
    console.log(tries);
    for(let i=0; i<tries.length; i++){
        if(e.key == tries[i]){
            alert(e.key+" is already on tries");
            return;
        }
    }
    tries.push(e.key);
    for(let i =0; i<wordArray.length; i++)
        if(wordArray[i] == e.key){
            array[i] = e.key;
            j = 1
        }
    if(j == 0 && status < 6) status++;
    let a = wordArray.join();
    let b = array.join();
    if(a==b){
        win = 1;
    }
    print(status, win);
};
function reset(){
    status = 0;
    win = 0;
    tries = [];
    array = [];
    word = wordList[Math.floor(Math.random()*wordList.length)];
    wordArray = word.split('');
    wordArray.forEach(l =>{
        if(l == ' ')
            array.push(' ');
        else
            array.push([String.fromCharCode(133)]);
    });    
    print(status, win);
};
document.body.addEventListener("keyup",(e)=>check(e));