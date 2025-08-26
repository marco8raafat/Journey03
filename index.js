// Login page functionality with Firebase

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHp8tHdlNoykCrMFZvl1gJKwcIGLcJ8gM",
    authDomain: "journey03-ed32f.firebaseapp.com",
    databaseURL: "https://journey03-ed32f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "journey03-ed32f",
    storageBucket: "journey03-ed32f.firebasestorage.app",
    messagingSenderId: "637158543040",
    appId: "1:637158543040:web:4ddfd0c0bc412cb6716725",
    measurementId: "G-PPVXVYL8E2"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Create a safe key from email (same conversion as in signup)
            const emailKey = email.replace(/\./g, '_').replace(/@/g, '_at_');
            
            // Get user from Firebase
            const userRef = ref(database, `users/${emailKey}`);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                const user = snapshot.val();
                
                // Check if password matches
                if (user.password === password) {
                    // Store current user session
                    localStorage.setItem('currentUser', email);
                    
                    // Show success message
                    alert('تم تسجيل الدخول بنجاح!');
                    
                    // Redirect based on role
                    if (user.role === 'admin') {
                        window.location.href = 'adminDash.html';
                    } else {
                        window.location.href = 'map4.html';
                    }
                } else {
                    alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
                }
            } else {
                alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            }
            
        } catch (error) {
            console.error('Error during login:', error);
            alert('حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.');
        }
    });
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // You might want to verify the session with Firebase here
        // For now, just redirect to the main page
        window.location.href = 'map4.html';
    }
});