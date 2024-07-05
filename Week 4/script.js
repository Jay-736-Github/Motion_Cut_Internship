document.addEventListener('DOMContentLoaded', function() {
    const taskDateInput = document.getElementById('task-date');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskGroupsContainer = document.getElementById('task-groups');

    addTaskButton.addEventListener('click', function() {
        const taskDate = taskDateInput.value;
        const taskText = newTaskInput.value.trim();

        if (taskText === '') return; 

        const task = {
            date: taskDate,
            text: taskText,
            completed: false,
            id: Date.now().toString() 
        };

        saveTask(task);
        renderTaskGroups();
        newTaskInput.value = '';
    });

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        if (!tasks[task.date]) {
            tasks[task.date] = [];
        }
        tasks[task.date].push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTaskGroups() {
        taskGroupsContainer.innerHTML = '';
        let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        Object.keys(tasks).forEach(date => {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('task-group');
            const dateHeader = document.createElement('h2');
            dateHeader.textContent = date;
            groupDiv.appendChild(dateHeader);
            const taskList = document.createElement('ul');
            taskList.classList.add('task-list');
            if (Array.isArray(tasks[date])) {
                tasks[date].forEach(task => {
                    const taskItem = createTaskElement(task);
                    taskList.appendChild(taskItem);
                });
            }
            groupDiv.appendChild(taskList);
            taskGroupsContainer.appendChild(groupDiv);
        });
    }

    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.dataset.taskId = task.id;
        taskItem.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="complete" onclick="toggleTaskCompletion('${task.id}')">✔</button>
            <button class="edit" onclick="editTask('${task.id}')">✏️</button>
            <button class="delete" onclick="deleteTask('${task.id}')">❌</button>
        `;

        return taskItem;
    }

    window.toggleTaskCompletion = function(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        Object.keys(tasks).forEach(date => {
            if (Array.isArray(tasks[date])) {
                tasks[date].forEach(task => {
                    if (task.id === taskId) {
                        task.completed = !task.completed;
                    }
                });
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskGroups();
    };

    window.editTask = function(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        Object.keys(tasks).forEach(date => {
            if (Array.isArray(tasks[date])) {
                tasks[date].forEach(task => {
                    if (task.id === taskId) {
                        const newText = prompt('Enter new task text:', task.text);
                        if (newText !== null) {
                            task.text = newText.trim();
                        }
                    }
                });
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskGroups();
    };

    window.deleteTask = function(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        Object.keys(tasks).forEach(date => {
            if (Array.isArray(tasks[date])) {
                tasks[date] = tasks[date].filter(task => task.id !== taskId);
                if (tasks[date].length === 0) {
                    delete tasks[date];
                }
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskGroups();
    };

    renderTaskGroups(); 
});