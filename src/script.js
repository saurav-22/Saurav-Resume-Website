/* ===========================================
   LOAD JSON FILE
=========================================== */
async function loadData() {
  const res = await fetch("/data.json");
  return await res.json();
}

loadData().then(data => {
  const isHome = document.getElementById("profile-img") !== null;
  const isProjectsPage = document.getElementById("projects-list") !== null;

  if (isHome) {
    renderHero(data);
    renderSummary(data);
    renderSkills(data);
    renderExperience(data);
    renderCarousel(data);
  }

  if (isProjectsPage) {
    renderProjectsList(data);
  }

  initThemeToggle();
});


/* ===========================================
   HERO SECTION
=========================================== */
function renderHero(data) {
  document.getElementById("profile-img").src = data.profileImage;
  document.getElementById("aboutMe").textContent = data.aboutMe;
  document.getElementById("summary").textContent = data.professionalSummary;

  document.getElementById("email-text").textContent = data.contact.email;
  document.getElementById("location-text").textContent = data.contact.location;

  document.getElementById("github-link").href = data.contact.github;
  document.getElementById("linkedin-link").href = data.contact.linkedin;
  document.getElementById("medium-link").href = data.contact.medium;

  document.getElementById("email-copy").onclick = () => {
    navigator.clipboard.writeText(data.contact.email);
    alert("Email copied: " + data.contact.email);
  };

  lucide.createIcons();
}


/* ===========================================
   PROFILE SUMMARY
=========================================== */
function renderSummary(data) {
  document.getElementById("summary").textContent = data.professionalSummary;
}


/* ===========================================
   SKILLS ACCORDION (FULL WIDTH ROW EXPAND)
=========================================== */
function normalizeSkills(input) {
  // Accepts { Group: ["a","b"] } OR [{ title, items }]
  if (Array.isArray(input)) {
    // Already array of { title, items } → verify shape
    return input.map(s => {
      if (s && Array.isArray(s.items) && typeof s.title === "string") return s;
      // If someone passed ["a","b"] by mistake, wrap it
      if (Array.isArray(s)) return { title: "Skills", items: s };
      return { title: String(s?.title ?? "Skills"), items: Array.isArray(s?.items) ? s.items : [] };
    });
  }
  // Object map → convert to array
  return Object.keys(input || {}).map(k => ({ title: k, items: Array.isArray(input[k]) ? input[k] : [] }));
}

function currentColCount() {
  // ≤640px → 2 columns (your M2 choice), otherwise 3
  return window.matchMedia("(max-width: 640px)").matches ? 2 : 3;
}

function renderSkills(data) {
// Accept either the whole data object or the skills payload directly
  const source = (data && data.skills) ? data.skills : data;
  const btnContainer = document.getElementById("skills-buttons");
  const slot = document.getElementById("skills-inline-slot");
  if (!btnContainer || !slot) return;

  const skills = normalizeSkills(source); // <= now always correct
  btnContainer.innerHTML = "";
  slot.innerHTML = "";
  slot.style.display = "none";

  let activeIndex = null;

  // Create all buttons
  skills.forEach((skill, index) => {
    const btn = document.createElement("button");
    btn.className = "skill-btn";
    btn.innerHTML = `
      <span>${skill.title}</span>
      <i data-lucide="chevron-down"></i>
    `;

    btn.addEventListener("click", () => {
      const buttons = [...btnContainer.querySelectorAll(".skill-btn")];

      // Close if clicking the same open one
      if (activeIndex === index) {
        slot.style.display = "none";
        slot.innerHTML = "";
        buttons[index].classList.remove("active");
        activeIndex = null;
        return;
      }

      // Activate this button, deactivate others
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeIndex = index;

      // Build list HTML (horizontal, wraps gracefully)
      const listHTML = (skill.items || [])
        .map(i => `<li>${i}</li>`)
        .join("");

      slot.innerHTML = `
        <ul class="flex flex-wrap gap-x-3 gap-y-1 text-sm md:text-base break-words">
          ${listHTML}
        </ul>
      `;

      // Insert slot below the correct row
      const cols = currentColCount();              // 2 on mobile, 3 on desktop
      const row = Math.floor(index / cols);
      const lastIdxInRow = Math.min((row + 1) * cols - 1, buttons.length - 1);
      buttons[lastIdxInRow].after(slot);
      slot.style.display = "";

      // Refresh icons (ensures chevron renders)
      lucide.createIcons();
    });

    btnContainer.appendChild(btn);
  });

  // Initial icon render
  lucide.createIcons();

  // Re-position the open slot on resize so it stays under the correct row
  let resizeTO;
  window.addEventListener("resize", () => {
    if (activeIndex === null) return;
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      const buttons = [...btnContainer.querySelectorAll(".skill-btn")];
      if (buttons.length === 0) return;
      const cols = currentColCount();
      const row = Math.floor(activeIndex / cols);
      const lastIdxInRow = Math.min((row + 1) * cols - 1, buttons.length - 1);
      buttons[lastIdxInRow].after(slot);
    }, 120);
  });
}

