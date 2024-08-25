const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
const userId = "Rohan_Nayan_12022003"; 
const email = "rohan.nayan2021@vitstudent.ac.in";
const rollNumber = "21BCI0040";

// POST Method Endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input, array expected in the request body'
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    for (const item of data) {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    }

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET Method Endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
