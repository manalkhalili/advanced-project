const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/', async (req, res) => {
    const company = req.query.search_terms || 'Microsoft';
   
const options = {
  method: 'GET',
  url: 'https://indeed12.p.rapidapi.com/company/Microsoft',
  headers: {
    'X-RapidAPI-Key': '77eda0eaafmsh7153243a10651d8p13134fjsn719521b20837',
    'X-RapidAPI-Host': 'indeed12.p.rapidapi.com'
  }
 
  
};

try {
	const response = await axios.request(options);
    res.json(response.data);
	//console.log(response.data);
} catch (error) {
	console.error(error);
}
});

module.exports = router;