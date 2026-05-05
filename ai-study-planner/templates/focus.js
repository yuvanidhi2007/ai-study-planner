let eventsArr=[];
const WINDOW=30000;
let lastMouseRecorded=0;

let warningActive=false;
let warningStartTime=0;
let blackoutActive=false;
let locked=false;
let tabInactive=false;

const scoreEl=()=>document.getElementById("score");
const statusEl=()=>document.getElementById("status");

function recordActivity(){
    if(locked) return;

    let now=Date.now();
    eventsArr.push(now);

    while(eventsArr.length && now-eventsArr[0]>WINDOW){
        eventsArr.shift();
    }

    warningActive=false;
}

document.addEventListener("keydown",recordActivity);

document.addEventListener("mousemove",()=>{
    let now=Date.now();
    if(now-lastMouseRecorded>1000){
        recordActivity();
        lastMouseRecorded=now;
    }
});

document.addEventListener("visibilitychange",()=>{
    if(document.hidden) tabInactive=true;
    else{
        tabInactive=false;
        recordActivity();
    }
});

setInterval(()=>{
    let now=Date.now();

    while(eventsArr.length && now-eventsArr[0]>WINDOW){
        eventsArr.shift();
    }

    let events=eventsArr.length;
    if(tabInactive) events=Math.max(0,events-3);

    let score=Math.min(10,Math.floor(events/2));

    scoreEl().innerText=score;
    statusEl().innerText="Events: "+events;

    let last=eventsArr.length?eventsArr[eventsArr.length-1]:0;
    let idle=now-last;

    if(idle>6000 && !warningActive){
        warningActive=true;
        warningStartTime=now;
    }

    if(warningActive && now-warningStartTime>60000){
        locked=true;
        alert("Take a break!");
        setTimeout(()=>locked=false,300000);
    }

},1000);