document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    // PRANK: Nach 2 Sekunden Pop-up und Rickroll
    setTimeout(() => {
        alert('Achtung! Dein Computer wird jetzt mit guter Laune infiziert 😜');
        const prankAudio = document.getElementById('prank-audio');
        if (prankAudio) {
            prankAudio.volume = 0.5;
            prankAudio.play();
        }
    }, 2000);
    const videoUpload = document.getElementById('video-upload');
    const video = document.getElementById('video');
    const bouncingText = document.getElementById('bouncing-text');

    // Intro screen for 3 seconds
    setTimeout(() => {
        intro.style.display = 'none';
        main.style.display = 'block';
    }, 3000);


    const startBtn = document.getElementById('start-btn');

    // Video upload

    videoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            video.src = url;
            video.load();

            // Immer mit Ton abspielen
            video.muted = false;

            // Apply random design
            applyRandomDesign(video);

            // Video und Text ausblenden bis Start
            video.style.display = 'none';
            bouncingText.style.display = 'none';
            startBtn.style.display = 'inline-block';
        }
    });

    // Start-Button klickt Video
    startBtn.addEventListener('click', () => {
        video.style.display = 'block';
        bouncingText.style.display = 'block';
        startBtn.style.display = 'none';
        if (!animationRunning) animateText();
        video.play();
    });

    // Show video when playing

    video.addEventListener('play', () => {
        video.style.display = 'block';
        bouncingText.style.display = 'block';
        if (!animationRunning) animateText();
    });

    // Function to apply random design to video
    function applyRandomDesign(element) {
        // Moderatere, aber sichtbare Filter inkl. drop-shadow
        const filterOptions = [
            `hue-rotate(${Math.floor(Math.random() * 360)}deg)` ,
            `brightness(${(0.85 + Math.random() * 0.3).toFixed(2)})`,
            `contrast(${(0.85 + Math.random() * 0.4).toFixed(2)})`,
            `saturate(${(0.8 + Math.random() * 0.7).toFixed(2)})`,
            `sepia(${(Math.random() * 0.5).toFixed(2)})`,
            `invert(${(Math.random() * 0.3).toFixed(2)})`,
            `grayscale(${(Math.random() * 0.4).toFixed(2)})`,
            `blur(${(Math.random() * 1.5).toFixed(2)}px)`,
            `drop-shadow(0 0 16px rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},0.7))`
        ];
        // Immer 2 verschiedene Filter kombinieren
        let idx1 = Math.floor(Math.random() * filterOptions.length);
        let idx2;
        do {
            idx2 = Math.floor(Math.random() * filterOptions.length);
        } while (idx2 === idx1);
        const filter = filterOptions[idx1] + ' ' + filterOptions[idx2];
        element.style.filter = filter;
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
});