function generateGraph(){

let input=document.getElementById("subjects").value;

let lines=input.split("\n").map(l=>l.trim()).filter(l=>l);

let adj={}, indegree={};

for(let line of lines){
    let [s,p]=line.split(":");
    s=s.trim();

    adj[s]=adj[s]||[];
    indegree[s]=indegree[s]||0;

    if(p){
        p.split(",").forEach(x=>{
            let pre=x.trim();
            if(pre){
                adj[pre]=adj[pre]||[];
                adj[pre].push(s);
                indegree[s]=(indegree[s]||0)+1;
            }
        });
    }
}

let q=[], topo=[];

for(let n in indegree){
    if(indegree[n]===0) q.push(n);
}

while(q.length){
    let cur=q.shift();
    topo.push(cur);

    (adj[cur]||[]).forEach(v=>{
        indegree[v]--;
        if(indegree[v]===0) q.push(v);
    });
}

document.getElementById("order").innerText=
"Order: "+topo.join(" → ");
}