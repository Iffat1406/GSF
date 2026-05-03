# GSF — Global Society of Founders

> **A Society for Founders. Not Talkers.**

GSF is a professional platform connecting student founders with world-class expert mentors via video call and chat, and providing an equity-based venture marketplace where students can list startup ideas and attract investors.

---

## 🌐 Live Platform

**URL:** [http://localhost:3000](http://localhost:3000) (development)  

---

## 🧭 What GSF Does

| Feature | Description |
|---|---|
| **GSF Connect** | Students book 1-on-1 video calls with expert mentors (VCs, founders, product leaders). Async chat follow-up included. |
| **GSF Ventures** | Students list startup ideas with equity terms. Venture creators fund them directly. GSF takes **1–2% platform fee** on completed equity deals. |
| **Expert Network** | 40+ vetted domain experts across fundraising, product, growth, legal, and impact. |
| **Community** | Global network of 500+ student founders with cohort calls, Slack, and accountability pods. |

### Pricing Model
- **Free for 30 days** — full platform access, no credit card required
- **₹999/month** — Builder plan (unlimited Connect calls, list ventures)
- **₹2,499/month** — Founder plan (everything + investor intros + dedicated advisor)
- **1–2% fee** on equity deals closed via GSF Ventures

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary blue | `#81A6C6` | Buttons, links, active states |
| Powder blue | `#AACDDC` | Badges, highlights, borders |
| Warm cream | `#F3E3D0` | Section backgrounds, warm cards |
| Warm taupe | `#D2C4B4` | Borders, dividers, muted elements |
| Background | `#FDFAF7` | Page background |
| Text primary | `#1A2332` | Headings, body |
| Text secondary | `#4A5668` | Body copy |

**Fonts:**
- `Playfair Display` — serif headings (premium editorial feel)
- `Inter` — body, UI elements, labels

---

## 🗂️ Project Structure

```
app/
├── page.tsx              # Homepage
├── connect/page.tsx      # Video call + expert chat platform
├── ventures/page.tsx     # Startup idea marketplace
├── experts/page.tsx      # Expert mentor directory
├── community/page.tsx    # Community hub
├── about/page.tsx        # About GSF
├── apply/page.tsx        # Student application form
├── sign-in/page.tsx      # Authentication - Login
├── sign-up/page.tsx      # Authentication - Register
├── contact/page.tsx      # Contact form
├── careers/page.tsx      # Open roles
├── insights/page.tsx     # Articles + founder resources
├── programs/page.tsx     # Platform overview
├── privacy/page.tsx      # Privacy policy
├── terms/page.tsx        # Terms of service
├── cookies/page.tsx      # Cookies policy
└── globals.css           # Design system tokens + utilities

components/
├── layout/
│   ├── Navbar.tsx        # Navigation with circular GSF logo
│   └── Footer.tsx        # Footer with links and brand tagline
├── landing/
│   └── HeroSection.tsx   # Homepage hero with stats
└── ui/
    └── Button.tsx        # Multi-variant button component
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Ayushh-Sharmaa/GSF.git
cd GSF/GSF

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS design tokens |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Google Fonts (Playfair Display + Inter) |
| Images | Next.js `<Image />` with optimisation |
| Deployment | Vercel (recommended) |

---

## 📄 Key Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, platform overview, revenue model, expert teaser |
| `/connect` | Connect | Expert search, booking flow, pricing tiers |
| `/ventures` | Ventures | Startup idea listings, equity deal marketplace |
| `/experts` | Experts | Expert directory with filter + booking |
| `/community` | Community | Features, testimonials, community stats |
| `/about` | About | Mission, values, team |
| `/apply` | Apply | Registration form for new students |
| `/sign-in` | Sign In | Login with email or Google |
| `/sign-up` | Sign Up | Registration with role selection |
| `/contact` | Contact | Contact form + info |
| `/careers` | Careers | Open roles at GSF |
| `/insights` | Insights | Founder articles + newsletter |
| `/privacy` | Privacy | Privacy policy |
| `/terms` | Terms | Terms of service |
| `/cookies` | Cookies | Cookie policy |

---

## 🔧 Environment Variables

Create a `.env.local` file in the root:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=https://api.gsf.community
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your changes to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Set the **Root Directory** to `GSF` (the inner folder)
4. Add environment variables if needed
5. Deploy

### Manual Build

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: description"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📬 Contact

**Email:** hello@gsf.community  
**Website:** gsf.community  
**GitHub:** [Ayushh-Sharmaa/GSF](https://github.com/Ayushh-Sharmaa/GSF)

---

*© 2026 Global Society of Founders. A Society for Founders — Not Talkers.*
