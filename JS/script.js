let list = document.querySelector(".list")
let no_task = document.querySelector(".no-task")
let task_checkbox = document.querySelectorAll(".checkbox")
let trashs = document.querySelectorAll(".trash")

function tasks_num_check(){
    if(list.children.length===0){
        list.style.display = "none"
        no_task.style.display = "flex"
        setTimeout(
            function(){
                no_task.style.opacity = "100"
            },
        200)
    }
}

trashs.forEach((trash)=>{
    trash.addEventListener("click",()=>{
        let the_task = trash.closest(".task")
        the_task.style.opacity = "0"
        setTimeout(
            function(){
                trash.closest(".task").remove()
                tasks_num_check()
            },
        200)
    })
})

task_checkbox.forEach((checkbox)=>{
    checkbox.addEventListener("click",()=>{
        let checkbox_check = checkbox.getAttribute("data-checked")==="true"
        checkbox.setAttribute("data-checked",!checkbox_check)
        let task = checkbox.closest(".task")
        let content = task.querySelector(".content")
        content.style.textDecoration = !checkbox_check ? "line-through" : "none";
    })
})

