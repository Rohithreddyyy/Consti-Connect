// Main JavaScript for ConstiConnect

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNewsFeed();
    initializeAIAnalysis();
    initializeConstitutionalArticles();
    initializeModelChart();
    initializeConstitutionalDataset();
    initializePythonCode();
    setupEventListeners();
    
    // Set sample text for demo
    document.getElementById('newsInput').value = sampleNewsText;
}

// News Feed Functionality
function initializeNewsFeed() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    newsGrid.innerHTML = '';
    
    newsArticles.forEach(news => {
        const newsCard = createNewsCard(news);
        newsGrid.appendChild(newsCard);
    });
}

function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden news-card fade-in';
    
    const categoryColors = {
        'Legal': 'bg-purple-100 text-purple-800',
        'Employment': 'bg-blue-100 text-blue-800',
        'Healthcare': 'bg-green-100 text-green-800',
        'Technology': 'bg-orange-100 text-orange-800',
        'Environment': 'bg-teal-100 text-teal-800',
        'Education': 'bg-indigo-100 text-indigo-800'
    };
    
    const colorClass = categoryColors[news.category] || 'bg-gray-100 text-gray-800';
    
    card.innerHTML = `
        <div class="aspect-video overflow-hidden">
            <img src="${news.image}" alt="${news.title}" class="w-full h-full object-cover transition-transform duration-500 news-image">
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start mb-4">
                <span class="${colorClass} px-3 py-1 rounded-full text-sm font-medium">${news.category}</span>
                <button class="text-gray-400 hover:text-yellow-500 bookmark-btn" data-news-id="${news.id}">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
            <h3 class="text-xl font-bold mb-3">${news.title}</h3>
            <p class="text-gray-600 mb-4">${news.excerpt}</p>
            
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span><i class="far fa-calendar mr-1"></i> ${formatDate(news.date)}</span>
                <span>${news.source}</span>
            </div>
            
            <div class="mb-4">
                ${news.constitutionalMatches.map(match => `
                    <div class="mb-2">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-gavel text-primary"></i>
                            <span class="font-medium">Constitutional Match (${match.score}%)</span>
                        </div>
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <div class="font-medium">${match.article}: ${match.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="flex gap-2">
                <button class="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex-1 read-more-btn" data-news-id="${news.id}">Read More</button>
                <button class="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    <i class="fas fa-external-link-alt"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// AI Analysis Functionality
function initializeAIAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', handleAIAnalysis);
    }
}

function handleAIAnalysis() {
    const newsText = document.getElementById('newsInput').value;
    if (newsText.trim().length === 0) {
        alert('Please enter some news text to analyze');
        return;
    }
    
    // Show loading state
    showAnalysisLoading();
    
    // Simulate AI analysis with timeout
    setTimeout(() => {
        const results = performAIAnalysis(newsText);
        displayAnalysisResults(results);
    }, 2000);
}

