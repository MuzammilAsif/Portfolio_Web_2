/* ─── DATA ─── */

const skills = [
  { iconSrc: "/Assets/Images/Icons/React.png", name: "React", pct: 95 },
  { iconSrc: "/Assets/Images/Icons/typeScript.png", name: "TypeScript", pct: 92 },
  { iconSrc: "/Assets/Images/Icons/nodejs.png", name: "Node.js", pct: 88 },
  { iconSrc: "https://img.icons8.com/fluency/96/nextjs.png", name: "Next.js", pct: 93 },
  { iconSrc: "/Assets/Images/Icons/tailwindcss.SVG", name: "CSS/Tailwind", pct: 90 },
  { iconSrc: "/Assets/Images/Icons/Threejs.png", name: "Three.js", pct: 78 },
  { iconSrc: "/Assets/Images/Icons/MongoDB.png", name: "MongoDB", pct: 82 },
  { iconSrc: "https://img.icons8.com/color/48/graphql.png", name: "GraphQL", pct: 80 },
  { iconSrc: "/Assets/Images/Icons/supabase.png", name: "Supabase", pct: 75 },
  { iconSrc: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/external-firebase-a-googles-mobile-platform-that-helps-you-quickly-develop-high-quality-apps-logo-color-tal-revivo.png", name: "Firebase", pct: 72 },
  { iconSrc: "/Assets/Images/Icons/gsap.png", name: "GSAP", pct: 85 }
];

const projects = [
  {
    iconSrc: "/Assets/Images/Content/PSI.png",
    num: "01",
    name: "Pascal Imitation Jewelry",
    tags: ["HTML", "CSS", "JavaScript"],
    cat: "oss",
    desc: "A website showcasing a collection of unique jewelry pieces inspired by the works of Blaise Pascal.reflecting Pascal's contributions to science and philosophy.",
    live: "#",
    repo: "https://github.com/MuzammilAsif/Pascal-Imitation-Jewelry",
  },
  {
    iconSrc: "/Assets/Images/Content/currensee.png",
    num: "02",
    name: "Currensee",
    tags: ["Flutter", "Dart", "Firebase"],
    cat: "mobile",
    desc: "A mobile app that provides real-time currency exchange rates, historical data visualization, and personalized alerts for 150+ currencies worldwide.",
    live: "#",
    repo: "https://github.com/MuzammilAsif/Crunsee",
  }
];

const timeline = [
  {
    date: "2025 — Present",
    role: "Project Manager",
    company: "Advox Media",
    desc: "Leading a team of 5 editors to edit high-performing videos. Oversaw 200+ video projects with a 98% client satisfaction rate. Implemented new workflow that increased efficiency by 30%.",
  },
  {
    date: "2025 — present",
    role: "Full-Stack Developer",
    company: "Fiverr",
    desc: "Providing freelance web development services, specializing in React and Next.js.",
  }
];

/* ─── RENDER SKILLS ─── */
const sg = document.getElementById("skills-grid");
skills.forEach((s, i) => {
  sg.innerHTML += `
    <div class="skill-card reveal" style="transition-delay:${i * 0.06}s">
      <img class="skill-icon" src="${s.iconSrc}" alt="${s.name}" height='50' width='50'/>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar-wrap"><div class="skill-bar" data-pct="${s.pct}"></div></div>
      <div class="skill-pct">${s.pct}%</div>
    </div>`;
});

/* ─── RENDER PROJECTS ─── */
const pg = document.getElementById("projects-grid");
function renderProjects(filter) {
  pg.innerHTML = "";
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.cat === filter);
  filtered.forEach((p) => {
    const el = document.createElement("div");
    el.className = "project-card reveal";
    el.setAttribute("data-project", p.num);
    el.innerHTML = `
      <div class="project-thumb">
        <div class="project-thumb-num">${p.num}</div>
        <img src="${p.iconSrc}" alt="${p.name}" class="project-thumb-icon"/>
        <div class="project-overlay">
          <a href="${p.live}" class="overlay-link" onclick="event.stopPropagation()">Live Demo</a>
          <a href="${p.repo}" class="overlay-link" onclick="event.stopPropagation()">GitHub</a>
        </div>
      </div>
      <div class="project-body">
        <div class="project-tags">${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}</div>
        <div class="project-name">${p.name}</div>
        <div class="project-desc">${p.desc}</div>
      </div>`;
    el.addEventListener("click", () => openModal(p));
    pg.appendChild(el);
  });
  observeReveal();
}
renderProjects("all");

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

