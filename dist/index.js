var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// get dom elements
const galleryContainer = document.querySelector('.gallery-container');
const shuffleButton = document.querySelector('#shuffleButton');
// api for images
const url = `https://picsum.photos/v2/list?page=2&limit=10`;
// fetch for data
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    });
}
function loadImages(urls) {
    return Promise.all(urls.map((url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.alt = 'Gallery image';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        });
    }));
}
function displayPictures() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!galleryContainer) {
            console.log('GAllery container not found.');
            return;
        }
        galleryContainer.innerHTML = `
    <div>Loading...</div>
  `;
        const picsum = yield fetchData(url);
        const images = picsum.map((pic) => pic.download_url);
        try {
            const loadedImages = yield loadImages(images);
            galleryContainer.innerHTML = ``;
            const fragment = document.createDocumentFragment();
            loadedImages.forEach((img) => {
                const div = document.createElement('div');
                div.appendChild(img);
                fragment.appendChild(div);
            });
            galleryContainer.appendChild(fragment);
        }
        catch (error) {
            console.error(`Error loading images:`, error);
            galleryContainer.innerHTML = `<div>Failed to load images.</div>`;
        }
    });
}
displayPictures();
export {};
