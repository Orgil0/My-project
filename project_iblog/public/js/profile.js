
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
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
const db = getFirestore(app);

const supabaseUrl = 'https://srlodcdkjgedlzfpflwk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybG9kY2RramdlZGx6ZnBmbHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MjgzMzYsImV4cCI6MjA1NDMwNDMzNn0.w7PJZHi30_l1i8UFnK33ejfgJe7523xRyn2AiDYrQXo'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        displayUserInfo();
        await loadUserProfile();
        await loadUserStats();
    } else {
        window.location.href = "login.html"
    }
});

function displayUserInfo() {
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');

    profileEmail.textContent = currentUser.email;
    // profileAvatar.textContent = currentUser.email[0].toUpperCase()
}

async function loadUserProfile() {
    try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
            console.log(userDoc);
            const userData = userDoc.data();
            document.getElementById('displayName').value = userData.displayName || '';
            
            
        }
    } catch (error) {
        console.error("Error loading profile", error);
        showMessage('Error loading profile', false);
    }
    try {
            const userDoc = await getDoc(doc(db, 'users',currentUser.uid));
            if(userDoc.exists()){
                const userData = userDoc.data();
                if(userData.avatarUrl){
                    document.getElementById('profileImage').src = userData.avatarUrl;
                }
            }
        } catch (e) {
            console.error('Error Loading Profile',e);
        }

}

async function loadUserStats() {
    try {
        const postsQuery = query(
            collection(db, 'posts'),
            where('userid', '==', currentUser.uid)
        );
        const postsSnapshot = await getDocs(postsQuery);
        document.getElementById('postsCount').textContent = postsSnapshot.size;

    } catch (error) {
        
    }
}

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const saveButton = document.getElementById('saveButton');
    saveButton.disabled = true;

    try {
        const userData = {
            displayName: document.getElementById('displayName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            bio: document.getElementById('bio').value,
            updateAt: new Date()
        }

        await setDoc(doc(db, 'users', currentUser.uid), userData, { merge: true });
        showMessage('Profile Updated Succesfully', true);
    } catch (error) {
        console.error('Error updating profile', error);
        showMessage('Error updating profile', false);
    }
});

function showMessage(message, isSuccess) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.classList = `message ${isSuccess ? 'success' : 'error'}`;

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = 'message';
    }, 3000);
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error during logout', error);
            showMessage('Error during logout', false);
        })
})

document.getElementById('myProfile').addEventListener('click',()=>{
    window.location.href = 'profile.html';
});

// Select the profile element and dropdown menu
const profileIcon = document.getElementById('profile');
const profileDropdown = document.getElementById('profileDropdown');

// Toggle the dropdown when the profile icon is clicked
profileIcon.addEventListener('click', function(event) {
  // Prevent the link from navigating
  event.preventDefault();

  // Toggle visibility of the dropdown
  profileDropdown.style.display = (profileDropdown.style.display === 'block') ? 'none' : 'block';
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
  if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
    profileDropdown.style.display = 'none';
  }
});




