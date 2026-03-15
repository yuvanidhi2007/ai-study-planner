let deque = []
const WINDOW = 30000

let lastMouseRecorded = 0

window.onload = function(){

const scoreDisplay = document.getElementById("score")
const statusDisplay = document.getElementById("status")

function recordActivity(){

    const now = Date.now()
    deque.push(now)

    cleanDeque(now)
}

function cleanDeque(now){

    while(deque.length > 0 && now - deque[0] > WINDOW){
        deque.shift()
    }

}

document.addEventListener("keydown", recordActivity)

document.addEventListener("mousemove", ()=>{

    const now = Date.now()

    if(now - lastMouseRecorded > 1000){
        recordActivity()
        lastMouseRecorded = now
    }

})

document.addEventListener("visibilitychange", ()=>{

    if(!document.hidden){
        recordActivity()
    }

})

setInterval(()=>{

    const now = Date.now()

    cleanDeque(now)

    const events = deque.length

    let focusScore = 0

    if(events > 0){
        focusScore = Math.min(10 , Math.floor(events / 3))
    }

    scoreDisplay.innerText = focusScore

    statusDisplay.innerText = "Events in last 30s: " + events

},3000)

}