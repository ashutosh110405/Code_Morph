// ========================================================
// CodeMorph - Standalone Authentication Script (auth.html)
// Pure Light Theme • Tab Switching • Validation • Session
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Auth Tabs & Forms
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabSignupBtn = document.getElementById('tab-signup-btn');
    const authCardTitle = document.getElementById('auth-card-title');
    const authCardSubtitle = document.getElementById('auth-card-subtitle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authSwitchText = document.getElementById('auth-switch-text');
    const authSwitchBtn = document.getElementById('auth-switch-btn');

    // Inputs & Elements
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const signupNameInput = document.getElementById('signup-name');
    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
    const pwdStrengthBar = document.getElementById('pwd-strength-bar');
    const pwdStrengthLabel = document.getElementById('pwd-strength-label');
    const pwdMatchHint = document.getElementById('pwd-match-hint');

    // Social & Utility Buttons
    const githubAuthBtn = document.getElementById('github-auth-btn');
    const googleAuthBtn = document.getElementById('google-auth-btn');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const toast = document.getElementById('toast');

    // --------------------------------------------------------
    // Toast Notification System
    // --------------------------------------------------------
    let toastTimeout;
    function showToast(message, type = 'info') {
        if (!toast) return;
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        toastTimeout = setTimeout(() => {
            toast.className = 'toast hidden';
        }, 3200);
    }

    // --------------------------------------------------------
    // Tab Switching (Sign In vs Sign Up)
    // --------------------------------------------------------
    function setAuthTab(tab) {
        if (tab === 'login') {
            tabLoginBtn.classList.add('active');
            tabSignupBtn.classList.remove('active');
            loginForm.classList.remove('hidden-form');
            signupForm.classList.add('hidden-form');

            authCardTitle.textContent = 'Welcome to CodeMorph';
            authCardSubtitle.textContent = 'Sign in to sync your conversion history and custom templates';
            authSwitchText.textContent = "Don't have an account yet?";
            authSwitchBtn.textContent = 'Sign Up Free';
        } else {
            tabSignupBtn.classList.add('active');
            tabLoginBtn.classList.remove('active');
            signupForm.classList.remove('hidden-form');
            loginForm.classList.add('hidden-form');

            authCardTitle.textContent = 'Create Free Account';
            authCardSubtitle.textContent = 'Start converting, debugging, and transforming code with CodeMorph';
            authSwitchText.textContent = 'Already have an account?';
            authSwitchBtn.textContent = 'Sign In';
        }
    }

    if (tabLoginBtn && tabSignupBtn) {
        tabLoginBtn.addEventListener('click', () => setAuthTab('login'));
        tabSignupBtn.addEventListener('click', () => setAuthTab('signup'));
    }

    if (authSwitchBtn) {
        authSwitchBtn.addEventListener('click', () => {
            const isLoginActive = tabLoginBtn.classList.contains('active');
            setAuthTab(isLoginActive ? 'signup' : 'login');
        });
    }

    // --------------------------------------------------------
    // Password Visibility Toggles
    // --------------------------------------------------------
    document.querySelectorAll('.password-toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const eyeOpen = button.querySelector('.eye-open');
            const eyeClosed = button.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.classList.add('hidden');
                eyeClosed.classList.remove('hidden');
            } else {
                input.type = 'password';
                eyeOpen.classList.remove('hidden');
                eyeClosed.classList.add('hidden');
            }
        });
    });

    // --------------------------------------------------------
    // Real-Time Password Strength Meter
    // --------------------------------------------------------
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', () => {
            const val = signupPasswordInput.value;
            let score = 0;

            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
            if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) score++;

            pwdStrengthBar.className = 'meter-bar-fill';

            if (val.length === 0) {
                pwdStrengthLabel.textContent = 'Enter a password';
            } else if (score === 1) {
                pwdStrengthBar.classList.add('weak');
                pwdStrengthLabel.textContent = 'Weak password (add length & mixed characters)';
            } else if (score === 2) {
                pwdStrengthBar.classList.add('medium');
                pwdStrengthLabel.textContent = 'Moderate password (add numbers or symbols)';
            } else if (score === 3) {
                pwdStrengthBar.classList.add('strong');
                pwdStrengthLabel.textContent = 'Strong password!';
            }

            checkPasswordMatch();
        });
    }

    function checkPasswordMatch() {
        if (!signupPasswordInput || !signupConfirmPasswordInput) return;
        const p1 = signupPasswordInput.value;
        const p2 = signupConfirmPasswordInput.value;

        if (!p2) {
            pwdMatchHint.textContent = '';
            pwdMatchHint.className = 'input-hint';
            return;
        }

        if (p1 === p2) {
            pwdMatchHint.textContent = '✓ Passwords match';
            pwdMatchHint.className = 'input-hint success';
        } else {
            pwdMatchHint.textContent = '✗ Passwords do not match';
            pwdMatchHint.className = 'input-hint error';
        }
    }

    if (signupConfirmPasswordInput) {
        signupConfirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }

    // --------------------------------------------------------
    // Form Submission Handlers
    // --------------------------------------------------------
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();

            if (!email || !password) {
                showToast('Please fill in both email and password.', 'warning');
                return;
            }

            const submitBtn = document.getElementById('login-submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Signing In...</span>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Sign In to CodeMorph</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

                const nameFromEmail = email.split('@')[0];
                const cleanName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
                const userObj = {
                    isLoggedIn: true,
                    name: cleanName === 'Neel.vidar' ? 'Neel J. Vidar' : cleanName,
                    email: email,
                    initials: cleanName.slice(0, 2).toUpperCase()
                };

                localStorage.setItem('codemorph_user', JSON.stringify(userObj));
                showToast(`Welcome back, ${userObj.name}! Redirecting to converter...`, 'success');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 700);
            }, 500);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = signupNameInput.value.trim();
            const email = signupEmailInput.value.trim();
            const password = signupPasswordInput.value;
            const confirmPassword = signupConfirmPasswordInput.value;

            if (password !== confirmPassword) {
                showToast('Passwords do not match. Please verify.', 'error');
                return;
            }

            const submitBtn = document.getElementById('signup-submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Creating Account...</span>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Create Free Account</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

                const parts = name.split(' ');
                const initials = parts.length > 1
                    ? (parts[0][0] + parts[1][0]).toUpperCase()
                    : name.slice(0, 2).toUpperCase();

                const userObj = {
                    isLoggedIn: true,
                    name: name,
                    email: email,
                    initials: initials
                };

                localStorage.setItem('codemorph_user', JSON.stringify(userObj));
                showToast(`Account created! Welcome, ${name}! Redirecting...`, 'success');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 700);
            }, 500);
        });
    }

    // Social Login Buttons
    if (githubAuthBtn) {
        githubAuthBtn.addEventListener('click', () => {
            showToast('GitHub OAuth ready for backend integration.', 'info');
        });
    }

    if (googleAuthBtn) {
        googleAuthBtn.addEventListener('click', () => {
            showToast('Google OAuth ready for backend integration.', 'info');
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Password reset link will be sent to your email when backend is connected.', 'info');
        });
    }
});
