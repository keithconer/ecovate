import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCU500X_Ongrwi3-ovg2acbKrDUUOt0MMw",
    authDomain: "practical-11156.firebaseapp.com",
    databaseURL: "https://practical-11156-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "practical-11156",
    storageBucket: "practical-11156.appspot.com",
    messagingSenderId: "1008221940017",
    appId: "1:1008221940017:web:9cf0304da27263110de810"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;

    // Prevent redirection loop if user is on the login page
    if (!user && currentPage !== '/index.html') {
        window.location.href = '/index.html'; // Redirect to login
    } else if (user && currentPage === '/index.html') {
        window.location.href = '/home.html'; // Redirect authenticated users to home
    }
});
