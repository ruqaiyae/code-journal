'use strict';
// querying img and placeholder img to update src
const $imgURL = document.querySelector('#img-url');
const $placeholderImg = document.querySelector('.placeholder-image');
if (!$imgURL) throw new Error('$imgURL query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');
// Adding an event listener to update Photo URL
$imgURL.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});
const $form = document.querySelector('form');
if (!$form) throw new Error('$formElements query failed.');
const $formElements = $form.elements;
// Adding an event listener to handle submit
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const responses = {
    title: $formElements.title.value,
    'img-url': $formElements['img-url'].value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  viewSwap('entries');
  const entry = renderEntry(responses);
  $entriesContainer?.prepend(entry);
  data.nextEntryId++;
  data.entries.unshift(responses);
  writeData();
  toggleNoEntries();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
// defining a function to create a DOM Tree
function renderEntry(entry) {
  /* <li class="row" data-entry-id= >
        <div class="column-half">
          <img src="" alt="entry-image" class="entry-image" />
        </div>
        <div class="row column-half entry-content">
          <h3 class="entry-title col-90"></h3>
          <div class="row col-10 justify pencil-container">
            <i class="fa-solid fa-pencil pencil-icon"></i>
          </div>
          <p></p>
          </div>
      </li> */
  const $li = document.createElement('li');
  $li.className = 'row';
  $li.setAttribute('data-entry-id', String(entry.entryId));
  const $imgContainer = document.createElement('div');
  $imgContainer.className = 'column-half';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry['img-url']);
  $img.setAttribute('alt', 'entry-image');
  $img.className = 'entry-image';
  $imgContainer.appendChild($img);
  const $contentContainer = document.createElement('div');
  $contentContainer.className = 'row column-half entry-content';
  const $entryTitle = document.createElement('h3');
  $entryTitle.className = 'entry-title col-90';
  $entryTitle.textContent = entry.title;
  const $pencilContainer = document.createElement('div');
  $pencilContainer.className = 'row col-10 justify pencil-container';
  const $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pencil pencil-icon';
  $pencilContainer.appendChild($pencil);
  const $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $contentContainer.append($entryTitle, $pencilContainer, $entryNotes);
  $li.append($imgContainer, $contentContainer);
  return $li;
}
// querying the container to list entries
const $entriesContainer = document.querySelector('#entries-list');
if (!$entriesContainer) throw new Error('$entriesContainer query failed.');
// Adding an event listener to update the entries
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $entriesContainer.append($entry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
// Defining a function to hide no-record message
function toggleNoEntries() {
  const $noEntries = document.querySelector('.no-record');
  if (!$noEntries) throw new Error('$noEntries query failed.');
  if (data.entries.length !== 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}
// Defining a function to swap views
function viewSwap(view) {
  const $entryForm = document.querySelector('.entry-form');
  const $entries = document.querySelector('.entries');
  if (!$entryForm) throw new Error('$entryForm query failed.');
  if (!$entries) throw new Error('$entries query failed.');
  if (view === 'entries') {
    $entryForm.classList.add('hidden');
    $entries.classList.remove('hidden');
  } else {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }
  data.view = view;
  writeData(); /* updating the view in local storage */
}
// Adding an event listener to "entries" in the header
const $entriesElement = document.querySelector('.entries-link');
if (!$entriesElement) throw new Error('$entriesElement query failed.');
$entriesElement.addEventListener('click', () => {
  viewSwap('entries');
});
// Adding an event listener to "NEW" btn
const $newBtn = document.querySelector('.new-entry-btn');
if (!$newBtn) throw new Error('$newBtn query failed.');
$newBtn.addEventListener('click', () => {
  viewSwap('entry-form');
});
// Adding an event listener to the <ul> -> pencil-icon with event delegation
$entriesContainer.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  console.log($eventTarget);
  if (!$eventTarget.matches('.pencil-icon')) {
    return;
  }
  viewSwap('entry-form');
  const $listItem = $eventTarget.closest('li');
  const $itemID = Number($listItem?.dataset.entryId);
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === $itemID) {
      data.editing = data.entries[i];
    }
  }
  if (data.editing) {
    $formElements.title.value = data.editing.title;
    $formElements['img-url'].value = data.editing['img-url'];
    $formElements.notes.value = data.editing.notes;
  }
  const $editTitle = document.querySelector('.entry-main-heading');
  if (!$editTitle) throw new Error('$editTitle query failed.');
  $editTitle.textContent = 'Edit Entry';
});
