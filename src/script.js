/* ===============================
   LOAD JSON DATA
================================ */
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


/* ===============================
   HERO
================================ */
function renderHero(data) {
  const imgEl = document.getElementById("profile-img");
  imgEl.src = data.profileImage;

  document.getElementById("aboutMe").textContent = data.aboutMe;
  document.getElementById("email-text").textContent = data.contact.email;
  document.getElementById("location-text").textContent = data.contact.location;

  // second row links
  document.getElementById("github-link").href = data.contact.github;
  document.getElementById("linkedin-link").href = data.contact.linkedin;
  document.getElementById("medium-link").href = data.contact.medium;

  // fix lucide icons
  lucide.createIcons();
}

function copyEmail(email) {
  navigator.clipboard.writeText(email);
  alert("Email copied: " + email);
}


/* ===============================
   SUMMARY
================================ */
function renderSummary(data) {
  document.getElementById("summary").textContent = data.professionalSummary;
}


/* ===============================
   SKILLS (INLINE ACCORDION)
================================ */
let activeSkillIndex = null;

function renderSkillsTabs(data) {
  const tabContainer = document.getElementById("skills-tabs");
  const groups = Object.keys(data.skills);

  groups.forEach((group, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = `${group} <i class="arrow">→</i>`;
    btn.onclick = () => toggleSkillGroup(data, group, index, groups.length);
    tabContainer.appendChild(btn);
  });
}

function toggleSkillGroup(data, group, index, total) {
  const buttons = document.querySelectorAll("#skills-tabs button");
  const expandSlot = document.getElementById("skills-expand-slot");

  // Close if clicked again
  if (activeSkillIndex === index) {
    expandSlot.innerHTML = "";
    buttons[index].classList.remove("active");
    buttons[index].querySelector(".arrow").style.transform = "rotate(0deg)";
    activeSkillIndex = null;
    return;
  }

  activeSkillIndex = index;

  // Reset visual state
  buttons.forEach(b => {
    b.classList.remove("active");
    b.querySelector(".arrow").style.transform = "rotate(0deg)";
  });

  buttons[index].classList.add("active");
  buttons[index].querySelector(".arrow").style.transform = "rotate(90deg)";

  // Insert inline below row
  const list = data.skills[group]
    .map(i => `<li>${i}</li>`)
    .join("");

  expandSlot.innerHTML = `
    <div class="skill-expand-box" data-aos="fade-in">
      <ul>${list}</ul>
    </div>
  `;
}


/* ===============================
   EXPERIENCE
================================ */
function renderExperience(data) {
  const container = document.getElementById("experience-list");

  data.experience.forEach((job, i) => {
    const div = document.createElement("div");
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-delay", i * 80);

    div.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="font-semibold">${job.role} — ${job.company}</span>
        <span class="opacity-70 text-sm">${job.duration} 
          <i data-lucide="chevron-down" id="exp-icon-${i}"></i>
        </span>
      </div>
      <ul id="exp-${i}" class="hidden">
        ${job.points.map(p => `<li>• ${p}</li>`).join("")}
      </ul>
    `;

    div.onclick = () => {
      const list = document.getElementById(`exp-${i}`);
      const icon = document.getElementById(`exp-icon-${i}`);
      list.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    };

    container.appendChild(div);
  });

  lucide.createIcons();
}


/* ===============================
   PROJECTS (HOME CAROUSEL)
================================ */
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

      <div class="project-cta"
        onclick="openProjectLink('${project.github || project.medium}')">
        Click here to view complete project details
      </div>
    `;

    wrapper.appendChild(slide);
  });

  new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 3500 },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    pagination: { el: ".swiper-pagination", clickable: true },
  });
}


/* ===============================
   PROJECTS PAGE LIST VIEW
================================ */
function renderProjectsList(data) {
  const list = document.getElementById("projects-list");

  data.projects.forEach((project, i) => {
    const div = document.createElement("div");
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-delay", i * 80);

    div.innerHTML = `
      <h4 class="text-lg font-semibold mb-2">${project.title}</h4>

      <ul class="list-disc ml-5 mb-3 text-sm md:text-base opacity-90">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <p class="tech-line">Tech: ${project.tech.join(", ")}</p>

      <div class="project-cta" onclick="openProjectLink('${project.github || project.medium}')">
        Click here to view complete project details
      </div>
    `;

    list.appendChild(div);
  });
}

function openProjectLink(url) {
  if (url) window.open(url, "_blank");
}


/* ===============================
   THEME TOGGLE
================================ */
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
