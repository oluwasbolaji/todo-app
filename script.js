const taskForm = document.querySelector('form');

const taskInput = document.querySelector('#task-input');

const taskList = document.querySelector('#task-list');

const taskCount = document.querySelector('#task-count');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    console.log('Please enter a task');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  
  tasks.push(newTask);

  renderTasks();
  updateTaskCount();

  taskInput.value = '';
});

taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const taskItem = event.target.parentElement;
    const taskId = taskItem.dataset.id;   

    const taskIndex = tasks.findIndex(function(task) {
      return task.id === Number(taskId);
    });

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);

      renderTasks();
      updateTaskCount();
    }
  }
});

taskList.addEventListener('change', function(event) {
  if (event.target.matches('input[type="checkbox"]')) {
    const taskItem = event.target.parentElement;
    const taskId = taskItem.dataset.id;
    
    const taskIndex = tasks.findIndex(function(task) {
      return task.id === Number(taskId);
    });

    if (taskIndex !== -1) {
      tasks[taskIndex].completed = event.target.checked;
    }

    renderTasks();
    updateTaskCount();
  }
});

function updateTaskCount() {
  const remainingTasks = tasks.filter(function(task) {
    return task.completed === false;
  }).length

  if (remainingTasks === 1) {
    taskCount.textContent = '1 task remaining'
  } else {
    taskCount.textContent = `${remainingTasks} tasks remaining`;
  }
}

const tasks = [
  {
    id: 1,
    text: 'Learn JavaScript',
    completed: false
  },
  {
    id: 2,
    text: 'Learn React',
    completed: true
  },
  {
    id: 3,
    text: 'Build a project',
    completed: false
  }
];
console.log(tasks[0].text);
console.log(tasks[1].text);
console.log(tasks[1].completed);

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function(task) {
    const li = document.createElement('li');

    li.dataset.id = task.id;
    li.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''}>
    <span>${task.text}</span>
    <button type="button" class="delete-btn">Delete</button> 
    `;

    taskList.appendChild(li);
  });
}
renderTasks();
updateTaskCount();


