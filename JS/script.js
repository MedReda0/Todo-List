document.querySelectorAll(".checkbox").forEach((checkbox,index)=>{
    checkbox.addEventListener("click",()=>{
        let checkbox_check = checkbox.getAttribute("data-checked")==="true"
        let task = checkbox.closest(".task")
        let content = task.querySelector(".content")
        checkbox.setAttribute("data-checked",!checkbox_check)
        content.style.textDecoration = !checkbox_check ? "line-through" : "none";
    })
})