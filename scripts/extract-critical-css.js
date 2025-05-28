// Script to extract critical CSS for above-the-fold content
// This helps improve First Contentful Paint (FCP) and Largest Contentful Paint (LCP)

const criticalCSS = `
/* Critical CSS for above-the-fold content */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --prometheus-orange: #FF6B35;
  --prometheus-navy: #1A1F2E;
  --prometheus-gray: #6B7280;
  --prometheus-gold: #F59E0B;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
}

/* Typography for critical content */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  line-height: 1.2;
}

/* Container for above-the-fold content */
.container-custom {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

@media (min-width: 768px) {
  .container-custom {
    padding-right: 2rem;
    padding-left: 2rem;
  }
}

@media (min-width: 1280px) {
  .container-custom {
    max-width: 1280px;
  }
}

/* Button styles for CTA */
.btn-primary {
  background-color: #FF6B35;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Loading state */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Prevent FOUC */
.no-js { visibility: hidden; opacity: 0; }
`;

console.log('Critical CSS extracted successfully');
console.log('Add this CSS inline in your HTML <head> for better performance');
console.log(criticalCSS);

module.exports = { criticalCSS }; 