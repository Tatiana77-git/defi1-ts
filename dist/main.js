"use strict";
const myName = "World";
console.log(`Hello, ${myName}`);
const data = {
    books: [
        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            year: 1937,
        },
        {
            title: "1984",
            author: "George Orwell",
            year: 1949,
        },
    ],
    movies: [
        {
            title: "Inception",
            director: "Christopher Nolan",
            year: 2010,
        },
        {
            title: "Parasite",
            director: "Bong Joon-ho",
            year: 2019,
        },
    ],
    albums: [
        {
            title: "Thriller",
            artist: "Michael Jackson",
            year: 1982,
        },
        {
            title: "Back in Black",
            artist: "AC/DC",
            year: 1980,
        },
    ],
};
const appName = "Mon application";
const isOnline = true;
const maxItem = 10;
function displayItemDetails(item) {
    if ("author" in item) {
        console.log(`Livre : ${item.title} par ${item.author} (${item.year})`);
    }
    else if ("director" in item) {
        console.log(`Film : ${item.title} réalisé par ${item.director} (${item.year})`);
    }
    else if ("director" in item) {
        console.log(`Album : ${item.title} par ${item.artist} (${item.year})`);
    }
    else {
        console.log("Type d'objet inconnu.");
    }
}
data.albums.forEach((album) => {
    displayItemDetails(album);
});
data.movies.forEach((movie) => {
    displayItemDetails(movie);
});
data.books.forEach((book) => {
    displayItemDetails(book);
});
