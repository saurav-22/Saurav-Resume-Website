# Resume-Style Website (Vite + Tailwind)
<p align="left">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg" />
  <img alt="Deploy" src="https://img.shields.io/badge/Deploy-AWS_S3_+_CloudFront-FF9900?logo=amazonaws&logoColor=white" />
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-blue.svg" />
</p>


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
- public/data.json - all portfolio content (profile, skills, experience, projects, contact)
- public/profile.jpg - profile image

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

If you see a blank page or data fetch error, ensure **data.json** is inside **/src/public** and the fetch path in script.js uses /data.json.

---

## Content Model (data.json)

This single file controls everything:

- name - full name as string
- role - short role/tagline
- aboutMe - a single-line intro (avoid very long sentences for layout)
- profileImage - path or URL to your profile image (for Vite, place the image in src/public and reference it as /profile.jpg)
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

### Quick Steps (For Users Who Just Want to Deploy)
1. Run `npm install` and `npm run build`.
2. Upload **only the contents of `dist/`** to your S3 bucket.
3. Point a CloudFront distribution to that S3 bucket.
4. Set **Custom Error Response** -> 403 & 404 -> `/index.html` -> HTTP 200.
5. Done - your portfolio is live.

---

### Deep Dive: Full Deployment Guide

#### 1. Create S3 Bucket
- Bucket name example: `your-portfolio-site`
- Block Public Access: **ON** (recommended)
- You do **not** enable "Static website hosting" when using CloudFront

#### 2. Create CloudFront Distribution
| Setting | Value |
|---------|-------|
| Origin type | S3 bucket |
| Viewer protocol policy | Redirect HTTP -> HTTPS |
| Default root object | `index.html` |
| Cache policy | CachingOptimized (default is fine) |
| Error responses | 403 + 404 -> `/index.html` -> 200 |

#### 3. Upload Files
```
dist/
  index.html
  projects.html
  assets/... (bundled js+css)
  data.json
  profile.jpg
```
Do **NOT** upload `src/`, `node_modules/`, or `public/` manually.

---

### Optional: Auto-Deploy via GitHub Actions

This repo supports **OIDC-based GitHub -> AWS authentication**, so you deploy **without storing AWS secrets**.

| GitHub Secret | Example | Required |
|---------------|---------|----------|
| `AWS_REGION` | `ap-south-1` | YES |
| `S3_BUCKET_NAME` | `your-portfolio-site` | YES |
| `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::123456789012:role/GithubActionsS3DeployRole` | YES |
| `CLOUDFRONT_DISTRIBUTION_ID` | `XXXXXXXXXXXXX` | Optional (enables cache invalidation)|

The workflow:
```
.github/workflows/deploy.yml
```
Builds site -> syncs S3 -> (optional) invalidates CloudFront cache.

---

### IAM Role (for OIDC Deploy)

Create a role called `GithubActionsS3DeployRole` with:
- **Trust entity:** `token.actions.githubusercontent.com`
- **Action:** `sts:AssumeRoleWithWebIdentity`
- **Optional condition:** restrict to `repo:username/reponame:ref:refs/heads/main`

Required permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "*"
    }
  ]
}
```

---

### Test Your Live Deployment
- `https://your-distribution.cloudfront.net` loads homepage
- `/projects.html` loads projects page
- `https://your-distribution.cloudfront.net/data.json` returns JSON
- Browser DevTools -> Network tab -> no 403/404 for assets

If everything works, you're fully deployed (S3 + CloudFront).


A GitHub Actions workflow can automate the build and S3 sync on pushes to main. See the “CI/CD” section below.

---

## CI/CD (GitHub Actions) - Overview

- On push to main: node setup -> install -> build -> sync dist/ to S3.
- Requires these repo secrets: AWS_DEPLOY_ROLE_ARN, AWS_REGION, S3_BUCKET_NAME.
- Optional: CLOUDFRONT_DISTRIBUTION_ID for cache invalidation.

The workflow file lives at .github/workflows/deploy.yml. Add it when you’re ready (see the sample in this repo).

---

## Maintenance

- Add/edit content only in data.json - no need to touch HTML.
- For profile image changes, update the file in src/public/ and update profileImage.
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

### Fork & Customize

This template is designed so anyone can clone it and turn it into their own portfolio:

1. Fork the repo
2. Update `public/data.json` with your content
3. Replace `public/profile.jpg`
4. (Optional) Edit colors/fonts in `styles.css`
5. Deploy manually or enable GitHub Actions for automatic hosting


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

