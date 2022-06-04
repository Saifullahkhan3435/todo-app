const firebaseConfig = {
    apiKey: "AIzaSyDF-Hs_il7dNi8JoErzDQ4fmph88qYT0YY",
    authDomain: "todo-01-9a6b6.firebaseapp.com",
    databaseURL: "https://todo-01-9a6b6-default-rtdb.firebaseio.com",
    projectId: "todo-01-9a6b6",
    storageBucket: "todo-01-9a6b6.appspot.com",
    messagingSenderId: "911434256511",
    appId: "1:911434256511:web:bbf464833bd9d1f4d8ef4a"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


let list = document.getElementById("list")

function addTodo() {
    let new_todo = document.getElementById("new-todo")
    let key = firebase.database().ref('list').push().key  
    let list = {
      value : new_todo.value,
      key : key 
    }
    firebase.database().ref('list/' + key).set(list)
    
    new_todo.value =""
}

firebase.database().ref('list').on('child_added', function(data){
    let li = document.createElement("li")
    let liText = document.createTextNode(data.val().value)
    li.appendChild(liText)

    // create delete button
    let div = document.createElement('div')

    let delBtn = document.createElement("button")
    let delBtnTxt = document.createTextNode("Delete")
    delBtn.setAttribute("class" , "btn")
    delBtn.setAttribute("onclick" , "deleteItem(this)")
    delBtn.setAttribute('id',data.val().key)
    

    delBtn.appendChild(delBtnTxt)
    li.appendChild(delBtn)

    // create edit button
    
    var editBtn = document.createElement("button");
    var editBtnTxt = document.createTextNode("Edit");
    editBtn.appendChild(editBtnTxt);
    editBtn.setAttribute('class',"editBtn");
    editBtn.setAttribute("onclick" , "editItem(this)")
    editBtn.setAttribute('id',data.val().key)
    li.appendChild(editBtn)

    div.appendChild(delBtn)
    div.appendChild(editBtn)
    li.appendChild(div)
    div.setAttribute('class','div')


    
    list.appendChild(li)
    
})


function deleteItem(e){
    e.parentNode.parentNode.remove()
    firebase.database().ref('list/' + e.id).remove()
    
}

function editItem(e){
   let val = e.parentNode.parentNode.firstChild.nodeValue;
   console.log(val)
   let editValue = prompt("Enter your Edit value" , val)
   e.parentNode.parentNode.firstChild.nodeValue = editValue;
   let list = {
       value :editValue,
       key : e.id
   }
   firebase.database().ref('list/' + e.id).set(list)


}

function deleteAll(){
    list.innerHTML = ""
    firebase.database().ref('list').remove()
}