import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const filterForm = document.querySelector('.feedback-form');
const formData = {};

initForm();

filterForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(Object.fromEntries(formData));
  filterForm.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

const inputListener = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};

filterForm.addEventListener('input', throttle(inputListener, 500));

function initForm() {
  const formDataString = localStorage.getItem(LOCALSTORAGE_KEY);
  if (formDataString) {
    const formData = JSON.parse(formDataString);
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        filterForm.elements[key].value = formData[key];
      }
    }
  }
}