/* ─── RENDER TIMELINE ─── */
const tl = document.getElementById("timeline");
timeline.forEach((t) => {
  tl.innerHTML += `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${t.date}</div>
      <div class="timeline-role">${t.role}</div>
      <div class="timeline-company">${t.company}</div>
      <div class="timeline-desc">${t.desc}</div>
    </div>`;
});

/* ─── THREE.JS HERO ─── */
(function () {
  const canvas = document.getElementById("hero-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  function resize() {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // Particles
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const colorPalette = [
    new THREE.Color("#758BFD"),
    new THREE.Color("#AEB8FE"),
    new THREE.Color("#27187E"),
    new THREE.Color("#F7F7FF"),
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    sizes[i] = Math.random() * 2 + 0.5;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Floating geometric shapes
  const shapes = [];
  const geometries = [
    new THREE.OctahedronGeometry(0.5, 0),
    new THREE.TetrahedronGeometry(0.5, 0),
    new THREE.IcosahedronGeometry(0.4, 0),
  ];
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x758bfd,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });

  for (let i = 0; i < 6; i++) {
    const mesh = new THREE.Mesh(
      geometries[i % geometries.length],
      wireMat.clone(),
    );
    mesh.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4 - 1,
    );
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      0,
    );
    scene._shapes = shapes;
    shapes.push({
      mesh,
      speed: Math.random() * 0.008 + 0.003,
      floatOffset: Math.random() * Math.PI * 2,
    });
    scene.add(mesh);
  }

  let mouseX = 0,
    mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / innerHeight - 0.5) * 2;
  });

  let elapsed = 0;
  function animate() {
    requestAnimationFrame(animate);
    elapsed += 0.01;
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    shapes.forEach((s) => {
      s.mesh.rotation.x += s.speed;
      s.mesh.rotation.y += s.speed * 0.7;
      s.mesh.position.y += Math.sin(elapsed + s.floatOffset) * 0.003;
    });
    renderer.render(scene, camera);
  }
  animate();
})();

/* ─── LOADER ─── */
let pct = 0;
const bar = document.getElementById("loader-bar");
const pctEl = document.getElementById("loader-pct");
const interval = setInterval(() => {
  pct += Math.random() * 15;
  if (pct >= 100) {
    pct = 100;
    clearInterval(interval);
    setTimeout(() => {
      const loader = document.getElementById("loader");
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.6s";
      setTimeout(() => (loader.style.display = "none"), 600);
      startHeroAnimations();
    }, 300);
  }
  bar.style.width = pct + "%";
  pctEl.textContent = Math.floor(pct) + "%";
}, 80);

/* ─── HERO ANIMATIONS ─── */
function startHeroAnimations() {
  gsap.to("#hero-eyebrow", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.1,
  });
  gsap.to("#line1", {
    y: "0%",
    duration: 0.9,
    ease: "power4.out",
    delay: 0.25,
  });
  gsap.to("#line2", { y: "0%", duration: 0.9, ease: "power4.out", delay: 0.4 });
  gsap.to("#hero-tagline", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.7,
  });
  gsap.to("#hero-btns", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.9,
  });
}

