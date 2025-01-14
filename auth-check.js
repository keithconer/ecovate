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

// Function to handle authentication state changes and redirection
function handleAuthStateChange(user) {
    const currentPage = window.location.pathname;

    // Log the current page for debugging
    console.log("Current page:", currentPage);
    console.log("User:", user);

    // Check if the search bar is bypassed
    const searchParams = new URLSearchParams(window.location.search);
    const bypassSearch = searchParams.get('bypass');

    if (bypassSearch === 'true') {
        console.log("Bypass search detected.");
        return; // Allow access if bypassed through search
    }

    if (!user && currentPage !== '/index.html') {
        window.location.href = '/index.html'; // Redirect to login page if not authenticated
    } else if (user && currentPage === '/index.html') {
        window.location.href = '/home.html'; // Redirect logged-in users to home page
    } else if (user) {
        console.log("User is authenticated and on a valid page.");
    }
}

// Add listener to handle changes in authentication state
onAuthStateChanged(auth, (user) => {
    console.log("User state changed:", user ? "Authenticated" : "Not authenticated");
    handleAuthStateChange(user);  // Handle redirection based on auth state
});

// Initial check on page load
document.addEventListener('DOMContentLoaded', () => {
    handleAuthStateChange(auth.currentUser);
});