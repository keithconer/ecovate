

import { uploadImageToCloudinary } from './cloudinaryClient.js';  // Correct path

document.getElementById('captureButton').addEventListener('click', async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const videoElement = document.querySelector('video'); // Ensure video element is selected correctly
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/jpeg');

    // Log the captured base64 image data
    console.log('Captured Image URL (Base64):', imageUrl);

    // Stop the camera stream
    const stream = videoElement.srcObject;
    stream.getTracks().forEach((track) => track.stop());

    try {
        const uploadedImageUrl = await uploadImageToCloudinary(imageUrl);  // Ensure this matches the imported function
        console.log("Image uploaded successfully:", uploadedImageUrl);

        alert("Image uploaded successfully!");

        const cameraModal = new bootstrap.Modal(document.getElementById('cameraModal'));
        cameraModal.hide();

        var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        confirmationModal.show();
    } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Failed to upload image. Please try again.");
    }
});


