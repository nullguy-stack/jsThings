let RB = 'cards/2B.svg';
var temp = Cards();
let game = document.getElementById("game");
class Player{
    constructor(name){
        this.name = name;
        this.deck = [];
        this.sum = 0;
    }
    insert(card){
        this.deck.push(card);
        this.sum += card.value;
    }
}

let players = [
    new Player("Player"),
    new Player("Bot 1"),
    new Player("Bot 2"),
    new Player("Bot 3")
]

//let p1 = players[0];

function update(s){
    ui(1);
    if(status == 2) 
        game.innerHTML += "<p class='lose'>You Lose</p>";
}

function restart(){
    players[0] = new Player("Player");
    players[1] = new Player("Bot 1");
    players[2] = new Player("Bot 2");
    players[3] = new Player("Bot 3");
    status = 1;
    temp = Cards();
    getCard()
    update();
}

function getCard(){
    if(players[0].sum == 21){
        ui(2, players[0]);
    }
    if(players[0].sum >= 21){
        update();
        end();
        return;
    }
    for(let i=1; i<players.length; i++){
        //100% of chance to get a new card if is below 7
        let prob = 0;
        if(players[i].sum<7)
            prob = 1;
        //70% of chance to get a new card if is below 11
        else if(players[i].sum<11)
            prob = 0.7
        //30% of chance to get a new card if is below 21
        else if(players[i].sum<21)
            prob = 0.3
        //if is above 21 then don't insert
        else
            continue;
        if(Math.random() < prob){ 
            let pos = Math.floor(Math.random()*(temp.length-1));
            players[i].insert(temp[pos]);
            temp.splice(pos,1);
        }
    }
    let pos = Math.floor(Math.random()*(temp.length-1));
    players[0].insert(temp[pos]);
    temp.splice(pos,1);
    update();
}

function ui(s, closer){
    if(s==1)
        game.innerHTML = 
            "<button onclick='getCard()'>Get Card</button>"+
            "<button onclick='end()'>Show cards</button>"+
            "<button onclick='restart()'>Restart Game</button>";
    else if(s== 2 || status == 2)
        game.innerHTML = "<button onclick='restart()'>Restart Game</button>";
    if(status == 2)
        game.innerHTML += "<p class='lose'>You Lose</p>";
    if(closer){
        game.innerHTML += "<br><p class='win'>"+ closer.name + " win, sum="+closer.sum+"</p>";
        players.forEach(p => {
            game.innerHTML += "<p class='win-list'>"+ p.name + " points= "+p.sum+"</p>";
        });
    }
    game.innerHTML += "<p class='sum'>Player sum: "+players[0].sum+"</p>";
    let table = document.createElement("table");
    for(let i=0; i<players.length; i++){
        let deck2 = document.createElement("tr");
        deck2.className = 'playerDeck'+i;
        let td = document.createElement("td");
        td.innerHTML += players[i].name;
        deck2.appendChild(td);
        players[i].deck.forEach(card=>{
            if(!card) return;
            let td = document.createElement("td");
            let c = document.createElement("img");
            c.className = 'card';
            if(s == 1 && i != 0) c.src = RB;
            else if(s == 2 || i ==0) c.src = card.image;
            td.appendChild(c);
            deck2.appendChild(td);
        });
        table.appendChild(deck2);
    }
    game.appendChild(table)
}

function end(){
    let closer = null;
    players.forEach(p =>{
        if(p.sum == 21){
            closer = p;
            return;
        }
        if(p.sum < 21){
            if(closer != null){
                if(p.sum > closer.sum)
                    closer = p;
            }else{
                closer = p;
            }
        }
    });
    temp = Cards();
    if(!closer) closer = {name: "Nobody wins", sum: "0"}
    ui(2, closer);
}

getCard();
update(1);
