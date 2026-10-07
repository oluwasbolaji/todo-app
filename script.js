const taskForm = document.querySelector('form');

const taskInput = document.querySelector('#task-input');

const taskList = document.querySelector('#task-list');

const taskCount = document.querySelector('#task-count');

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
    <button type="button" class="delete-btn">Delete</button>
  `;
  
  taskList.appendChild(li);

  updateTaskCount();

  taskInput.value = '';
});

taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')){
    event.target.parentElement.remove();
    updateTaskCount();
  }
});

taskList.addEventListener('change', function(event) {
  if (event.target.matches('input[type="checkbox"]')) {
    updateTaskCount();
  }
});

function updateTaskCount() {
  const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');

  const uncheckedCheckboxes = [...checkboxes].filter(function(checkbox) {
    return !checkbox.checked;
  });
  const remainingTasks = uncheckedCheckboxes.length;

  if (remainingTasks === 1) {
    taskCount.textContent = '1 task remaining'
  } else {
    taskCount.textContent = `${remainingTasks} tasks remaining`;
  }
}
updateTaskCount();

