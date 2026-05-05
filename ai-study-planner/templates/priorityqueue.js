console.log("JS loaded");

class Task {
    constructor(name, deadline, importance) {
        this.name = name;
        this.deadline = deadline ? new Date(deadline) : null;
        this.importance = importance;
        this.priority = this.calculatePriority();
    }

    calculatePriority() {
        let urgency = 0;

        if (this.deadline) {
            const now = new Date();
            const timeLeft = (this.deadline - now) / (1000 * 60 * 60);

            if (timeLeft <= 0) urgency = 10;
            else urgency = 1 / timeLeft;
        }

        return (this.importance * 3) + (urgency * 5);
    }
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(task) {
        this.heap.push(task);
        this.heap.sort((a, b) => b.priority - a.priority);
    }

    rebuildHeap() {
        this.heap.forEach(t => t.priority = t.calculatePriority());
        this.heap.sort((a, b) => b.priority - a.priority);
    }
}

const taskQueue = new MaxHeap();

function formatTime(date) {
    return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });
}

function getCountdown(deadline) {
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) return "Overdue";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s left`;
}

function addTask() {
    const name = document.getElementById("taskName").value.trim();
    const deadline = document.getElementById("deadline").value;
    const importance = parseInt(document.getElementById("importance").value);

    if (!name) {
        alert("Enter task name");
        return;
    }

    if (isNaN(importance)) {
        alert("Enter importance (1–5)");
        return;
    }

    const task = new Task(name, deadline, importance);
    taskQueue.insert(task);

    updateUI();
}

function updateUI() {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    taskQueue.heap.forEach(task => {
        const div = document.createElement("div");
        div.className = "task-card";

        let deadlineHTML = "";
        if (task.deadline) {
            deadlineHTML = `
                <div class="deadline">
                    Due: ${formatTime(task.deadline)}
                </div>
                <div class="countdown">
                    ${getCountdown(task.deadline)}
                </div>
            `;
        }

        div.innerHTML = `
            <strong>${task.name}</strong>
            ${deadlineHTML}
        `;

        container.appendChild(div);
    });
}

// update every second for live countdown
setInterval(() => {
    taskQueue.rebuildHeap();
    updateUI();
}, 1000);