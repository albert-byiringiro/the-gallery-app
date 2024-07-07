// interface for pic url
interface Pic{
  download_url: string;
}

// get dom elements
const galleryContainer = document.querySelector<HTMLDivElement>('.gallery-container');
const shuffleButton = document.querySelector<HTMLButtonElement>('#shuffleButton');

// api for images
const url = `https://picsum.photos/v2/list?page=2&limit=100`;



