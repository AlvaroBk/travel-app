const express = require("express");
const router = express.Router();
const axios = require('axios');

const apiKey = '127b2710e17835ab41936793ad61d829';

router.get('/', async (req, res) => {
  
  try {
    const {city}  = req.query;
    
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: city,
        appid: '127b2710e17835ab41936793ad61d829',
        limit:1,
      }
    });

    // const response2 = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
    //   params: {
    //     lat: city,
    //     lon: city,
    //     exclude:"hourly,minutely,alerts",
    //     appid: '127b2710e17835ab41936793ad61d829',
    //   }
    // });


    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
