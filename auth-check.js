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

// Force redirection immediately for unauthorized users
function checkAuth() {
    const currentPage = window.location.pathname;
    const user = auth.currentUser; // Get current user directly

    // Log the current page for debugging
    console.log("Current page:", currentPage);

    // Redirect unauthenticated users to login page, unless they are already on it
    if (!user && currentPage !== '/index.html') {
        window.location.href = '/index.html'; // Redirect to login page
    } else if (user && currentPage === '/index.html') {
        window.location.href = '/home.html'; // Redirect logged-in users to home
    } else if (user && currentPage !== '/home.html') {
        // Allow navigation to other pages if the user is authenticated and not on home page
        console.log("User is authenticated and on another page.");
    }
}

// Call the function to check authentication
checkAuth();

// Add listener in case auth state changes during page load
onAuthStateChanged(auth, (user) => {
    console.log("User state changed:", user ? "Authenticated" : "Not authenticated");
    checkAuth();  // Recheck after auth state change
});