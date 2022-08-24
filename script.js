// const
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

// 最有錢的名單
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

// 儲存的排序清單
const listItems = [];

let dragEndIndex;

// 建立清單
createList();

// function
// 將最有錢的名單加入DOM

function createList(){
    [...richestPeople]
        // 建立value, sort value用來取得原本的value , sort 用來建立一個可比較的亂數
        .map(a => ({ value: a, sort: Math.random() }))
        // 亂數比較
        .sort((a, b) =>a.sort - b.sort)
        // 將比較後的List 呈現出原本的value
        .map(a => a.value)
        .forEach((person, index) =>{
            // 建立li
            const listItem = document.createElement('li');

            // li 加入客製data-index屬性，紀錄每個li的項次
            listItem.setAttribute('data-index', index);

            // listItem的html
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
              <p class="person-name">${person}</p>
              <i class="fas fa-grip-lines"></i>
            </div>
            `
            // 儲存的排序清單加入所建立的十大首富清單
            listItems.push(listItem);

            // 加入到html
            draggable_list.appendChild(listItem);


        })

    // 加入所有drag drop的eventlistener
    addEventListeners();
}


// drag 
function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
  
function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}
  
function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}
  
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}
  
function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
}  

// drag drop 交換 list item
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    // 交換
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}


// 加上所有的drag drop的eventlistener
function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item =>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

// 檢查排序是否正確
function checkOrder(){
    listItems.forEach((listItem, index)=>{

        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
          } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
          }
    });
}

// eventlistner
check.addEventListener('click', checkOrder);