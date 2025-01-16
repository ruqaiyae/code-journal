interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  'img-url': HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface EntryResponse {
  title: string;
  'img-url': string;
  notes: string;
  entryId: number;
}

// querying img and placeholder img to update src
const $imgURL = document.querySelector('#img-url');
const $placeholderImg = document.querySelector('.placeholder-image');

if (!$imgURL) throw new Error('$imgURL query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');

// Adding an event listener to update Photo URL
$imgURL.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;

  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});

const $form = document.querySelector('form');
if (!$form) throw new Error('$formElements query failed.');

// Adding an event listener to handle submit
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const $formElements = $form.elements as FormElements;

  const responses: EntryResponse = {
    title: $formElements.title.value,
    'img-url': $formElements['img-url'].value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };

  viewSwap('entries');

  data.nextEntryId++;
  data.entries.unshift(responses);

  writeData();

  const entry = renderEntry(responses);
  $entriesContainer?.prepend(entry);

  toggleNoEntries();

  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

// defining a function to create a DOM Tree
function renderEntry(entry: EntryResponse): HTMLElement {
  const $li = document.createElement('li');
  $li.className = 'row';

  const $imgContainer = document.createElement('div');
  $imgContainer.className = 'column-half';

  const $img = document.createElement('img');
  $img.setAttribute('src', entry['img-url']);
  $img.setAttribute('alt', 'entry-image');
  $img.className = 'entry-image';

  $imgContainer.appendChild($img);

  const $contentContainer = document.createElement('div');
  $contentContainer.className = 'column-half entry-content';

  const $entryTitle = document.createElement('h3');
  $entryTitle.className = 'entry-title';
  $entryTitle.textContent = entry.title;

  const $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;

  $contentContainer.append($entryTitle, $entryNotes);

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
function toggleNoEntries(): void {
  const $noEntries = document.querySelector('.no-record');
  if (!$noEntries) throw new Error('$noEntries query failed.');

  if (data.entries.length !== 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}

// Defining a function to swap views
function viewSwap(view: string): void {
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
