/* ===========================
   Load Data from data.json
=========================== */
async function loadData() {
  const res = await fetch("data.json");
  return await res.json();
}

loadData().then(data => {
  renderHeaderLinks(data);
  renderAbout(data);
  renderSummary(data);
  renderSkills(data);
  renderExperience(data);
  renderProjectsCarousel(data);
  renderProjectsPage(data);
  renderContact(data);
});

/* ===========================
   HEADER LINKS + PROFILE LOAD
=========================== */
function renderHeaderLinks(data) {
  document.getElementById("github-link").href = data.contact.github;
  document.getElementById("linkedin-link").href = data.contact.linkedin;

  // ✅ If user uploads profile img later, update URL here
  // For now using GitHub avatar automatically
  document.getElementById("profile-img").src =
    "https://avatars.githubusercontent.com/" + data.contact.github.split("/").pop();
}

/* ===========================
   ABOUT + SUMMARY
=========================== */
function renderAbout(data) {
  document.getElementById("aboutMe").textContent = data.aboutMe;
}

function renderSummary(data) {
  document.getElementById("summary").textContent = data.professionalSummary;
}

/* ===========================
   SKILLS (Grouped)
=========================== */
function renderSkills(data) {
  const container = document.getElementById("skills-container");
  Object.entries(data.skills).forEach(([group, items]) => {
    const section = document.createElement("div");
    section.innerHTML = `
      <h4 class="font-semibold mb-2">${group}</h4>
      <div class="flex flex-wrap gap-2">
        ${items.map(skill => `<span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">${skill}</span>`).join("")}
      </div>
    `;
    container.appendChild(section);
  });
}

/* ===========================
   EXPERIENCE (ACCORDION)
=========================== */
function renderExperience(data) {
  const container = document.getElementById("experience-list");
  data.experience.forEach((job, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("border", "border-gray-300", "dark:border-gray-700", "rounded", "p-4");

    wrapper.innerHTML = `
      <button class="w-full flex justify-between font-semibold text-left"
              onclick="toggleAccordion(${index})">
        <span>${job.role} — ${job.company}</span>
        <span class="text-sm text-gray-500">${job.duration}</span>
      </button>
      <div id="acc-${index}" class="hidden mt-3 pl-2 space-y-2">
        ${job.points.map(point => `<li class="text-sm leading-snug">${point}</li>`).join("")}
      </div>
    `;
    container.appendChild(wrapper);
  });
}

function toggleAccordion(i) {
  const el = document.getElementById("acc-" + i);
  el.classList.toggle("hidden");
}

/* ===========================
   PROJECTS - CAROUSEL
=========================== */
function renderProjectsCarousel(data) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return; // Page check

  data.projects.slice(0, 4).forEach(project => {
    const card = document.createElement("div");
    card.className =
      "min-w-full md:min-w-[70%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow";

    card.innerHTML = `
      <h4 class="text-lg font-semibold mb-2">${project.title}</h4>
      <ul class="list-disc ml-5 mb-3">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <p class="text-sm text-gray-500 mb-2">Tech: ${project.tech.join(", ")}</p>

      <div class="flex gap-4 mt-3">
        ${project.github ? `<a href="${project.github}" target="_blank" class="underline">GitHub</a>` : ""}
        ${project.medium ? `<a href="${project.medium}" target="_blank" class="underline">Medium</a>` : ""}
      </div>
    `;
    carousel.appendChild(card);
  });

  autoSlideCarousel();
}

function autoSlideCarousel() {
  const track = document.getElementById("carousel");
  if (!track) return;

  let index = 0;
  setInterval(() => {
    index = (index + 1) % track.children.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 4500);
}

/* ===========================
   PROJECTS PAGE (Grid)
=========================== */
function renderProjectsPage(data) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return; // Page check

  data.projects.forEach(project => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow";

    card.innerHTML = `
      <h4 class="text-lg font-semibold mb-2">${project.title}</h4>
      <ul class="list-disc ml-5 mb-3">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <p class="text-sm text-gray-500 mb-2">Tech: ${project.tech.join(", ")}</p>

      <div class="flex gap-4 mt-3">
        ${project.github ? `<a href="${project.github}" target="_blank" class="underline">GitHub</a>` : ""}
        ${project.medium ? `<a href="${project.medium}" target="_blank" class="underline">Medium</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ===========================
   CONTACT
=========================== */
function renderContact(data) {
  const c = document.getElementById("contact");
  c.innerHTML = `
    <div class="flex items-center gap-3 cursor-pointer" onclick="copyEmail('${data.contact.email}')">
      📧 <span>${data.contact.email}</span>
      <span class="text-xs text-green-500 hidden" id="copied-msg">Copied!</span>
    </div>
    <div class="flex items-center gap-3">📍 <span>${data.contact.location}</span></div>
    <div class="flex items-center gap-3"><a href="${data.contact.github}" target="_blank">🐙 GitHub</a></div>
    <div class="flex items-center gap-3"><a href="${data.contact.linkedin}" target="_blank">🔗 LinkedIn</a></div>
  `;
}

function copyEmail(email) {
  navigator.clipboard.writeText(email);
  const msg = document.getElementById("copied-msg");
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 1500);
}

/* ===========================
   THEME TOGGLE
=========================== */
const toggleBtn = document.getElementById("themeToggle");
if (toggleBtn) {
  toggleBtn.onclick = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  };
}
