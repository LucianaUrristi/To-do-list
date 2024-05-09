let tasks = []; //array para crear los objetos

const form = document.querySelector(".form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

const renderTask = () =>{
    taskList.innerHTML = "";
    tasks.forEach((task)=>{   //CON LA COMILLA AL REVES
            const html = `   
                <li data-id="${task.id}" class="tasks__item"> 
                    <p class="${task.complete && "done"}">${task.title}</p>
                    <div>
                        <i class="bx bx-check"></i>
                        <i class="bx bx-trash"></i>
                    </div>
                </li>
            `;
    
        taskList.innerHTML += html; //imprime el html
    });    
};

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const title = taskInput.value.trim(); //trim() saca los espacios

    if(title.length >= 3) { //ya con eso lo hace un item obligatorio
        const task = {  //objeto tarea
            id: Date.now(),
            title,
            complete: false,
        };

        tasks.push(task);
        taskInput.value = ""; //resetea la barra
        console.log(task, tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));//agrega tarea al localStorage || stringify pasa un objeto de js a texto
        
        renderTask();

    } else{
        const error = document.querySelector(".error");
        error.textContent = "La tarea tiene que tener 3 caracteres o más"; //mensaje de error.

        setTimeout(() => {        // para que desaparezca el mensaje a los 2 segundos.
            error.textContent = "";
        }, 2000);

    }
    
});

document.addEventListener("click", (event) => {  //va a escuchar TODOS los clicks del documento
    if (event.target.classList.contains("bx-check")){ //pero solo va a reaccionar cuando haga click en bx-check
        
        console.log(tasks);
        const id = event.target.closest("li").dataset.id; //cuando se haga click en ese check trae el li mas cercano
        const task = tasks.find((task) => task.id == id);
        task.complete = !task.complete;

        localStorage.setItem("tasks", JSON.stringify(tasks)); //se guarda si se marco una tarea al recargar la pagina.
        event.target.closest("li").querySelector("p").classList.toggle("done"); //toggle, si la clase esta la saca y si no esta la crea
    } else if (event.target.classList.contains("bx-trash")){
        const id = event.target.closest("li").dataset.id;
        const taskIndex = tasks.findIndex((task) => task.id == id);
        tasks.splice = (taskIndex, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.closest("li").remove();
    }
});

document.addEventListener("DOMContentLoaded", () => {  //JSON.parse para un texto a un objeto de JS
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];  // si es falso pone un array vacio
    renderTask();
});