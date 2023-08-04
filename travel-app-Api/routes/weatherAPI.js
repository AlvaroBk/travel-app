const express = require("express");
const router = express.Router();
const axios = require('axios');



router.get('/', async (req, res) => {
  try {
    const { lat } = req.query;
    const { lon } = req.query;
    
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: lon,
        units:'metric',
        appid: '364ce0a135e5c68b050b8f3b5ffec8ed',
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
