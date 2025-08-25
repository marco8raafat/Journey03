// Signup page functionality

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const team = document.getElementById('team').value;
        
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
            registrationDate: new Date().toLocaleDateString('ar-SA'),
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
        
        // Redirect to profile page
        window.location.href = 'profile.html';
    });
});
