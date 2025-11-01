# Cloud-Ready Resume Website (S3 + GitHub Actions)

A fully responsive, JSON-powered portfolio website built using **HTML, TailwindCSS, and vanilla JavaScript** - designed so **anyone can fork it, edit one file (`data.json`), and instantly generate their own resume website** without touching a single line of frontend code.

It is lightweight, mobile-first, auto-theme (light/dark), and deployable to AWS S3 with **0 backend, 0 frameworks, 0 npm setup**.

---

<!--### Demo Link
Live Demo: https://your-domain.com -->

---

## Features

- JSON-driven content (no HTML editing required)  
- Fully responsive, works on all screen sizes  
- Auto-generated sections (Skills, Experience, Projects, Contact)  
- Auto-sliding project carousel  
- Dark/Light mode (remembers user preference)  
- Click-to-copy email  
- GitHub Actions → Auto-deploy to S3  
- No build tools, no React, no Node — just static files  
- Projects & experience expandable (accordion + widgets)  
- Editable with one file: `data.json`  
- Works even if hosted anywhere (S3, Vercel, Netlify, GitHub Pages)

---

## Tech Stack

| Part | Technology |
|-------|------------|
| UI | TailwindCSS (via CDN) |
| Logic | Vanilla JavaScript |
| Data | JSON (dynamic, editable) |
| Deployment | AWS S3 (static hosting) |
| CI/CD | GitHub Actions (sync to S3 on commit) |

---

## Folder Structure
```text
/portfolio-root
│── index.html → Main portfolio page
│── projects.html → Full Projects listing page
│── data.json → Your resume data (edit only this file)
│── script.js → JSON loader, carousel, accordions, theme logic
│── style.css → Small Tailwind overrides
│── .github/workflows/deploy.yml → Auto-deploy pipeline for S3
```
---

## How to Use This as Your Own Portfolio

### 1. Fork & Clone This Repo
```sh
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### 2. Open and Edit data.json

This single file controls:
- Name, Title, Summary
- Skills (grouped automatically)
- Projects (with GitHub + Medium links)
- Experience (accordion format)
- Contact info
- Certifications (optional)

No need to edit HTML files.
Just save -> commit -> deploy.

### 3. (Optional) Add Your Resume

Add a file named `resume.pdf` in the root folder
-> The “Download Resume” link automatically appears in the navbar.

---

### Zero Install Required

- ✅ No npm
- ✅ No yarn
- ✅ No npm run build
- ✅ All styling handled via Tailwind CDN
- ✅ Runs in any browser or static file server

To preview locally:
```sh
Right-click -> Open index.html in browser
```
That’s it. No setup.

---

### Deploy to AWS S3 (Static Hosting)
1. Create S3 bucket (name = your domain or project name)
2. Enable Static Website Hosting
3. Upload the repo files
4. Make bucket public (or use CloudFront if you prefer private access)
5. Open the website URL -> Done

---

### Auto-Deploy on Commit (GitHub Actions -> S3)
This repo includes a workflow at:
```bash
.github/workflows/deploy.yml
```
- On every git push to main, the site is automatically synced to S3
- Deletes old files so bucket always matches repo

**Before using it, edit the bucket name:**
```yaml
aws s3 sync . s3://YOUR_BUCKET_NAME --delete
```
Then add AWS Keys in repo settings -> Secrets -> Actions:
```bash
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

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