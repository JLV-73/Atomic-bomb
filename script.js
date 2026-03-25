/* ============================================================
   ATOMIC BOMB by JLV — Script principal
   Site éducatif et scientifique sur l'arme nucléaire
   ============================================================ */

// ======================== INITIALISATION ========================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initHeroCounters();
    initFAQ();
    initCharts();
    initSimulation();
    initHeroParticles();
});

// ======================== NAVBAR ========================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
            }
        });
    });
}

// ======================== SCROLL ANIMATIONS ========================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ======================== HERO COUNTERS ========================
function initHeroCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('fr-FR');
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ======================== HERO PARTICLES ========================
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const count = 60;

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            a: Math.random() * 0.3 + 0.1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 214, 160, ${p.a})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 214, 160, ${0.05 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ======================== FAQ ========================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');

            // Close others
            document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// ======================== CHARTS (Chart.js) ========================
function initCharts() {
    // Vérification de Chart.js
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js non chargé');
        return;
    }

    // Configuration globale
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. Essais nucléaires par décennie
    const ctxTests = document.getElementById('chartTests');
    if (ctxTests) {
        new Chart(ctxTests, {
            type: 'bar',
            data: {
                labels: ['1945-49', '1950-59', '1960-69', '1970-79', '1980-89', '1990-99', '2000-09', '2010-17'],
                datasets: [{
                    label: 'Nombre d\'essais',
                    data: [6, 185, 507, 388, 424, 62, 11, 3],
                    backgroundColor: [
                        'rgba(6, 214, 160, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(168, 85, 247, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(96, 165, 250, 0.7)',
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(148, 163, 184, 0.7)',
                    ],
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(10,10,15,0.9)',
                        borderColor: 'rgba(6,214,160,0.3)',
                        borderWidth: 1,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.04)' },
                    },
                    x: {
                        grid: { display: false },
                    }
                }
            }
        });
    }

    // 2. Arsenaux nucléaires actuels (doughnut)
    const ctxArsenals = document.getElementById('chartArsenals');
    if (ctxArsenals) {
        new Chart(ctxArsenals, {
            type: 'doughnut',
            data: {
                labels: ['Russie', 'États-Unis', 'Chine', 'France', 'Royaume-Uni', 'Inde', 'Pakistan', 'Israël', 'Corée du Nord'],
                datasets: [{
                    data: [5580, 5044, 500, 290, 225, 172, 170, 90, 50],
                    backgroundColor: [
                        '#ef4444', '#3b82f6', '#f59e0b', '#06d6a0',
                        '#8b5cf6', '#f97316', '#22c55e', '#6366f1', '#ec4899'
                    ],
                    borderColor: 'rgba(10,10,15,0.8)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '55%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { padding: 12, font: { size: 11 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10,10,15,0.9)',
                        borderColor: 'rgba(6,214,160,0.3)',
                        borderWidth: 1,
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ~${ctx.parsed.toLocaleString('fr-FR')} ogives`
                        }
                    }
                }
            }
        });
    }

    // 3. Évolution des arsenaux (line)
    const ctxEvolution = document.getElementById('chartEvolution');
    if (ctxEvolution) {
        new Chart(ctxEvolution, {
            type: 'line',
            data: {
                labels: ['1945', '1950', '1955', '1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2024'],
                datasets: [
                    {
                        label: 'États-Unis',
                        data: [6, 369, 3057, 20434, 31642, 26662, 27519, 24304, 23368, 21392, 12144, 10577, 10295, 8207, 6970, 5800, 5044],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59,130,246,0.1)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 2,
                    },
                    {
                        label: 'URSS / Russie',
                        data: [0, 5, 200, 1627, 6144, 11736, 19443, 30665, 39197, 37000, 27000, 21000, 17000, 12000, 7700, 6375, 5580],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 2,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { padding: 16 } },
                    tooltip: {
                        backgroundColor: 'rgba(10,10,15,0.9)',
                        borderColor: 'rgba(6,214,160,0.3)',
                        borderWidth: 1,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        ticks: {
                            callback: v => v >= 1000 ? (v / 1000) + 'k' : v
                        }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 4. Comparaison de puissance (bar horizontal, log)
    const ctxPower = document.getElementById('chartPower');
    if (ctxPower) {
        new Chart(ctxPower, {
            type: 'bar',
            data: {
                labels: [
                    'Grenade',
                    'Bombe 500 kg',
                    'MOAB (GBU-43)',
                    'Hiroshima (Little Boy)',
                    'Nagasaki (Fat Man)',
                    'Bombe H standard (1 Mt)',
                    'Castle Bravo (15 Mt)',
                    'Tsar Bomba (50 Mt)'
                ],
                datasets: [{
                    label: 'Puissance (tonnes TNT éq.)',
                    data: [0.00018, 0.25, 11, 15000, 21000, 1000000, 15000000, 50000000],
                    backgroundColor: [
                        'rgba(34,197,94,0.7)',
                        'rgba(96,165,250,0.7)',
                        'rgba(59,130,246,0.7)',
                        'rgba(245,158,11,0.7)',
                        'rgba(249,115,22,0.7)',
                        'rgba(239,68,68,0.7)',
                        'rgba(168,85,247,0.7)',
                        'rgba(236,72,153,0.7)',
                    ],
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(10,10,15,0.9)',
                        borderColor: 'rgba(6,214,160,0.3)',
                        borderWidth: 1,
                        callbacks: {
                            label: (ctx) => {
                                const val = ctx.parsed.x;
                                if (val >= 1e6) return `${(val / 1e6).toFixed(0)} Mt`;
                                if (val >= 1e3) return `${(val / 1e3).toFixed(0)} kt`;
                                return `${val} t`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'logarithmic',
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        ticks: {
                            callback: v => {
                                if (v >= 1e6) return (v / 1e6) + ' Mt';
                                if (v >= 1e3) return (v / 1e3) + ' kt';
                                return v + ' t';
                            }
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 11 } }
                    }
                }
            }
        });
    }
}

// ======================== SIMULATION 3D (Three.js) ========================
function initSimulation() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js non chargé');
        return;
    }

    const wrapper = document.getElementById('simCanvasWrapper');
    const canvas = document.getElementById('simCanvas');
    const overlay = document.getElementById('simOverlay');

    // State
    const state = {
        running: false,
        paused: false,
        time: 0,
        phase: 'idle',
        speed: 1,
        power: 50,
        altitude: 'air',
        nightMode: false,
    };

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, wrapper.clientWidth / wrapper.clientHeight, 0.1, 2000);
    camera.position.set(0, 30, 80);
    camera.lookAt(0, 15, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111122, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x6688cc, 0.5);
    dirLight.position.set(50, 100, 50);
    scene.add(dirLight);

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(500, 500);
    const groundMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a15,
        roughness: 0.9,
        metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(200, 40, 0x06d6a0, 0x0a1520);
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Orbit controls (manual simplified)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let cameraAngle = { theta: 0, phi: Math.PI / 6 };
    let cameraRadius = 80;

    function updateCamera() {
        camera.position.x = cameraRadius * Math.sin(cameraAngle.theta) * Math.cos(cameraAngle.phi);
        camera.position.y = cameraRadius * Math.sin(cameraAngle.phi) + 15;
        camera.position.z = cameraRadius * Math.cos(cameraAngle.theta) * Math.cos(cameraAngle.phi);
        camera.lookAt(0, 15, 0);
    }
    updateCamera();

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        cameraAngle.theta -= dx * 0.005;
        cameraAngle.phi = Math.max(-0.1, Math.min(Math.PI / 2.2, cameraAngle.phi + dy * 0.005));
        prevMouse = { x: e.clientX, y: e.clientY };
        updateCamera();
    });
    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('mouseleave', () => isDragging = false);
    canvas.addEventListener('wheel', (e) => {
        cameraRadius = Math.max(20, Math.min(200, cameraRadius + e.deltaY * 0.05));
        updateCamera();
    });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    });
    canvas.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        cameraAngle.theta -= dx * 0.005;
        cameraAngle.phi = Math.max(-0.1, Math.min(Math.PI / 2.2, cameraAngle.phi + dy * 0.005));
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        updateCamera();
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener('touchend', () => isDragging = false);

    // Explosion objects
    let fireball, fireballGlow, shockwave, shockwaveRing2, heatDome, radiationRings;
    let mushroomStem, mushroomCap, mushroomCapRing, falloutParticles, debrisParticles;
    let flashLight, fireLight, groundScorch;
    let smokeColumns = [];
    let emberParticles;

    function createExplosionObjects() {
        // Remove previous
        clearExplosion();

        const scaleFactor = state.power / 50;
        const altOffset = state.altitude === 'surface' ? 0 : state.altitude === 'air' ? 10 : 30;

        // Fireball core — bright white/yellow center
        const fbGeo = new THREE.SphereGeometry(1, 48, 48);
        const fbMat = new THREE.MeshBasicMaterial({
            color: 0xffcc44,
            transparent: true,
            opacity: 0,
        });
        fireball = new THREE.Mesh(fbGeo, fbMat);
        fireball.position.y = altOffset;
        fireball.userData = { scaleFactor, altOffset };
        scene.add(fireball);

        // Fireball outer glow — larger, softer orange halo
        const glowGeo = new THREE.SphereGeometry(1, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0,
            side: THREE.BackSide,
        });
        fireballGlow = new THREE.Mesh(glowGeo, glowMat);
        fireballGlow.position.y = altOffset;
        scene.add(fireballGlow);

        // Shockwave ring — visible expanding ring on ground
        const swGeo = new THREE.RingGeometry(0.8, 1, 128);
        const swMat = new THREE.MeshBasicMaterial({
            color: 0x88ccff,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
        });
        shockwave = new THREE.Mesh(swGeo, swMat);
        shockwave.rotation.x = -Math.PI / 2;
        shockwave.position.y = 0.5;
        scene.add(shockwave);

        // Second shockwave ring — Mach stem reflection
        const sw2Geo = new THREE.RingGeometry(0.6, 1, 128);
        const sw2Mat = new THREE.MeshBasicMaterial({
            color: 0xaaddff,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
        });
        shockwaveRing2 = new THREE.Mesh(sw2Geo, sw2Mat);
        shockwaveRing2.rotation.x = -Math.PI / 2;
        shockwaveRing2.position.y = 1;
        scene.add(shockwaveRing2);

        // Heat dome — glowing hemisphere
        const hdGeo = new THREE.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
        const hdMat = new THREE.MeshBasicMaterial({
            color: 0xff3300,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
        });
        heatDome = new THREE.Mesh(hdGeo, hdMat);
        heatDome.position.y = 0.2;
        scene.add(heatDome);

        // Radiation rings (visual abstract — cyan pulsing)
        radiationRings = new THREE.Group();
        for (let i = 0; i < 6; i++) {
            const ringGeo = new THREE.TorusGeometry(2 + i * 3, 0.15, 8, 128);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0x06d6a0,
                transparent: true,
                opacity: 0,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = -Math.PI / 2;
            ring.position.y = altOffset + 1;
            radiationRings.add(ring);
        }
        scene.add(radiationRings);

        // Mushroom stem — wider, more textured column
        const stemGeo = new THREE.CylinderGeometry(0.6, 2.5, 1, 24, 8, true);
        const stemMat = new THREE.MeshPhongMaterial({
            color: 0xcc8833,
            transparent: true,
            opacity: 0,
            emissive: 0x663311,
            emissiveIntensity: 0.5,
            shininess: 5,
        });
        mushroomStem = new THREE.Mesh(stemGeo, stemMat);
        mushroomStem.position.y = altOffset;
        scene.add(mushroomStem);

        // Mushroom cap — flattened sphere with warm emissive
        const capGeo = new THREE.SphereGeometry(1, 48, 24);
        capGeo.scale(1, 0.35, 1);
        const capMat = new THREE.MeshPhongMaterial({
            color: 0xcc7722,
            transparent: true,
            opacity: 0,
            emissive: 0x884411,
            emissiveIntensity: 0.6,
            shininess: 5,
        });
        mushroomCap = new THREE.Mesh(capGeo, capMat);
        mushroomCap.position.y = altOffset;
        scene.add(mushroomCap);

        // Cap bottom ring — rolling torus under the cap
        const capRingGeo = new THREE.TorusGeometry(1, 0.3, 16, 48);
        const capRingMat = new THREE.MeshPhongMaterial({
            color: 0xbb6622,
            transparent: true,
            opacity: 0,
            emissive: 0x663311,
            emissiveIntensity: 0.4,
        });
        mushroomCapRing = new THREE.Mesh(capRingGeo, capRingMat);
        mushroomCapRing.rotation.x = Math.PI / 2;
        mushroomCapRing.position.y = altOffset;
        scene.add(mushroomCapRing);

        // Ground scorch mark — dark circle expanding on ground
        const scorchGeo = new THREE.CircleGeometry(1, 64);
        const scorchMat = new THREE.MeshBasicMaterial({
            color: 0x1a0800,
            transparent: true,
            opacity: 0,
        });
        groundScorch = new THREE.Mesh(scorchGeo, scorchMat);
        groundScorch.rotation.x = -Math.PI / 2;
        groundScorch.position.y = 0.05;
        scene.add(groundScorch);

        // Fallout particles — more particles, warm tones
        const particleCount = 1200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 5;
            positions[i * 3 + 1] = Math.random() * 5 + altOffset;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
            // Warm gray/brown/amber particles
            const warmth = Math.random();
            colors[i * 3] = 0.5 + warmth * 0.4;     // R
            colors[i * 3 + 1] = 0.35 + warmth * 0.2; // G
            colors[i * 3 + 2] = 0.15 + warmth * 0.1;  // B
        }
        const partGeo = new THREE.BufferGeometry();
        partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        partGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const partMat = new THREE.PointsMaterial({
            size: 0.5,
            transparent: true,
            opacity: 0,
            vertexColors: true,
            sizeAttenuation: true,
        });
        falloutParticles = new THREE.Points(partGeo, partMat);
        scene.add(falloutParticles);

        // Ember / hot debris particles — bright orange sparks
        const emberCount = 400;
        const emberPos = new Float32Array(emberCount * 3);
        const emberCol = new Float32Array(emberCount * 3);
        for (let i = 0; i < emberCount; i++) {
            emberPos[i * 3] = (Math.random() - 0.5) * 3;
            emberPos[i * 3 + 1] = Math.random() * 3 + altOffset;
            emberPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
            const hot = Math.random();
            emberCol[i * 3] = 1;
            emberCol[i * 3 + 1] = 0.3 + hot * 0.5;
            emberCol[i * 3 + 2] = hot * 0.1;
        }
        const emberGeo = new THREE.BufferGeometry();
        emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
        emberGeo.setAttribute('color', new THREE.BufferAttribute(emberCol, 3));
        const emberMat = new THREE.PointsMaterial({
            size: 0.35,
            transparent: true,
            opacity: 0,
            vertexColors: true,
            sizeAttenuation: true,
        });
        emberParticles = new THREE.Points(emberGeo, emberMat);
        scene.add(emberParticles);

        // Flash light — intense white point light
        flashLight = new THREE.PointLight(0xffffff, 0, 600);
        flashLight.position.set(0, altOffset, 0);
        scene.add(flashLight);

        // Persistent fire light — warm orange illumination during mushroom
        fireLight = new THREE.PointLight(0xff8833, 0, 300);
        fireLight.position.set(0, altOffset + 10, 0);
        scene.add(fireLight);
    }

    function clearExplosion() {
        [fireball, fireballGlow, shockwave, shockwaveRing2, heatDome, radiationRings,
         mushroomStem, mushroomCap, mushroomCapRing, groundScorch,
         falloutParticles, emberParticles, flashLight, fireLight
        ].forEach(obj => {
            if (obj) scene.remove(obj);
        });
        smokeColumns.forEach(s => scene.remove(s));
        smokeColumns = [];
    }

    // Animation phases — enhanced realism
    function updateExplosion(dt) {
        if (!state.running || state.paused) return;

        state.time += dt * state.speed;
        const t = state.time;
        const sf = fireball ? fireball.userData.scaleFactor : 1;
        const alt = fireball ? fireball.userData.altOffset : 10;

        // Get layer visibility
        const showFireball = document.getElementById('layerFireball').checked;
        const showShockwave = document.getElementById('layerShockwave').checked;
        const showHeat = document.getElementById('layerHeat').checked;
        const showRadiation = document.getElementById('layerRadiation').checked;
        const showFallout = document.getElementById('layerFallout').checked;

        // ─── Phase: Flash (0–0.5s) ───
        if (t < 0.5) {
            state.phase = 'flash';
            const p = t / 0.5;
            if (flashLight) {
                flashLight.intensity = 15 * (1 - p);
            }
            // White-hot expanding sphere
            if (fireball && showFireball) {
                const s = t * 12 * sf;
                fireball.scale.set(s, s, s);
                fireball.material.opacity = 1;
                fireball.material.color.setRGB(1, 1, 0.95);
            }
            if (fireballGlow && showFireball) {
                const s = t * 18 * sf;
                fireballGlow.scale.set(s, s, s);
                fireballGlow.material.opacity = 0.5;
                fireballGlow.material.color.setRGB(1, 0.8, 0.3);
            }
            // Ground scorch starts
            if (groundScorch) {
                groundScorch.scale.set(p * 5 * sf, p * 5 * sf, 1);
                groundScorch.material.opacity = p * 0.8;
            }
            // Scene illumination flash
            renderer.toneMappingExposure = 1.0 + (1 - p) * 4;
        }
        // ─── Phase: Fireball expansion (0.5–3s) ───
        else if (t < 3) {
            state.phase = 'boule de feu';
            const progress = (t - 0.5) / 2.5;
            if (flashLight) flashLight.intensity = Math.max(0, 2 * (1 - progress));
            renderer.toneMappingExposure = Math.max(1.0, 1.0 + (1 - progress) * 1.5);

            if (fireball && showFireball) {
                const s = (5 + progress * 18) * sf;
                fireball.scale.set(s, s * (0.9 + progress * 0.1), s);
                fireball.material.opacity = Math.max(0.4, 1 - progress * 0.6);
                // Transition: white → yellow → orange
                const r = 1;
                const g = 0.8 - progress * 0.3;
                const b = 0.3 - progress * 0.25;
                fireball.material.color.setRGB(r, Math.max(0, g), Math.max(0, b));
            }

            if (fireballGlow && showFireball) {
                const s = (8 + progress * 25) * sf;
                fireballGlow.scale.set(s, s * 0.85, s);
                fireballGlow.material.opacity = Math.max(0.1, 0.5 - progress * 0.4);
                fireballGlow.material.color.setRGB(1, 0.4 - progress * 0.2, 0.05);
            }

            // Shockwave expands outward
            if (t > 0.8 && shockwave && showShockwave) {
                const sp = (t - 0.8) / 2.2;
                const s = sp * 50 * sf;
                shockwave.scale.set(s, s, 1);
                shockwave.material.opacity = Math.max(0, 0.5 - sp * 0.35);
            }
            if (t > 1.2 && shockwaveRing2 && showShockwave) {
                const sp = (t - 1.2) / 1.8;
                const s = sp * 35 * sf;
                shockwaveRing2.scale.set(s, s, 1);
                shockwaveRing2.material.opacity = Math.max(0, 0.3 - sp * 0.25);
            }

            // Fire light grows
            if (fireLight) {
                fireLight.intensity = progress * 5;
                fireLight.position.y = alt + progress * 8;
            }

            // Ground scorch expands
            if (groundScorch) {
                const ss = (5 + progress * 20) * sf;
                groundScorch.scale.set(ss, ss, 1);
                groundScorch.material.opacity = 0.8;
            }

            // Embers start flying out
            if (emberParticles && showFireball && progress > 0.3) {
                const ep = (progress - 0.3) / 0.7;
                emberParticles.material.opacity = Math.min(0.8, ep * 2);
                const positions = emberParticles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    const dx = positions[i];
                    const dz = positions[i + 2];
                    const dist = Math.sqrt(dx * dx + dz * dz) + 0.1;
                    positions[i] += (dx / dist) * 0.4 * sf;
                    positions[i + 1] += (Math.random() - 0.3) * 0.3;
                    positions[i + 2] += (dz / dist) * 0.4 * sf;
                }
                emberParticles.geometry.attributes.position.needsUpdate = true;
            }
        }
        // ─── Phase: Mushroom formation (3–8s) ───
        else if (t < 8) {
            state.phase = 'champignon';
            const progress = (t - 3) / 5;
            renderer.toneMappingExposure = 1.0;

            // Fireball rises and fades to orange/brown
            if (fireball && showFireball) {
                const s = (23 - progress * 10) * sf;
                fireball.scale.set(s, s * 0.7, s);
                fireball.material.opacity = Math.max(0, 0.4 - progress * 0.4);
                fireball.position.y = alt + progress * 25 * sf;
                fireball.material.color.setRGB(1, 0.4 - progress * 0.2, 0);
            }

            if (fireballGlow && showFireball) {
                fireballGlow.material.opacity = Math.max(0, 0.1 - progress * 0.1);
                fireballGlow.position.y = alt + progress * 25 * sf;
            }

            // Mushroom stem grows — warm brown, well-lit
            if (mushroomStem && showFireball) {
                const height = progress * 45 * sf;
                const width = (3 + progress * 1.5) * sf;
                mushroomStem.scale.set(width, height, width);
                mushroomStem.position.y = alt + height / 2;
                mushroomStem.material.opacity = Math.min(0.85, progress * 2.5);
                // Warm lit color
                const warmth = 1 - progress * 0.3;
                mushroomStem.material.color.setRGB(0.8 * warmth, 0.5 * warmth, 0.2 * warmth);
                mushroomStem.material.emissive.setRGB(0.4 * warmth, 0.2 * warmth, 0.05 * warmth);
            }

            // Mushroom cap expands and flattens
            if (mushroomCap && showFireball) {
                const s = (progress * 18) * sf;
                mushroomCap.scale.set(s, s * (0.45 - progress * 0.1), s);
                mushroomCap.position.y = alt + progress * 45 * sf;
                mushroomCap.material.opacity = Math.min(0.8, progress * 2);
                const warmth = 1 - progress * 0.2;
                mushroomCap.material.color.setRGB(0.8 * warmth, 0.5 * warmth, 0.15 * warmth);
                mushroomCap.material.emissive.setRGB(0.5 * warmth, 0.25 * warmth, 0.05 * warmth);
            }

            // Cap ring (rolling torus at bottom of cap)
            if (mushroomCapRing && showFireball) {
                const rs = progress * 14 * sf;
                mushroomCapRing.scale.set(rs, rs, rs * 0.6);
                mushroomCapRing.position.y = alt + progress * 42 * sf;
                mushroomCapRing.material.opacity = Math.min(0.6, progress * 1.5);
                mushroomCapRing.rotation.z += dt * 0.3;
            }

            // Shockwave continues
            if (shockwave && showShockwave) {
                const s = ((t - 0.8) / 7.2) * 100 * sf;
                shockwave.scale.set(s, s, 1);
                shockwave.material.opacity = Math.max(0, 0.15 - progress * 0.12);
            }
            if (shockwaveRing2 && showShockwave) {
                shockwaveRing2.material.opacity = Math.max(0, 0.1 - progress * 0.1);
            }

            // Heat dome
            if (heatDome && showHeat) {
                const s = (progress * 0.6 + 0.4) * 35 * sf;
                heatDome.scale.set(s, s * 0.4, s);
                heatDome.material.opacity = Math.max(0, 0.25 - progress * 0.2);
            }

            // Radiation rings
            if (radiationRings && showRadiation) {
                radiationRings.children.forEach((ring, i) => {
                    const delay = i * 0.12;
                    if (progress > delay) {
                        const rp = Math.min(1, (progress - delay) / 0.4);
                        const s = rp * (3 + i * 2.5) * sf;
                        ring.scale.set(s, s, s);
                        ring.material.opacity = Math.max(0, 0.5 * (1 - rp));
                        ring.position.y = alt + 2 + rp * 8;
                    }
                });
            }

            // Fire light follows mushroom up
            if (fireLight) {
                fireLight.intensity = Math.max(1, 5 - progress * 3);
                fireLight.position.y = alt + progress * 30 * sf;
                fireLight.color.setRGB(1, 0.5 - progress * 0.2, 0.1);
            }

            // Ground scorch stabilizes
            if (groundScorch) {
                groundScorch.material.opacity = Math.max(0.4, 0.8 - progress * 0.3);
            }

            // Embers continue
            if (emberParticles && showFireball) {
                emberParticles.material.opacity = Math.max(0, 0.8 - progress);
                const positions = emberParticles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += 0.15;
                    positions[i] += (Math.random() - 0.5) * 0.15;
                    positions[i + 2] += (Math.random() - 0.5) * 0.15;
                }
                emberParticles.geometry.attributes.position.needsUpdate = true;
            }
        }
        // ─── Phase: Dissipation (8–25s) — MUCH MORE VISIBLE ───
        else if (t < 25) {
            state.phase = 'dissipation';
            const progress = (t - 8) / 17;
            renderer.toneMappingExposure = 1.0;

            // Fireball fully gone
            if (fireball) fireball.material.opacity = 0;
            if (fireballGlow) fireballGlow.material.opacity = 0;
            if (shockwave) shockwave.material.opacity = 0;
            if (shockwaveRing2) shockwaveRing2.material.opacity = 0;
            if (heatDome) heatDome.material.opacity = 0;

            // ── Mushroom stem: turns smoky gray-white, stays visible much longer ──
            if (mushroomStem) {
                const width = (4.5 + progress * 2) * sf;
                mushroomStem.scale.x = width;
                mushroomStem.scale.z = width;
                // Slowly fade but keep visible: bright smoky colors
                mushroomStem.material.opacity = Math.max(0.08, 0.85 - progress * 0.77);
                // Transition to light gray-white smoke
                const r = 0.55 + progress * 0.35;
                const g = 0.4 + progress * 0.35;
                const b = 0.25 + progress * 0.4;
                mushroomStem.material.color.setRGB(r, g, b);
                mushroomStem.material.emissive.setRGB(
                    Math.max(0, 0.3 - progress * 0.25),
                    Math.max(0, 0.15 - progress * 0.12),
                    Math.max(0, 0.05 - progress * 0.04)
                );
                mushroomStem.material.emissiveIntensity = Math.max(0.1, 0.5 - progress * 0.4);
            }

            // ── Mushroom cap: expands, thins, turns light gray-white cloud ──
            if (mushroomCap) {
                const capS = (18 + progress * 15) * sf;
                const capH = capS * Math.max(0.15, 0.35 - progress * 0.2);
                mushroomCap.scale.set(capS, capH, capS);
                mushroomCap.position.y += dt * 0.3 * sf;
                mushroomCap.material.opacity = Math.max(0.08, 0.8 - progress * 0.72);
                // Smoky white-gray
                const r = 0.6 + progress * 0.3;
                const g = 0.45 + progress * 0.35;
                const b = 0.3 + progress * 0.4;
                mushroomCap.material.color.setRGB(r, g, b);
                mushroomCap.material.emissive.setRGB(
                    Math.max(0, 0.4 - progress * 0.35),
                    Math.max(0, 0.2 - progress * 0.17),
                    Math.max(0, 0.05 - progress * 0.04)
                );
                mushroomCap.material.emissiveIntensity = Math.max(0.05, 0.6 - progress * 0.55);
            }

            // ── Cap ring: expands and fades ──
            if (mushroomCapRing) {
                const rs = (14 + progress * 8) * sf;
                mushroomCapRing.scale.set(rs, rs, rs * 0.4);
                mushroomCapRing.position.y += dt * 0.3 * sf;
                mushroomCapRing.material.opacity = Math.max(0, 0.6 - progress * 0.6);
                mushroomCapRing.rotation.z += dt * 0.15;
                mushroomCapRing.material.color.setRGB(0.6 + progress * 0.3, 0.5 + progress * 0.3, 0.4 + progress * 0.3);
            }

            // ── Radiation rings: faded ──
            if (radiationRings) {
                radiationRings.children.forEach(ring => {
                    ring.material.opacity = Math.max(0, ring.material.opacity - dt * 0.3);
                });
            }

            // ── Fallout: warm-colored particles drifting down and wind-blown ──
            if (falloutParticles && showFallout) {
                falloutParticles.material.opacity = Math.min(0.7, progress * 1.5);
                falloutParticles.material.size = 0.5 + progress * 0.3;
                const positions = falloutParticles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    // Wind drift + gravity
                    positions[i] += (Math.random() - 0.35) * 0.4 * sf;
                    positions[i + 1] -= 0.03 + Math.random() * 0.04;
                    positions[i + 2] += (Math.random() - 0.5) * 0.25;
                    // Keep above ground
                    if (positions[i + 1] < 0.1) {
                        positions[i + 1] = 0.1 + Math.random() * 2;
                        positions[i] = (Math.random() - 0.5) * 40 * sf;
                        positions[i + 2] = (Math.random() - 0.5) * 40 * sf;
                    }
                }
                falloutParticles.geometry.attributes.position.needsUpdate = true;
            }

            // ── Fire light: warm glow persists, slowly dims ──
            if (fireLight) {
                fireLight.intensity = Math.max(0, 2 - progress * 2);
                fireLight.color.setRGB(1, 0.35, 0.05);
            }

            // ── Ground scorch remains ──
            if (groundScorch) {
                groundScorch.material.opacity = Math.max(0.15, 0.5 - progress * 0.35);
            }

            // ── Ambient light adjustment: slightly warmer during dissipation ──
            ambientLight.intensity = 0.5 + Math.max(0, (1 - progress) * 0.3);
            ambientLight.color.setRGB(
                0.08 + Math.max(0, (1 - progress) * 0.15),
                0.08 + Math.max(0, (1 - progress) * 0.05),
                0.13
            );

            dirLight.intensity = 0.5 + Math.max(0, (1 - progress) * 0.5);
        }
        // ─── Phase: Complete ───
        else {
            state.phase = 'terminé';
            state.running = false;
            renderer.toneMappingExposure = 1.0;
            ambientLight.intensity = 0.5;
            ambientLight.color.setHex(0x111122);
            dirLight.intensity = 0.5;
            document.getElementById('simPause').disabled = true;
        }

        // Update UI
        document.getElementById('simPhaseText').textContent = state.phase.charAt(0).toUpperCase() + state.phase.slice(1);
        document.getElementById('simTime').textContent = `T + ${state.time.toFixed(1)} s`;
    }

    // Render loop
    let lastTime = 0;
    let frameCount = 0;
    let fpsTime = 0;

    function animate(now) {
        requestAnimationFrame(animate);
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // FPS counter
        frameCount++;
        fpsTime += dt;
        if (fpsTime >= 1) {
            document.getElementById('simFPS').textContent = `${Math.round(frameCount / fpsTime)} FPS`;
            frameCount = 0;
            fpsTime = 0;
        }

        updateExplosion(dt);
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);

    // Controls binding
    document.getElementById('simStart').addEventListener('click', () => {
        if (state.running && state.paused) {
            state.paused = false;
            document.getElementById('simPause').disabled = false;
            return;
        }
        state.running = true;
        state.paused = false;
        state.time = 0;
        state.power = parseInt(document.getElementById('simPower').value);
        state.speed = parseFloat(document.getElementById('simSpeed').value);
        state.altitude = document.getElementById('simAltitude').value;
        createExplosionObjects();
        overlay.classList.add('hidden');
        document.getElementById('simPause').disabled = false;
        document.getElementById('simPowerDisplay').textContent = `${state.power} kt`;
    });

    document.getElementById('simPause').addEventListener('click', () => {
        state.paused = !state.paused;
        document.getElementById('simPause').textContent = state.paused ? '▶ Reprendre' : '⏸ Pause';
    });

    document.getElementById('simReset').addEventListener('click', () => {
        state.running = false;
        state.paused = false;
        state.time = 0;
        state.phase = 'idle';
        clearExplosion();
        overlay.classList.remove('hidden');
        document.getElementById('simPause').disabled = true;
        document.getElementById('simPause').textContent = '⏸ Pause';
        document.getElementById('simPhaseText').textContent = 'En attente';
        document.getElementById('simTime').textContent = 'T + 0.0 s';
        // Reset scene lighting
        renderer.toneMappingExposure = 1.0;
        ambientLight.intensity = 0.5;
        ambientLight.color.setHex(0x111122);
        dirLight.intensity = 0.5;
    });

    // Fullscreen
    document.getElementById('simFullscreen').addEventListener('click', () => {
        const simWrapper = document.getElementById('simulationWrapper');
        simWrapper.classList.toggle('fullscreen');

        setTimeout(() => {
            renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
            camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
            camera.updateProjectionMatrix();
        }, 100);
    });

    // Escape fullscreen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const simWrapper = document.getElementById('simulationWrapper');
            if (simWrapper.classList.contains('fullscreen')) {
                simWrapper.classList.remove('fullscreen');
                setTimeout(() => {
                    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
                    camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
                    camera.updateProjectionMatrix();
                }, 100);
            }
        }
    });

    // Slider updates
    document.getElementById('simPower').addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('simPowerVal').textContent = `${val} kt (éq.)`;
        state.power = parseInt(val);
    });

    document.getElementById('simSpeed').addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        document.getElementById('simSpeedVal').textContent = `${val.toFixed(1)}x`;
        state.speed = val;
    });

    document.getElementById('simDistance').addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('simDistVal').textContent = `${val} km`;
        cameraRadius = val * 1.5;
        updateCamera();
    });

    // Grid toggle
    document.getElementById('toggleGrid').addEventListener('change', (e) => {
        gridHelper.visible = e.target.checked;
    });

    // Night mode
    document.getElementById('toggleNight').addEventListener('change', (e) => {
        state.nightMode = e.target.checked;
        if (e.target.checked) {
            scene.background = new THREE.Color(0x000005);
            ambientLight.intensity = 0.1;
            dirLight.intensity = 0.1;
            groundMat.color.setHex(0x050508);
        } else {
            scene.background = null;
            ambientLight.intensity = 0.5;
            dirLight.intensity = 0.5;
            groundMat.color.setHex(0x0a0a15);
        }
    });

    // Resize
    window.addEventListener('resize', () => {
        const w = wrapper.clientWidth;
        const h = wrapper.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

/* ======================== LIGHTBOX GALERIE ======================== */
(function initLightbox() {
    const overlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    if (!overlay) return;

    // Ouvrir au clic sur une image de la galerie
    document.querySelectorAll('.gallery-item .gallery-img img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            const caption = img.closest('.gallery-item').querySelector('.gallery-caption h4');
            lightboxCaption.textContent = caption ? caption.textContent : '';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer au clic sur l'overlay
    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
})();
