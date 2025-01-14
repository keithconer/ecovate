const express = require('express');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with the path to your service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://practical-11156-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const app = express();
app.use(cookieParser());

// Middleware to check session cookie
function checkAuth(req, res, next) {
    const sessionCookie = req.cookies.session || '';
    admin.auth().verifySessionCookie(sessionCookie, true)
        .then(() => {
            next();
        })
        .catch((error) => {
            console.error('Unauthorized access:', error);
            res.redirect('/index.html');
        });
}

app.use('/home.html', checkAuth);
app.use('/tech.html', checkAuth);
app.use('/ec.html', checkAuth);

// Example route for login
app.post('/login', (req, res) => {
    const idToken = req.body.idToken;
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            const options = { maxAge: expiresIn, httpOnly: true, secure: true };
            res.cookie('session', sessionCookie, options);
            res.end(JSON.stringify({ status: 'success' }));
        })
        .catch((error) => {
            res.status(401).send('UNAUTHORIZED REQUEST!');
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});