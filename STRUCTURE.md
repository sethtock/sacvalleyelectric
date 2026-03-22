# Sac Valley Electric - Site Structure

## Component System

This site uses a **reusable component architecture** for easy maintenance and consistency across all pages.

### How It Works

All pages use the same header and footer by loading them dynamically via `components/loader.js`:

```html
<!-- Header (injected by loader.js) -->
<div data-component="header"></div>

<!-- Page Content -->
<!-- ... -->

<!-- Footer (injected by loader.js) -->
<div data-component="footer"></div>
```

### Key Files

```
/
├── index.html                 # Home page
├── projects.html              # Projects/portfolio page
├── history.html               # Company history page
├── styles.css                 # All styling
├── components/
│   ├── header.html           # Navigation (loaded on all pages)
│   ├── footer.html           # Footer (loaded on all pages)
│   └── loader.js             # Component loader script
└── logo.gif                  # Company logo
```

## Making Changes

### Update Navigation (header)
Edit `components/header.html` — changes apply to ALL pages automatically.

### Update Footer
Edit `components/footer.html` — changes apply to ALL pages automatically.

### Add New Page
1. Create `newpage.html`
2. Use the template structure:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Page Title - Sac Valley Electric</title>
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
3. Add link to `components/header.html` navigation

### Update Styling
All styles are in `styles.css`. No build step needed — changes take effect immediately.

## Deployment

Site is deployed via GitHub Pages: https://sethtock.github.io/sacvalleyelectric/

To deploy after changes:
```bash
git add .
git commit -m "Your message"
git push
```

Changes appear live within 1-2 minutes.

## No Build Step Required

This is plain HTML with JavaScript component loading. No npm, webpack, or build process needed. Just edit and push.
