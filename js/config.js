// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1e40af',
                secondary: '#8b5cf6',
                accent: '#ec4899',
                dark: '#0f172a',
                light: '#f8fafc'
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Poppins', 'sans-serif']
            }
        }
    }
};

// Application Configuration
const CONFIG = {
    // API endpoints (for future backend integration)
    API_BASE_URL: 'https://api.consticonnect.in',
    
    // Constitutional articles data source
    CONSTITUTION_DATA_URL: '/api/constitution',
    
    // News API configuration
    NEWS_API_KEY: 'your-news-api-key',
    NEWS_BASE_URL: 'https://newsapi.org/v2',
    
    // AI Model configuration
    AI_MODEL_ENDPOINT: '/api/analyze',
    
    // Local storage keys
    STORAGE_KEYS: {
        BOOKMARKS: 'consticonnect_bookmarks',
        USER_PREFERENCES: 'consticonnect_preferences',
        SEARCH_HISTORY: 'consticonnect_search_history'
    },
    
    // UI Configuration
    UI: {
        ANIMATION_DURATION: 300,
        DEBOUNCE_DELAY: 500,
        MAX_SEARCH_RESULTS: 20,
        CARDS_PER_PAGE: 9
    },
    
    // Chart colors
    CHART_COLORS: {
        primary: 'rgba(30, 64, 175, 0.7)',
        secondary: 'rgba(139, 92, 246, 0.7)',
        accent: 'rgba(236, 72, 153, 0.7)',
        success: 'rgba(16, 185, 129, 0.7)',
        warning: 'rgba(245, 158, 11, 0.7)'
    },
    
    // Constitutional article categories
    ARTICLE_CATEGORIES: {
        'Fundamental Rights': {
            color: 'purple',
            icon: 'fas fa-shield-alt'
        },
        'Directive Principles': {
            color: 'blue',
            icon: 'fas fa-compass'
        },
        'Fundamental Duties': {
            color: 'green',
            icon: 'fas fa-handshake'
        },
        'Citizenship': {
            color: 'orange',
            icon: 'fas fa-passport'
        },
        'Parliament': {
            color: 'red',
            icon: 'fas fa-landmark'
        }
    }
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
