// Elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Evento para agregar tareas
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que recargue la página

    const taskText = input.value.trim();

    if (taskText !== '') {
        addTaskToList(taskText);   // Añadir visualmente
        saveTask(taskText);        // Guardar en localStorage
        input.value = '';          // Limpiar input
    }
});

// Función para crear tarea en la lista visual
function addTaskToList(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.style.marginLeft = '10px';

    deleteBtn.addEventListener('click', function () {
        list.removeChild(li);
        deleteTask(taskText);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// Guardar tarea en localStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Eliminar tarea del localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas al iniciar
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
});
