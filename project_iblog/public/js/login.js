import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "home.html";
    }
})

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    loginError.textContent = "";

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "profile.html";
        })
        .catch((e) => {
            loginError.textContent = e.message;
        });
});