/*  Client Side JS  */

//variable for holding all querys matching class
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')


//loop array and listen for a click to run given function
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})


//Delete fetch functions to delete item from data base
async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//Update fetch functions to mark item complete on data base
async function markComplete(){
    const todoId = this.parentNode.dataset.id //grabs todoId text
    try{
        //fetch todos from route markComplete and go to db
        const response = await fetch('todos/markComplete', {
            method: 'put', //update
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId //asign todoIdFromJSFile to the todoId text
            })
        })
        const data = await response.json() //data recieved from update
        console.log(data)
        location.reload() //get uppdated documents from db
    }catch(err){
        console.log(err)
    }
}

//Update fetch functions to mark item incomplete on data base
async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}