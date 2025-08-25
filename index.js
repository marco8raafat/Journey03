// Login page functionality

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user with matching email and password
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            // Store current user session
            localStorage.setItem('currentUser', email);
            
            // Show success message
            alert('تم تسجيل الدخول بنجاح!');
            
            // Redirect to map4 page
            window.location.href = 'map4.html';
        } else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    });
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'map4.html';
    }
});
