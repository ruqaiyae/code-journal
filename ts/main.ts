const $imgInput = document.querySelector('#img-url');
const $placeholderImg = document.querySelector('.placeholder-image');

if (!$imgInput) throw new Error('$imgInput query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');

$imgInput.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  const $imgSrc = $eventTarget.value;

  $placeholderImg.setAttribute('src', $imgSrc);
});
