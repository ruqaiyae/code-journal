'use strict';
const $imgInput = document.querySelector('#img-url');
const $placeholderImg = document.querySelector('.placeholder-image');
if (!$imgInput) throw new Error('$imgInput query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');
$imgInput.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});
