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

  saveTasks();
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

      saveTasks();
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
      saveTasks();
      renderTasks();
      updateTaskCount();
    }
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

let tasks = [];

try {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
} catch (error) {
  console.error('Could not load saved tasks:', error);
  tasks = [];
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
};

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function(task) {
    const li = document.createElement('li');

    li.dataset.id = task.id;

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    
    taskList.appendChild(li);
  });
}
renderTasks();
updateTaskCount();


