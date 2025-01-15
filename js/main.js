'use strict';
const $form = document.querySelector('form');
const $placeholderImg = document.querySelector('.placeholder-image');
if (!$form) throw new Error('$formElements query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');
// Adding an event listener to update Photo URL
$form.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.matches('#img-url')) {
    return;
  }
  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});
// Adding an event listener to handle submit
$form.addEventListener('click', (event) => {
  event.preventDefault();
  const $eventTarget = event.target;
  if (!$eventTarget.matches('.submit-btn')) {
    return;
  }
  const $formElements = $form.elements;
  const responses = {
    title: $formElements.title.value,
    'img-url': $formElements['img-url'].value,
    notes: $formElements.notes.value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(responses);
  dataToJSON();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