function showAnalysisLoading() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <div class="text-center py-8">
            <div class="loading-spinner mx-auto mb-4"></div>
            <p>Analyzing text with AI model...</p>
            <p class="text-sm text-gray-500 mt-2">This may take a few seconds</p>
        </div>
    `;
}

function performAIAnalysis(newsText) {
    // Simulate AI analysis by matching keywords and generating scores
    const results = [];
    
    constitutionalArticles.forEach(article => {
        let score = 0;
        
        // Keyword matching
        article.keywords.forEach(keyword => {
            if (newsText.toLowerCase().includes(keyword.toLowerCase())) {
                score += 15;
            }
        });
        
        // Title matching
        if (newsText.toLowerCase().includes(article.title.toLowerCase())) {
            score += 20;
        }
        
        // Description matching
        if (newsText.toLowerCase().includes(article.description.toLowerCase())) {
            score += 10;
        }
        
        // Add some randomness for demo
        score += Math.random() * 20;
        
        if (score > 0) {
            results.push({
                articleNumber: article.articleNumber,
                title: article.title,
                description: article.description,
                score: Math.min(99, Math.round(score)),
                category: article.category
            });
        }
    });
    
    // Sort by highest score and return top 3
    return results.sort((a, b) => b.score - a.score).slice(0, 3);
}

function displayAnalysisResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-search text-4xl mb-4"></i>
                <p>No constitutional matches found for this text.</p>
                <p class="text-sm mt-2">Try entering different news content.</p>
            </div>
        `;
        return;
    }
    
    let html = '<h4 class="font-bold mb-4">Constitutional Matches</h4>';
    
    results.forEach(result => {
        const categoryColors = {
            'Fundamental Rights': 'bg-purple-100 text-purple-800'
        };
        
        const colorClass = categoryColors[result.category] || 'bg-gray-100 text-gray-800';
        
        html += `
            <div class="bg-white border border-gray-200 rounded-lg p-4 mb-4 fade-in">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="font-bold text-lg">${result.articleNumber}</span>
                        <span class="text-sm ${colorClass} px-2 py-1 rounded ml-2">${result.category}</span>
                    </div>
                    <span class="text-lg font-bold text-primary">${result.score}%</span>
                </div>
                <h5 class="font-semibold mb-2">${result.title}</h5>
                <p class="text-gray-600">${result.description}</p>
                
                <div class="mt-3 flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full progress-bar" style="width: ${result.score}%"></div>
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// Constitutional Articles Functionality
function initializeConstitutionalArticles() {
    const articlesList = document.getElementById('articlesList');
    const articleDetail = document.getElementById('articleDetail');
    
    if (articlesList) {
        articlesList.innerHTML = '';
        constitutionalArticles.forEach(article => {
            const articleCard = createArticleCard(article);
            articlesList.appendChild(articleCard);
        });
    }
    
    if (articleDetail) {
        // Show first article by default
        showArticleDetail(constitutionalArticles[0]);
    }
}

function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'bg-white p-6 rounded-xl shadow-md constitution-card cursor-pointer border-l-4 border-primary interactive-card';
    card.dataset.articleId = article.id;
    
    const categoryColors = {
        'Fundamental Rights': 'bg-purple-100 text-purple-800'
    };
    
    const colorClass = categoryColors[article.category] || 'bg-gray-100 text-gray-800';
    
    card.innerHTML = `
        <div class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-lg">
                <i class="fas fa-file-contract text-primary text-2xl"></i>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-bold mb-2">${article.articleNumber}</h3>
                <h4 class="font-semibold mb-2">${article.title}</h4>
                <p class="text-gray-600 mb-3">${article.description}</p>
                <span class="${colorClass} px-2 py-1 rounded text-sm">${article.category}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showArticleDetail(article));
    
    return card;
}

