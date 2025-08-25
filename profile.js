// Profile page functionality

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    // Check if user is logged in
    if (!currentUser) {
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = 'index.html';
        return;
    }
    
    // Get user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === currentUser);
    
    if (!user) {
        alert('المستخدم غير موجود');
        window.location.href = 'index.html';
        return;
    }
    
    // Display user profile information
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <div class="profile-section">
            <h3>المعلومات الشخصية</h3>
            <p><strong>الاسم:</strong> ${user.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${user.email}</p>
            <p><strong>رقم الهاتف:</strong> ${user.phone}</p>
            <p><strong>الفريق:</strong> ${user.team}</p>
            <p><strong>تاريخ التسجيل:</strong> ${user.registrationDate}</p>
        </div>
        
        <div class="profile-section">
            <h3>الإحصائيات</h3>
            <p><strong>عدد مرات الحضور:</strong> ${user.attendanceCount}</p>
        </div>
        
        <div class="profile-section">
            <h3>المكافآت</h3>
            <p><strong>مكافأة النوع الأول:</strong> ${user.bonus1}</p>
            <p><strong>مكافأة النوع الثاني:</strong> ${user.bonus2}</p>
            <p><strong>مكافأة النوع الثالث:</strong> ${user.bonus3}</p>
            <p><strong>مكافأة النوع الرابع:</strong> ${user.bonus4}</p>
            <p><strong>مكافأة النوع الخامس:</strong> ${user.bonus5}</p>
            <p><strong>مكافأة النوع السادس:</strong> ${user.bonus6}</p>
        </div>
        
        ${user.bookings && user.bookings.length > 0 ? `
        <div class="profile-section">
            <h3>الحجوزات</h3>
            ${user.bookings.map(booking => `
                <div class="booking-item">
                    <p><strong>${booking.name}</strong></p>
                    <p>التاريخ: ${booking.date} - الوقت: ${booking.time}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        <div class="profile-actions">
            <button onclick="window.location.href='map.html'" class="map-btn">خريطة الكنز</button>
            <button onclick="editProfile()" class="edit-btn">تعديل الملف الشخصي</button>
            <button onclick="logout()" class="logout-btn">تسجيل الخروج</button>
        </div>
    `;
});

// Edit profile function
function editProfile() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(user => user.email === currentUser);
    
    if (userIndex === -1) return;
    
    const user = users[userIndex];
    
    const newName = prompt('الاسم الجديد:', user.name);
    const newPhone = prompt('رقم الهاتف الجديد:', user.phone);
    
    if (newName !== null && newPhone !== null) {
        users[userIndex].name = newName || user.name;
        users[userIndex].phone = newPhone || user.phone;
        
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('تم تحديث الملف الشخصي بنجاح!');
        location.reload();
    }
}

// Logout function
function logout() {
    const confirmLogout = confirm('هل تريد تسجيل الخروج؟');
    if (confirmLogout) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}
