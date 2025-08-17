// Authentication System for ConstiConnect

// Demo user database
const USERS = {
    'user@consticonnect.com': {
        password: 'password123',
        role: 'user',
        name: 'Demo User',
        email: 'user@consticonnect.com',
        lastLogin: null,
        createdAt: '2024-01-01',
        preferences: {
            theme: 'light',
            notifications: true
        }
    },
    'admin@consticonnect.com': {
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@consticonnect.com',
        lastLogin: null,
        createdAt: '2024-01-01',
        permissions: ['manage_users', 'train_models', 'view_analytics', 'manage_content']
    }
};

// Session management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.sessionToken = null;
        this.init();
    }

    init() {
        // Check for existing session
        this.checkSession();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update UI based on auth status
        this.updateUI();
    }

    setupEventListeners() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Password toggle
        const togglePassword = document.getElementById('togglePassword');
        if (togglePassword) {
            togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }

        // Error modal close
        const closeErrorModal = document.getElementById('closeErrorModal');
        if (closeErrorModal) {
            closeErrorModal.addEventListener('click', () => this.hideErrorModal());
        }

        // Logout button (if exists)
        const logoutBtn = document.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value;
        const remember = form.remember.checked;

        // Show loading state
        this.showLoadingState();

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validate credentials
            const user = this.validateCredentials(email, password);
            
            if (user) {
                // Create session
                this.createSession(user, remember);
                
                // Log login activity
                this.logUserActivity('login', user.email);
                
                // Redirect based on role
                this.redirectUser(user.role);
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoadingState();
        }
    }

    validateCredentials(email, password) {
        const user = USERS[email];
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    createSession(user, remember) {
        this.currentUser = user;
        this.sessionToken = this.generateToken();
        
        // Update last login
        user.lastLogin = new Date().toISOString();
        
        // Store session data
        const sessionData = {
            user: user,
            token: this.sessionToken,
            timestamp: new Date().toISOString()
        };

        if (remember) {
            localStorage.setItem('consticonnect_session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('consticonnect_session', JSON.stringify(sessionData));
        }
    }

    checkSession() {
        let sessionData = localStorage.getItem('consticonnect_session') || 
                         sessionStorage.getItem('consticonnect_session');
        
        if (sessionData) {
            try {
                const session = JSON.parse(sessionData);
                const tokenAge = new Date() - new Date(session.timestamp);
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours
                
                if (tokenAge < maxAge) {
                    this.currentUser = session.user;
                    this.sessionToken = session.token;
                    return true;
                } else {
                    this.clearSession();
                }
            } catch (error) {
                this.clearSession();
            }
        }
        return false;
    }

    clearSession() {
        this.currentUser = null;
        this.sessionToken = null;
        localStorage.removeItem('consticonnect_session');
        sessionStorage.removeItem('consticonnect_session');
    }

    logout() {
        this.logUserActivity('logout', this.currentUser?.email);
        this.clearSession();
        this.updateUI();
        window.location.href = 'login.html';
    }

    redirectUser(role) {
        if (role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    generateToken() {
        return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    showLoadingState() {
        const buttonText = document.getElementById('loginButtonText');
        const spinner = document.getElementById('loginSpinner');
        const submitBtn = document.querySelector('#loginForm button[type="submit"]');
        
        if (buttonText) buttonText.style.display = 'none';
        if (spinner) spinner.classList.remove('hidden');
        if (submitBtn) submitBtn.disabled = true;
    }

    hideLoadingState() {
        const buttonText = document.getElementById('loginButtonText');
        const spinner = document.getElementById('loginSpinner');
        const submitBtn = document.querySelector('#loginForm button[type="submit"]');
        
        if (buttonText) buttonText.style.display = 'inline';
        if (spinner) spinner.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;
    }

    showError(message) {
        const modal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorMessage) errorMessage.textContent = message;
        if (modal) modal.classList.remove('hidden');
    }

    hideErrorModal() {
        const modal = document.getElementById('errorModal');
        if (modal) modal.classList.add('hidden');
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');
        const icon = toggleBtn.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    updateUI() {
        // Update navigation based on auth status
        const authLinks = document.querySelectorAll('[data-auth]');
        const userInfo = document.querySelector('[data-user-info]');
        
        if (this.currentUser) {
            // User is logged in
            authLinks.forEach(link => {
                if (link.dataset.auth === 'logged-out') {
                    link.style.display = 'none';
                } else if (link.dataset.auth === 'logged-in') {
                    link.style.display = 'inline';
                }
            });
            
            if (userInfo) {
                userInfo.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span class="text-white text-sm font-medium">${this.currentUser.name.charAt(0)}</span>
                        </div>
                        <span class="text-sm font-medium">${this.currentUser.name}</span>
                    </div>
                `;
            }
        } else {
            // User is logged out
            authLinks.forEach(link => {
                if (link.dataset.auth === 'logged-in') {
                    link.style.display = 'none';
                } else if (link.dataset.auth === 'logged-out') {
                    link.style.display = 'inline';
                }
            });
            
            if (userInfo) {
                userInfo.innerHTML = '';
            }
        }
    }

    logUserActivity(action, email) {
        const activity = {
            action: action,
            email: email,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: '127.0.0.1' // In real app, get from server
        };
        
        // Store activity in localStorage for demo
        let activities = JSON.parse(localStorage.getItem('user_activities') || '[]');
        activities.push(activity);
        localStorage.setItem('user_activities', JSON.stringify(activities));
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Check if user has specific role
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    // Check if user has specific permission
    hasPermission(permission) {
        return this.currentUser && 
               this.currentUser.permissions && 
               this.currentUser.permissions.includes(permission);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize authentication
const auth = new AuthManager();

// Export for use in other modules
window.auth = auth;

// Auto-redirect if already logged in
document.addEventListener('DOMContentLoaded', function() {
    if (auth.isAuthenticated()) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'login.html') {
            auth.redirectUser(auth.currentUser.role);
        }
    }
});
