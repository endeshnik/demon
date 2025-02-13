window.addEventListener('resize', adaptButtons);
window.addEventListener('load', adaptButtons);

function adaptButtons() {
    const yesButton = document.getElementById('yes-btn');
    const noButton = document.getElementById('no-btn');
    const buttonsContainer = document.querySelector('.buttons');
    const mainSquare = document.getElementById('main-square');
    
    // Get the current width of the screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Adjust button sizes based on screen width
    if (screenWidth < 480) {
        // For mobile devices
        yesButton.style.padding = '0.8em 1.5em';
        noButton.style.padding = '0.8em 1.5em';
        
        yesButton.style.fontSize = '0.8rem';
        noButton.style.fontSize = '0.8rem';

        yesButton.style.width = `${screenWidth * 0.4}px`; // 40% of screen width
        noButton.style.width = `${screenWidth * 0.4}px`; // 40% of screen width

        // Stack buttons vertically and center them
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.gap = '8px';
        buttonsContainer.style.alignItems = 'center';

        // Resize the square to fit mobile view
        mainSquare.style.width = `${screenWidth * 0.6}px`;
        mainSquare.style.height = `${screenWidth * 0.6}px`;

    } else if (screenWidth < 768) {
        // For tablets and medium-sized screens
        yesButton.style.padding = '1em 2em';
        noButton.style.padding = '1em 2em';

        yesButton.style.fontSize = '0.9rem';
        noButton.style.fontSize = '0.9rem';

        yesButton.style.width = `${screenWidth * 0.3}px`; // 30% of screen width
        noButton.style.width = `${screenWidth * 0.3}px`; // 30% of screen width

        buttonsContainer.style.flexDirection = 'row';
        buttonsContainer.style.gap = '10px';
        buttonsContainer.style.alignItems = 'center';

        // Resize the square for medium screens
        mainSquare.style.width = `${screenWidth * 0.4}px`;
        mainSquare.style.height = `${screenWidth * 0.4}px`;

    } else {
        // For larger screens (desktop)
        yesButton.style.padding = '1.2em 2.5em';
        noButton.style.padding = '1.2em 2.5em';

        yesButton.style.fontSize = '1rem';
        noButton.style.fontSize = '1rem';

        yesButton.style.width = `${screenWidth * 0.2}px`; // 20% of screen width
        noButton.style.width = `${screenWidth * 0.2}px`; // 20% of screen width

        buttonsContainer.style.flexDirection = 'row';
        buttonsContainer.style.gap = '20px';
        buttonsContainer.style.alignItems = 'center';

        // Resize the square for larger screens
        mainSquare.style.width = `${screenWidth * 0.2}px`;
        mainSquare.style.height = `${screenWidth * 0.2}px`;
    }

    // Adjust button hover text size (Sad face for 'No' button)
    const sadFaceSize = screenWidth < 480 ? '1.6rem' : '2rem';
    document.getElementById('no-btn').style.setProperty('--sad-smile-size', sadFaceSize);
}

// Optional: Add dynamic style for the "No" button hover smile
const style = document.createElement('style');
style.innerHTML = `
  #no-btn:hover::before {
    font-size: var(--sad-smile-size, 2rem);
  }
`;
document.head.appendChild(style);
