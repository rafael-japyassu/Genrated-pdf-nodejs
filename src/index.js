const express = require('express');
const app = express();
const pdf = require('html-pdf');
const ejs = require('ejs');
app.use(express.json());


app.get('/', (req, res) => {

    ejs.renderFile('./templates/index.ejs', { name: 'Code83 - Render PDF' }, (err, html) => {
        if (err) {
            return res.status(500).json({ message: 'Error in Server!' });
        }

        const options = {
            format: 'A4',
            border: {
                right: '8'
            }
        };

        pdf.create(html, options).toFile('./uploads/report.pdf', (error, response) => {
            if (!error) {
                return res.json({ message: 'PDF Generated!' });
            } else {
                return res.json({ message: 'Fail in Generated PDF!' });
            }
        })
    });
});

app.get('/download', (req, res) => {

    res.type('pdf');
    res.download('./uploads/report.pdf');
});


app.listen(3333);
