
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

onAuthStateChanged(auth,(user)=>{
    if (user) {
        document.getElementById("userEmail").textContent = user.email;
    } else {
        window.location.href = "login.html";
    }
})

const logoutButton = document.getElementById("logoutBtn");

logoutButton.addEventListener("click", function(){
    signOut(auth).then(()=>{
        window.location.href = 'login.html';
    }).catch((e)=>{
        console.error('Error during sign out', e);
    })
});