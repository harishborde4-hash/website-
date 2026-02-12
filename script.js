// Mobile menu toggle
document.getElementById("mobile-btn")?.addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

// Tab switching
function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => {
    el.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");

  // Close mobile menu if open
  document.getElementById("mobile-menu")?.classList.add("hidden");

  // Animate counters only when home is visible
  if (tabId === "home") {
    startCounters();
  }
}

// Simple counter animation
function animateValue(id, start, end, duration, suffix = "") {
  let obj = document.getElementById(id);
  if (!obj) return;

  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(() => {
    current += increment;
    obj.textContent = current.toLocaleString() + suffix;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

function startCounters() {
  animateValue("count-companies",   0, 4200,  2200);
  animateValue("count-teens",       0, 5200000, 2800, "M+");
  animateValue("count-projects",    0, 18500,  2200);
  animateValue("count-satisfaction",0, 98,     1800, "%");
}

// Modal controls
function showApplyModal() {
  document.getElementById("applyModal").classList.remove("hidden");
}

function closeApplyModal() {
  document.getElementById("applyModal").classList.add("hidden");
}

function showLoginModal() {
  alert("Login flow would open here (demo)");
}

// Close modal when clicking outside
document.getElementById("applyModal")?.addEventListener("click", function(e) {
  if (e.target === this) closeApplyModal();
});

// Init
window.addEventListener("load", () => {
  switchTab("home"); // start on home
});
