# ConstiConnect Deployment Guide

This guide will help you deploy the ConstiConnect platform to various hosting services.

## 🚀 Quick Deployment Options

### Option 1: GitHub Pages (Recommended for Demo)
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free Hosting)
1. Connect your GitHub repository to Netlify
2. Build command: (leave empty for static site)
3. Publish directory: `.` (root directory)
4. Deploy automatically on every push

### Option 3: Vercel (Free Hosting)
1. Connect your GitHub repository to Vercel
2. Framework preset: Other
3. Build command: (leave empty)
4. Output directory: `.`
5. Deploy automatically on every push

## 🔧 Local Development Setup

### Prerequisites
- Python 3.8+ (for backend)
- Modern web browser
- Git

### Frontend Only (Static Site)
```bash
# Clone the repository
git clone <your-repo-url>
cd consticonnect

# Start local server
./start.sh
# or
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Full Stack (Frontend + Backend)
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start backend server
python3 backend_example.py

# Start frontend (in another terminal)
python3 -m http.server 8000

# Backend API: http://localhost:5000
# Frontend: http://localhost:8000
```

## 🌐 Production Deployment

### 1. Backend Deployment (Python Flask)

#### Heroku
```bash
# Create Procfile
echo "web: gunicorn backend_example:app" > Procfile

# Create runtime.txt
echo "python-3.9.16" > runtime.txt

# Deploy
heroku create your-app-name
git push heroku main
```

#### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

#### DigitalOcean App Platform
1. Connect GitHub repository
2. Select Python environment
3. Set build command: `pip install -r requirements.txt`
4. Set run command: `gunicorn backend_example:app`

### 2. Frontend Deployment

#### Static Hosting
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

#### CDN Configuration
```bash
# Example: Cloudflare CDN
# 1. Add your domain to Cloudflare
# 2. Update DNS records
# 3. Enable CDN features
```

## 🔐 Environment Configuration

### Frontend Environment Variables
Create a `.env` file for frontend configuration:
```env
# API Configuration
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_ENVIRONMENT=production

# Analytics
REACT_APP_GA_TRACKING_ID=your-ga-id

# Feature Flags
REACT_APP_ENABLE_ML_TRAINING=true
REACT_APP_ENABLE_USER_ANALYTICS=true
```

### Backend Environment Variables
```env
# Flask Configuration
FLASK_ENV=production
SECRET_KEY=your-secret-key-here

# Database
DATABASE_URL=your-database-url

# ML Model Configuration
MODEL_STORAGE_PATH=/app/models
DATASET_STORAGE_PATH=/app/datasets

# API Keys
NEWS_API_KEY=your-news-api-key
OPENAI_API_KEY=your-openai-key
```

## 📊 Database Setup

### SQLite (Development)
```python
# Already configured in backend_example.py
# Database file: consticonnect.db
```

### PostgreSQL (Production)
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb consticonnect

# Update DATABASE_URL in environment
DATABASE_URL=postgresql://username:password@localhost/consticonnect
```

### MongoDB (Alternative)
```bash
# Install MongoDB
sudo apt-get install mongodb

# Create database
mongo
use consticonnect
```

## 🤖 ML Model Deployment

### Model Storage
```bash
# Create model storage directory
mkdir -p models/
mkdir -p datasets/

# Set permissions
chmod 755 models/
chmod 755 datasets/
```

### Model Training Pipeline
```python
# Example: Automated model training
from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()
scheduler.add_job(train_models, 'interval', hours=24)
scheduler.start()
```

### Model Versioning
```python
# Save model with version
import joblib
import datetime

version = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
joblib.dump(model, f'models/constitutional_model_v{version}.pkl')
```

## 🔒 Security Configuration

### SSL/HTTPS Setup
```bash
# Let's Encrypt (Free SSL)
sudo apt-get install certbot
sudo certbot --nginx -d yourdomain.com

# Or use Cloudflare SSL
# Enable SSL/TLS encryption mode: Full (strict)
```

### CORS Configuration
```python
# In backend_example.py
CORS(app, origins=[
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    "http://localhost:3000"  # Development
])
```

### API Rate Limiting
```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
```

## 📈 Monitoring & Analytics

### Application Monitoring
```python
# Add monitoring middleware
from flask_monitoringdashboard import Dashboard

Dashboard.bind(app)
```

### Logging Configuration
```python
import logging
from logging.handlers import RotatingFileHandler

if not app.debug:
    file_handler = RotatingFileHandler('logs/consticonnect.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('ConstiConnect startup')
```

### Health Checks
```python
@app.route('/health')
def health_check():
    return {
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0',
        'services': {
            'database': check_database_connection(),
            'ml_models': check_model_availability(),
            'external_apis': check_api_connections()
        }
    }
```

## 🚀 Performance Optimization

### Frontend Optimization
```bash
# Minify CSS and JS
npm install -g uglify-js
uglifyjs js/*.js -o dist/js/bundle.min.js

# Optimize images
npm install -g imagemin
imagemin images/* --out-dir=dist/images
```

### Backend Optimization
```python
# Enable caching
from flask_caching import Cache

cache = Cache(config={
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': 'redis://localhost:6379/0'
})

# Cache expensive operations
@cache.memoize(timeout=300)
def get_constitutional_articles():
    # Expensive database query
    pass
```

### CDN Configuration
```html
<!-- Use CDN for external libraries -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

### Automated Testing
```python
# tests/test_app.py
import unittest
from backend_example import app

class TestConstiConnect(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
    
    def test_home_page(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
    
    def test_api_analyze(self):
        response = self.app.post('/api/analyze', json={
            'text': 'Test constitutional analysis'
        })
        self.assertEqual(response.status_code, 200)
```

## 📱 Mobile App Deployment

### React Native (Future)
```bash
# Create React Native app
npx react-native init ConstiConnectMobile

# Build for Android
cd android && ./gradlew assembleRelease

# Build for iOS
cd ios && xcodebuild -workspace ConstiConnectMobile.xcworkspace -scheme ConstiConnectMobile -configuration Release
```

## 🆘 Troubleshooting

### Common Issues

#### CORS Errors
```python
# Add CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
```

#### Database Connection Issues
```python
# Test database connection
import sqlite3
try:
    conn = sqlite3.connect('consticonnect.db')
    print("Database connection successful")
except Exception as e:
    print(f"Database connection failed: {e}")
```

#### ML Model Loading Issues
```python
# Check model file permissions
import os
model_path = 'models/constitutional_model.pkl'
if os.path.exists(model_path):
    print(f"Model file exists: {os.path.getsize(model_path)} bytes")
else:
    print("Model file not found")
```

## 📞 Support

For deployment issues:
1. Check the logs: `heroku logs --tail`
2. Verify environment variables
3. Test locally first
4. Check file permissions
5. Verify API endpoints

## 🔄 Updates & Maintenance

### Regular Updates
```bash
# Update dependencies
pip install --upgrade -r requirements.txt

# Backup database
sqlite3 consticonnect.db ".backup backup_$(date +%Y%m%d).db"

# Update ML models
python3 -c "from backend_example import retrain_models; retrain_models()"
```

### Monitoring Checklist
- [ ] Check application logs
- [ ] Monitor API response times
- [ ] Verify ML model accuracy
- [ ] Review user analytics
- [ ] Update security patches
- [ ] Backup data regularly

---

**Happy Deploying! 🚀**
