window.addEventListener("load", function () {
  let emailForm = document.getElementById("emailForm");
  let inputInformation = document.getElementById("inputInformation");
  let firstNameInput = document.getElementById("firstNameInput");
  let firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
  let lastNameInput = document.getElementById("lastNameInput");
  let lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
  let starIdInput = document.getElementById("starIdInput");
  let starIdErrorMessage = document.getElementById("starIdErrorMessage");

  let continueButton = document.getElementById("continueButton");
  let result = document.getElementById("result");
  let returnButton = document.getElementById("returnButton");
  let rctcEmailResult = document.getElementById("rctcEmailResult");
  let starIdEmailResult = document.getElementById("starIdEmailResult");
  let firstName = "";
  let lastName = "";
  let starId = "";

  continueButton.addEventListener("click", processEmailForm);
  returnButton.addEventListener("click", returnToForm);

  result.style.display = "none";
  firstNameErrorMessage.style.display = "none";
  lastNameErrorMessage.style.display = "none";
  starIdErrorMessage.style.display = "none";

  function processEmailForm() {
    firstNameErrorMessage.style.display = "none";
    lastNameErrorMessage.style.display = "none";
    starIdErrorMessage.style.display = "none";

    firstName = firstNameInput.value;
    lastName = lastNameInput.value;
    starId = starIdInput.value;
    console.log(firstName.length, lastName.length, starId.length);

    if (validateFirstName()) {
      firstNameErrorMessage.style.display = "block";
      firstNameInput.classList.add("bg-danger-subtle");
    } else {
      firstNameInput.classList.remove("bg-danger-subtle");
    }

    if (lastName.length === 0) {
      lastNameErrorMessage.style.display = "block";
      lastNameInput.classList.add("bg-danger-subtle");
    } else {
      lastNameInput.classList.remove("bg-danger-subtle");
    }

    if (starId.length === 0) {
      starIdErrorMessage.style.display = "block";
      starIdInput.classList.add("bg-danger-subtle");
    } else {
      starIdInput.classList.remove("bg-danger-subtle");
    }

    // if (/^([A-Za-z]*)$/.test(starId)) {
    //   starIdInput.classList.add("bg-danger-subtle");
    // }

    lastName = lastName.toLocaleLowerCase();
    firstName = firstName.toLocaleLowerCase();

    starId = starId.toLocaleLowerCase();
    rctcEmailResult.textContent = firstName + "." + lastName + "@my.rctc.edu";
    starIdEmailResult.textContent = starId + "@go.minnstate.edu";

    if (firstName.length > 0 && lastName.length > 0 && starId.length > 0) {
      result.style.display = "block";
      inputInformation.style.display = "none";
    }
  }

  function returnToForm() {
    result.style.display = "none";
    inputInformation.style.display = "block";

    firstNameInput.value = "";
    lastNameInput.value = "";
    starIdInput.value = "";
    rctcEmailResult.textContent = "firstname.lastname@my.rctc.edu";
    starIdEmailResult.textContent = "wx1234yz@go.minnstate.edu";
  }

  function validateFirstName() {
    let validation = false;
    if (firstName.length === 0 && /^([A-Za-z]*)$/.test(firstName)) {
      validation = true;
    }
    return validation;
  }
});
