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
// querying the form to access form.elements
const $form = document.querySelector('form');
if (!$form) throw new Error('$formElements query failed.');
const $formElements = $form.elements;
// querying the title to toggle between 'New Entry' and 'Edit Entry'
const $editTitle = document.querySelector('.entry-main-heading');
if (!$editTitle) throw new Error('$editTitle query failed.');
// adding an event listener to handle submit
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const responses = {
    title: $formElements.title.value,
    'img-url': $formElements['img-url'].value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  // adding a condition to check if it's a new entry or the user is editing an old entry
  if (data.editing === null) {
    const entry = renderEntry(responses);
    $entriesContainer?.prepend(entry);
    data.entries.unshift(responses);
    data.nextEntryId++;
  } else {
    responses.entryId = data.editing.entryId;
    // replacing the old object with the new object in the array
    for (let i = 0; i < data.entries.length; i++) {
      if (responses.entryId === data.entries[i].entryId) {
        data.entries.splice(i, 1, responses);
      }
    }
    // replacing the old DOM Tree with the updated DOM Tree
    const entry = renderEntry(responses);
    const $liList = document.querySelectorAll('li');
    if (!$liList) throw new Error('$liList query failed');
    for (let i = 0; i < $liList.length; i++) {
      if ($liList[i].dataset.entryId === String(responses.entryId)) {
        $liList[i].replaceWith(entry);
      }
    }
    $editTitle.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
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
          <div class="row col-10 justify">
            <i class="fa-solid fa-pencil pencil-icon"></i>
          </div>
          <p class="entry-notes"></p>
          </div>
      </li> */
  const $li = document.createElement('li');
  $li.className = 'row list-item';
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
  $pencilContainer.className = 'row col-10 justify';
  const $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pencil pencil-icon cursor';
  $pencilContainer.appendChild($pencil);
  const $entryNotes = document.createElement('p');
  $entryNotes.className = 'entry-notes';
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
// defining a function to hide no-record message
function toggleNoEntries() {
  const $noEntries = document.querySelector('.no-record');
  if (!$noEntries) throw new Error('$noEntries query failed.');
  if (data.entries.length !== 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}
// querying the entry-form for view swap and appending the modal dialog
const $entryForm = document.querySelector('.entry-form');
if (!$entryForm) throw new Error('$entryForm query failed.');
// defining a function to swap views
function viewSwap(view) {
  const $entries = document.querySelector('.entries');
  if (!$entries) throw new Error('$entries query failed.');
  if (view === 'entries') {
    $entryForm?.classList.add('hidden');
    $entries.classList.remove('hidden');
  } else {
    $entries.classList.add('hidden');
    $entryForm?.classList.remove('hidden');
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
  $form.reset();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $deleteBtn.classList.add('hidden');
  viewSwap('entry-form');
});
// Adding an event listener to the <ul> -> pencil-icon with event delegation
$entriesContainer.addEventListener('click', (event) => {
  const $eventTarget = event.target;
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
    $placeholderImg.setAttribute('src', data.editing['img-url']);
  }
  $editTitle.textContent = 'Edit Entry';
  $deleteBtn.classList.remove('hidden');
});
// querying the submit-btn-wrapper to add delete-entry element
const $submitBtnWrapper = document.querySelector('.submit-btn-wrapper');
if (!$submitBtnWrapper) throw new Error('$btnContainer query failed.');
// creating a DOM Tree for delete-entry-btn
/*  <div class="row column-full align btns-container">
      <div class="btn-col">
        <button class="delete-btn">Delete Entry</button>
      </div>
      <div class="row btn-col justify submit-btn-wrapper"></div>
    </div>
*/
const $btnsContainer = document.createElement('div');
$btnsContainer.className = 'row column-full align btns-container';
const $deleteBtnWrapper = document.createElement('div');
$deleteBtnWrapper.className = 'btn-col';
const $deleteBtn = document.createElement('button');
$deleteBtn.className = 'delete-btn hidden cursor';
$deleteBtn.setAttribute('type', 'button');
$deleteBtn.textContent = 'Delete Entry';
$deleteBtnWrapper.appendChild($deleteBtn);
$submitBtnWrapper.before($btnsContainer);
$btnsContainer.append($deleteBtnWrapper, $submitBtnWrapper);
$submitBtnWrapper.classList.replace('column-full', 'btn-col');
// creating a modal dialog
/*  <dialog>
          <p>Are you sure you want to delete this entry?</p>
          <div class="row column-full align">
            <div class="btn-col modal-cancel">
              <button class="dismiss-modal">Cancel</button>
            </div>
            <div class="btn-col justify modal-confirm">
              <button class="confirm-modal">Confirm</button>
            </div>
          </div>
        </dialog>
    */
const $dialog = document.createElement('dialog');
$dialog.className = 'delete-entry-dialog';
const $container = document.createElement('div');
$container.className = 'row column-full align';
const $dialogText = document.createElement('p');
$dialogText.className = 'row column-full dialog-text';
$dialogText.textContent = 'Are you sure you want to delete this entry?';
const $modalBtnsContainer = document.createElement('div');
$modalBtnsContainer.className = 'row column-full align modal-btns-container';
const $cancelBtnWrapper = document.createElement('div');
$cancelBtnWrapper.className = 'btn-col modal-cancel';
const $cancelBtn = document.createElement('button');
$cancelBtn.className = 'dismiss-modal modal-btn cursor';
$cancelBtn.textContent = 'cancel';
$cancelBtnWrapper.appendChild($cancelBtn);
const $confirmBtnWrapper = document.createElement('div');
$confirmBtnWrapper.className = 'row btn-col justify modal-confirm';
const $confirmBtn = document.createElement('button');
$confirmBtn.className = 'confirm-modal modal-btn cursor';
$confirmBtn.textContent = 'confirm';
$confirmBtnWrapper.appendChild($confirmBtn);
$modalBtnsContainer.append($cancelBtnWrapper, $confirmBtnWrapper);
$container.append($dialogText, $modalBtnsContainer);
$dialog.appendChild($container);
$entryForm.appendChild($dialog);
// adding an event listener to delete-entry-btn to show the modal dialog
$deleteBtn.addEventListener('click', () => {
  $dialog.showModal();
});
// adding an event listener to hide the model dialog
$cancelBtn.addEventListener('click', () => {
  $dialog.close();
});
// adding an event listener to confirm-delete
$confirmBtn.addEventListener('click', () => {
  if (data.editing) {
    const $li = document.querySelectorAll('li');
    for (let i = 0; i < $li.length; i++) {
      if ($li[i].dataset.entryId === String(data.editing.entryId)) {
        $li[i].remove();
      }
    }
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries.splice(i, 1);
      }
    }
  }
  writeData();
  toggleNoEntries();
  $dialog.close();
  viewSwap('entries');
});
