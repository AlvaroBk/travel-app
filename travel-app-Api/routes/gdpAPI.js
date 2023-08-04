const express = require("express");
const router = express.Router();
const axios = require('axios');



router.get('/', async (req, res) => {
  try {
  const { country } = req.query;
    
   
    const response = await axios.get('https://api.worldbank.org/v2/country/'+country+'/indicator/NY.GDP.PCAP.CD', {
      params: {
        format:'json',
        date:2022
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
