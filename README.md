# Saurav Portfolio - Resume-Style Website (Vite + Tailwind)

A fast, responsive, **resume-as-a-website** template. Built with Vite + Tailwind CSS, vanilla JS, Swiper.js (projects carousel), AOS (scroll animations), and Lucide icons. Content is driven by a single **data.json** file - no React or backend required.

---

## Highlights

- Vite + Tailwind = instant dev, tiny bundles
- **Dark mode by default** with a simple light/dark toggle (persists via localStorage)
- Content-first: edit a single **data.json** to update profile, skills, experience, projects, and links
- Clean IA: Hero -> Profile -> Skills -> Experience -> Projects -> (Projects page)
- **Skills accordion** expands full row beneath the clicked row (not a single column)
- Projects **carousel** on homepage + **list page** with centered text links
- Contact row **inside Hero** (two rows with precise alignment)
- Fully responsive for desktop and mobile
- Zero frameworks on top - just modern, accessible HTML + CSS + JS

---

## Tech Stack

- Vite (build tool)
- Tailwind CSS (utility-first styling)
- AOS (Animate On Scroll)
- Swiper.js (projects carousel)
- Lucide (icons)

---

## Project Structure

- index.html - homepage (Hero, Profile, Skills, Experience, Projects)
- projects.html - all projects (stack of cards; no modal)
- styles.css - Tailwind + minimal custom rules
- script.js - loads data.json, renders sections, UI behavior
- data.json - all portfolio content (profile, skills, experience, projects, contact)

Optional CI/CD and S3 hosting can be added; see “Deployment” later.

---

## Prerequisites

- Node.js 18 or later
- npm (bundled with Node)

---

## Setup & Local Development

1. Clone or download this repository.
2. Install dependencies: run npm install.
3. Start the dev server: run npm run dev.
4. Open the local URL printed in your terminal.

If you see a blank page or data fetch error, ensure **data.json** is inside **/src** (same folder as script.js and styles.css) and the fetch path in script.js uses ./data.json.

---

## Content Model (data.json)

This single file controls everything:

- name - full name as string
- role - short role/tagline
- aboutMe - a single-line intro (avoid very long sentences for layout)
- profileImage - path or URL to your profile image (for Vite, place the image in src/assets and reference it as /assets/filename.ext)
- professionalSummary - paragraph shown in “Profile”
- contact - object with email, location, github, linkedin, medium
- skills - object of grouped arrays; group names become buttons and values are shown as a horizontal list when expanded
- experience - array of jobs (role, company, duration, location, points)
- projects - array of projects (title, highlights array, tech array, github and/or medium links)

**Notes:**
- Do not leave empty strings for required links or image. If a project has no Medium, omit the field; same for GitHub.
- Keep “aboutMe” concise to avoid wrapping under the hero layout. If needed, widen the left hero column in styles.css.

---

## Behavior & UX Details

### Hero

- Name and role shown on a single line (desktop); About line below it.
- Contact lives **inside Hero** in two rows:
  - Row 1: Email (left), Location (right)
  - Row 2: GitHub (left), LinkedIn (center), Medium (right — directly below Location)
- Email is click-to-copy. Location is plain text (not clickable). Social links open in a new tab.

### Profile

- Titled “PROFILE” (not Professional Summary). Short paragraph from professionalSummary.

### Skills (Accordion)

- 3-column button grid per row.
- Clicking a group expands a full-width row **under that button row**.
- Only one row can be open at a time (accordion). Click again to close.
- Items render as a horizontal list (with pipes) and wrap gracefully to the next line when too long.

### Experience

- Each card toggles details on click.
- Title shows: Role - Company, Location.
- Right side shows: Duration and a chevron aligned to the far right.

### Projects

- Homepage: carousel with autoplay + arrows + dots below the card; centered underlined link text: “Click here to view complete project details”.
- Projects page: one-column stack of project cards; the same centered underlined link text per card; no modal.
- At the bottom of the homepage projects section there’s a small centered link: “Click here to get your own portfolio website” that points to the repository.

### Theme

- Dark by default; light/dark toggle persists using localStorage.

---

## Customization

### Colors & Accents

- Accent gradient and contrasts are defined in styles.css using Tailwind utilities. Update the gradient in the body background if you prefer a different palette.

### Fonts

- System sans by default. If you want a Google Font, include it in index.html and apply it via body or specific classes in styles.css.

### Profile Image

- Place image in src/assets and set profileImage to /assets/your-file.ext.
- Use a square or near-square image for best results.

### Skills Layout

- If your About or Name/Role wrap too soon, widen .hero-left to md:w-3/4 (in styles.css) and shrink .hero-right to md:w-1/4.

---

## Build for Production

- Build: run npm run build.
- Output is generated into dist/.
- You can host dist/ on any static host (S3, Netlify, GitHub Pages, Cloudflare Pages, etc.).

---

## Deployment (S3 + CloudFront)

High-level steps (no credentials in repo):

1. Create an S3 bucket for static hosting (block public access disabled or use CloudFront OAI/Private).
2. (Recommended) Put CloudFront in front of S3 with OAC/OAI, default root object index.html.
3. Set appropriate cache behaviors for HTML vs assets.
4. Upload the dist/ folder after each build.

A GitHub Actions workflow can automate the build and S3 sync on pushes to main. See the “CI/CD” section below.

---

## CI/CD (GitHub Actions) — Overview

- On push to main: node setup -> install -> build -> sync dist/ to S3.
- Requires these repo secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET.
- Optional: CLOUDFRONT_DISTRIBUTION_ID for cache invalidation.

The workflow file lives at .github/workflows/deploy.yml. Add it when you’re ready (see the sample in this repo).

---

## Maintenance

- Add/edit content only in data.json - no need to touch HTML.
- For profile image changes, update the file in src/assets and update profileImage.
- Keep your projects list clean; show best 3-6 in the homepage carousel.

---

## Security & Privacy

- Do not commit secrets (AWS keys, etc.). Use GitHub Secrets for CI/CD.
- Do not store private phone numbers if you plan to open-source your repo.

---

### Contributing
Pull requests are welcome.

Possible improvements:
- Add multilingual support
- Add blog support
- Add dark/light auto-switch button animation
- Add "Download JSON Resume" export
- Improve accessibility contrast rules

### Built By

- **Saurav Singh (QA / DevOps Engineer)**
- LinkedIn: https://www.linkedin.com/in/sauravqa/
- GitHub: https://github.com/saurav-22

### Support
If this project helps you build your portfolio, please consider starring ⭐ the repository on GitHub - it helps the project grow and shows demand.
```sh
If you fork it, drop a star.  
If you use it, share it.  
If you improve it, contribute back.
```

---

## License

MIT License. You are free to use, modify, and distribute this template with attribution.

