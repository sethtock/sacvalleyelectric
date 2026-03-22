# Claude.md - AI Maintenance Guide

This file explains how AI assistants (like Claude) can effectively edit, maintain, and enhance this site.

## Quick Overview

**Tech Stack:**
- Plain HTML (no build process)
- CSS (styles.css)
- JavaScript (components/loader.js)
- GitHub Pages deployment (automatic)
- Component-based architecture (reusable header/footer)

**Repository:** https://github.com/sethtock/sacvalleyelectric

---

## File Structure

```
/
├── index.html                 # Home page
├── projects.html              # Projects/portfolio page
├── history.html               # Company history & about page
├── styles.css                 # All styling (global)
├── logo.gif                   # Company logo
├── components/
│   ├── header.html           # Reusable navigation (on all pages)
│   ├── footer.html           # Reusable footer (on all pages)
│   └── loader.js             # Component injection system
├── images/
│   ├── neca_logo.gif
│   └── ibewLogo.gif
├── STRUCTURE.md              # Site structure documentation
└── claude.md                 # This file
```

---

## How the Component System Works

### Key Concept
The site uses a **JavaScript component loader** to inject header and footer on every page. This means:
- Edit `components/header.html` → updates on ALL pages
- Edit `components/footer.html` → updates on ALL pages
- No code duplication

### How It Works
1. Each page has placeholders:
   ```html
   <div data-component="header"></div>
   <div data-component="footer"></div>
   ```

2. When the page loads, `components/loader.js` fetches the component HTML and injects it
3. The hamburger menu is initialized after header injection

