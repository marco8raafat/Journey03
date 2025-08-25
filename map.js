// Treasure Map JavaScript Functions

// Initialize level data
const levelData = {
    1: { name: "المستوى الأول: بداية المغامرة", tickets: 15, description: "ابدأ رحلتك في عالم الكنوز المخفية" },
    2: { name: "المستوى الثاني: الغابة المظلمة", tickets: 12, description: "تجول في الغابة واكتشف الأسرار المخفية" },
    3: { name: "المستوى الثالث: الكهف المسحور", tickets: 8, description: "اكتشف أسرار الكهف وكنوزه الثمينة" },
    4: { name: "المستوى الرابع: النهر الذهبي", tickets: 10, description: "اعبر النهر الذهبي وواجه التحديات" },
    5: { name: "المستوى الخامس: الجبل الأسود", tickets: 6, description: "تسلق الجبل الأسود وابحث عن الكنز المفقود" },
    6: { name: "المستوى السادس: الصحراء الملتهبة", tickets: 9, description: "اجتز الصحراء الحارة وابحث عن الواحة" },
    7: { name: "المستوى السابع: القلعة المهجورة", tickets: 7, description: "استكشف القلعة المهجورة وكشف أسرارها" },
    8: { name: "المستوى الثامن: البحيرة الزرقاء", tickets: 5, description: "اغطس في البحيرة الزرقاء واكتشف كنوزها" },
    9: { name: "المستوى التاسع: المدينة المفقودة", tickets: 4, description: "اكتشف المدينة المفقودة وكنوزها الأثرية" },
    10: { name: "المستوى العاشر: البرج السحري", tickets: 3, description: "اصعد البرج السحري وواجه التحدي الأعظم" },
    11: { name: "المستوى الحادي عشر: عرش الملوك", tickets: 2, description: "اقترب من عرش الملوك واستعد للمعركة النهائية" },
    12: { name: "المستوى الثاني عشر: الكنز الأعظم", tickets: 1, description: "الوصول إلى الكنز الأعظم والفوز بالمغامرة" }
};

// Load saved level data from localStorage
function loadLevelData() {
    const savedData = localStorage.getItem('treasureMapData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(levelData, parsedData);
        updateTicketDisplay();
    }
}

// Save level data to localStorage
function saveLevelData() {
    localStorage.setItem('treasureMapData', JSON.stringify(levelData));
}

// Update ticket display on page
function updateTicketDisplay() {
    for (let level = 1; level <= 12; level++) {
        const ticketElement = document.querySelector(`[data-level="${level}"] .tickets`);
        if (ticketElement) {
            ticketElement.textContent = levelData[level].tickets;
        }
    }
}

// Book a level
function bookLevel(levelNumber) {
    const level = levelData[levelNumber];
    
    if (level.tickets <= 0) {
        alert('عذراً، لا توجد تذاكر متاحة لهذا المستوى');
        return;
    }
    
    const confirmBooking = confirm(`هل تريد حجز تذكرة للمستوى ${levelNumber}: ${level.name}؟`);
    
    if (confirmBooking) {
        level.tickets -= 1;
        saveLevelData();
        updateTicketDisplay();
        
        // Save booking to user profile
        saveBookingToProfile(levelNumber, level.name);
        
        alert(`تم حجز تذكرة بنجاح للمستوى ${levelNumber}!\nالتذاكر المتبقية: ${level.tickets}`);
    }
}

// Save booking information to user profile
function saveBookingToProfile(levelNumber, levelName) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(user => user.email === currentUser);
    
    if (userIndex !== -1) {
        if (!users[userIndex].bookings) {
            users[userIndex].bookings = [];
        }
        
        users[userIndex].bookings.push({
            level: levelNumber,
            name: levelName,
            date: new Date().toLocaleDateString('ar-SA'),
            time: new Date().toLocaleTimeString('ar-SA')
        });
        
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Add smooth scrolling for level navigation
function scrollToLevel(levelNumber) {
    const level = document.querySelector(`[data-level="${levelNumber}"]`);
    if (level) {
        level.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Hide all tooltips
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    }
});

// Add sound effects (optional)
function playBookingSound() {
    // You can add audio here if needed
    console.log('Booking sound played');
}

// Initialize the map when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadLevelData();
    
    // Add animation to path drawing
    const path = document.querySelector('.treasure-path path');
    if (path) {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
        path.style.strokeDashoffset = pathLength;
        
        setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 3s ease-in-out';
            path.style.strokeDashoffset = '0';
        }, 500);
    }
    
    // Add entrance animation to levels
    const levels = document.querySelectorAll('.level');
    levels.forEach((level, index) => {
        level.style.opacity = '0';
        level.style.transform = 'scale(0)';
        
        setTimeout(() => {
            level.style.transition = 'all 0.5s ease';
            level.style.opacity = '1';
            level.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
    });
});

// Add progress tracking
function getCompletedLevels() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return [];
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === currentUser);
    
    return user?.bookings?.map(booking => booking.level) || [];
}

// Mark completed levels visually
function markCompletedLevels() {
    const completedLevels = getCompletedLevels();
    
    completedLevels.forEach(levelNumber => {
        const levelElement = document.querySelector(`[data-level="${levelNumber}"]`);
        if (levelElement) {
            levelElement.classList.add('completed');
            const icon = levelElement.querySelector('.level-icon');
            icon.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
            icon.innerHTML = '✓';
        }
    });
}
