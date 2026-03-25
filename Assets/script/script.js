/* ─── DATA ─── */
const skills = [
  { icon: "⚛️", name: "React", pct: 95 },
  { icon: "🔷", name: "TypeScript", pct: 92 },
  { icon: "🟢", name: "Node.js", pct: 88 },
  { icon: "▲", name: "Next.js", pct: 93 },
  { icon: "🎨", name: "CSS/Tailwind", pct: 90 },
  { icon: "🌐", name: "Three.js", pct: 78 },
  { icon: "🗄️", name: "PostgreSQL", pct: 82 },
  { icon: "📦", name: "GraphQL", pct: 80 },
  { icon: "🐳", name: "Docker", pct: 75 },
  { icon: "☁️", name: "AWS/Cloud", pct: 72 },
  { icon: "🎭", name: "GSAP", pct: 85 },
  { icon: "🔥", name: "Prisma", pct: 83 },
];

const projects = [
  {
    icon: "🌌",
    num: "01",
    name: "NovaDash",
    tags: ["React", "Three.js", "WebGL"],
    cat: "3d",
    desc: "An immersive 3D data visualization dashboard with real-time WebSocket updates and particle-based charts.",
    live: "#",
    repo: "#",
  },
  {
    icon: "🛒",
    num: "02",
    name: "ShopFlow",
    tags: ["Next.js", "Stripe", "Prisma"],
    cat: "web",
    desc: "Full-featured e-commerce platform with AI-powered recommendations, real-time inventory, and smooth checkout.",
    live: "#",
    repo: "#",
  },
  {
    icon: "🎵",
    num: "03",
    name: "WaveSync",
    tags: ["React Native", "Expo", "Audio API"],
    cat: "mobile",
    desc: "Cross-platform music collaboration app allowing real-time session sharing and live audio waveform visualization.",
    live: "#",
    repo: "#",
  },
  {
    icon: "🤖",
    num: "04",
    name: "PromptForge",
    tags: ["Next.js", "OpenAI", "Supabase"],
    cat: "oss",
    desc: "Open-source prompt engineering toolkit used by 2,000+ developers. Features version control and A/B testing.",
    live: "#",
    repo: "#",
  },
  {
    icon: "🗺️",
    num: "05",
    name: "MapVis",
    tags: ["D3.js", "Mapbox", "React"],
    cat: "web",
    desc: "Interactive geospatial analytics platform visualizing global datasets with dynamic clustering and heatmaps.",
    live: "#",
    repo: "#",
  },
  {
    icon: "🎮",
    num: "06",
    name: "Voxelcraft",
    tags: ["Three.js", "WebGL", "WASM"],
    cat: "3d",
    desc: "Browser-based voxel engine with procedural terrain generation and multiplayer support via WebRTC.",
    live: "#",
    repo: "#",
  },
];

const timeline = [
  {
    date: "2022 — Present",
    role: "Senior Frontend Engineer",
    company: "Horizon Labs",
    desc: "Leading a team of 5 engineers to build next-gen SaaS products. Introduced micro-frontend architecture reducing build times by 60%.",
  },
  {
    date: "2020 — 2022",
    role: "Full-Stack Developer",
    company: "Apex Studio",
    desc: "Built 12+ client projects end-to-end. Specialised in React + Node.js stacks. Delivered 3 projects that exceeded 100k monthly users.",
  },
  {
    date: "2018 — 2020",
    role: "Junior Developer",
    company: "ByteCraft Agency",
    desc: "Started career building WordPress plugins and vanilla JS components. Grew into React development within 6 months.",
  },
  {
    date: "2018",
    role: "B.Sc. Computer Science",
    company: "University of Technology",
    desc: "Graduated with First Class Honours. Thesis on WebGL rendering optimisation. Won Best Final Year Project award.",
  },
];

/* ─── RENDER SKILLS ─── */
const sg = document.getElementById("skills-grid");
skills.forEach((s, i) => {
  sg.innerHTML += `
    <div class="skill-card reveal" style="transition-delay:${i * 0.06}s">
      <span class="skill-icon">${s.icon}</span>
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
        <div class="project-thumb-icon">${p.icon}</div>
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
const cursorRing = document.getElementById("cursor-ring");
let cx = 0,
  cy = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  cx = e.clientX;
  cy = e.clientY;
});
function animateCursor() {
  requestAnimationFrame(animateCursor);
  rx += (cx - rx) * 0.12;
  ry += (cy - ry) * 0.12;
  cursor.style.left = cx + "px";
  cursor.style.top = cy + "px";
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
}
animateCursor();
document
  .querySelectorAll("a, button, .project-card, .skill-card, .avatar-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursorRing.style.width = "52px";
      cursorRing.style.height = "52px";
      cursorRing.style.opacity = "0.8";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursorRing.style.width = "36px";
      cursorRing.style.height = "36px";
      cursorRing.style.opacity = "0.5";
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
