const classNames = {
	TODO_ITEM: 'todo-container',
	TODO_CHECKBOX: 'todo-checkbox',
	TODO_TEXT: 'todo-text',
	TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let todoCount = 0
let uncheckedCount = 0

function newTodo() {
	// alert('new todo')
	const toDoContent = document.getElementsByName('newTODO')[0].value.trim()
	// console.log(toDoContent)
	// alert('new todo')
	if (toDoContent === '') {
		alert('New TODO cannot be empty!')
	} else {
		todoCount++
		uncheckedCount++

		const ToDoItem = document.createElement('li')
		ToDoItem.className = classNames.TODO_ITEM

		const ToDoCheck = document.createElement('input')
		ToDoCheck.type = 'checkbox'
		ToDoCheck.className = classNames.TODO_CHECKBOX
		ToDoCheck.onchange = function() {
			if (ToDoCheck.checked) {
				uncheckedCount--
			} else {
				uncheckedCount++
			}
			uncheckedCountSpan.innerHTML = uncheckedCount
		}

		const ToDoSpan = document.createElement('span')
		ToDoSpan.className = classNames.TODO_TEXT
		ToDoSpan.innerHTML = toDoContent

		const ToDoDelete = document.createElement('button')
		ToDoDelete.className = classNames.TODO_DELETE
		ToDoDelete.innerHTML = 'Delete'
		ToDoDelete.onclick = function() {
			ToDoItem.remove()
		}

		ToDoItem.append(ToDoCheck, ToDoSpan, ToDoDelete)
		list.append(ToDoItem)

		itemCountSpan.innerHTML = todoCount
		uncheckedCountSpan.innerHTML = uncheckedCount
	}

	return false
}
