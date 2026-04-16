document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    const videoUpload = document.getElementById('video-upload');
    const video = document.getElementById('video');
    const bouncingText = document.getElementById('bouncing-text');

    // Intro screen for 3 seconds
    setTimeout(() => {
        intro.style.display = 'none';
        main.style.display = 'block';
    }, 3000);

    // Video upload

    videoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            video.src = url;
            video.load();

            // Apply random design
            applyRandomDesign(video);

            // Video und Text ausblenden bis Play
            video.style.display = 'none';
            bouncingText.style.display = 'none';
        }
    });

    // Show video when playing

    video.addEventListener('play', () => {
        video.style.display = 'block';
        bouncingText.style.display = 'block';
        if (!animationRunning) animateText();
    });

    // Function to apply random design to video
    function applyRandomDesign(element) {
        const filters = [
            `hue-rotate(${Math.random() * 360}deg)`,
            `brightness(${0.5 + Math.random() * 1.5})`,
            `contrast(${0.5 + Math.random() * 1.5})`,
            `saturate(${0.5 + Math.random() * 2})`,
            `sepia(${Math.random()})`,
            `invert(${Math.random()})`
        ];
        const randomFilter = filters[Math.floor(Math.random() * filters.length)];
        element.style.filter = randomFilter;
    }

    // Bouncing text animation like DVD logo
    let x = 10;
    let y = 10;
    let dx = 2;
    let dy = 2;
    const textWidth = 200; // approximate width
    const textHeight = 30; // approximate height
    let animationRunning = false;

    function animateText() {
        if (!animationRunning) {
            animationRunning = true;
            const container = document.getElementById('video-container');
            const containerRect = container.getBoundingClientRect();

            x += dx;
            y += dy;

            if (x <= 0 || x + textWidth >= containerRect.width) {
                dx = -dx;
            }
            if (y <= 0 || y + textHeight >= containerRect.height) {
                dy = -dy;
            }

            bouncingText.style.left = x + 'px';
            bouncingText.style.top = y + 'px';

            requestAnimationFrame(animateText);
        }
    }
});