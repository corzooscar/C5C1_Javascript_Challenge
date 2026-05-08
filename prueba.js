// URL Endpoint for the Rick and Morty API
const url_api = "https://rickandmortyapi.com/api/character";

let currentPage = 1;
let totalPages = 1;
let isLoading = false;
let currentCharacters = []; // Array to store original data in memory for local filtering

/**
 * Sends an asynchronous request to the specified API endpoint.
 * Implements a "gate" logic to prevent multiple simultaneous requests.
 * 
 * @async
 * @param {string} url - The endpoint URL to fetch data from.
 * @returns {Promise<void>}
 */
async function requestData(url) {
    // If the "gate" is locked (loading), ignore the action
    if (isLoading) return;
    isLoading = true;
    
    // Show the loading indicator to the user
    document.getElementById("loading").style.display = "block";

    try {
        const response = await axios.get(url);
        let data = response.data;

        // Parse current page from URL or default to 1
        const urlObj = new URL(url);
        currentPage = parseInt(urlObj.searchParams.get('page')) || 1;
        totalPages = data.info.pages;

        // Store results locally to allow filtering without new API calls
        currentCharacters = data.results;

        // Reset UI filters when moving to a different page
        document.getElementById("genderFilter").value = "";
        document.getElementById("statusFilter").value = "";

        // Update button states and pagination info
        getElementnext(document, 'set', data.info);
        getElementprev(document, 'set', data.info);
        updatePageCounter();
        
        // Render the characters into the HTML
        renderHtml(currentCharacters);
    } catch (error) {
        console.error("Request failed:", error);
    } finally {
        // Safety delay: Keeps the "gate" locked for 1 second even after data arrives
        // This prevents users from spamming the API and reduces traffic.
        setTimeout(() => {
            isLoading = false;
            document.getElementById("loading").style.display = "none";
            console.log("Gate released after safety delay");
        }, 1000); 
    }
}

/**
 * Triggers the request for the next page.
 */
function loadMore() { getElementnext(document, 'get'); }

/**
 * Triggers the request for the previous page.
 */
function loadLess() { getElementprev(document, 'get'); }

/**
 * Manages the "Next" button logic (fetching data or setting attributes).
 * 
 * @param {Document} elementButton - The document context.
 * @param {string} [operation='get'] - Either 'get' to trigger a request or 'set' to update attributes.
 * @param {Object|null} [info=null] - The API info object containing navigation links.
 */
function getElementnext(elementButton, operation = 'get', info = null) {
    const nextButton = document.getElementById("next");
    if (operation == 'get') {
        const next = nextButton.getAttribute("data-next");
        if (next == "" || next == null) {
            console.log("No next URL found");
        } else {
            requestData(next);
        }
    } else {
        // Update attributes and disable the button if no next page exists
        nextButton.setAttribute("data-next", (info.next == null) ? '' : info.next);
        nextButton.setAttribute("data-prev", (info.prev == null) ? '' : info.prev);
        nextButton.disabled = (info.next == null);
    }
}

/**
 * Manages the "Previous" button logic (fetching data or setting attributes).
 * 
 * @param {Document} elementButton - The document context.
 * @param {string} [operation='get'] - Either 'get' to trigger a request or 'set' to update attributes.
 * @param {Object|null} [info=null] - The API info object containing navigation links.
 */
function getElementprev(elementButton, operation = 'get', info = null) {
    const prevButton = document.getElementById("prev");
    if (operation == 'get') {
        const prev = prevButton.getAttribute("data-prev");
        if (prev == "" || prev == null) {
            console.log("No previous URL found");
        } else {
            requestData(prev);
        }
    } else {
        // Update attributes and disable the button if no previous page exists
        prevButton.setAttribute("data-next", (info.next == null) ? '' : info.next);
        prevButton.setAttribute("data-prev", (info.prev == null) ? '' : info.prev);
        prevButton.disabled = (info.prev == null);
    }
}

/**
 * Clears the character container and injects new character cards into the DOM.
 * 
 * @param {Array} characters - The array of character objects to display.
 */
function renderHtml(characters) {
    let element = document.getElementById("character");
    element.innerHTML = '';

    characters.forEach(character => {
        element.innerHTML += `<li>
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <span>${character.gender} | ${character.status}</span>
        </li>`;
    });
}

/**
 * Updates the text content of the page counter display.
 */
function updatePageCounter() {
    const counter = document.getElementById("pageCounter");
    if (counter) {
        counter.textContent = `Page ${currentPage} of ${totalPages}`;
    }
}

/**
 * Filters the locally stored characters based on user input.
 * No API request is made during this process.
 */
function applyFilters() {
    const gender = document.getElementById("genderFilter").value.toLowerCase();
    const status = document.getElementById("statusFilter").value.toLowerCase();

    // Filter currentCharacters array already stored in memory
    let filteredCharacters = currentCharacters.filter(character => {
        let matchesGender = (gender === "") || (character.gender.toLowerCase() === gender);
        let matchesStatus = (status === "") || (character.status.toLowerCase() === status);
        
        return matchesGender && matchesStatus;
    });

    // Render the filtered results
    renderHtml(filteredCharacters);
}

// Initial API call on load
requestData(url_api);
