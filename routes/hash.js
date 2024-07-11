const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
    res.render('hash');
});

router.post('/generate', upload.single('pdf'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const publicHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
    const privateHash = crypto.createHmac('sha256', 'secretKey').update(file.buffer).digest('hex');
    
    res.send(`Public Hash: ${publicHash}<br>Private Hash: ${privateHash}`);
});

router.get('/verify', (req, res) => {
    res.render('verify');
});

router.post('/verify', upload.single('pdf'), (req, res) => {
    const { publicHash } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const calculatedHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
    
    if (calculatedHash === publicHash) {
        res.send('The file is intact.');
    } else {
        res.send('The file is not intact.');
    }
});

module.exports = router;