/* ─── AVATAR 3D TILT ─── */
const avatarCard = document.getElementById("avatar-card");
if (avatarCard) {
  avatarCard.addEventListener("mousemove", (e) => {
    const rect = avatarCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 18;
    const rotY = (x / rect.width) * 18;
    avatarCard.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  });
  avatarCard.addEventListener("mouseleave", () => {
    avatarCard.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
}

/* ─── SCROLL REVEAL ─── */
function observeReveal() {
  const revealEls = document.querySelectorAll(".reveal:not(.visible)");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => obs.observe(el));
}
observeReveal();

/* ─── COUNTER ANIMATION ─── */
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = target / 50;
      const t = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + "+";
        if (current >= target) clearInterval(t);
      }, 30);
      counterObs.unobserve(el);
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObs.observe(el));

/* ─── SKILL BAR ANIMATION ─── */
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const bars = e.target.querySelectorAll(".skill-bar");
      bars.forEach((bar) => {
        bar.style.width = bar.dataset.pct + "%";
      });
      skillObs.unobserve(e.target);
    });
  },
  { threshold: 0.1 },
);
const skillsSection = document.getElementById("skills-grid");
if (skillsSection) skillObs.observe(skillsSection);

/* ─── TIMELINE SCROLL ─── */
const timelineObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
);
document
  .querySelectorAll(".timeline-item")
  .forEach((el) => timelineObs.observe(el));

/* ─── NAV SCROLL ─── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", scrollY > 60);
  const sections = [
    "hero",
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
  ];
  sections.forEach((id) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link)
      link.classList.toggle("active", rect.top <= 80 && rect.bottom > 80);
  });
});

/* ─── CURSOR ─── */
const cursor = document.getElementById("cursor");

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
let lastX = 0, lastY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  requestAnimationFrame(animateCursor);

  // Smooth follow (lag)
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;

  // Speed-based stretch
  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);
  const stretch = Math.min(speed / 60, 0.4);

  cursor.style.transform = `
    translate(${posX}px, ${posY}px)
    scale(${1 + stretch}, ${1 - stretch})
  `;

  lastX = mouseX;
  lastY = mouseY;
}

animateCursor();

// Hover interactions (blob grows instead of ring effect)
document
  .querySelectorAll("a, button, .project-card, .skill-card, .avatar-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "70px";
      cursor.style.height = "70px";
      cursor.style.opacity = "0.6";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.opacity = "0.8";
    });
  });

/* ─── MODAL ─── */
function openModal(p) {
  const modal = document.getElementById("modal-overlay");
  document.getElementById("modal-content").innerHTML = `
    <div style="font-size:4rem;margin-bottom:20px;text-align:center">${p.icon}</div>
    <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:12px;">${p.name}</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
      ${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
    </div>
    <p style="font-size:16px;line-height:1.8;color:rgba(247,247,255,0.65);margin-bottom:28px;">${p.desc}</p>
    <div style="display:flex;gap:14px;flex-wrap:wrap;">
      <a href="${p.live}" class="btn-primary" style="font-size:14px;padding:12px 28px;">Live Demo ↗</a>
      <a href="${p.repo}" class="btn-secondary" style="font-size:14px;padding:12px 28px;">GitHub →</a>
    </div>`;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── FORM ─── */
function submitForm(e) {
  e.preventDefault();
  const btn = document.querySelector(".form-submit");
  btn.textContent = "Sending...";
  btn.style.opacity = "0.7";
  setTimeout(() => {
    btn.style.display = "none";
    document.getElementById("success-msg").style.display = "block";
    e.target.reset();
  }, 1500);
}

/* ─── HAMBURGER ─── */
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  const mm = document.getElementById("mobile-menu");
  const hb = document.getElementById("hamburger");
  mm.classList.toggle("open", menuOpen);
  document.body.style.overflow = menuOpen ? "hidden" : "";
  const spans = hb.querySelectorAll("span");
  if (menuOpen) {
    spans[0].style.transform = "translateY(6.5px) rotate(45deg)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "translateY(-6.5px) rotate(-45deg)";
  } else {
    spans.forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "";
    });
  }
}

/* ─── GSAP SCROLL PARALLAX (subtle) ─── */
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".orb1", {
    y: -120,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".orb2", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* ─── KEYBOARD SUPPORT ─── */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalDirect();
});
