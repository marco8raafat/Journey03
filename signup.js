// Signup page functionality with Firebase

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
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const roleSelect = document.getElementById('role');
    const adminTokenWrapper = document.getElementById('adminTokenWrapper');
    const adminTokenInput = document.getElementById('adminToken');

    // Simple hard-coded admin token (you can change / externalize later)
    const ADMIN_TOKEN = 'TRAIN-ADMIN-2025';

    // Show/hide token field based on role
    roleSelect.addEventListener('change', () => {
        const isAdmin = roleSelect.value === 'admin';
        if (isAdmin) {
            adminTokenWrapper.style.display = 'block';
            requestAnimationFrame(() => adminTokenWrapper.classList.add('show'));
            adminTokenInput.required = true;
        } else {
            adminTokenWrapper.classList.remove('show');
            setTimeout(()=>{ adminTokenWrapper.style.display = 'none'; }, 350);
            adminTokenInput.required = false;
            adminTokenInput.value = '';
        }
    });
    
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const team = document.getElementById('team').value;
        const role = roleSelect.value;
        const providedToken = adminTokenInput.value.trim();

        // Validate admin token if admin role is selected
        if (role === 'admin') {
            if (!providedToken) {
                alert('الرجاء إدخال رمز الأدمن');
                return;
            }
            if (providedToken !== ADMIN_TOKEN) {
                alert('رمز الأدمن غير صحيح');
                return;
            }
        }
        
        try {
            // Create a safe key from email (replace . with _ since Firebase keys can't contain .)
            const emailKey = email.replace(/\./g, '_').replace(/@/g, '_at_');
            
            // Check if email already exists in Firebase
            const userRef = ref(database, `users/${emailKey}`);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                alert('هذا البريد الإلكتروني مستخدم بالفعل');
                return;
            }
            
            // Create new user object
            const newUser = {
                name: name,
                email: email,
                password: password,
                phone: phone,
                team: team,
                attendanceCount: 0,
                bonus1: 0,
                bonus2: 0,
                bonus3: 0,
                bonus4: 0,
                bonus5: 0,
                bonus6: 0,
                role: role,
                registrationDate: new Date().toLocaleDateString('en-GB'),
                bookings: []
            };
            
            // Save new user to Firebase using email as key
            await set(userRef, newUser);
            
            // Set current user session (you might want to use a more secure session management)
            localStorage.setItem('currentUser', email);
            
            // Show success message
            alert('تم إنشاء الحساب بنجاح!');
            
            // Redirect based on role
            if (role === 'admin') {
                window.location.href = 'adminDash.html';
            } else {
                window.location.href = 'map4.html';
            }
            
        } catch (error) {
            console.error('Error creating account:', error);
            alert('حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.');
        }
    });
});