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

// check the order of the list against the original unsorted list
function checkOrder() {
    listItems.forEach((listItem,index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()
        
        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong')
        }else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
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
    // console.log('start')
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    
}

function dragOver(e){
    //console.log('dragOver')
    e.preventDefault()
}

function dragDrop(){
    // console.log('dragDrop')
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex,dragEndIndex)

    this.classList.remove('over')

}

function dragEnter(){
    // console.log('dragEnter')
    this.classList.add('over')
}

function dragLeave() {
    // console.log('dragLeave')
    this.classList.remove('over')
}

// Swap Items that are dragged and dropped
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

checkBtn.addEventListener('click', checkOrder)

createList()

