/* ============================================
   شیلاناگرمیانی - JavaScript Functionality
   AI Copilot & File Management System
   ============================================ */

// ============ File Upload Management ============
document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = e.target.files;
    const filesList = document.getElementById('uploadedFiles');
    
    if (files.length === 0) return;
    
    for (let file of files) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = '📄 ' + file.name;
        
        const fileSize = document.createElement('div');
        fileSize.className = 'file-size';
        fileSize.textContent = 'قەبارە: ' + (file.size / 1024 / 1024).toFixed(2) + ' MB';
        
        const fileType = document.createElement('div');
        fileType.className = 'file-size';
        fileType.style.marginTop = '0.5rem';
        fileType.textContent = 'جۆری فایل: ' + file.type;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-small';
        deleteBtn.textContent = 'سڕینەوە';
        deleteBtn.style.marginTop = '1rem';
        deleteBtn.style.width = '100%';
        deleteBtn.style.background = '#d9534f';
        deleteBtn.style.color = 'white';
        deleteBtn.onclick = () => fileItem.remove();
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);
        fileItem.appendChild(fileType);
        fileItem.appendChild(deleteBtn);
        filesList.appendChild(fileItem);
    }
    
    // Reset input
    e.target.value = '';
});

// ============ AI Chat Functionality ============
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Sample AI Responses Database
const aiResponses = {
    'سلاو': 'سڵاو! چۆن دەتوانم یارمەتیت بدەم؟',
    'رابرت': 'لەکاتی رابردوودا چی دەتوێت بیخوێنیت؟',
    'pdf': 'دەتوانیت PDF فایلەکانت بارب بکەیت و مندافێم بیخوێنمەوە!',
    'word': 'فایلی Word بارب بکە، تا بتوانم شیکاری بکەم.',
    'تێز': 'دەربارەی تێزنامە یاخود نامەی ماستەر پرسیار هەیت؟',
    'ورکشاپ': 'ورکشاپ و سمینار بۆ چ موڵکی؟',
    'ai': 'من یارمەتیدەری AI‌م، دەتوانم وەڵامی ئەکادیمی بدەمەوە!',
    'default': 'بڕوانە، منیش بە یارمەتیدار دەتوانم! بۆ نمونە: "PDF"، "Word"، "تێز" یان "ورکشاپ" بنووسە.'
};

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Display user message
    displayMessage(message, 'user');
    
    // Get AI response
    const response = getAIResponse(message);
    
    // Simulate AI typing delay
    setTimeout(() => {
        displayMessage(response, 'ai');
    }, 500);
    
    userInput.value = '';
    userInput.focus();
}

function displayMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message ' + (sender === 'user' ? 'user-message' : 'ai-message');
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [key, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // Default response if no match found
    return aiResponses.default;
}

// Allow Enter key to send message
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ============ Smooth Scroll Navigation ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ Dynamic Content Loader ============
function loadSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transition = 'opacity 0.3s ease';
        }, 100);
    }
}

// ============ Local Storage for Saved Files ============
function saveFileMetadata(fileName, fileSize, fileType) {
    let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    files.push({
        name: fileName,
        size: fileSize,
        type: fileType,
        timestamp: new Date().toLocaleString('ku-IQ')
    });
    localStorage.setItem('uploadedFiles', JSON.stringify(files));
}

function loadSavedFiles() {
    const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const filesList = document.getElementById('uploadedFiles');
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-name">📄 ${file.name}</div>
            <div class="file-size">قەبارە: ${file.size}</div>
            <div class="file-size">کات: ${file.timestamp}</div>
        `;
        filesList.appendChild(fileItem);
    });
}

// ============ Export Functionality ============
function exportToWord() {
    alert('بۆ دانلۆڤ کردنی Word، بۆ Microsoft Office Suite بڕۆ!');
}

function exportToPDF() {
    alert('بۆ د��نلۆڤ کردنی PDF، بۆ بەشی PDF بڕۆ!');
}

function exportToExcel() {
    alert('بۆ دانلۆڤ کردنی Excel، بۆ بەشی داتا بڕۆ!');
}

// ============ Search Functionality ============
function searchContent(query) {
    const cards = document.querySelectorAll('.card');
    const lowerQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            card.style.display = 'block';
            card.style.animation = 'slideIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============ Theme Toggle (Optional) ============
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const root = document.documentElement;
    
    if (isDarkMode) {
        root.style.setProperty('--primary-cream', '#1a1a1a');
        root.style.setProperty('--text-dark', '#f5e6d3');
        root.style.setProperty('--white', '#2a2a2a');
    } else {
        root.style.setProperty('--primary-cream', '#F5E6D3');
        root.style.setProperty('--text-dark', '#2C2416');
        root.style.setProperty('--white', '#FFFFFF');
    }
}

// ============ Initialization ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 وێبسایتی شیلاناگرمیانی بار بووە!');
    loadSavedFiles();
    
    // Welcome message
    displayMessage('بە خێرا بێن! من یارمەتیدەری AI‌م. چۆن دەتوانم یارمەتیت بدەم؟', 'ai');
});

// ============ Error Handling ============
window.addEventListener('error', function(e) {
    console.error('خەبات:', e.message);
});

// ============ Performance Monitoring ============
window.addEventListener('load', function() {
    console.log('⚡ وێبسایت بە شێوازی تێکڕا بار بووە!');
    
    // Measure load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('کاتی بارکردن: ' + pageLoadTime + ' میلیسیکۆند');
});