let myLibrary = [];

class Book {

    constructor (title, author, numberOfPages, hasRead)  {
        this._title = title;
        this._author = author;
        this._numberOfPages = numberOfPages;
        this._hasRead = hasRead;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get numberOfPages() {
        return this._numberOfPages;
    }

    get hasRead() {
        return this._hasRead;
    }

    flipRead = () => {
        this._hasRead = !this._hasRead;
    }

}


function addBookToLibrary (title, author, numberOfPages, hasRead) {
    let book = new Book(title, author, numberOfPages, hasRead);
    myLibrary.push(book);

    let bookArea = document.querySelector('.main .book-area');
    bookArea.insertAdjacentHTML(
        'beforeend',
        `
        <li>
            <div class="card-info">
                <h3>${title}</h3>
                <h4>By: ${author}</h4>
                <h4>Num Pages: ${numberOfPages}</h4>
                <h4>Has read: ${(hasRead ? "Yes" : "No")}</h4>
            </div>
            <div class="card-buttons">
                <button>Mark as ${(hasRead) ? "Unread" : "Read"}</button>
                <button>Remove Book</button>
            </div>
        </li>
        `
    );

    let card = bookArea.querySelector('li:last-of-type');
    let createButton = card.querySelector('.card-buttons button:first-of-type');
    let removeButton = card.querySelector('.card-buttons button:last-of-type');

    createButton.addEventListener('click', e => {
        let curIndex = myLibrary.indexOf(book);
        myLibrary[curIndex].flipRead();
        card.querySelector('.card-info > h4:last-of-type')
            .textContent = `Has read: ${(myLibrary[curIndex].hasRead ? "Yes" : "No")}`;
        createButton.textContent = `Mark as ${(myLibrary[curIndex].hasRead) ? "Unread" : "Read"}`;
    });

    removeButton.addEventListener('click', e => {
        let curIndex = myLibrary.indexOf(book);
        myLibrary.splice(curIndex, 1);
        card.remove();
    });

}

function initMyLibrary() {
    addBookToLibrary(
        'Animal Farm',
        'George Orwell',
        120,
        true
    );

    addBookToLibrary(
        'Alice in Wonderland',
        'Lewis Carol',
        240,
        true
    );

    addBookToLibrary(
        'War and Peace',
        'Leo Tolstoy',
        1232,
        false
    );
}


function initCardButtons() {
    for (let i = 0; i < myLibrary.length; i++) {
        let cards = document.querySelectorAll('.main .book-area li');
        for (let j = 0; j < cards.length; j++) {
            if (myLibrary[i].title === cards[j].querySelector('.card-info h3').textContent){
                // Initialize button to flip read status
                cards[j].querySelector('.card-buttons > button:first-of-type')
                    .addEventListener('click', e => {
                        myLibrary[i].flipRead();
                        cards[j].querySelector('.card-info > h4:last-of-type')
                            .textContent = `Has read: ${(myLibrary[i].hasRead ? "Yes" : "No")}`;
                        cards[j].querySelector('.card-buttons > button:first-of-type')
                            .textContent = `Mark as ${(myLibrary[i].hasRead) ? "Unread" : "Read"}`;
                    });

                // Initialize button to remove book
                cards[j].querySelector('.card-buttons > button:last-of-type')
                    .addEventListener('click', e => {
                        myLibrary.splice(i, 1);
                        cards[j].remove();
                    });
            }
        }
    }
}


function initCreateScreen() {
    const createForm = document.querySelector('.main .create-screen form');

    // Initialize cancel button
    createForm.querySelector('.cancel-button-row button')
        .addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('.main .create-screen').remove();
        }
    );

    // Initialize add book button
    createForm.querySelector('.button-row button')
        .addEventListener('click', e => {
            const title = createForm.querySelector('#title').value;
            const author = createForm.querySelector('#author').value;
            const numPages = createForm.querySelector('#num-of-pages').value;
            const hasRead = createForm.querySelector('#has-read').value;

            e.preventDefault();
            if (title !== '' && author !== '' && numPages !== '') {
                addBookToLibrary(title, author, numPages, hasRead);
                document.querySelector('.main .create-screen').remove();
            }
        }
    );
}


function initCreateButton() {
    const createButton = document.querySelector('.button-area button');
    createButton.addEventListener('click', e => {
        const mainDiv = document.querySelector('.main');
        mainDiv.insertAdjacentHTML(
            'beforeend',
            `
            <div class="create-screen">
                <form action="">
                    <div class="cancel-button-row">
                        <button type="button">X</button>
                    </div>
                    <div class="form-row">
                        <label for="title">Title: </label>
                        <input type="text" name="title" id="title" tabindex="1">
                    </div>
                    <div class="form-row">
                        <label for="author">Author: </label>
                        <input type="text" name="author" id="author" tabindex="2">
                    </div>
                    <div class="form-row">
                        <label for="num-of-pages">Number of Pages: </label>
                        <input type="number" name="num-of-pages" id="num-of-pages" tabindex="3">
                    </div>
                    <div class="form-row">
                        <label for="has-read">Has Read?: </label>
                        <input type="checkbox" name="has-read" id="has-read" tabindex="4">
                    </div>
                    <div class="button-row">
                        <button tabindex="5" type="button">Add Book</button>
                    </div>
                </form>
            </div>
            `
        );
        initCreateScreen();
    });

}

function initButtons() {
    // initCardButtons();
    initCreateButton()
}


initMyLibrary();
initButtons();
