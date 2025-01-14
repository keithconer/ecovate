import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

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

// Function to handle authentication state and redirection
function handleAuthStateChange(user) {
    const currentPage = window.location.pathname;

    // Log the current page for debugging
    console.log("Current page:", currentPage);

    if (!user && currentPage !== '/index.html') {
        window.location.href = '/index.html'; // Redirect to login page
    } else if (user) {
        // Set session cookie
        user.getIdToken().then(token => {
            document.cookie = `session=${token}; path=/; secure; httponly`;
        });

        // Redirect to home if on login page
        if (currentPage === '/index.html') {
            window.location.href = '/home.html'; // Redirect logged-in users to home
        }
    }
}

// Add listener to handle changes in authentication state
onAuthStateChanged(auth, (user) => {
    console.log("User state changed:", user ? "Authenticated" : "Not authenticated");
    handleAuthStateChange(user);  // Handle redirection based on auth state
});

// Initial check on page load
onAuthStateChanged(auth, handleAuthStateChange);

// Function to handle login
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            handleAuthStateChange(user);
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
}