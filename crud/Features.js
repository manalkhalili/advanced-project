//////////////////// ext1///////////
const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'aac3ab1dc6mshdf2a3c55f2cc77bp10295cjsn63b266513440',
    'X-RapidAPI-Host': 'linkedin-profiles-and-company-data.p.rapidapi.com'
  },
  data: {
    profile_id: 'williamhgates',
    profile_type: 'personal',
    contact_info: false,
    recommendations: false,
    related_profiles: false
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
};
///////////ext2//////////
const axios = require('axios');

const opt = {
  method: 'GET',
  url: 'https://job-titles1.p.rapidapi.com/titles/c7122a6bd69387035cc74ade692e5fe6',
  headers: {
    'X-RapidAPI-Key': 'aac3ab1dc6mshdf2a3c55f2cc77bp10295cjsn63b266513440',
    'X-RapidAPI-Host': 'job-titles1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}