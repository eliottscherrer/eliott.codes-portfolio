# [eliott.codes](https://eliott.codes)

[![Deploy Next.js site to Pages](https://github.com/eliottscherrer/eliott.codes-portfolio/actions/workflows/nextjs.yml/badge.svg)](https://github.com/eliottscherrer/eliott.codes-portfolio/actions/workflows/nextjs.yml)

My personal portfolio built from scratch to showcase both frontend and full-stack capabilities through completed projects. Everything was made to demonstrate my attention to detail and the modern web development practices I use.

## Tech Stack

### **Core Framework & Language**

![Next JS](https://img.shields.io/badge/Next.js-black?style=for-the-badge\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)

### **Styling & UI**

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge\&logo=radix-ui\&logoColor=white)

### **CI/CD & Hosting**

![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2671E5?style=for-the-badge\&logo=githubactions\&logoColor=white)
![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)
![Infomaniak](https://img.shields.io/badge/infomaniak-%230098FF?style=for-the-badge&logo=infomaniak&logoColor=white)

### Others

- **UI Components & Libraries:** Lucide React (icons) & React Icons (brand icons)  
- **Internationalization:** next-intl 4.5 (i18n routing & translations)  
- **Theming:** next-themes (dark/light mode)  
- **Development & Code Quality:** ESLint 9 (Next.js config), PostCSS & TailwindCSS  

## What I Built

### Modern Architecture & Best Practices
- Built with latest Next.js 16 (App Router) and React 19, using TypeScript for type safety
- UI built on accessible, unstyled Radix UI Primitives for custom UI, with fully static generation required for GitHub Pages deployment

### CI/CD & Deployment
- Automated GitHub Actions workflow for building and deploying to GitHub Pages and Infomaniak
- Static export optimization for fast load times and zero cold starts

### Internationalization (i18n)
- Full EN/FR support using `next-intl`, with dynamic locale routing (/en, /fr) and a persistent language switcher
- Scalable translation management using localization files

## Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/en` or `http://localhost:3000/fr` to view the portfolio. If no route is specified, the website will automatically redirect you to the `/fr` version by default.

Build the static export:
```bash
npm run build
```

## License

This repository is open-source for educational and portfolio purposes.  
You’re free to explore the code, but not to reuse it as a template.
