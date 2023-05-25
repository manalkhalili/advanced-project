//////////////////// ext1///////////
const url = 'https://job-titles1.p.rapidapi.com/titles/c7122a6bd69387035cc74ade692e5fe6';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aac3ab1dc6mshdf2a3c55f2cc77bp10295cjsn63b266513440',
		'X-RapidAPI-Host': 'job-titles1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}


//////////////////////////
const ur= 'https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details';
const opti = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'aac3ab1dc6mshdf2a3c55f2cc77bp10295cjsn63b266513440',
		'X-RapidAPI-Host': 'linkedin-profiles-and-company-data.p.rapidapi.com'
	},
	body: {
		profile_id: 'williamhgates',
		profile_type: 'personal',
		contact_info: false,
		recommendations: false,
		related_profiles: false
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}



