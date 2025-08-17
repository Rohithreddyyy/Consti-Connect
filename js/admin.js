// Admin Panel JavaScript for ConstiConnect

class AdminPanel {
    constructor() {
        this.currentTab = 'dashboard';
        this.charts = {};
        this.trainingJobs = [];
        this.datasets = [];
        this.init();
    }

    init() {
        // Check authentication
        if (!auth.isAuthenticated() || !auth.hasRole('admin')) {
            window.location.href = 'login.html';
            return;
        }

        // Setup admin panel
        this.setupEventListeners();
        this.loadDashboard();
        this.updateAdminName();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.target.closest('a').dataset.tab;
                this.switchTab(tab);
            });
        });

        // ML Training events
        document.getElementById('uploadDataset')?.addEventListener('click', () => this.uploadDataset());
        document.getElementById('startTraining')?.addEventListener('click', () => this.startTraining());
        document.getElementById('datasetFile')?.addEventListener('change', (e) => this.handleFileUpload(e));

        // File upload drag and drop
        this.setupDragAndDrop();
    }

    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected tab content
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
            selectedTab.classList.add('active');
        }

        // Add active class to selected nav link
        const selectedLink = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }

        this.currentTab = tabName;

        // Load tab-specific content
        switch (tabName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'users':
                this.loadUsers();
                break;
            case 'ml-training':
                this.loadMLTraining();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'content':
                this.loadContent();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    updateAdminName() {
        const adminName = document.getElementById('adminName');
        if (adminName && auth.currentUser) {
            adminName.textContent = auth.currentUser.name;
        }
    }

    // Dashboard Functions
    loadDashboard() {
        this.loadDashboardStats();
        this.loadDashboardCharts();
        this.loadRecentActivity();
    }

    loadDashboardStats() {
        // Simulate loading stats from API
        const stats = {
            totalUsers: 1234,
            activeModels: 5,
            todayAnalysis: 156,
            alerts: 3
        };

        document.getElementById('totalUsers').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('activeModels').textContent = stats.activeModels;
        document.getElementById('todayAnalysis').textContent = stats.todayAnalysis;
        document.getElementById('alerts').textContent = stats.alerts;
    }

    loadDashboardCharts() {
        this.createUserActivityChart();
        this.createModelPerformanceChart();
    }

    createUserActivityChart() {
        const ctx = document.getElementById('userActivityChart');
        if (!ctx) return;

        if (this.charts.userActivity) {
            this.charts.userActivity.destroy();
        }

        this.charts.userActivity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [120, 190, 300, 500, 200, 300, 450],
                    borderColor: CONFIG.CHART_COLORS.primary,
                    backgroundColor: CONFIG.CHART_COLORS.primary.replace('0.7', '0.1'),
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createModelPerformanceChart() {
        const ctx = document.getElementById('modelPerformanceChart');
        if (!ctx) return;

        if (this.charts.modelPerformance) {
            this.charts.modelPerformance.destroy();
        }

        this.charts.modelPerformance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['TF-IDF', 'BERT', 'LSTM', 'Ensemble'],
                datasets: [{
                    label: 'Accuracy (%)',
                    data: [92, 94, 89, 96],
                    backgroundColor: [
                        CONFIG.CHART_COLORS.primary,
                        CONFIG.CHART_COLORS.secondary,
                        CONFIG.CHART_COLORS.accent,
                        CONFIG.CHART_COLORS.success
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    loadRecentActivity() {
        const activities = [
            {
                type: 'user',
                message: 'New user registered: john.doe@example.com',
                time: '2 minutes ago',
                icon: 'fas fa-user-plus',
                color: 'text-blue-600'
            },
            {
                type: 'model',
                message: 'Model training completed: BERT v2.1',
                time: '15 minutes ago',
                icon: 'fas fa-brain',
                color: 'text-green-600'
            },
            {
                type: 'analysis',
                message: 'High volume of constitutional analysis requests',
                time: '1 hour ago',
                icon: 'fas fa-chart-line',
                color: 'text-purple-600'
            },
            {
                type: 'alert',
                message: 'System performance alert: High CPU usage',
                time: '2 hours ago',
                icon: 'fas fa-exclamation-triangle',
                color: 'text-orange-600'
            }
        ];

        const container = document.getElementById('recentActivity');
        if (!container) return;

        container.innerHTML = activities.map(activity => `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <i class="${activity.icon} ${activity.color} text-lg"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">${activity.message}</p>
                    <p class="text-xs text-gray-500">${activity.time}</p>
                </div>
            </div>
        `).join('');
    }

    // User Management Functions
    loadUsers() {
        this.loadUserStats();
        this.loadUsersTable();
    }

    loadUserStats() {
        const stats = {
            activeUsers: 892,
            newUsers: 23,
            premiumUsers: 156
        };

        document.getElementById('activeUsers').textContent = stats.activeUsers;
        document.getElementById('newUsers').textContent = stats.newUsers;
        document.getElementById('premiumUsers').textContent = stats.premiumUsers;
    }

    loadUsersTable() {
        const users = [
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'user',
                status: 'active',
                lastLogin: '2024-01-15 10:30'
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                role: 'admin',
                status: 'active',
                lastLogin: '2024-01-15 09:15'
            },
            {
                name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                role: 'user',
                status: 'inactive',
                lastLogin: '2024-01-10 14:20'
            }
        ];

        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        tbody.innerHTML = users.map(user => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span class="text-sm font-medium text-gray-700">${user.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                            <div class="text-sm text-gray-500">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}">
                        ${user.role}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${user.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${user.lastLogin}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-primary hover:text-primary/80 mr-3">Edit</button>
                    <button class="text-red-600 hover:text-red-800">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // ML Training Functions
    loadMLTraining() {
        this.loadModelStats();
        this.loadTrainingProgress();
    }

    loadModelStats() {
        const stats = {
            activeModels: 3,
            trainingAccuracy: '94.2%',
            totalDatasets: 12
        };

        document.getElementById('activeModelCount').textContent = stats.activeModels;
        document.getElementById('trainingAccuracy').textContent = stats.trainingAccuracy;
        document.getElementById('totalDatasets').textContent = stats.totalDatasets;
    }

    setupDragAndDrop() {
        const dropZone = document.querySelector('.border-dashed');
        if (!dropZone) return;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary', 'bg-primary/5');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-primary', 'bg-primary/5');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-primary/5');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload({ target: { files } });
            }
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['.csv', '.json'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        
        if (!allowedTypes.includes(fileExtension)) {
            this.showNotification('Please upload CSV or JSON files only.', 'error');
            return;
        }

        // Show file info
        this.showNotification(`File selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`, 'success');
    }

    async uploadDataset() {
        const name = document.getElementById('datasetName').value;
        const type = document.getElementById('datasetType').value;
        const file = document.getElementById('datasetFile').files[0];

        if (!name || !type || !file) {
            this.showNotification('Please fill all fields and select a file.', 'error');
            return;
        }

        // Show loading state
        const button = document.getElementById('uploadDataset');
        const originalText = button.textContent;
        button.textContent = 'Uploading...';
        button.disabled = true;

        try {
            // Simulate upload
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Add to datasets
            this.datasets.push({
                id: Date.now(),
                name: name,
                type: type,
                filename: file.name,
                size: file.size,
                uploadedAt: new Date().toISOString(),
                status: 'ready'
            });

            // Update training dataset dropdown
            this.updateTrainingDatasetDropdown();

            this.showNotification('Dataset uploaded successfully!', 'success');
            
            // Reset form
            document.getElementById('datasetName').value = '';
            document.getElementById('datasetFile').value = '';
            
        } catch (error) {
            this.showNotification('Upload failed. Please try again.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    updateTrainingDatasetDropdown() {
        const select = document.getElementById('trainingDataset');
        if (!select) return;

        select.innerHTML = '<option value="">Select a dataset</option>';
        this.datasets.forEach(dataset => {
            const option = document.createElement('option');
            option.value = dataset.id;
            option.textContent = `${dataset.name} (${dataset.type})`;
            select.appendChild(option);
        });
    }

    async startTraining() {
        const name = document.getElementById('modelName').value;
        const datasetId = document.getElementById('trainingDataset').value;
        const type = document.getElementById('modelType').value;
        const epochs = document.getElementById('epochs').value;
        const learningRate = document.getElementById('learningRate').value;

        if (!name || !datasetId || !type) {
            this.showNotification('Please fill all required fields.', 'error');
            return;
        }

        const dataset = this.datasets.find(d => d.id == datasetId);
        if (!dataset) {
            this.showNotification('Selected dataset not found.', 'error');
            return;
        }

        // Show loading state
        const button = document.getElementById('startTraining');
        const originalText = button.textContent;
        button.textContent = 'Starting...';
        button.disabled = true;

        try {
            // Create training job
            const job = {
                id: Date.now(),
                name: name,
                dataset: dataset.name,
                type: type,
                epochs: parseInt(epochs),
                learningRate: parseFloat(learningRate),
                status: 'training',
                progress: 0,
                startTime: new Date().toISOString(),
                estimatedTime: '2 hours'
            };

            this.trainingJobs.push(job);
            this.loadTrainingProgress();

            this.showNotification('Training started successfully!', 'success');

            // Simulate training progress
            this.simulateTrainingProgress(job.id);

        } catch (error) {
            this.showNotification('Failed to start training.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    simulateTrainingProgress(jobId) {
        const job = this.trainingJobs.find(j => j.id === jobId);
        if (!job) return;

        const interval = setInterval(() => {
            job.progress += Math.random() * 10;
            if (job.progress >= 100) {
                job.progress = 100;
                job.status = 'completed';
                clearInterval(interval);
                this.showNotification(`Training completed: ${job.name}`, 'success');
            }
            this.loadTrainingProgress();
        }, 2000);
    }

    loadTrainingProgress() {
        const container = document.getElementById('trainingProgress');
        if (!container) return;

        if (this.trainingJobs.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">No training jobs found.</p>';
            return;
        }

        container.innerHTML = this.trainingJobs.map(job => `
            <div class="border rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-semibold">${job.name}</h4>
                    <span class="px-2 py-1 text-xs rounded-full ${
                        job.status === 'training' ? 'bg-blue-100 text-blue-800' :
                        job.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                    }">${job.status}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">Dataset: ${job.dataset} | Type: ${job.type}</p>
                <div class="mb-2">
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>${Math.round(job.progress)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-primary h-2 rounded-full transition-all duration-300" style="width: ${job.progress}%"></div>
                    </div>
                </div>
                <div class="flex justify-between text-xs text-gray-500">
                    <span>Started: ${new Date(job.startTime).toLocaleString()}</span>
                    <span>ETA: ${job.estimatedTime}</span>
                </div>
            </div>
        `).join('');
    }

    // Analytics Functions
    loadAnalytics() {
        this.createUserGrowthChart();
        this.createUsageAnalyticsChart();
        this.loadUserActivityDetails();
    }

    createUserGrowthChart() {
        const ctx = document.getElementById('userGrowthChart');
        if (!ctx) return;

        if (this.charts.userGrowth) {
            this.charts.userGrowth.destroy();
        }

        this.charts.userGrowth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Total Users',
                    data: [100, 250, 400, 600, 800, 1200],
                    borderColor: CONFIG.CHART_COLORS.primary,
                    backgroundColor: CONFIG.CHART_COLORS.primary.replace('0.7', '0.1'),
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createUsageAnalyticsChart() {
        const ctx = document.getElementById('usageAnalyticsChart');
        if (!ctx) return;

        if (this.charts.usageAnalytics) {
            this.charts.usageAnalytics.destroy();
        }

        this.charts.usageAnalytics = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['News Analysis', 'Article Search', 'AI Training', 'User Management'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        CONFIG.CHART_COLORS.primary,
                        CONFIG.CHART_COLORS.secondary,
                        CONFIG.CHART_COLORS.accent,
                        CONFIG.CHART_COLORS.success
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    loadUserActivityDetails() {
        const container = document.getElementById('userActivityDetails');
        if (!container) return;

        const activities = JSON.parse(localStorage.getItem('user_activities') || '[]');
        
        if (activities.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">No user activity data available.</p>';
            return;
        }

        const recentActivities = activities.slice(-10).reverse();
        
        container.innerHTML = recentActivities.map(activity => `
            <div class="border-b border-gray-200 py-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm font-medium text-gray-900">${activity.action}</p>
                        <p class="text-xs text-gray-500">${activity.email}</p>
                    </div>
                    <span class="text-xs text-gray-400">${new Date(activity.timestamp).toLocaleString()}</span>
                </div>
            </div>
        `).join('');
    }

    // Content Management Functions
    loadContent() {
        // Load content management interface
        const container = document.getElementById('contentLibrary');
        if (!container) return;

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${constitutionalArticles.map(article => `
                    <div class="border rounded-lg p-4">
                        <h4 class="font-semibold mb-2">${article.articleNumber}</h4>
                        <p class="text-sm text-gray-600 mb-3">${article.title}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${article.category}</span>
                            <button class="text-primary text-sm hover:text-primary/80">Edit</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Settings Functions
    loadSettings() {
        // Settings are already loaded in the HTML
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new AdminPanel();
});
