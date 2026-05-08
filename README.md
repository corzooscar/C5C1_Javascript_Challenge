By: Valery Avila, Oscar Corzo & Kevin Pino
# 🛸 Rick and Morty Character Explorer

An interactive character explorer for **Rick and Morty** built with HTML, CSS and JavaScript, consuming the [Rick and Morty API](https://rickandmortyapi.com/).


---

## 📸 Overview

The app displays a paginated gallery of characters from the show, with filters by gender and status, page navigation, and themed animations.

---

## ✨ Features

- **Paginated gallery** — browse characters using the *Previous Page* and *Next Page* buttons.
- **Local filtering** — filter by gender (Male, Female, Genderless, Unknown) and status (Alive, Dead, Unknown) without making additional API calls.
- **Page counter** — displays the current page and total number of pages available.
- **Loading indicator** — animated text visible while data is being fetched.
- **Anti-spam gate** — a 1-second lock that prevents simultaneous requests and reduces unnecessary API traffic.
- **Themed design** — custom fonts, neon colors, and animated GIFs inspired by the Rick and Morty universe.

---

## 🗂️ Project Structure

```
C5C1_Javascript_Challenge/
├── index.html        # Main page structure
├── prueba.js         # Application logic (axios, filters, rendering)
├── style.css         # Styles and animations
└── Resources/
    └── Rick_and_Morty.svg   # Header logo
```

---

## 🚀 Getting Started

1. Clone or download the repository.
2. Open `index.html` directly in your browser — no local server required.
3. The app will automatically load the first page of characters on startup.

```bash
# Optionally, using Live Server (VS Code)
# Right-click index.html → "Open with Live Server"
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styles, animations, and responsive layout |
| JavaScript (ES6+) | Logic, data request, and DOM manipulation |
| [Axios](https://axios-http.com/) v1.16 | HTTP client for API requests |
| [Rick and Morty API](https://rickandmortyapi.com/) | Character data source |
| Google Fonts | *Lacquer* and *Schoolbell* typefaces |

---

## 🎨 Design Decisions

- **Local filtering**: Filters operate on the already-fetched `currentCharacters` array stored in memory, avoiding extra API calls for every filter combination.
- **Anti-spam gate**: The `isLoading` flag blocks new requests for 1 second after a response is received, reducing unnecessary traffic to the API.
- **Responsive grid**: Uses `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` to automatically adapt the gallery layout to any screen size.

---

## 👥 Authors

- **Val**
- **Kev**
- **Oczo**
