document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen for exactly 2 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
            document.querySelector('.login-container').style.display = 'flex';
        }, 200); // Reduced fade-out transition to 200ms
    }, 2000); // Exactly 2 seconds

    const loginForm = document.getElementById('loginForm');
    
    // Get stored user data if it exists
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {
        username: 'admin',
        password: 'password123'
    };

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.classList.add('loading');
        
        // Simulate login process
        setTimeout(() => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if ((username === 'admin' && password === 'password123') || 
                (username === storedUserData?.username && password === storedUserData?.password)) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                loginBtn.classList.remove('loading');
                alert('Invalid username or password');
            }
        }, 1000);
    });
});
