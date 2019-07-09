const displayError = document.querySelector('.display-msg')

document.querySelector('.del-msg').addEventListener('click', e => {
    displayError.style.display = 'none';
});


document.querySelector('.submit-btn').addEventListener('click', e => {
    window.location.href='./index.html';
});

