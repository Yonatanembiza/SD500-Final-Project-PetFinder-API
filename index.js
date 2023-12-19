// index.js
const axios = require('axios');
const jwtDecode = require('jwt-decode');
const { LocalStorage } = require('node-localstorage');
const prompts = require('prompts');

const localStorage = new LocalStorage('./storage');

// Function to get the access token from Petfinder API
async function getAccessToken() {
  // Check if access token exists and is not expired in local storage
  const storedToken = localStorage.getItem('accessToken');
  const storedExp = localStorage.getItem('tokenExp');

  if (storedToken && storedExp && Date.now() < storedExp) {
    console.log('Using existing access token');
    return storedToken;
  }

  // Obtain a new access token
  const apiKey = 'g9dZ1tLt7abuKPQee5dmRhhlK3DlQtEyV17DFE4c0gUzS1hS8U';
  const apiSecret = 'q3BqUnPg2oqh4LsDU4zE0t175lHG1HNDq1PwPlan';

  try {
    const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: apiSecret,
    });

    const { access_token, expires_in } = response.data;

    // Save the new access token and expiration date in local storage
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenExp', Date.now() + expires_in * 1000);

    console.log('New access token obtained');
    return access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error.message);
    throw error;
  }
}

// Example usage of getAccessToken function
(async () => {
  try {
    const accessToken = await getAccessToken();
    console.log('Access Token:', accessToken);

  } catch (error) {
    console.error('Error:', error.message);
  }
})();

// Function to prompt the user for pet information
async function promptForPetInfo() {
    const questions = [
        {
            type: 'text',
            name: 'name',
            message: 'Enter the pet name (optional):',
        },
        {
            type: 'text',
            name: 'type',
            message: 'Select the animal type:',
            choices: ['Dog', 'Cat'],
        },
        {
            type: 'text',
            name: 'gender',
            message: 'Select the animal gender:',
            choices: ['Male', 'Female'],
        },
    ];

    const answers = await prompts(questions);
    return answers;
}
  // Function to search for pets using the Petfinder API
async function searchForPets() {
    try {
        const { name, type, gender } = await promptForPetInfo();

        // Construct the query string
        const queryString = `?${name ? `name=${encodeURIComponent(name)}&` : ''}type=${encodeURIComponent(type)}&gender=${encodeURIComponent(gender)}`;
        console.log('Query String:', queryString);

        // Make a GET request to the Petfinder API
        const accessToken = await getAccessToken();
        const response = await axios.get(`https://api.petfinder.com/v2/animals${queryString}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
  
      const pets = response.data.animals;
  
      if (pets.length === 0) {
        console.log('No pets found matching the criteria.');
      } else {
        // Display the results (pet names) in a select prompt
        const petNames = pets.map((pet) => ({ title: pet.name, value: pet.id }));
        const selectedPet = await prompts({
          type: 'select',
          name: 'petId',
          message: 'Select a pet to see more details:',
          choices: petNames,
        });
  
        // Fetch and display detailed information about the selected pet
        if (selectedPet) {
          await displayPetDetails(selectedPet.petId);
        }
      }
    } catch (error) {
      console.error('Error searching for pets:', error.message);
    }
  }
  
  // Function to display detailed information about a pet
  async function displayPetDetails(petId) {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(`https://api.petfinder.com/v2/animals/${petId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const petDetails = response.data.animal;
  
      // Display pet details
      console.log('Pet Details:');
      console.log('Name:', petDetails.name);
      console.log('Breed:', petDetails.breeds.primary);
      console.log('Size:', petDetails.size);
      console.log('Age:', petDetails.age);
      console.log('Color:', petDetails.colors.primary);
      console.log('Status:', petDetails.status);
  
      // Redirect back to the search prompt
      await searchForPets();
    } catch (error) {
      console.error('Error fetching pet details:', error.message);
    }
  }
  
  // Example usage of searchForPets function
  (async () => {
    await searchForPets();
  })();
  

  
