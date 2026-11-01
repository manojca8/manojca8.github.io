# Manoj Terminal Portfolio

A creative, responsive Angular 18 portfolio with:
- Interactive simulated terminal and predefined commands
- Dark / light theme toggle
- Visual About, Skills, Experience, Projects, Blog and Contact sections
- Mobile-friendly layout
- Resume download hook

## Requirements
- Node.js 18.19+ or 20.11+
- npm

## Run locally

```bash
npm install
npm start
```

Open http://localhost:4200.

## Commands supported

`help`, `about`, `whoami`, `skills`, `experience`, `projects`, `resume`, `cat resume`, `contact`, `blog`, `ls`, `open github`, `open linkedin`, `clear`.

The terminal is intentionally a safe simulation. It does not execute operating-system commands.

## Before publishing — personalise these details

1. Verify the contact details (email: `manojkumarca8@gmail.com`, phone: `+91 9036455404`, location: Bangalore) in:
   - `src/app/app.component.ts`
   - `src/app/app.component.html`
2. Replace `YOUR_LINKEDIN_URL` in `src/app/app.component.ts` and the LinkedIn link in the HTML.
3. Add your actual resume PDF at `public/assets/resume.pdf` (create the folders if needed).
4. Verify all skills, dates, employer names and project descriptions. Remove anything confidential or inaccurate.
5. Replace starter blog ideas with real articles before publishing.
6. Add project screenshots and real project links if available.

## Build

```bash
npm run build
```

Production output: `dist/manoj-terminal-portfolio/browser`.

## GitHub Pages

For a project site hosted at `https://manojca7.github.io/`, use the repository named `manojca7.github.io` and set the Angular base href to `/` (the default here). Build and publish the contents of `dist/manoj-terminal-portfolio/browser` to the repository's Pages publishing source.

If you use a different repository name, configure the matching base href, for example `ng build --base-href /repository-name/`.

## Notes

This starter uses Angular 18 standalone components. It is a first implementation scaffold; run `npm install` and `npm run build` locally to verify against your Node/npm environment before deployment.