/* ===========================================
   EXPERIENCE SECTION
=========================================== */
function renderExperience(data) {
  const container = document.getElementById("experience-list");

  data.experience.forEach((job, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="exp-header">
        <span class="exp-title">${job.role} — ${job.company}, <span class="exp-loc">${job.location}</span></span>

      <span class="exp-meta">
        ${job.duration}
        <i data-lucide="chevron-down" id="exp-icon-${index}" class="exp-arrow"></i>
      </span>
      </div>

      <ul id="exp-${index}" class="hidden">
        ${job.points.map(p => `<li>• ${p}</li>`).join("")}
      </ul>
    `;

    div.onclick = () => {
      document.getElementById(`exp-${index}`).classList.toggle("hidden");
      document.getElementById(`exp-icon-${index}`).classList.toggle("rotate-180");
    };

    container.appendChild(div);
  });

  lucide.createIcons();
}



/* ===========================================
   PROJECTS CAROUSEL (HOME)
=========================================== */
function renderCarousel(data) {
  const wrapper = document.getElementById("projects-carousel");

  data.projects.slice(0, 4).forEach(project => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <h4 class="text-lg font-semibold mb-3">${project.title}</h4>

      <ul class="list-disc ml-5 mb-3 text-sm break-words whitespace-normal leading-snug">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <p class="tech-line break-words whitespace-normal leading-snug text-sm sm:text-base">
        Tech: ${project.tech.join(", ")}
      </p>


      <div class="project-cta">
        <a class="link-cta break-words whitespace-normal" href="${project.github || project.medium}" target="_blank">
          Click here to view complete project details
        </a>
      </div>
    `;

    wrapper.appendChild(slide);
  });

  new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 3500 },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    pagination: { el: ".swiper-pagination", clickable: true }
  });
}


/* ===========================================
   PROJECTS PAGE LIST
=========================================== */
function renderProjectsList(data) {
  const list = document.getElementById("projects-list");

  data.projects.forEach((project, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h4 class="text-lg font-semibold mb-2">${project.title}</h4>

      <ul class="list-disc ml-5 mb-3 text-sm md:text-base opacity-90">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <p class="tech-line">Tech: ${project.tech.join(", ")}</p>

      <a class="link-cta" href="${project.github || project.medium}" target="_blank">
        Click here to view complete project details
      </a>
    `;

    list.appendChild(div);
  });
}


/* ===========================================
   THEME TOGGLE
=========================================== */
function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.checked = localStorage.theme === "light";

  toggle.addEventListener("change", () => {
    const isLight = toggle.checked;
    document.documentElement.classList.toggle("dark", !isLight);
    localStorage.theme = isLight ? "light" : "dark";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = import.meta.env.VITE_API_URL;
  if (API_URL) {
    fetch(API_URL, { method: "POST" })
      .then(res => res.json())
      .then(data => {
        const el = document.getElementById("view-count");
        if (el) el.textContent = data.views;
      })
      .catch(err => console.error("View counter fetch failed:", err));
  } else {
    console.log("View counter disabled (API URL not configured)");
  }
});

