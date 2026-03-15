let tasks=[]

function addTask(){

let name=document.getElementById("taskName").value
let priority=parseInt(document.getElementById("priority").value)

tasks.push({name,priority})

tasks.sort((a,b)=>b.priority-a.priority)

display()

}

function display(){

let list=document.getElementById("taskList")
list.innerHTML=""

tasks.forEach(t=>{
let li=document.createElement("li")
li.innerText=t.name+" (priority "+t.priority+")"
list.appendChild(li)
})

}