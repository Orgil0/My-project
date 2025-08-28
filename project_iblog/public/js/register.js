import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCtSad66ixyx0uFkzowoEXFUWQamU7deZA",
    authDomain: "nippon-fall-2024-orgil.firebaseapp.com",
    projectId: "nippon-fall-2024-orgil",
    storageBucket: "nippon-fall-2024-orgil.firebasestorage.app",
    messagingSenderId: "438107780323",
    appId: "1:438107780323:web:e62b1807f98caaddb301d6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user)=> {
  if (user) {
    window.location.href = "home..html";
  }
})

const registerForm = document.getElementById('register');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  

  const email = document.getElementById('email').value;
  const password = document.getElementById ('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // reset error messages
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';

  // validate password length
  if(password.length < 6){
    passwordError.textContent = 'Password length must be longer than 6';
    return;
  }

  //  Check password and confirm password identity
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Password does not match";
    return
  }
createUserWithEmailAndPassword(auth, email,password)
.then(()=>{
  window.location.href = 'home.html';
}).catch((e) =>{
  alert(e.message);
})

})