import { rejects } from "assert";

// interface for pic url
interface Pic{
  download_url: string;
}

// get dom elements
const galleryContainer = document.querySelector<HTMLDivElement>('.gallery-container');
const shuffleButton = document.querySelector<HTMLButtonElement>('#shuffleButton');

// api for images
const url = `https://picsum.photos/v2/list?page=2&limit=100`;

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

function loadImages(urls:string[]): Promise<HTMLImageElement[]> {
  return Promise.all(urls.map((url)=> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.alt = 'Gallery image';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    })
  }))
}
