// Dynamic Text Logic
const dynamicText = document.getElementById("dynamic-text");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const textOptions = [
    "Really sure?", "Think again!", "Are you absolutely sure?", "Maybe yes?", "Last chance!"
];
let textIndex = 0;
let noClickCount = 0;

// Image Placement Logic
noButton.addEventListener('click', async function () {
    // Update the dynamic text
    textIndex = (textIndex + 1) % textOptions.length;
    dynamicText.textContent = textOptions[textIndex];

    // Increment the click count
    noClickCount++;

    // If the user clicks "No" 5 times, drop the video
    if (noClickCount === 5) {
        dropVideo();
    }

    // Generate and place a new random image
    placeNewSquare();

    // Send Telegram message
    const messageSent = await SecsendTelegramMessage();
    if (messageSent) {
        console.log('🚀 Повідомлення в Telegram про "Ні" успішно надіслано!');
    } else {
        console.warn('⚠️ Не вдалося надіслати повідомлення.');
    }
});

// Function to create a falling video effect
function dropVideo() {
    const video = document.createElement("video");
    video.src = "video/Demon.mp4"; // Replace with actual video file path
    video.autoplay = true;
    video.loop = false;
    video.style.position = "fixed";
    video.style.top = "-200px";
    video.style.left = "50%";
    video.style.transform = "translateX(-50%)";
    video.style.width = "300px";
    video.style.borderRadius = "10px";
    video.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.7)";
    video.style.zIndex = "1000";

    document.body.appendChild(video);

    // Animate the video falling down
    video.animate([
        { top: "-200px" },
        { top: "50%" }
    ], {
        duration: 2000,
        easing: "ease-in-out",
        fill: "forwards"
    });

    // Auto-delete the video after 10 seconds
    setTimeout(() => {
        video.remove();
    }, 10000);

    // Reset noClickCount after video drops
    noClickCount = 0;
}

yesButton.addEventListener('click', function () {
    createFlyingImages(5);
    createConfetti();
});

function createFlyingImages(numberOfImages) {
    for (let i = 0; i < numberOfImages; i++) {
        flyImage();
    }
}

// Function to create and animate a flying image
function flyImage() {
    const flyingImage = document.createElement("img");
    flyingImage.src = "img/kupidimonchik.png"; // Replace with the image URL you want
    flyingImage.style.position = "fixed";
    flyingImage.style.width = "100px"; // Adjust size as needed
    flyingImage.style.height = "auto";
    flyingImage.style.bottom = "0"; // Start from the bottom of the screen
    flyingImage.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // Random horizontal position
    flyingImage.style.zIndex = "1000";

    document.body.appendChild(flyingImage);

    // Animate the image flying upwards
    flyingImage.animate([
        { bottom: "0", opacity: 1 },
        { bottom: "100%", opacity: 0 }
    ], {
        duration: 7000, // Duration of the animation
        easing: "ease-in-out",
        fill: "forwards"
    });

    // Remove the image after the animation ends
    setTimeout(() => {
        flyingImage.remove();
    }, 7000);

    document.getElementById('yes-sound').play();
}

function createConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "1001";
    confettiContainer.style.overflow = "hidden";

    for (let i = 0; i < 150; i++) { // Increase the number of particles
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = `${Math.random() * 10 + 5}px`; // Random size between 5px and 15px
        confetti.style.height = `${Math.random() * 10 + 5}px`; // Random size between 5px and 15px
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // Bright pastel colors
        confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        confetti.style.top = "-10px"; // Start above the screen
        confetti.style.borderRadius = `${Math.random() * 50}%`; // Random shape (circle to oval)
        confetti.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)"; // Subtle shadow for depth
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Random initial rotation

        // Random horizontal movement
        const horizontalMovement = Math.random() * 200 - 100; // Move left or right by up to 100px

        // Animate the confetti falling with random motion
        confetti.animate([
            { top: "-10px", transform: `translateX(0px) rotate(0deg)` }, // Start position
            { top: "100vh", transform: `translateX(${horizontalMovement}px) rotate(360deg)` } // End position
        ], {
            duration: Math.random() * 3000 + 2000, // Random duration between 2-5 seconds
            easing: "ease-in",
            fill: "forwards"
        });

        confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);

    // Remove confetti after 5 seconds
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Function to check if the new square overlaps with any existing element
function isOverlapping(newRect, existingRect) {
    return !(
        newRect.left + newRect.width < existingRect.left ||
        newRect.left > existingRect.left + existingRect.width ||
        newRect.top + newRect.height < existingRect.top ||
        newRect.top > existingRect.top + existingRect.height
    );
}

