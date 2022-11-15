const glowPlayer = document.getElementById('player-glow');

const intensitySlider = document.getElementById('intensity-slider');
const spreadSlider = document.getElementById('spread-slider');

intensitySlider.addEventListener('input', function (e) {
    const value = e.target.value;
    glowPlayer.style.opacity = `${value}%`;
});

spreadSlider.addEventListener('input', function (e) {
    const value = e.target.value;
    glowPlayer.style.filter = `blur(${value}px)`;
});
