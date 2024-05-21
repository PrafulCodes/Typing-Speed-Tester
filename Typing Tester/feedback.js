document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comments = document.getElementById('comments').value;
    const params = {
        from_name: name,
        from_email: email,
        from_rating: rating,
        comments: comments,
        to_name: 'User',
    };
    console.log(params);
    if (name && email && rating && comments) {
        emailjs.send('service_r55to0f', 'template_uvnqch8', params)
        .then(() => {
            alert('Thank you for your feedback!');
            document.getElementById('feedback-form').reset();
        }, (error) => {
            alert('Failed to send feedback. Please try again later.');
            console.error('Failed to send feedback:', error);
        });
    } else {
        alert('Please fill in all fields.');
    }
});