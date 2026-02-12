// Mobile menu
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}
mobileBtn.addEventListener('click', toggleMobileMenu);

// Tailwind script already included

// Animated counters
function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        document.getElementById(id).textContent = value.toLocaleString() + (id.includes('teens') || id.includes('projects') ? '+' : '');
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// Trigger stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue('stat-companies', 0, 4200, 1800);
            animateValue('stat-teens', 0, 5200000, 2000);
            animateValue('stat-projects', 0, 18500, 1800);
            animateValue('stat-satisfaction', 0, 98, 1200);
            statsObserver.disconnect();
        }
    });
});
statsObserver.observe(document.querySelector('#how'));

// Categories
const categories = [
    {icon:"🎨", name:"Graphic Design", gigs:"342"},
    {icon:"✍️", name:"Content Writing", gigs:"289"},
    {icon:"🎥", name:"Video Editing", gigs:"198"},
    {icon:"📱", name:"Social Media", gigs:"421"},
    {icon:"💻", name:"Web Development", gigs:"156"},
    {icon:"📈", name:"Digital Marketing", gigs:"267"},
    {icon:"📸", name:"Photography", gigs:"89"},
    {icon:"🎤", name:"Voice Over", gigs:"74"}
];
const catGrid = document.getElementById('category-grid');
categories.forEach(c => {
    const div = document.createElement('div');
    div.className = 'bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center hover:border-orange-500 transition';
    div.innerHTML = `<div class="text-6xl mb-4">${c.icon}</div><h3 class="font-semibold">${c.name}</h3><p class="text-orange-500 text-sm mt-2">${c.gigs} gigs</p>`;
    catGrid.appendChild(div);
});

// Projects data
let projects = [
    {id:1, title:"Create 10 Instagram Reels", category:"Video", pay:"₹4,500", type:"Video"},
    {id:2, title:"Write 5 SEO Blog Posts", category:"Writing", pay:"₹3,200", type:"Writing"},
    {id:3, title:"Logo & Branding Kit", category:"Design", pay:"₹6,800", type:"Design"},
    {id:4, title:"YouTube Thumbnail Design", category:"Design", pay:"₹2,100", type:"Design"},
    {id:5, title:"Social Media Campaign", category:"Marketing", pay:"₹9,000", type:"Marketing"}
];

function renderProjects(filteredProjects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    filteredProjects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card bg-zinc-900 border border-zinc-800 rounded-3xl p-8';
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="bg-orange-500/10 text-orange-500 text-xs px-4 py-1.5 rounded-full">${p.type}</span>
                <span class="font-bold text-orange-500">${p.pay}</span>
            </div>
            <h3 class="font-semibold text-xl mt-6">${p.title}</h3>
            <button onclick="applyToProject(${p.id})" class="mt-10 w-full py-4 border border-orange-500 text-orange-500 rounded-3xl hover:bg-orange-500 hover:text-black transition">Apply Now</button>
        `;
        grid.appendChild(card);
    });
}
renderProjects(projects);

// Search
document.getElementById('project-search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = projects.filter(p => p.title.toLowerCase().includes(term));
    renderProjects(filtered);
});

// Testimonials
const testimonials = [
    {text:"I earned ₹12,000 in my first month designing posters. My confidence has skyrocketed!", name:"Riya Sharma, 16", city:"Mumbai"},
    {text:"Funngro helped me get real work experience while studying. Parents are happy too!", name:"Aarav Patel, 17", city:"Delhi"}
];
let currentSlide = 0;
const slidesContainer = document.getElementById('testimonial-slides');
const dotsContainer = document.getElementById('testimonial-dots');

testimonials.forEach((t, i) => {
    const slide = document.createElement('div');
    slide.className = 'min-w-full px-8';
    slide.innerHTML = `<div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-10"><p class="italic text-lg">"${t.text}"</p><div class="mt-8"><p class="font-semibold">${t.name}</p><p class="text-sm text-zinc-400">${t.city}</p></div></div>`;
    slidesContainer.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = `w-3 h-3 rounded-full cursor-pointer ${i===0 ? 'bg-orange-500' : 'bg-zinc-600'}`;
    dot.onclick = () => goToTestimonial(i);
    dotsContainer.appendChild(dot);
});

function goToTestimonial(index) {
    currentSlide = index;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('#testimonial-dots > div').forEach((d,i) => {
        d.className = `w-3 h-3 rounded-full cursor-pointer ${i===currentSlide ? 'bg-orange-500' : 'bg-zinc-600'}`;
    });
}
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    goToTestimonial(currentSlide);
}, 7000);

// FAQ
const faqs = [
    {q: "What is the minimum age?", a: "13 years with parent/guardian consent."},
    {q: "How do I get paid?", a: "Directly to your UPI within 48 hours after approval."},
    {q: "Is it safe?", a: "Yes. All companies are verified and projects are moderated."},
    {q: "Do I need prior experience?", a: "No. Many beginner-friendly projects are available."}
];
const faqContainer = document.getElementById('faq-list');
faqs.forEach(faq => {
    const item = document.createElement('div');
    item.className = 'border border-zinc-800 rounded-3xl overflow-hidden';
    item.innerHTML = `
        <button onclick="toggleFaq(this)" class="w-full px-8 py-6 flex justify-between items-center hover:bg-zinc-900">
            <span>${faq.q}</span>
            <span class="text-2xl text-orange-500">+</span>
        </button>
        <div class="faq-answer hidden px-8 pb-8 text-zinc-400">${faq.a}</div>
    `;
    faqContainer.appendChild(item);
});

function toggleFaq(btn) {
    const answer = btn.parentElement.querySelector('.faq-answer');
    const sign = btn.querySelector('span:last-child');
    answer.classList.toggle('hidden');
    sign.textContent = sign.textContent === '+' ? '−' : '+';
}

// Modals
function showApplyModal() {
    document.getElementById('apply-modal').classList.remove('hidden');
    document.getElementById('apply-modal').classList.add('flex');
}
function hideApplyModal() {
    document.getElementById('apply-modal').classList.add('hidden');
    document.getElementById('apply-modal').classList.remove('flex');
}
function submitApplication() {
    hideApplyModal();
    const toast = document.getElementById('success-toast');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

function showLoginModal() {
    alert("Company / Teen Login – Demo (In real app this would open auth flow)");
}

function applyToProject(id) {
    alert(`Applied to project #${id} successfully! 🎉 (Modal would open in full version)`);
}

// Keyboard escape for modals
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById('apply-modal');
        if (!modal.classList.contains('hidden')) hideApplyModal();
    }
});
