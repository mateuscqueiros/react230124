const inputName = document.querySelector("input[name='nome']").value;
const email = document.getElementById("email").value;
const password = document.querySelector("input[type='password']").value;
let submitButton = document.querySelector("button[type='submit']");

function submitCallback(event) {
  event.preventDefault();
  console.log({
    name: inputName,
    email,
    password,
  });
}

document.addEventListener("submit", submitCallback);