function showArticleDetail(article) {
    const articleDetail = document.getElementById('articleDetail');
    if (!articleDetail) return;
    
    const categoryColors = {
        'Fundamental Rights': 'bg-purple-100 text-purple-800'
    };
    
    const colorClass = categoryColors[article.category] || 'bg-gray-100 text-gray-800';
    
    articleDetail.innerHTML = `
        <h3 class="text-2xl font-bold mb-4">${article.articleNumber}</h3>
        <h4 class="text-xl font-semibold mb-4">${article.title}</h4>
        <p class="text-gray-700 mb-6 leading-relaxed">${article.fullText}</p>
        
        <div class="border-t border-gray-200 my-6"></div>
        
        <div class="space-y-4 mb-6">
            <h5 class="font-bold">Related Keywords</h5>
            <div class="flex flex-wrap gap-2">
                ${article.keywords.map(keyword => 
                    `<span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">${keyword}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="border-t border-gray-200 my-6"></div>
        
        <div class="space-y-4 mb-6">
            <h5 class="font-bold">Landmark Cases</h5>
            <div class="space-y-2">
                ${article.landmarkCases.map(case_ => 
                    `<div class="p-3 bg-gray-100 rounded-lg">
                        <h6 class="font-semibold text-sm">${case_}</h6>
                    </div>`
                ).join('')}
            </div>
        </div>
        
        <div class="border-t border-gray-200 my-6"></div>
        
        <div class="space-y-4">
            <h5 class="font-bold">Related News</h5>
            <div class="space-y-3">
                ${getRelatedNews(article.articleNumber).map(news => `
                    <div class="p-3 bg-gray-100 rounded-lg">
                        <h6 class="font-semibold text-sm mb-1">${news.title}</h6>
                        <p class="text-xs text-gray-500">${news.source} • ${formatDate(news.date)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getRelatedNews(articleNumber) {
    return newsArticles.filter(news => 
        news.constitutionalMatches.some(match => match.article === articleNumber)
    ).slice(0, 3);
}

// Model Chart Initialization
function initializeModelChart() {
    const ctx = document.getElementById('modelChart');
    if (!ctx) return;
    
    const modelChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Article 19', 'Article 14', 'Article 21', 'Article 32', 'Article 15'],
            datasets: [{
                label: 'Matching Accuracy (%)',
                data: [92, 88, 95, 85, 90],
                backgroundColor: [
                    CONFIG.CHART_COLORS.primary,
                    CONFIG.CHART_COLORS.secondary,
                    CONFIG.CHART_COLORS.accent,
                    CONFIG.CHART_COLORS.success,
                    CONFIG.CHART_COLORS.warning
                ],
                borderColor: [
                    'rgba(30, 64, 175, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                }
            }
        }
    });
}

// Constitutional Dataset Display
function initializeConstitutionalDataset() {
    const datasetContainer = document.getElementById('constitutionalDataset');
    if (!datasetContainer) return;
    
    const sampleArticles = constitutionalArticles.slice(0, 3);
    
    datasetContainer.innerHTML = sampleArticles.map(article => `
        <div class="bg-gray-100 p-4 rounded-lg mb-4">
            <div class="flex justify-between items-center mb-2">
                <span class="font-medium">${article.articleNumber}</span>
                <span class="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">${article.category}</span>
            </div>
            <p class="text-sm text-gray-600">${article.description}</p>
        </div>
    `).join('');
}

// Python Code Display
function initializePythonCode() {
    const pythonCodeContainer = document.getElementById('pythonCode');
    if (!pythonCodeContainer) return;
    
    pythonCodeContainer.innerHTML = pythonAnalysisCode
        .replace(/import/g, '<span class="python-keyword">import</span>')
        .replace(/from/g, '<span class="python-keyword">from</span>')
        .replace(/def/g, '<span class="python-keyword">def</span>')
        .replace(/return/g, '<span class="python-keyword">return</span>')
        .replace(/for/g, '<span class="python-keyword">for</span>')
        .replace(/in/g, '<span class="python-keyword">in</span>')
        .replace(/if/g, '<span class="python-keyword">if</span>')
        .replace(/else/g, '<span class="python-keyword">else</span>')
        .replace(/class/g, '<span class="python-keyword">class</span>')
        .replace(/self/g, '<span class="python-keyword">self</span>')
        .replace(/True/g, '<span class="python-keyword">True</span>')
        .replace(/False/g, '<span class="python-keyword">False</span>')
        .replace(/None/g, '<span class="python-keyword">None</span>')
        .replace(/def ([a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="python-keyword">def</span> <span class="python-function">$1</span>')
        .replace(/class ([a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="python-keyword">class</span> <span class="python-function">$1</span>')
        .replace(/'([^']*)'/g, '<span class="python-string">\'$1\'</span>')
        .replace(/"([^"]*)"/g, '<span class="python-string">"$1"</span>')
        .replace(/#([^#\n]*)/g, '<span class="python-comment">#$1</span>');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function setupEventListeners() {
    // Bookmark functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.bookmark-btn')) {
            const btn = e.target.closest('.bookmark-btn');
            const icon = btn.querySelector('i');
            const newsId = btn.dataset.newsId;
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.classList.remove('text-gray-400');
                btn.classList.add('text-yellow-500');
                saveBookmark(newsId);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.classList.remove('text-yellow-500');
                btn.classList.add('text-gray-400');
                removeBookmark(newsId);
            }
        }
    });
    
    // Read more functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.read-more-btn')) {
            const btn = e.target.closest('.read-more-btn');
            const newsId = btn.dataset.newsId;
            const news = newsArticles.find(n => n.id === newsId);
            if (news) {
                showNewsDetail(news);
            }
        }
    });
}

function saveBookmark(newsId) {
    let bookmarks = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.BOOKMARKS) || '[]');
    if (!bookmarks.includes(newsId)) {
        bookmarks.push(newsId);
        localStorage.setItem(CONFIG.STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    }
}

function removeBookmark(newsId) {
    let bookmarks = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.BOOKMARKS) || '[]');
    bookmarks = bookmarks.filter(id => id !== newsId);
    localStorage.setItem(CONFIG.STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
}

function showNewsDetail(news) {
    // Create modal or expand view for news detail
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="text-2xl font-bold">${news.title}</h2>
                    <button class="text-gray-500 hover:text-gray-700 text-2xl" onclick="this.closest('.fixed').remove()">&times;</button>
                </div>
                <img src="${news.image}" alt="${news.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                <p class="text-gray-600 mb-4">${news.content}</p>
                <div class="border-t pt-4">
                    <h3 class="font-bold mb-2">Constitutional Connections:</h3>
                    ${news.constitutionalMatches.map(match => `
                        <div class="bg-gray-100 p-3 rounded-lg mb-2">
                            <div class="font-medium">${match.article} (${match.score}% match)</div>
                            <div class="text-sm text-gray-600">${match.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Export functions for global access
window.showNewsDetail = showNewsDetail;
