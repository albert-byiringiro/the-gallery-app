"use strict";
// get dom elements
const galleryContainer = document.querySelector('.gallery-container');
const shuffleButton = document.querySelector('#shuffleButton');
// api for images
const url = `https://picsum.photos/v2/list?page=2&limit=100`;
