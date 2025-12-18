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

// Interference

const canvas = document.getElementById('oscilloscope');
const ctx = canvas.getContext('2d');

let width, height, time = 0;
let mouseX = -1000, mouseY = -1000;

function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});
resize();

function animate() {
    // Slight clear for a "ghosting" trail effect
    ctx.fillStyle = 'oklch(13.0% 0.027 261.7)';
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ec4899'; // Your neonpink-500
    ctx.shadowBlur = 10;


    for (let x = 0; x < width; x += 2) {
        const dist = Math.abs(mouseX - x);
        const interference = Math.max(0, 1 - dist / 200);
        
        const baseAmp = 2;
        const mouseAmp = interference * 40;
        const freq = 0.02 + (interference * 0.08);
        
        const y = (height / 2) + 
                  Math.sin(x * freq + time) * (baseAmp + mouseAmp) + 
                  (Math.random() - 0.5) * (interference * 10);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();
    time += 0.15;
    requestAnimationFrame(animate);
}

animate();

// Clock


function updateClock() {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ":" + 
                       now.getMinutes().toString().padStart(2, '0') + ":" + 
                       now.getSeconds().toString().padStart(2, '0');
    
    const timeDisplays = document.querySelectorAll('.system-time');
    timeDisplays.forEach(element => {
        element.innerText = "[ SYSTEM_TIME ]: " + timeString;
    });
}

setInterval(updateClock, 1000);
updateClock();

