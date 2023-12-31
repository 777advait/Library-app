"use strict";

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("isRead");
const cardContainer = document.querySelector(".card-container");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


const updateBooks = () => {
    cardContainer.innerHTML = ""
    myLibrary.forEach(book => {
        cardContainer.insertAdjacentHTML(
            "afterbegin",
            `<div class="card">
                <h2 class="title">${book.title}</h2>
                <cite>${book.author}</cite>
                <p class="pages">${book.pages} pages</p>
                <div class="cta">
                    <a href="#" class="read-btn">Read</a>
                    <a href="#" class="remove">Remove</a>
                </div>
            </div>`
        );

        document.querySelector(".read-btn").classList.add(book.read ? "read" : "not-read");
        document.querySelector(".read-btn").addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.classList.contains("read")) {
                e.target.classList.remove("read");
                e.target.classList.add("not-read");
                book.read = false;
            }
            else {
                e.target.classList.remove("not-read");
                e.target.classList.add("read");
                book.read = true;
            }
        });

        document.querySelector(".remove").addEventListener("click", (e) => {
            e.preventDefault();
            // e.target.parentElement.parentElement.querySelector(".title").textContent
            myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.title === e.target.parentElement.parentElement.querySelector(".title").textContent), 1));
            updateBooks();
        });
    });
};

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    myLibrary.push(new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked
    ));

    updateBooks();
});

document.querySelector(".close-modal").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
});

document.querySelector(".add-cta").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
});

updateBooks();