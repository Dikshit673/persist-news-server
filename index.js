// require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6000;

const apiCallingFn = async (res, parameter) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', { params: parameter });
        res.json(response.data);
    } catch (err) {
        res.status(500).send('Error fetching news');
    }
}

// Cors middleware
app.use(cors());

// express json middleware
app.use(express.json())

app.get('/', (req, res, next) => {
    res.json({ message: "hello from Express App" })
    next();
})
app.get('/news', (req, res) => {
    const { page = 1, pageSize = 10, q = '', category = 'general' } = req.query;
    console.log(req.query);
    if (q) {
        if (category === "general") {
            let parameter = {
                apiKey: process.env.NEWS_API_KEY,
                page,
                pageSize,
                q,
            }
            console.log(1);
            apiCallingFn(res, parameter)
        } else {
            let parameter = {
                apiKey: process.env.NEWS_API_KEY,
                page,
                pageSize,
                q,
                category
            }
            console.log(2);
            apiCallingFn(res, parameter)
        }
    } else {
        if (category === "general") {
            let parameter = {
                country: 'in',
                apiKey: process.env.NEWS_API_KEY,
                page,
                pageSize,
            }
            console.log(3);
            apiCallingFn(res, parameter)
        } else {
            let parameter = {
                country: 'in',
                apiKey: process.env.NEWS_API_KEY,
                page,
                pageSize,
                category
            }
            console.log(4);
            apiCallingFn(res, parameter)
        }
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});