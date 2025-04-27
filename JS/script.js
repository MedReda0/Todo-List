let date = new Date()
let day = document.querySelector(".day-short")
let month = document.querySelector(".month-short")
let day_num = document.querySelector(".day-num")
let year = document.querySelector(".year")
let list = document.querySelector(".list")
let no_task = document.querySelector(".no-task")
let task_checkbox = document.querySelectorAll(".checkbox")
let trashs = document.querySelectorAll(".trash")
let tasks_num = document.querySelector(".tasks-num")

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
                no_task.style.opacity = "100"
            },
            200)
    }
}

tasks_num_check()

trashs.forEach((trash) => {
    trash.addEventListener("click", () => {
        let the_task = trash.closest(".task")
        the_task.style.opacity = "0"
        setTimeout(
            function () {
                trash.closest(".task").remove()
                tasks_num_check()
            },
            200)
    })
})

task_checkbox.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        let checkbox_check = checkbox.getAttribute("data-checked") === "true"
        checkbox.setAttribute("data-checked", !checkbox_check)
        let task = checkbox.closest(".task")
        let content = task.querySelector(".content")
        content.style.textDecoration = !checkbox_check ? "line-through" : "none";
    })
})

