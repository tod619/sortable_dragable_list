const draggable_list = document.getElementById('draggable-list')
const checkBtn = document.getElementById('check')

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'    
    ]

// Store List Itmes
const listItems = []

let dragStartIndex

// Insert List Items Into Dom
function createList() {
    [...richestPeople]
    .map(a =>({value: a, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person,idx) => {
        const listItem = document.createElement('li')


        listItem.setAttribute('data-index',idx)

        listItem.innerHTML = `
        <span class="number">${idx + 1}</span>
        <div class = "draggable" draggable = "true">
            <p class = "person-name">${person}</p>
            <i class = "fas fa-grip-lines"></i>
        </div>
        `

        listItems.push(listItem)

        draggable_list.appendChild(listItem)
    })

    addEventListners()
}

// Add eventlistners to each draggable item
function addEventListners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

// drag behaviour functions
function dragStart(){
    console.log('start')
}

function dragOver(){
    console.log('dragOver')
}

function dragDrop(){
    console.log('dragDrop')
}

function dragEnter(){
    console.log('dragEnter')
}

function dragLeave() {
    console.log('dragLeave')
}

createList()

