Petfinder API Browser Documentation
Overview
The Petfinder API Browser is a command-line application that allows users to interact with the Petfinder API to search for pets and manage bookmarks.
Getting Started
Prerequisites
•	Node.js installed on your machine
•	npm package manager
Installation
1.	Clone the repository: git clone < https://github.com/Yonatanembiza/SD500-Final-Project-PetFinder-API>
2.	Install dependencies: cd PetfinderApp  npm install
Usage
Obtaining Petfinder API Key
Before using the application, obtain a Petfinder API Key and Secret from the Petfinder Developer Settings. Replace placeholders in the code with your API Key and Secret.
Running the Application
Run the application: node index.js
Search for Pets
1.	Enter pet information when prompted (name, type, gender).
2.	View search results and select a pet to see details.
3.	Redirected to the search prompt after viewing details.
Bookmark Actions (Optional Bonus)
Run bookmark actions standalone script: node bookmarkActions.js
Choose actions to add, remove, display bookmarks, or exit.
Technical Details
•	Access Token: Obtains and manages Petfinder API access tokens.
•	Search for Pets: Sends requests to the Petfinder API to search for pets based on user input.
•	Bookmark Actions: Optional functionality to add, remove, and display bookmarks.
Modules
The application is divided into the following modules:
•	index.js: Main entry point for the Petfinder API application.
•	bookmarkActions.js: Standalone script for bookmark-related actions.
•	localStorage.js: Handles local storage operations.
•	api.js: Manages API interactions (access token retrieval, search, and details fetching).
•	prompts.js: Handles user prompts using the prompts package.
Limitations
•	Access token expires after 1 hour.
•	API allows 50 requests per second, with a total of 1000 requests per day.
Optional Bonus: Bookmark Functionality
•	Bookmark actions allow users to manage a list of favorite pets.
•	Bookmarks are stored in local storage and persist across sessions.
Future Enhancements
•	Add error handling and improve user feedback.
•	Implement more features from the Petfinder API (e.g., filtering by location).
Contributors
•	[Yonatan Embiza]
•	[Eleni Berhe Araya]







