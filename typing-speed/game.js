const game = document.getElementById("game");
const canvas = document.createElement("canvas");
let width = 500;
let height = 400;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");
game.appendChild(canvas);
ctx.font = 26 + "px Arial";
const fps = 60;
let dx = 0.2; //pixels moving at x axis
let actual = 0;
let cant = 0;
let letters = 0;
let status = 1; //is playing?
let wordlist = Words();
let fixedSpeed = 0;

class Letter{
    constructor(letter, x, y, color="white"){
        this.letter = letter;
        this.color = color;
        this.x = x;
        this.y = y;
    }
}

class Word{
    constructor(word, x, y){
        this.text = [];
        let before = "";
        word.split('').forEach(l =>{
            if(['f', 'i', 'r', 't'].indexOf(before) != -1)
                this.text.push(new Letter(l, x+=10, y))
            else if(['l', 'j'].indexOf(before) != -1)
                this.text.push(new Letter(l, x+=6, y))
            else if(['l', 'm', 'w'].indexOf(before) != -1)
                this.text.push(new Letter(l, x+=24, y))
            else
                this.text.push(new Letter(l, x+=16, y))
            before = l;
        });
    }
}

function pos(){
    return [
        {'x': 200, 'y':40},
        {'x': 160, 'y':90},
        {'x': 120, 'y':140},
        {'x': 80, 'y':190},
        {'x': 40, 'y':240},
        {'x': 0, 'y':290},
        {'x': -40, 'y':340},
        {'x': -80, 'y':390}
    ]
}

let positions = pos();
let words = []

function reset(){    
    status = 0;
    positions = pos();
    words = [
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))], positions[0].x, positions[0].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))], positions[1].x, positions[1].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))],  positions[2].x, positions[2].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))], positions[3].x, positions[3].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))],  positions[4].x, positions[4].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))], positions[5].x, positions[5].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))],  positions[6].x, positions[6].y),
        new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))],  positions[7].x, positions[7].y)
    ];
    actual = 0;
    letters = 0;
    cant = 0;
    if(fixedSpeed == 0)
        dx = 0.2;
    update();
}

function insertWord(){
    /*Change position of positions (sending to last the first element)*/
    let a = positions[0];
    for(let i=1; i<positions.length; i++){
        positions[i-1] = positions[i];
    }
    positions[positions.length-1] = a;
    positions[positions.length-1].x = -100;
    let last = words.length - 1;
    let x = words[last].text[0].x - 80;
    console.log(x);
    words.push(new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))], x, positions[positions.length-1].y));
}

function background(color){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,width, height);
}

function write(word){
    word.text.forEach(l =>{
        ctx.fillStyle = l.color;
        ctx.fillText(l.letter, l.x, l.y);
        l.x += dx;
    });
    new Word(wordlist[Math.floor(Math.random()*(wordlist.length-1))], positions[0].x, positions[0].y);
}

function update(){
    document.getElementById("info").innerHTML = 
        "<td>X-speed:</td><td>"+ dx.toFixed(2) + "</td><td>Words:</td><td>" + cant+"</td>"+
        "<td>Letters:</td><td>"+letters;
    document.getElementById("value").innerHTML = "Value = " + dx.toFixed(2);
    if(words[0].text.slice(-1).pop().x+6 >= width){
        status = 3; // lose
        document.getElementById("lose").innerHTML = "You Lose";
        return;
    }
    background("black");
    words.forEach(w=>{
        write(w);
    })
}

function play(){
    if(status == 1){
        document.getElementById("play-btn").innerHTML = "Play";
        status = 0;
    }
    else{
        document.getElementById("play-btn").innerHTML = "Pause";
        status = 1;
    }
}

document.body.addEventListener("keydown", (e) =>{
    if(status == 3)
        return;
    if(e.key == ' ')
        status = 1 - status;
    if(e.key != ' ')
        status = 1;
    if(status == 0)
     return;
    if(e.key == words[0].text[actual].letter){
        words[0].text[actual].color = "red";
        if(fixedSpeed==0) dx += 0.02;
        letters++;
        actual++;
        if(!words[0].text[actual]){
            words.splice(0,1);
            actual = 0;
            cant++;
            insertWord();
        }
    }
})

function fixed(s){
    fixedSpeed = 1;
    document.getElementById("value").innerHTML = "Value = " + dx.toFixed(2);
    if(s)
        dx = s.valueAsNumber;
}

function variable(){
    fixedSpeed = 0;
}

reset();
play();
update();
setInterval(()=> {if(status == 1)update()}, 1000/fps);