# UCSC IntelliHack 2026 - Tailwind React Website

**Stack:** Vite + React + Tailwind CSS

A polished, responsive single-page application for the UCSC IntelliHack 2026 hackathon event. Features a dynamic hero section, informative about section, and a fully functional registration form with client-side validation.

## Features

- **Hero Section**: Energetic gradient background, animated brain icon, event date/details, and smooth-scroll CTA
- **About Section**: Two-column layout with event highlights, feature cards, and event statistics
- **Registration Section**: Client-side form with validation, interest checkboxes, and success state
- **Micro-interactions**: Button hover effects, focus rings, entrance animations using IntersectionObserver
- **Responsive Design**: Mobile, tablet, and desktop optimized with Tailwind breakpoints
- **Inline SVGs**: All decorative elements are inline SVG components (no external image URLs)
- **Accessibility**: Proper focus states, semantic HTML, and ARIA-friendly form validation

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
ucsc-intellihack-tailwind/
├── index.html                 # Main HTML entry point
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration with custom colors/animations
├── postcss.config.js         # PostCSS configuration for Tailwind
├── vite.config.js            # Vite configuration
├── src/
│   ├── index.js              # React entry point
│   ├── index.css             # Tailwind imports and custom component classes
│   ├── App.jsx               # Main app component with navigation and layout
│   └── components/
│       ├── Hero.jsx          # Hero section with CTA
│       ├── About.jsx         # About section with highlights and stats
│       └── Registration.jsx  # Registration form with validation
└── README.md                 # This file
```

## Key Technologies

- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixes
- **Google Fonts**: Inter font family

## Features Breakdown

### Hero Section
- Animated gradient background (blue → red → amber)
- Bouncing brain icon SVG
- Event headline, date, and tagline
- Smooth-scroll CTA button to registration
- Scroll indicator animation

### About Section
- Two-column responsive layout
- Event description and key highlights
- Four feature cards with icons (Innovation, Collaboration, Prizes, Learning)
- Event statistics card (48 hours, 500+ participants, $10K+ prizes)
- IntersectionObserver entrance animations

### Registration Section
- Full-featured form with fields:
  - Name (required)
  - Email (required, with validation)
  - Institution (required)
  - Team Size (dropdown)
  - Areas of Interest (checkboxes, at least one required)
- Real-time error clearing
- Form validation with error messages
- Success state with confirmation message
- Auto-reset after successful submission

## Customization

### Colors
Edit `tailwind.config.js` to customize the gradient and color scheme:
```javascript
colors: {
  primary: "#1e40af",      // Blue
  secondary: "#dc2626",    // Red
  accent: "#f59e0b",       // Amber
}
```

### Animations
Modify keyframes in `tailwind.config.js` for entrance animations and transitions.

### Content
Update text, dates, and event details directly in component files.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized with Vite for fast development and production builds
- Minimal bundle size with tree-shaking
- Smooth animations using CSS transforms
- IntersectionObserver for efficient scroll-triggered animations

## Notes

- All styling uses Tailwind utility classes (no external CSS files)
- Form submission is simulated client-side (no backend integration)
- Smooth scrolling enabled via CSS `scroll-behavior: smooth`
- Fully responsive with mobile-first approach

---

**Created for UCSC IEEE Computer Society Web Team Recruitment Task**
