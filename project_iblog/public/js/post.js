
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

async function handleImageUpload(file){
    const progressElement = document.getElementById('uploadProgress');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const profileImage = document.getElementById('coverImage');

    try {
        loadingOverlay.classList.add('active');
        progressElement.textContent = 'Uploading...';
        if(!file.type.startsWith('image/')){
            throw new Error('Please uplaod an image file');
        }

        if(file.size > 5 * 1024 * 1024) {
            throw new Error ('File size must be lower than 5MB');
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${(Date.now())}_${Math.random().toString(36).substring(2,9)}.${fileExt}`;
        console.log(fileName);

        const {data, error} = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
        if(error) throw error;

        const {data : { publicUrl}} = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

        console.log(publicUrl);
        console.log(data);

        await setDoc(doc(db, 'users', currentUser.uid),{
            avatarUrl: publicUrl,
            updateAt: new Date()
        }, {merge: true});
        profileImage.src = publicUrl;
        progressElement.textContent = 'Upload complete!';
        setTimeout(() =>{
            progressElement.textContent = '';
        }, 3000);
    } catch (error) {
        console.error('Error during image upload', error);
        progressElement.textContent = error.message || 'Upload failed';
        setTimeout(() => {
            progressElement.textContent = '';
        }, 3000);
    } finally {
        loadingOverlay.classList.remove('active');
    }
}

document.getElementById('imageUpload').addEventListener('change',(e) =>{
    const file = e.target.files[0];
    if(file){
        handleImageUpload(file);
    }
})

// load User Profile

async function loadUserProfile(){
    try {
        const userDoc = await getDoc(doc(db, 'users',currentUser.uid));
        if(userDoc.exists()){
            const userData = userDoc.data();
            if(userData.avatarUrl){
                document.getElementById('coverImage').src = userData.avatarUrl;
            }
        }
    } catch (e) {
        console.error('Error Loading Profile',e);
    }
}

onAuthStateChanged(auth, async (user) => {
    if(user) {
        currentUser = user;
    } else {
        window.location.href = "login.html";
    }
});

const postForm = document.getElementById('postForm');
const messageDiv = document.getElementById('message');

postForm.addEventListener('submit', async(e) =>{
    e.preventDefault();
    if(!currentUser){
        messageDiv.textContent = 'Please login to create a post';
        messageDiv.className = 'error';
        return;
    }

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    try{
        await addDoc(collection(db,'posts'),{
            title,
            category,
            content,
            userId:currentUser.uid,
            userEmail: currentUser.email,
            createAt: serverTimestamp()
        });
        messageDiv.textContent = 'Post created successfully!';
        messageDiv.className = 'success';
        postForm.reset();

        // Redirect to posts list after 2 seconds
        setTimeout(() =>{
            window.location.href = 'posts.html';
        },2000);
    } catch (error) {
        messageDiv.textContent = 'Error creating post' + error.messsage;
        messageDiv.className = 'error';
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'home.html';
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