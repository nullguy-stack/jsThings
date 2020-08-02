const year = document.getElementById("year")
const month = document.getElementById("month")
const day = document.getElementById("day")
const hour = document.getElementById("hour")
const minute = document.getElementById("minute")
const second = document.getElementById("second")
const input = document.getElementById("date")

var date = new Date()
var date2;

input.onchange = (e) =>{
    date2 = input.valueAsDate
}


function calculate(){
    let date3 = []
    let res = date2 - date
    date3 = [
        (res*0.001%60).toFixed(0),
        (res*1.6667e-5%60).toFixed(0),
        (res*2.77783333e-7%24).toFixed(0),
        (res*1.15741e-8%365.25).toFixed(0),
        (res*3.8052469668526e-10%12).toFixed(0),
        (res*3.171042614155218698e-11).toFixed(0),
    ]
    return date3.reverse();
}

function update(){
    if(date2){
        [ year.innerText, month.innerText, 
        day.innerText, hour.innerText,
        minute.innerText, second.innerText] = calculate()
    }
    else{
        year.innerText = date.getFullYear()
        month.innerText = date.getMonth()
        day.innerText = date.getDate()
        hour.innerText = date.getHours()
        minute.innerText = date.getMinutes()
        second.innerText = date.getSeconds()
    }
    date = new Date()
    window.requestAnimationFrame(update)
}

function clean(){
    input.value = 0
    date2 = null
}

update()