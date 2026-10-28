const taskForm = document.querySelector('form');

const taskInput = document.querySelector('#task-input');

const taskList = document.querySelector('#task-list');

const taskCount = document.querySelector('#task-count');
const taskFilters = document.querySelector('.task-filters');

let currentFilter = 'all';
taskFilters.addEventListener('click', function(event) {
  if (event.target.matches('button[data-filter]')) {
    currentFilter = event.target.dataset.filter;

    const filterButtons = taskFilters.querySelectorAll('button[data-filter]');
    filterButtons.forEach(function(button) {
      button.classList.remove('active-filter');
    });
    event.target.classList.add('active-filter');                        
   
    console.log(currentFilter);
    renderTasks();
  }
});

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

  if (event.target.classList.contains('edit-btn')) {
    const taskItem = event.target.parentElement;
    const taskId = taskItem.dataset.id;
    
    const taskIndex = tasks.findIndex(function(task) {
      return task.id === Number(taskId);
    });

    if (taskIndex !== -1) {
      const currentTask = tasks[taskIndex];

      const taskText = taskItem.querySelector('span')

      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = currentTask.text;

      taskItem.replaceChild(editInput, taskText);

      const editButton = taskItem.querySelector('.edit-btn');
      const deleteButton = taskItem.querySelector('.delete-btn');

      editButton.hidden = true;
      deleteButton.hidden = true

      const saveButton = document.createElement('button');
      saveButton.type = 'button';
      saveButton.textContent = 'Save';
      saveButton.classList.add('save-btn');

      taskItem.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.textContent = 'Cancel';
      cancelButton.classList.add('cancel-btn');

      taskItem.appendChild(cancelButton);
    }
  }

  if (event.target.classList.contains('save-btn')) {
    const taskItem = event.target.parentElement;
    const taskId = taskItem.dataset.id;

    const taskIndex = tasks.findIndex(function(task) {
      return task.id === Number(taskId);
    });

    const editInput = taskItem.querySelector('input[type="text"]');
    const newText = editInput.value.trim();

    if (newText === '') {
      editInput.focus();
      return;
    }

    if (taskIndex !== -1) {
      tasks[taskIndex].text = newText;

      saveTasks();
      renderTasks();
    }
  }

  if (event.target.classList.contains('cancel-btn')) {
    renderTasks();
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

  let filteredTasks = tasks;

  if (currentFilter === 'active') {
    filteredTasks = tasks.filter(function(task) {
      return task.completed === false;
    });
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(function(task) {
      return task.completed === true;
    });
  } else {
    filteredTasks = tasks;
  }

  if (tasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.classList.add('empty-state');
    emptyMessage.textContent = 'No tasks yet. Add your first task!';

    taskList.appendChild(emptyMessage);
  }

  if (tasks.length > 0 && filteredTasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.classList.add('empty-state');
    emptyMessage.textContent = 'No tasks match this filter.';

    taskList.appendChild(emptyMessage);
  }

  filteredTasks.forEach(function(task) {
    const li = document.createElement('li');

    li.dataset.id = task.id;

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    
    taskList.appendChild(li);
  });
}
renderTasks();
updateTaskCount();


