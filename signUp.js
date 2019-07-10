const emailRE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
const displayError = document.querySelector('.display-msg')
const errorPassage = document.querySelector('.error-passage')


document.querySelector('.del-msg').addEventListener('click', e => {
    displayError.style.display = 'none';
});

let username = '';
let email = '';
let password1 = '';
let password2 = '';

document.querySelector('.username').addEventListener('change',e => username = e.target.value);
document.querySelector('.email').addEventListener('change',e => email = e.target.value);
document.querySelector('.password1').addEventListener('change',e => password1 = e.target.value);
document.querySelector('.password2').addEventListener('change',e => password2 = e.target.value);

document.querySelector('.submit-btn').addEventListener('click', e => {
    e.preventDefault();
    if (!username || !email || !password1 || !password2) {
        errorPassage.textContent='Please fill in all fields!'
        displayError.style.display = 'flex';
        return;
    }

    username = username.trim();
    email = email.trim();
    password1 = password1.trim();
    password2 = password2.trim();

    if (username.length < 3 ) {
        errorPassage.textContent='Username should be at least 3 characters long.'
        displayError.style.display = 'flex';
        return;
    }

    if (!emailRE.test(email)) {
        errorPassage.textContent='Email is invalid!'
        displayError.style.display = 'flex';
        return;
    }

    console.log(password1.length)
    console.log(password2.length)

    if (password1 != password2) {
        errorPassage.textContent='Passwords provided do not match!'
        displayError.style.display = 'flex';
        return;
    }

    window.location.href= './index.html'; 
  
});
