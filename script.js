const input = document.querySelector('.input'),
    submit = document.querySelector('.submit'),
    ul = document.querySelector('ul'),
    clearBtn = document.querySelector('.clear-btn'),
    searchField = document.querySelector('.search');

input.addEventListener('keyup', allowEnterKey);
submit.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAll);
searchField.addEventListener('keyup', filter);
ul.addEventListener('click', remove);

function allowEnterKey(e){
    if (e.keyCode === 13) {
        e.preventDefault();
        submit.click();
        input.blur();
    }
}

function addTask(){
    if (input.value === ''){
        alert('You must insert text');
    } else {
        const task = input.value;
        const list = document.createElement('li');
        list.appendChild(document.createTextNode(task));
        ul.appendChild(list);
        list.classList.add('collection-item');
        input.value = '';
        const deleteIcon = document.createElement('a');
        deleteIcon.className = 'delete secondary-content';
        deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
        list.append(deleteIcon);

        addToStorage(task);
    }
}

function addToStorage(task){
    localStorage.setItem('tasks', task);
}

function clearAll(){
    if (confirm('Are you sure you want to delete all tasks?')){
        ul.innerHTML = '';
    }
};

function remove(e){
    if(e.target.parentElement.classList.contains('delete')){
        e.target.parentElement.parentElement.style.display = 'none';
        console.log('caught it');
        // localStorage.removeItem('tasks');
    }
}

function filter(e){
    const text = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('.collection-item');
    tasks.forEach(function(task){
        const item = task.textContent; // const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}