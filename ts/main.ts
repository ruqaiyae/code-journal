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

const $form = document.querySelector('form');
const $placeholderImg = document.querySelector('.placeholder-image');

if (!$form) throw new Error('$formElements query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');

// Adding an event listener to update Photo URL
$form.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;

  if (!$eventTarget.matches('#img-url')) {
    return;
  }

  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});

// Adding an event listener to handle submit
$form.addEventListener('click', (event: Event) => {
  event.preventDefault();

  const $eventTarget = event.target as HTMLFormElement;
  if (!$eventTarget.matches('.submit-btn')) {
    return;
  }

  const $formElements = $form.elements as FormElements;

  const responses: EntryResponse = {
    title: $formElements.title.value,
    'img-url': $formElements['img-url'].value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(responses);
  writeData();

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

// Adding an event listener to update the entries
document.addEventListener('DOMContentLoaded', () => {
  // querying the container to list entries
  const $entriesContainer = document.querySelector('#entries');
  if (!$entriesContainer) throw new Error('$entriesContainer query failed.');

  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $entriesContainer.append($entry);
  }
});
