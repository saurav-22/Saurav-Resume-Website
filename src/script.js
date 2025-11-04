/* ===========================================
   LOAD JSON FILE
=========================================== */
async function loadData() {
  const res = await fetch("./data.json");
  return await res.json();
}

loadData().then(data => {
  const isHome = document.getElementById("profile-img") !== null;
  const isProjectsPage = document.getElementById("projects-list") !== null;

  if (isHome) {
    renderHero(data);
    renderSummary(data);
    renderSkillsTabs(data);
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
let activeSkill = null;

function renderSkillsTabs(data) {
  const grid = document.getElementById("skills-tabs");
  const groups = Object.keys(data.skills);

  groups.forEach((name, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = `${name} <i class="arrow">→</i>`;
    btn.onclick = () => toggleSkillRow(data, grid, groups, index);
    grid.appendChild(btn);
  });
}

function toggleSkillRow(data, grid, groups, index) {
  const buttons = grid.querySelectorAll("button");
  const slot = document.getElementById("skills-inline-slot");

  if (activeSkill === index) {
    slot.style.display = "none";
    buttons[index].classList.remove("active");
    buttons[index].querySelector(".arrow").style.transform = "rotate(0deg)";
    activeSkill = null;
    return;
  }

  activeSkill = index;
  buttons.forEach(b => {
    b.classList.remove("active");
    b.querySelector(".arrow").style.transform = "rotate(0deg)";
  });

  buttons[index].classList.add("active");
  buttons[index].querySelector(".arrow").style.transform = "rotate(90deg)";

  const groupName = groups[index];
  const content = data.skills[groupName]
    .map(item => `<li>${item}</li>`)
    .join("");

  slot.innerHTML = `<ul>${content}</ul>`;

  const row = Math.floor(index / 3);
  const lastColIndex = Math.min((row + 1) * 3 - 1, buttons.length - 1);
  buttons[lastColIndex].after(slot);

  slot.style.display = "";
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

      <ul class="list-disc ml-5 mb-3 text-sm">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <p class="tech-line">Tech: ${project.tech.join(", ")}</p>

      <div class="project-cta">
        <a class="link-cta" href="${project.github || project.medium}" target="_blank">
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
