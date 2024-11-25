document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#register form');
    const loginForm = document.querySelector('#login form');
    const createEventForm = document.querySelector('#admin form');
    

// Function to handle form submissions
const handleFormSubmission = async (form, url) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert(result.message || 'Operation successful!');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred. Please try again.');
    }
};

// Add event listeners to forms
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const adminForm = document.getElementById('admin-form');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmission(registerForm, '/api/register'); // Replace with your actual endpoint
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmission(loginForm, '/api/login'); // Replace with your actual endpoint
    });

    adminForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmission(adminForm, '/api/create-event'); // Replace with your actual endpoint
    });
});


    // Create event
    createEventForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmission(createEventForm, '/api/create-event'); // Replace with your actual API endpoint
    });
});

