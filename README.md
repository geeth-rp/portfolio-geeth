# Geeth Rangika Pelpola — Personal Portfolio

A modern, high-performance personal portfolio website built with **React**, **Vite**, and **Tailwind CSS**.

---

## 📁 Project Structure

```text
portfolio-geeth/
├── public/                               # Static assets served directly at the root URL
│   ├── certificates/                     # Certificates & declarations
│   │   ├── ieee_membership_certificate_2026.jpg
│   │   ├── ieee_cs_membership_certificate_2026.jpg
│   │   ├── simplilearn_business_analysis_certificate.jpg
│   │   └── simplilearn_power_bi_for_beginners.pdf
│   ├── cv/                               # Curricula Vitae (CV) downloads
│   │   ├── Geeth_Pelpola_CV_Business_Analyst.pdf
│   │   └── Geeth_Pelpola_CV_UIUX_Designer.pdf
│   └── leadership/                       # Leadership & organizational posters
│       ├── ieee_vice_chairperson_poster.jpg
│       └── sltc_media_unit_team.jpg
│
├── src/                                  # Application source code
│   ├── assets/                           # Bundled media & static assets
│   │   ├── certificates/                 # Certificate preview images
│   │   │   ├── ieee_membership_certificate.jpg
│   │   │   ├── ieee_cs_membership_certificate.jpg
│   │   │   └── simplilearn_completion_certificate.jpg
│   │   ├── experience/                   # Leadership & project photo gallery
│   │   │   └── experience_1.jpg ... experience_8.jpg
│   │   └── profile/                      # Profile picture
│   │       └── geeth_profile.png
│   │
│   ├── App.jsx                           # Main portfolio component
│   ├── index.css                         # Global CSS & Tailwind styling
│   └── main.jsx                          # React application entry point
│
├── index.html                            # HTML entry point
├── package.json                          # Dependencies & build scripts
├── tailwind.config.js                    # Tailwind CSS configuration
├── vite.config.js                        # Vite configuration
└── vercel.json                           # Deployment & security headers configuration
```

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
