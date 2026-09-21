const taskForm = document.querySelector('form');

const taskInput = document.querySelector('#task-input');

const taskList = document.querySelector('#task-list');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskText = taskInput.value;

  if (taskText === '') {
    console.log('Please enter a task');
    return;
  }
  const li = document.createElement('li');

  li.innerHTML = `
    <input type="checkbox">
    <span>${taskText}</span> 
    <button type="button">Delete</button>
  `;
  
  taskList.appendChild(li);

  taskInput.value = '';
});



