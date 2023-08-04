const express = require("express");
const router = express.Router();
const axios = require('axios');



router.get('/', async (req, res) => {

  try {
    
    const { currency } = req.query;
    
    const response = await axios.get('http://api.exchangeratesapi.io/v1/latest', {
      params: {
        access_key: 'f8eb486c39331bd5e6bbb6cc715a614a',
        base  : currency,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
