"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = `https://picsum.photos/v2/list?page=2&limit=100%203%20Message%20#group-1`;
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            // check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            const errMsg = error instanceof Error ? error.message : 'There was an error...';
            console.error(errMsg);
            // throw error;
            return [];
        }
    });
}
function displayPictures() {
    return __awaiter(this, void 0, void 0, function* () {
        const picsum = yield fetchData(url);
        const image = picsum.map((pic) => pic.url);
        console.log(image);
    });
}
displayPictures();
