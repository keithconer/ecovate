export const uploadImageToCloudinary = async (fileUri) => {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dzkgahvft/image/upload";
    const uploadPreset = "memoria"; // Replace with your actual upload preset

    const formData = new FormData();
    formData.append("file", fileUri); // Directly append the base64 string (fileUri)
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();  // Log the full error response
            console.error("Cloudinary upload failed:", errorText);
            throw new Error("Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        console.log("Cloudinary upload successful, URL:", data.secure_url);
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};