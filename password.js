let generator = new PasswordGenator();
let button = document.querySelector('button');

function generatePasswordClick() {
    let password = generator.generatePassword();
    document.querySelector('#result').innerHTML = password;
}

button.addEventListener('click', generatePasswordClick);