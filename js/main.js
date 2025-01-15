'use strict';
const $formElements = document.querySelector('form');
const $placeholderImg = document.querySelector('.placeholder-image');
if (!$formElements) throw new Error('$formElements query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');
// Adding an event listener to update Photo URL
$formElements.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.matches('#img-url')) {
    return;
  }
  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});
// Adding an event listener to handle submit
$formElements.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.matches('.submit-btn')) {
    return;
  }
  event.preventDefault();
  const formElements = $formElements.elements;
  const responses = {
    title: formElements.title.value,
    'img-url': formElements['img-url'].value,
    notes: formElements.notes.value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(responses);
  console.log(data.entries);
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElements.reset();
});
