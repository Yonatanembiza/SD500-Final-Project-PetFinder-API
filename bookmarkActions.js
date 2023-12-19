// bookmarkActions.js
const { LocalStorage } = require('node-localstorage');
const prompts = require('prompts');

const localStorage = new LocalStorage('./storage');

// Function to get bookmarks from local storage
function getBookmarks() {
  const storedBookmarks = localStorage.getItem('bookmarks');
  return storedBookmarks ? JSON.parse(storedBookmarks) : {};
}

// Function to add a bookmark
function addBookmark(petId, petName) {
  const bookmarks = getBookmarks();
  bookmarks[petId] = petName;
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Function to remove a bookmark
function removeBookmark(petId) {
  const bookmarks = getBookmarks();
  if (petId in bookmarks) {
    delete bookmarks[petId];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    console.log('Pet ID not found in bookmarks.');
  }
}

// Function to display bookmarks
function displayBookmarks() {
  const bookmarks = getBookmarks();
  console.log('Bookmarks:');
  for (const [petId, petName] of Object.entries(bookmarks)) {
    console.log(`${petName}: ${petId}`);
  }
}

// Function to handle bookmark actions
async function handleBookmarks() {
  const bookmarkList = getBookmarks();

  const choices = [
    { title: 'Add Bookmark', value: 'add' },
    { title: 'Remove Bookmark', value: 'remove' },
    { title: 'Display Bookmarks', value: 'display' },
    { title: 'Exit', value: 'exit' },
  ];

  while (true) {
    const action = await prompts({
      type: 'select',
      name: 'action',
      message: 'Choose a bookmark action:',
      choices,
    });

    switch (action.action) {
      case 'add':
        const { petId, petName } = await prompts([
          {
            type: 'text',
            name: 'petId',
            message: 'Enter the pet ID to add to bookmarks:',
          },
          {
            type: 'text',
            name: 'petName',
            message: 'Enter a name for the bookmark:',
          },
        ]);

        addBookmark(petId, petName);
        console.log('Bookmark added successfully.');
        break;

      case 'remove':
        const petIdToRemove = await prompts({
          type: 'text',
          name: 'petId',
          message: 'Enter the pet ID to remove from bookmarks:',
        });

        removeBookmark(petIdToRemove);
        console.log('Bookmark removed successfully.');
        break;

      case 'display':
        displayBookmarks();
        break;

      case 'exit':
        console.log('Exiting bookmark actions.');
        return;

      default:
        console.log('Invalid action.');
    }
  }
}

// Example usage of bookmark functionality
(async () => {
  await handleBookmarks();
})();
