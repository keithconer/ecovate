document.addEventListener('DOMContentLoaded', () => {
    const captureButton = document.getElementById('captureButton');
    if (captureButton) {
        captureButton.addEventListener('click', async () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const videoElement = document.querySelector('video');

            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const imageUrl = canvas.toDataURL('image/jpeg');
            console.log("Captured Image URL (Base64, First 100 chars):", imageUrl.slice(0, 100)); // Log base64 preview

            const stream = videoElement.srcObject;
            stream.getTracks().forEach((track) => track.stop());

            try {
                console.log("Sending image to Cloudinary...");
                const uploadedImageUrl = await uploadImageToCloudinary(imageUrl);
                console.log("Image uploaded successfully. URL:", uploadedImageUrl);

                alert("Image uploaded successfully!");

                const cameraModal = new bootstrap.Modal(document.getElementById('cameraModal'));
                cameraModal.hide();

                const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                confirmationModal.show();
            } catch (error) {
                console.error("Failed to upload image:", error);
                alert("Failed to upload image. Please try again.");
            }
        });
    } else {
        console.error('Capture button not found!');
    }
});
