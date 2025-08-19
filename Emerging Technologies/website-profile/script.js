// Year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
		if (next === 'dark') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', next);
	});
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
	navToggle.addEventListener('click', () => {
		const isOpen = navLinks.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	});
	// Close on link click
	navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Intersection Observer for reveals
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const el = entry.target;
			const delay = Number(el.getAttribute('data-delay') || 0);
			setTimeout(() => el.classList.add('visible'), delay);
			observer.unobserve(el);
		}
	});
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Skill bars animate when visible
const skillBars = Array.from(document.querySelectorAll('.skill-bar'));
skillBars.forEach(bar => {
	const inner = document.createElement('i');
	bar.appendChild(inner);
	const level = Number(bar.getAttribute('data-level') || 0);
	const onIntersect = (entries, obs) => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				inner.style.setProperty('--val', level + '%');
				inner.style.width = level + '%';
				obs.unobserve(bar);
			}
		});
	};
	new IntersectionObserver(onIntersect, { threshold: 0.3 }).observe(bar);
});

// Typed-like effect
const typed = document.getElementById('typed');
if (typed) {
	const full = typed.textContent.trim();
	typed.textContent = '';
	let i = 0;
	const typer = () => {
		if (i <= full.length) {
			typed.textContent = full.slice(0, i) + (i < full.length ? '|' : '');
			i += Math.random() < 0.1 ? 2 : 1;
			setTimeout(typer, 30 + Math.random() * 90);
		}
	};
	setTimeout(typer, 500);
}

// Matrix background canvas
(function matrixRain() {
	const canvas = document.getElementById('matrix-bg');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	let width, height, cols, drops;

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		cols = Math.floor(width / 16);
		drops = new Array(cols).fill(0).map(() => Math.random() * -100);
	}
	window.addEventListener('resize', resize);
	resize();

	function draw() {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
		ctx.fillRect(0, 0, width, height);
		ctx.font = '14px "JetBrains Mono", monospace';
		ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
		for (let i = 0; i < cols; i++) {
			const char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
			ctx.fillText(char, i * 16, drops[i] * 16);
			drops[i]++;
			if (drops[i] * 16 > height && Math.random() > 0.975) {
				drops[i] = Math.random() * -50;
			}
		}
		requestAnimationFrame(draw);
	}
	draw();
})();

// Tilt effect for cards
const tiltCards = document.querySelectorAll('.tilt');
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

tiltCards.forEach(card => {
	card.addEventListener('mousemove', (e) => {
		const rect = card.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		const rx = clamp((py - 0.5) * -10, -8, 8);
		const ry = clamp((px - 0.5) * 10, -8, 8);
		card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
	});
	card.addEventListener('mouseleave', () => {
		card.style.transform = '';
	});
});

// Smooth scroll for internal links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => link.addEventListener('click', (e) => {
	const targetId = link.getAttribute('href').slice(1);
	const target = document.getElementById(targetId);
	if (target) {
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}));

// Contact form - mailto handler
const form = document.getElementById('contact-form');
if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const data = new FormData(form);
		const name = encodeURIComponent(data.get('name'));
		const email = encodeURIComponent(data.get('email'));
		const message = encodeURIComponent(data.get('message'));
		const subject = `Portfolio Inquiry from ${data.get('name')}`;
		const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
		window.location.href = `mailto:s227003977@mandela.ac.za?subject=${encodeURIComponent(subject)}&body=${body}`;
	});
}