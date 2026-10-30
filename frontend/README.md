# 🎨 CodeMorph - Front End

This folder contains all front-end assets and UI for **CodeMorph**, built with a clean, modern **Light Theme** aesthetic.

---

## 📁 Pages & Structure

- **`index.html`**: The main Code Converter dashboard preserving the classic sidebar layout with the side-by-side code conversion workspace (Source panel, Middle action controls, Target converted panel).
- **`auth.html`**: Dedicated Authentication page containing the unified **Sign In** and **Create Account** forms, social login buttons, show/hide password toggles, live password strength meter, and password match validation.
- **`style.css`**: Pure Light Theme SaaS design system shared across both pages, featuring clean typography (`Plus Jakarta Sans` & `Fira Code`), card shadows, form inputs, and responsive breakpoints.
- **`script.js`**: JavaScript engine powering the code converter, live line numbering, sample code loader, language swapping, clipboard copy, and file download.
- **`auth.js`**: JavaScript logic for tab switching, password visibility, real-time strength meter, input validation, and session persistence (`localStorage`).

---

## 🌐 How to Run

1. **Directly in Browser**:

   - Double-click or open `frontend/index.html` to access the code converter.
   - Click **"Sign In / Sign Up"** in the sidebar or top bar to navigate to `frontend/auth.html`.
   - On the authentication page, click **"Back to Converter"** or **"Converter"** in the sidebar to return to the converter.
2. **Via VS Code Live Server**:

   - Right-click `frontend/index.html` $\rightarrow$ **"Open with Live Server"**.