// Generate and place one new square
function placeNewSquare() {
    const imageSize = 100; // Size of the square image
    const padding = 20; // Space between images

    // Get references to other UI elements
    const yesButton = document.getElementById('yes-btn');
    const mainSquare = document.getElementById('main-square');
    const container = document.querySelector('.container');
    const h1Text = document.querySelector('h1'); // Get the h1 text element
    const pText = document.querySelector('p');

    // Get the updated positions and dimensions of the buttons, main photo, container, and text elements
    const noButtonRect = noButton.getBoundingClientRect();
    const yesButtonRect = yesButton.getBoundingClientRect();
    const mainSquareRect = mainSquare.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const h1Rect = h1Text.getBoundingClientRect(); // Get the rect of h1 text
    const pRect = pText.getBoundingClientRect();
    const dynamicTextRect = dynamicText.getBoundingClientRect();

    // Store existing squares to avoid overlap
    const existingSquares = document.querySelectorAll('.square');
    const existingSquareRects = Array.from(existingSquares).map(square => square.getBoundingClientRect());

    let placed = false;
    let smallSquare;

    while (!placed) {
        // Generate random positions for the new square
        const randomTop = Math.random() * (window.innerHeight - imageSize - padding);
        const randomLeft = Math.random() * (window.innerWidth - imageSize - padding);

        // Define the new square's rectangle
        const newSquareRect = {
            left: randomLeft,
            top: randomTop,
            width: imageSize,
            height: imageSize
        };

        // Check if the new square overlaps with any UI elements or existing squares
        const overlapsWithNoButton = isOverlapping(newSquareRect, noButtonRect);
        const overlapsWithYesButton = isOverlapping(newSquareRect, yesButtonRect);
        const overlapsWithMainSquare = isOverlapping(newSquareRect, mainSquareRect);
        const overlapsWithH1Text = isOverlapping(newSquareRect, h1Rect); // Check if it overlaps with h1
        const overlapsWithPText = isOverlapping(newSquareRect, pRect);
        const overlapsWithDynamicText = isOverlapping(newSquareRect, dynamicTextRect); // Check if it overlaps with dynamic text

        let overlapsWithOtherSquares = false;
        for (let i = 0; i < existingSquareRects.length; i++) {
            const square = existingSquareRects[i];
            if (isOverlapping(newSquareRect, square)) {
                overlapsWithOtherSquares = true;
                break;
            }
        }

        // If there is no overlap, place the square
        if (!overlapsWithNoButton && !overlapsWithYesButton && !overlapsWithMainSquare && !overlapsWithH1Text && !overlapsWithPText && !overlapsWithDynamicText && !overlapsWithOtherSquares) {
            smallSquare = document.createElement('div');
            smallSquare.className = 'square';
            smallSquare.style.width = `${imageSize}px`;
            smallSquare.style.height = `${imageSize}px`;
            smallSquare.style.position = 'absolute';
            smallSquare.style.top = `${randomTop}px`;
            smallSquare.style.left = `${randomLeft}px`;

            // Create the image element inside the square
            const img = document.createElement('img');
            img.src = 'img/Demon.jpg'; // Replace with the image URL you want
            img.style.width = '100%'; // Make the image fill the square
            img.style.height = '100%'; // Ensure it doesn't distort
            img.style.objectFit = 'cover'; // Ensures the image covers the div

            // Append the image to the square div
            smallSquare.appendChild(img);

            // Add the square to the page
            document.body.appendChild(smallSquare);

            placed = true;
        }

        // If all checks failed (overlap is detected), try again
        if (!placed) {
            console.log("Overlap detected, retrying...");
        }
    }

    // Play sound if the square is placed
    document.getElementById('no-sound').play();
}




// Додаємо виклик sendTelegramMessage() при натисканні "Yes"


