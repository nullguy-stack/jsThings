const group = document.createElement("div");
document.body.appendChild(group);
var cards = JSON.parse(localStorage.getItem('cards'));
var toggled = 1;


class Card{
    constructor(title, description, answer, id){
        if(!id) this.id = cards.length;
        else this.id = id.length;
        this.title = title;
        this.description = description;
        this.answer = answer;
        cards.push(this);
    }
}

function show(item){
    
    item.parentNode.parentNode.children[0].style = "display: none;";
    item.parentNode.parentNode.children[1].style = "display: none;";
    item.parentNode.parentNode.children[2].style = "display: none;";
    item.parentNode.parentNode.children[3].style = "display: show;";
}

function back(item){
    item.parentNode.parentNode.parentNode.children[0].style = "display: show";
    item.parentNode.parentNode.parentNode.children[1].style = "display: show";
    item.parentNode.parentNode.parentNode.children[2].style = "display: show";
    item.parentNode.parentNode.parentNode.children[3].style = "display: none;";
}

function print(id, title, description, answer){
    group.innerHTML +=
        "<div class='card' id="+id+">"+
        "<h3 class='card-title'>"+title+"</h3>"+
        "<p class='card-description'>"+description+"</p><div class='buttons'>"+
        "<button onclick='show(this)'>Answer</button>"+
        "<button class='delete' onclick='erase(this)'>Delete</button></div>"+
        "<div class='card-answer' style='display: none;'><h3>Answer</h3><br><p>"+
        answer+"</p><br><div class='buttons'><button onclick='back(this)'>Back</button>"+
        "<button class='delete' onclick='erase(this)'>Delete</button></div></div>"+
        "</div>"
    ;
}

function printAll(){
    group.innerHTML = "";
    cards = JSON.parse(localStorage.getItem('cards'));
    if(!cards)
        return;
    cards.forEach(e => {
        if(e)
            print(e.id, e.title, e.description, e.answer);
    })
}

function reset(){
    let ans = confirm("Are you sure you want to delete all?");
    if(ans == true){
        cards = [];
        localStorage.setItem('cards', JSON.stringify(cards));
        printAll();
    }
}

function erase(item){
    let ans = confirm("Are you sure you want to delete this card?");
    if(ans){
        aux = [];
        cards.forEach(card =>{
            if(card.id != item.parentNode.id)
                aux.push(new Card(card.title, card.description, card.answer, aux));
        });
        cards = [];
        localStorage.setItem('cards', JSON.stringify(aux));
    }
    printAll();
}

function clean(){
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("answer").value = "";
}

function add(){
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let answer = document.getElementById("answer");
    if(title.value == "" || description.value == "" || answer.value == ""){
        if(title.value == "")
            title.style = "border: 2px solid red";
        if(description.value == "")
            description.style = "border: 2px solid red";
        if(answer.value == "")
            answer.style = "border: 2px solid red";
        return;
    }else{
        title.style = "border-style: none";
        description.style = "border-style: none";
        answer.style = "border-style: none";
    }
    new Card(title.value,description.value,answer.value);
    localStorage.setItem('cards', JSON.stringify(cards));
    printAll();
}

function toggler(){
    let area = document.getElementById("add");
    if(toggled %2 == 1)//is hidden
        area.style = "display: show";
    else
        area.style = "display: none;"
    toggled++;
}

printAll();