### Adding a New Page
To add a new page (e.g., `services.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services - Sac Valley Electric</title>
    <link rel="stylesheet" href="styles.css">
    <script src="components/loader.js"></script>
</head>
<body>
    <div data-component="header"></div>
    
    <!-- Your page content here -->
    
    <div data-component="footer"></div>
</body>
</html>
```

Then add a link in `components/header.html`:
```html
<li><a href="services.html">Services</a></li>
```

---

## Common Tasks

### Update Navigation (Header)
**File:** `components/header.html`

```html
<ul class="nav-links" id="navLinks">
    <li><a href="index.html">Home</a></li>
    <li><a href="projects.html">Projects</a></li>
    <!-- Add new links here -->
</ul>
```

**Note:** After editing, the `loader.js` will:
1. Re-inject the updated header on all pages
2. Re-initialize the hamburger menu click handlers

### Update Footer
**File:** `components/footer.html`

Simple text changes only. Footer content gets injected on every page.

### Change Colors or Styling
**File:** `styles.css`

CSS variables at top:
```css
:root {
    --primary-color: #1b2169;      /* Navy blue */
    --secondary-color: #a91513;    /* Red accent */
    --dark-text: #2c3e50;
    --light-text: #5a6c7d;
    --light-bg: #f8f9fa;
}
```

Change any color here and it updates everywhere.

### Update Page Content
Edit `.html` files directly. Content is hardcoded on each page:
- `index.html` — Home, about, union commitment section
- `history.html` — Company story, leadership
- `projects.html` — Project showcase/portfolio

### Add a New Section
Edit the relevant `.html` file and add HTML. Use existing CSS classes for styling (see `styles.css` for available classes).

---

## Important Notes for AI Editors

### ✅ Safe to Edit
- HTML content (add/change text, links)
- CSS styling
- Component files (header, footer)
- Logo or image files
- Meta tags and titles

### ⚠️ Be Careful With
- **Hamburger menu initialization** — Make sure `loader.js` is always loaded and `initHamburgerMenu()` is called after header injection
- **Positioning** — Mobile nav uses `position: fixed` (critical for hamburger menu!)
- **Z-index values** — Navbar is 1000, menu dropdown is 999
- **Component injection** — Always use `<div data-component="..."></div>` pattern

### ❌ Don't Do These
- Change file structure without updating links
- Remove `components/loader.js` or break its initialization
- Change z-index values without understanding the layout
- Edit HTML files without git commits (always commit changes)

---

## Git Workflow

### Before Making Changes
```bash
cd /data/.openclaw/workspace/sacvalleyelectric
git status  # See what's changed
git pull    # Get latest from remote
```

### After Making Changes
```bash
git add -A                    # Stage all changes
git commit -m "Clear message" # Commit with message
git push                      # Push to GitHub
```

**GitHub Pages deploys automatically** — changes appear live in 1-2 minutes.

### Good Commit Messages
```bash
# ✅ Good
git commit -m "Update project descriptions on projects page"
git commit -m "Fix hamburger menu positioning on mobile"
git commit -m "Add new leadership team member to history page"

# ❌ Bad
git commit -m "fixes"
git commit -m "update"
```

---

## Key CSS Classes for Content

### Containers
- `.container` — Max-width 1200px, centered with padding

### Sections
- `.page-hero` — Large hero section at top of pages
- `.about` — About section styling
- `.union-commitment` — Union/NECA partnership section
- `.contact` — Contact section with CTA buttons

### Typography
- `h1`, `h2`, `h3`, `h4` — Heading styles
- `.title` — Smaller subheading class
- `p` — Paragraph text

### Buttons
- `.cta-button` — Call-to-action button (contact, etc.)

### Grids
- `.leadership-profiles` — 2-column grid for team members
- `.projects-grid` — Responsive grid for project showcase
- `.credentials` — Grid for credential items

---

## Company Info to Know

- **Company:** Sac Valley Electric, Inc.
- **License:** California Contractor's State License #848435
- **Founded:** 2004
- **Founders:** Brad Kirk (President), Doug Wirtz
- **Union:** NECA Sacramento member, partners with IBEW Local 340
- **Brad Kirk's Role:** Governor of NECA Sacramento

---

## Styling Guidelines

### Colors
- Primary blue: `#1b2169`
- Secondary red: `#a91513`
- Text dark: `#2c3e50`
- Text light: `#5a6c7d`
- Light background: `#f8f9fa`

### Fonts
- Sans-serif: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- No special fonts imported (keeps page fast)

### Responsive Breakpoint
- **Desktop:** Full nav with links visible
- **Mobile:** (max-width: 768px) Hamburger menu, stacked layout

---

## Mobile Menu Details

The hamburger menu is critical. Here's what you need to know:

**HTML Structure** (`components/header.html`):
```html
<div class="hamburger" id="hamburger">
    <span></span>
    <span></span>
    <span></span>
</div>
<ul class="nav-links" id="navLinks">
    <!-- Links -->
</ul>
```

**JavaScript** (`components/loader.js`):
```javascript
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        // ... close on link click
    }
}
```

**CSS** (mobile only, `@media (max-width: 768px)`):
```css
.hamburger {
    display: flex;  /* Shows on mobile */
}

.nav-links {
    position: fixed;  /* Critical! */
    top: 70px;
    max-height: 0;  /* Hidden by default */
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.nav-links.active {
    max-height: 500px;  /* Opens when active */
}
```

**If menu breaks:**
1. Check that hamburger and nav IDs match
2. Verify CSS has `position: fixed` (not absolute)
3. Confirm z-index is set (999-1000)
4. Ensure `loader.js` calls `initHamburgerMenu()` after header loads

---

## Deployment

**Auto-deploy on push:**
- Push to `main` branch → GitHub Actions builds
- Static site deploys to: https://sethtock.github.io/sacvalleyelectric/
- **Live in 1-2 minutes**

No build step needed. GitHub Pages serves the `.html` files directly.

---

## Future Enhancements (Ideas for AI)

If Chris asks for improvements, consider:
- Add a services/capabilities page
- Add client testimonials section
- Add project filters (by type: utility, commercial, etc.)
- Add FAQ section
- Add blog/news section (would need simple CMS or static generation)
- Dark mode toggle
- Language support (esp. Japanese for Tricia's heritage)

All can be done with this architecture without changing to React.

---

## Questions to Ask Chris

Before making major changes:
1. **Design:** Should I match the current style?
2. **Content:** What should the new section say?
3. **Scope:** Is this a one-off change or template for future sites?
4. **Deploy:** Should I push immediately or wait for review?

---

## Summary

- ✅ Edit `.html` files directly for content
- ✅ Edit `styles.css` for styling
- ✅ Edit `components/` for header/footer
- ✅ Test locally or on the live site (GitHub Pages)
- ✅ Always commit and push changes
- ⚠️ Don't break the component loading system
- ⚠️ Don't touch hamburger menu without understanding it

---

**Last updated:** 2026-03-22  
**Maintained by:** AI assistants (with Chris's guidance)
