interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  'img-url': HTMLInputElement;
  notes: HTMLTextAreaElement;
  entryId: number;
}

const $formElements = document.querySelector('form');
const $placeholderImg = document.querySelector('.placeholder-image');

if (!$formElements) throw new Error('$formElements query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');

// Adding an event listener to update Photo URL
$formElements.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;

  if (!$eventTarget.matches('#img-url')) {
    return;
  }

  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});

// Adding an event listener to handle submit
$formElements.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLFormElement;

  if (!$eventTarget.matches('.submit-btn')) {
    return;
  }

  event.preventDefault();

  const formElements = $formElements.elements as FormElements;

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
