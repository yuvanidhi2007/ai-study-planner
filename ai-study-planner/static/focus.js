let deque = []
const WINDOW = 30000

function recordActivity(){
let now = Date.now()
deque.push(now)
clean(now)
}

function clean(now){
while(deque.length>0 && now-deque[0]>WINDOW){
deque.shift()
}
}

document.addEventListener("keydown",recordActivity)
document.addEventListener("mousemove",recordActivity)

setInterval(()=>{

let now = Date.now()
clean(now)

let events = deque.length
let score = Math.min(10,Math.floor(events/3))

document.getElementById("score").innerText = score

},5000)
