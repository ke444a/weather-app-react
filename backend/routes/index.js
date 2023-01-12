const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');

const GEOAPIFY_BASE_URL = process.env.GEOAPIFY_BASE_URL;
const GEOAPIFY_KEY_NAME = process.env.GEOAPIFY_KEY_NAME;
const GEOAPIFY_KEY_VALUE = process.env.GEOAPIFY_KEY_VALUE;

router.get('/', async (req, res) => {
    try {
        const params = new URLSearchParams({
            [GEOAPIFY_KEY_NAME]: GEOAPIFY_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        const apiRes = await needle('get', `${GEOAPIFY_BASE_URL}?${params}`);
        const data = apiRes.body;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ err });
    }

})

module.exports = router;