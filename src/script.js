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

const statusText = document.getElementById('status-text');
if (statusText) {
    const texts = is404Page
        ? ['404 Error', 'Page Not Found', 'Error 404', 'Not Found']
        : ['Website Main Page', 'Connection Secured', 'Encrypted', 'Secure Channel', 'Verified'];
    let currentIndex = 0;
    function changeText() {
        statusText.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            statusText.textContent = texts[currentIndex];
            statusText.style.opacity = '1';
        }, 300);
    }
    setInterval(changeText, 3000);
}
