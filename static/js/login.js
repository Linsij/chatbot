document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Send login request to backend
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Redirect to the chat interface on successful login
                window.location.href = '/chat';
            } else {
                // Display error message
                errorMessage.textContent = data.message || 'Invalid username or password';
                errorMessage.classList.add('show');
                
                // Clear password field
                document.getElementById('password').value = '';
            }
        })
        .catch(error => {
            // Display error message for network issues
            errorMessage.textContent = 'Server error. Please try again later.';
            errorMessage.classList.add('show');
            console.error('Error:', error);
        });
    });
    
    // Clear error message when user starts typing again
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            errorMessage.classList.remove('show');
        });
    });
});