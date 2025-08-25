// Signup page functionality

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const roleSelect = document.getElementById('role');
    const adminTokenWrapper = document.getElementById('adminTokenWrapper');
    const adminTokenInput = document.getElementById('adminToken');

    // Simple hard-coded admin token (you can change / externalize later)
    const ADMIN_TOKEN = 'TRAIN-ADMIN-2025';

    // Show/hide token field based on role
    roleSelect.addEventListener('change', () => {
        if (roleSelect.value === 'admin') {
            adminTokenWrapper.style.display = 'block';
            adminTokenInput.required = true;
        } else {
            adminTokenWrapper.style.display = 'none';
            adminTokenInput.required = false;
            adminTokenInput.value = '';
        }
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const team = document.getElementById('team').value;
        const role = roleSelect.value;
        const providedToken = adminTokenInput.value.trim();

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
        
        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
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
        
        // Add new user to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user session
        localStorage.setItem('currentUser', email);
        
        // Show success message
        alert('تم إنشاء الحساب بنجاح!');
        
        // Redirect based on role
        if (role === 'admin') {
            window.location.href = 'adminDash.html';
        } else {
            window.location.href = 'map4.html';
        }
    });
});
