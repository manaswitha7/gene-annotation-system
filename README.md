# Gene Annotation Management System

A web-based application for managing gene annotation records using **HTML, CSS, JavaScript, Express.js, and SQLite**.

## Features

- Add a new gene annotation
- View all gene annotations
- Update a gene annotation using Gene ID
- Delete a gene annotation using Gene ID
- Store data in SQLite database

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQLite3

## API Endpoints

| Method | Endpoint | Description |
|----------|------------|-------------|
| POST | /annotations | Add a gene annotation |
| GET | /annotations | Get all annotations |
| PUT | /annotations/:geneId | Update annotation |
| DELETE | /annotations/:geneId | Delete annotation |

