import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtSad66ixyx0uFkzowoEXFUWQamU7deZA",
  authDomain: "nippon-fall-2024-orgil.firebaseapp.com",
  projectId: "nippon-fall-2024-orgil",
  storageBucket: "nippon-fall-2024-orgil.firebasestorage.app",
  messagingSenderId: "438107780323",
  appId: "1:438107780323:web:1128b2adeedb251fb301d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("TODO App with firebase");



const db = getFirestore(app);
console.log(db);

const todoListUl = document.getElementById("todo-list");
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");

addButton.style.display ="none"


todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {  // Check if the pressed key is "Enter"
    event.preventDefault();  // Prevent the form from submitting if in a form context
    addTodo();  // Call the addTodo function
  }
});

async function addTodo() {

  const inputValue = todoInput.value;
  const todoLi = document.createElement("li");
  todoLi.textContent = inputValue;
  todoListUl.appendChild(todoLi);


  if (inputValue != "") {
    const background = document.querySelector(".background");
    background.style.display = "none";
    const collectionTodo = await addDoc(collection(db, "todos"), {
      title: inputValue,
      complete: false,
      createAt: serverTimestamp()
      
    });

    todoInput.value = "";
  } 
}

// Execute a function when the user presses a key on the keyboard



// show already existing data on todo list

const existingTodos = collection(db, "todos");

// onSnapshot(existingTodos,(snapshot) =>{
//     const changes = snapshot.docChanges();

//     changes.forEach((c) => {
//         console.log(c.doc.data());
//     const todoLi = document.createElement("li");
//     todoLi.textContent = "";

//     todoListUl.appendChild(todoLi);
//     });
// })
// dark light mode
document.querySelector('.changes').addEventListener('click', function () {
  const body = document.body;
  const changesIcon = document.querySelector('.changes');
  const emptyStateImage = document.getElementById('emptyImage');

  if (body.classList.contains('light')) {
    // Switch to light mode
    body.classList.remove('light');
    changesIcon.src = './img/ic_round-light-mode.png';
    emptyStateImage.src = './img/Empty-state-illustration-DT.png';
  } else {
    // Switch to dark mode
    body.classList.add('light');
    changesIcon.src = './img/iconamoon_mode-dark-fill.png';
    emptyStateImage.src = './img/Empty-state-illustration-LT.png';
  }
});
