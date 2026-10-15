const formState = {
email: "",
message: "",
};

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageInput = form.elements.message;

populateForm();

form.addEventListener("input", onFormInput);
form.addEventListener("submit", onFormSubmit);

function onFormInput(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  if (fieldName in formState) {
    formState[fieldName] = fieldValue;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
  }
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      formState.email = parsedData.email ? parsedData.email.trim() : "";
      formState.message = parsedData.message ? parsedData.message.trim() : "";

      emailInput.value = formState.email;
      messageInput.value = formState.message;
    } catch (error) {
      console.error("Error parsing stored feedback form state:", error);
    }
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const currentEmail = emailInput.value.trim();
  const currentMessage = messageInput.value.trim();

  if (!currentEmail || !currentMessage) {
    alert("Fill please all fields");
    return;
  }

  formState.email = currentEmail;
  formState.message = currentMessage;

  console.log(formState);

  localStorage.removeItem(STORAGE_KEY);

  formState.email = "";
  formState.message = "";

  form.reset();
}