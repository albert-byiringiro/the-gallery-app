import { rejects } from "assert";

// interface for pic url
interface Pic{
  download_url: string;
}

// get dom elements
const galleryContainer = document.querySelector<HTMLDivElement>('.gallery-container');
const shuffleButton = document.querySelector<HTMLButtonElement>('#shuffleButton');

// api for images
const url = `https://picsum.photos/v2/list?page=2&limit=20`;

// fetch for data
async function fetchData(url:string): Promise<Pic[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// boilerplate to loadImages
function loadImages(urls:string[]): Promise<HTMLImageElement[]> {
  return Promise.all(urls.map((url)=> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.alt = 'Gallery image';
      img.className = 'object-cover w-full h-full';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    })
  }))
}

// shuffle array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function displayPictures() {
  if (!galleryContainer) {
    console.log('GAllery container not found.');
    return;
  }

  galleryContainer.innerHTML = `
    <div class="loading text-center text-gray-500">Loading...</div>
  `

  const picsum = await fetchData(url);
  let images = picsum.map((pic) => pic.download_url);

  images = shuffleArray(images);

  try {
    const loadedImages = await loadImages(images);
    galleryContainer.innerHTML = ``;

    const fragment = document.createDocumentFragment();

    loadedImages.forEach((img)=>{
      const div = document.createElement('div');
      div.className = `overflow-hidden rounded-lg shadow-md`
      div.appendChild(img);
      fragment.appendChild(div);
    });

    galleryContainer.appendChild(fragment);
  } catch (error) {
    console.error(`Error loading images:`, error);
    galleryContainer.innerHTML = `<div class="error text-center text-red-500">Failed to load images.</div>`
    
  }
}

function shuffleAndDisplayImages() {
  if (!galleryContainer) {
    console.error('Gallery container not found.');
    return;
  }

  const images = Array.from(galleryContainer.querySelectorAll('img'));
  const shuffledImages = shuffleArray(images);

  galleryContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();

  shuffledImages.forEach((img) => {
    const div = document.createElement('div');
    div.className = 'overflow-hidden rounded-lg shadow-md';
    div.appendChild(img);
    fragment.appendChild(div);
  });

  galleryContainer.appendChild(fragment);
}

displayPictures();

shuffleButton?.addEventListener('click', shuffleAndDisplayImages);