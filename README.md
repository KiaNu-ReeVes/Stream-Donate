# Donater

Donater is a custom donation display service for live streamers in Iran. It allows streamers to showcase their financial support received from viewers in various ways during their live streams.

## Features

- Real-time display of financial donations on the stream.
- Customizable tools for presenting donations in different formats.
- Alerts for new donations.
- Listing received donations.
- Presenting donations as goals during the stream.

## Usage

[Provide instructions on how to use the Donater service.]

## Installation and Setup

To install and set up Donater, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd donater`
3. Install dependencies: `npm install`
4. Configure environment variables (e.g., API keys, server settings) in a `.env` file.
5. Start the server: `npm start` for production or `npm run dev` for development with auto-reloading.

## Dependencies

Donater relies on the following dependencies:

- `body-parser`: Parses incoming request bodies.
- `cookie-parser`: Parses HTTP request cookies.
- `dotenv`: Loads environment variables from a `.env` file.
- `ejs`: Templating engine for rendering views.
- `express`: Web application framework.
- `express-session`: Middleware for handling sessions.
- `http`: Core HTTP module.
- `jsonwebtoken`: For handling JSON Web Tokens (JWT).
- `moment`: Library for handling date and time.
- `mysql2`: MySQL database driver.
- `path`: Utility for working with file and directory paths.
- `socket.io`: Library for real-time communication.
- `url`: Utility for working with URLs.

## Development Dependencies

- `@types/node`: Type definitions for Node.js.

## License

This project is licensed under the [ISC License](LICENSE).

## Author

- [Kian Rabiei](https://github.com/kianrabiei)

## Sample Images

Click the button below to display 3 sample images:

<button id="showImagesButton">Show Images</button>

<div id="imageContainer"></div>

<script>
  const imageContainer = document.getElementById('imageContainer');
  const showImagesButton = document.getElementById('showImagesButton');

  showImagesButton.addEventListener('click', () => {
    // URLs of the sample images
    const imageUrls = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
    ];

    // Clear the previous images
    imageContainer.innerHTML = '';

    // Display the sample images
    imageUrls.forEach((imageUrl) => {
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.classList.add('sample-image');
      imageContainer.appendChild(imgElement);
    });
  });
</script>

We welcome contributions to improve Donater. If you'd like to contribute, please follow our [contribution guidelines](CONTRIBUTING.md).

---

**Note:**
This `readme.md` is just a template. Feel free to customize it with specific details about your project.
