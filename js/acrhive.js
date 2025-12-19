// Hamburger Menu

const btnMenu = document.getElementById("btnMenu");
const navMobile = document.getElementById("navMobile");
const menuIconTarget = document.getElementById("menuIconTarget");

btnMenu.addEventListener("click", () => {
  const isHidden = navMobile.classList.toggle("hidden");
  menuIconTarget.setAttribute("href", isHidden ? "#menu" : "#close");
})

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

// Video Logs Playback

const videoWrappers = document.querySelectorAll(".video-wrapper");

videoWrappers.forEach((wrapper) => {
  const video = wrapper.querySelector(".protocol-video");
  const iconTarget = wrapper.querySelector(".icon-target");
  const btnText = wrapper.querySelector(".btn-text");

  function togglePlayback() {
    if (video.paused) {
      video.play();
      iconTarget.setAttribute("href", "#pause");
      btnText.textContent = "PAUSE";
    } else {
      video.pause();
      iconTarget.setAttribute("href", "#play");
      btnText.textContent = "PLAY";
    }
  }

  wrapper.addEventListener("click", togglePlayback);

  window.addEventListener('load', () => {
    video.play().catch(error => {
      console.log("Autoplay prevented for a video log.");
      iconTarget.setAttribute("href", "#play");
      btnText.textContent = "PLAY";
    });
  });
});

// Clock

function updateClock() {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ":" + 
                       now.getMinutes().toString().padStart(2, '0') + ":" + 
                       now.getSeconds().toString().padStart(2, '0');
    document.getElementById('system-time').innerText = "SYSTEM_TIME: " + timeString;
}
setInterval(updateClock, 1000);
updateClock();

