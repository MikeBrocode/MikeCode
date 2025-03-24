document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    // In a real application, this would send a reset link to the user's email
    alert('If an account exists with this email, you will receive password reset instructions.');
    window.location.href = 'login.html';
});