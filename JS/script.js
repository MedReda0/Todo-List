let date = new Date()
let day = document.querySelector(".day-short")
let month = document.querySelector(".month-short")
let day_num = document.querySelector(".day-num")
let year = document.querySelector(".year")
let list = document.querySelector(".list")
let no_task = document.querySelector(".no-task")
let task_checkboxs = document.querySelectorAll(".checkbox")
let trashs = document.querySelectorAll(".trash")
let tasks_num = document.querySelector(".tasks-num")
let new_task = document.querySelector(".new-task")
let close_btn = document.querySelector(".new-task header i")
let done_btn = document.querySelector(".new-task .done-btn")
let new_task_btn = document.querySelector(".new-task-btn")
let new_task_input = document.querySelector('textarea')

day.textContent = `${date.toLocaleDateString("default", { weekday: 'short' })},`
month.textContent = `${date.toLocaleDateString("default", { month: 'short' })}`
day_num.textContent = `${date.getDate()},`
year = date.getFullYear()

function tasks_num_check() {
    tasks_num.textContent = `${list.children.length} Tasks`
    if (list.children.length === 0) {
        list.style.display = "none"
        no_task.style.display = "flex"
        setTimeout(
            function () {
                no_task.style.opacity = "1"
            },
            150)
    } else {
        no_task.style.opacity = "0"
        setTimeout(
            function () {
                list.style.display = "block"
                no_task.style.display = "none"
            },
            100)
    }
}


addEventListener("DOMContentLoaded", () => {
    tasks_num_check()
})


list.addEventListener('click', function (e) {
    if (e.target.classList.contains('trash')) {
        let task = e.target.closest(".task")
        let content = task.querySelector(".content")
        task.style.opacity = "0"
        setTimeout(
            function () {
                task.remove()
                tasks_num_check()
            },
            150)
        localStorage.removeItem(content.textContent)
    }
    if (e.target.classList.contains('checkbox') || e.target.classList.contains('checkIcon')) {
        let checkbox = e.target.closest(".checkbox")
        let checkbox_check = checkbox.getAttribute("data-checked") === "true"
        checkbox.setAttribute("data-checked", !checkbox_check)
        let task = checkbox.closest(".task")
        let content = task.querySelector(".content")
        content.style.textDecoration = !checkbox_check ? "line-through" : "none";
        content.style.color = !checkbox_check ? "#ccc" : "#777";
        let key = `${content.textContent}`;
        let current = localStorage.getItem(key) === "true";
        localStorage.setItem(key, !current);
    }
})


function new_task_UI_toggle() {
    setTimeout(
        function () {
            new_task.style.display = getComputedStyle(new_task).getPropertyValue('display') == "block" ? "none" : "block"
            new_task_input.focus()
        },
        90)
    new_task_input.value = ""
    new_task.style.opacity = getComputedStyle(new_task).getPropertyValue('opacity') == "1" ? "0" : "1"
    document.body.classList.toggle('hide-overlay');
}

[new_task_btn, close_btn].forEach((btn) => { btn.addEventListener("click", new_task_UI_toggle) })

addEventListener("keydown", (e) => {
    if (e.key == "+") {
        new_task_UI_toggle()
    }
})

document.body.addEventListener("click", function (e) {
    if (!document.body.classList.contains('hide-overlay') && !new_task.contains(e.target) && e.target !== new_task_btn) {
        new_task_UI_toggle();
    }
});


function createTask(content, value) {
    let newTask = document.createElement('div')
    newTask.classList.add('task')
    list.prepend(newTask)

    let newTask_content = document.createElement('div')
    newTask_content.classList.add('content')
    newTask_content.textContent = content
    newTask.append(newTask_content)

    let new_task_actions = document.createElement('div')
    new_task_actions.classList.add('actions')
    newTask.append(new_task_actions)

    let new_task_trash = document.createElement('i')
    new_task_trash.classList.add('fi', 'fi-br-trash', 'trash')
    new_task_actions.append(new_task_trash)

    let new_task_checkbox = document.createElement('div')
    new_task_checkbox.classList.add('checkbox')
    new_task_actions.append(new_task_checkbox)

    let new_task_checkIcon = document.createElement('i')
    new_task_checkIcon.classList.add('fi', 'fi-br-check', 'checkIcon')
    new_task_checkbox.append(new_task_checkIcon)

    if (value === "true") {
        new_task_checkbox.setAttribute("data-checked", "true")
        newTask_content.style.textDecoration = "line-through";
        newTask_content.style.color = "#ccc";
    }
}


function task_add() {
    if (new_task_input.value.trim() !== '') {
        createTask(new_task_input.value)
        localStorage.setItem(`${new_task_input.value}`, false)
        new_task_input.value = ''
        new_task_UI_toggle();
        tasks_num_check()
    } else {
        new_task_input.style.borderColor = "red"
    }
}

new_task_input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        task_add()
    }
})

done_btn.addEventListener('click', function () {
    task_add()
})


new_task_input.addEventListener("focus", () => {
    new_task_input.style.borderColor = "transparent"
})


function old_tasks_check() {
    for (i = localStorage.length - 1; i >= 0; i--) {
        let task = localStorage.key(i)
        let task_value = localStorage.getItem(task)
        createTask(task, task_value)
    }
}

old_tasks_check()
