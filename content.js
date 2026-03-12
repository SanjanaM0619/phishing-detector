// 1. Create the warning box (hidden by default)
const warningBox = document.createElement('div');
warningBox.style.position = 'absolute';
warningBox.style.padding = '10px';
warningBox.style.backgroundColor = 'red';
warningBox.style.color = 'white';
warningBox.style.borderRadius = '5px';
warningBox.style.fontSize = '12px';
warningBox.style.zIndex = '10000';
warningBox.style.display = 'none'; // Hidden
warningBox.innerText = "⚠️ AI Warning: Malicious Link Detected!";
document.body.appendChild(warningBox);

// 2. The "AI" Logic (Baby Step version)
function checkUrlWithAI(url) {
    // For now, let's pretend any URL with "test" or "login" is malicious
    const suspiciousWords = ["test", "login", "account", "verify"];
    return suspiciousWords.some(word => url.toLowerCase().includes(word));
}

// 3. Listen for Hovers
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const url = link.href;

        if (checkUrlWithAI(url)) {
            // Show the red warning at the mouse position
            warningBox.style.left = e.pageX + 10 + 'px';
            warningBox.style.top = e.pageY + 10 + 'px';
            warningBox.style.display = 'block';
            link.style.backgroundColor = "rgba(255, 0, 0, 0.2)"; // Light red tint
        }
    });

    link.addEventListener('mouseleave', () => {
        warningBox.style.display = 'none';
        link.style.backgroundColor = "";
    });
});