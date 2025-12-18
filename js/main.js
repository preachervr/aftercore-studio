// Active States Logic

const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll("a");
const currentUrl = window.location.href.replace(/\/$/, "");;

links.forEach(link => {
  const linkHref = link.href.replace(/\/$/, "");
  const statusText = link.nextElementSibling;

  if (linkHref === currentUrl) {
    link.classList.add("text-neonpink-400", "bg-neonpink-500/10", "shadow-[0_0_15px_var(--color-neonpink-950)]");

    if (statusText && statusText.classList.contains("nav-status")) {
      statusText.textContent = "SYSTEM_READY";
      statusText.classList.remove("text-rubyradiance-500");
      statusText.classList.add("text-neonglow-500");
    }
  } else {
    link.classList.remove("text-neonpink-400", "bg-neonpink-500/10", "shadow-[0_0_15px_var(--color-neonpink-950)]");

    if (statusText && statusText.classList.contains("nav-status")) {
      statusText.textContent = "ENCRYPTION_ACTIVE";
      statusText.classList.remove("text-neonglow-500");
      statusText.classList.add("text-rubyradiance-500");
    }
  }
})

// Shutdown glitch

document.getElementById('shutdownTrigger').addEventListener('click', function(e) {
  e.preventDefault();
  
  const overlay = document.getElementById('shutdown-overlay');
  const body = document.body;


  body.style.overflow = 'hidden';
  overlay.classList.add('glitch-active');

  setTimeout(() => {
    window.location.href = 'index.html'; 
  }, 500);
});

// Main Video

const video = document.getElementById("protocolVideo");
const videoWrapper = document.getElementById("videoWrapper");
const iconTarget = document.getElementById("iconTarget");
const btnText = document.getElementById("btnText");

function togglePlayback() {
  if (video.paused) {
    video.play();
    iconTarget.setAttribute("href", "#pause");
    btnText.textContent = "PAUSE";
  } else {
    video.pause();
    // Switch symbol to Play
    iconTarget.setAttribute("href", "#play");
    btnText.textContent = "PLAY";
  }
}

if (videoWrapper) {
    videoWrapper.addEventListener("click", togglePlayback);
}

window.addEventListener('load', () => {
    video.play().catch(error => {
        console.log("Autoplay was prevented. User must interact first.");
        iconTarget.setAttribute("href", "#play");
        btnText.textContent = "PLAY";
    });
});

// 1. Generate randomized hex code for the side columns
const codeStreams = document.querySelectorAll('#left-code-stream, #right-code-stream');
const hexChars = "0123456789ABCDEF";
let hexBlock = "";
for (let i = 0; i < 200; i++) {
  hexBlock += `0x${hexChars[Math.floor(Math.random()*16)]}${hexChars[Math.floor(Math.random()*16)]}<br>`;
}
codeStreams.forEach(stream => stream.innerHTML = hexBlock + hexBlock);

// 2. Handle Lightbox Logic
const lightbox = document.getElementById('terminal-lightbox');
const hud = document.getElementById('decrypt-hud');
const imgContainer = document.getElementById('revealed-image-container');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxFilename = document.getElementById('lightbox-filename');

function openLightbox(src, filename) {
  // Show overlay and start takeover
  lightbox.classList.remove('hidden');
  setTimeout(() => lightbox.classList.add('opacity-100'), 10);
  
  // Reset HUD and Image states
  hud.classList.remove('hidden');
  imgContainer.classList.add('hidden');
  
  // Set content
  lightboxImg.src = src;
  lightboxFilename.innerText = filename;

  // Simulation: After 1.5s, "decrypt" the image
  setTimeout(() => {
    hud.classList.add('hidden');
    imgContainer.classList.remove('hidden');
  }, 1500);
}

// 3. Attach listeners to your gallery images
document.querySelectorAll('.fragmented-ev-img').forEach(img => {
  img.addEventListener('click', () => {
    const filename = img.closest('div').parentElement.querySelector('h3').innerText;
    openLightbox(img.src, filename);
  });
});

// 4. Close Access
document.getElementById('close-lightbox').onclick = () => {
  lightbox.classList.remove('opacity-100');
  setTimeout(() => lightbox.classList.add('hidden'), 500);
};