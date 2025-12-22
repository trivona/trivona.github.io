const is404Page = document.title.includes('404') || document.querySelector('h1#hero-title')?.textContent === 'Page not found';

function handle404Error() {
    const currentPath = window.location.pathname;
    if (currentPath === '/github') {
        window.location.href = 'https://github.com/entersize';
        return;
    }
    const isValidPage = currentPath === '/' || currentPath === '/index.html' || currentPath === '/404.html';
    if (!isValidPage && !is404Page) {
        window.location.href = '/404.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    handle404Error();
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        handle404Error();
    }
});

// iOS specific optimizations
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Prevent iOS bounce scroll and pull-to-refresh
if (isIOS) {
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Prevent pull-to-refresh
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

const statusText = document.getElementById('status-text');
if (statusText) {
    const texts = is404Page
        ? ['404 Error', 'Page Not Found', 'Error 404', 'Not Found']
        : ['Website Main Page', 'Connection Secured', 'Encrypted', 'Secure Channel', 'Verified'];
    let currentIndex = 0;

    // Use requestAnimationFrame for smoother animations on mobile
    function changeText() {
        if (isTouchDevice && isIOS) {
            // Simpler animation for iOS
            statusText.style.transition = 'opacity 0.3s ease';
            statusText.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                statusText.textContent = texts[currentIndex];
                statusText.style.opacity = '1';
            }, 150);
        } else {
            statusText.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                statusText.textContent = texts[currentIndex];
                statusText.style.opacity = '1';
            }, 300);
        }
    }

    // Reduce animation frequency on mobile for better performance
    const interval = isTouchDevice ? 4000 : 3000;
    setInterval(changeText, interval);
}
