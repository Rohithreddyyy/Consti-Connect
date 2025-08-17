#!/usr/bin/env python3
"""
ConstiConnect Backend Example
A Flask-based backend for constitutional analysis using machine learning
"""

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Sample constitutional articles database
CONSTITUTIONAL_ARTICLES = [
    {
        "article_number": "Article 19",
        "title": "Protection of certain rights regarding freedom of speech etc.",
        "description": "Right to freedom of speech and expression",
        "full_text": "All citizens shall have the right to freedom of speech and expression; to assemble peaceably and without arms; to form associations or unions; to move freely throughout the territory of India; to reside and settle in any part of the territory of India; and to practise any profession, or to carry on any occupation, trade or business.",
        "keywords": ["freedom", "speech", "expression", "assembly", "association", "movement", "profession", "trade", "business"],
        "category": "Fundamental Rights"
    },
    {
        "article_number": "Article 14",
        "title": "Equality before law",
        "description": "Right to equality before law and equal protection of laws",
        "full_text": "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
        "keywords": ["equality", "law", "protection", "discrimination", "justice"],
        "category": "Fundamental Rights"
    },
    {
        "article_number": "Article 21",
        "title": "Protection of life and personal liberty",
        "description": "Right to life and personal liberty",
        "full_text": "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
        "keywords": ["life", "liberty", "procedure", "law", "deprivation", "due process"],
        "category": "Fundamental Rights"
    },
    {
        "article_number": "Article 32",
        "title": "Right to Constitutional Remedies",
        "description": "Right to move the Supreme Court for enforcement of fundamental rights",
        "full_text": "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.",
        "keywords": ["remedies", "supreme court", "enforcement", "rights", "writs"],
        "category": "Fundamental Rights"
    },
    {
        "article_number": "Article 15",
        "title": "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
        "description": "Right against discrimination",
        "full_text": "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.",
        "keywords": ["discrimination", "religion", "race", "caste", "sex", "birth"],
        "category": "Fundamental Rights"
    }
]

class ConstitutionalAnalyzer:
    """AI-powered constitutional analysis engine"""
    
    def __init__(self):
        self.articles = CONSTITUTIONAL_ARTICLES
        self.vectorizer = None
        self.article_vectors = None
        self._initialize_model()
    
    def _initialize_model(self):
        """Initialize the TF-IDF vectorizer and article vectors"""
        # Create DataFrame for easier processing
        df = pd.DataFrame(self.articles)
        
        # Combine title, description, and full_text for better matching
        df['combined_text'] = df['title'] + ' ' + df['description'] + ' ' + df['full_text']
        
        # Initialize TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            ngram_range=(1, 2),
            stop_words='english',
            preprocessor=self._preprocess_text
        )
        
        # Fit and transform the constitutional articles
        self.article_vectors = self.vectorizer.fit_transform(df['combined_text'])
    
    def _preprocess_text(self, text):
        """Clean and normalize text for analysis"""
        # Convert to lowercase
        text = text.lower()
        # Remove special characters but keep spaces
        text = re.sub(r'[^a-zA-Z\s]', ' ', text)
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def analyze_news(self, news_text, top_n=3):
        """
        Analyze news text and find relevant constitutional articles
        
        Args:
            news_text (str): The news text to analyze
            top_n (int): Number of top matches to return
            
        Returns:
            list: List of matching articles with scores
        """
        # Preprocess the input text
        processed_text = self._preprocess_text(news_text)
        
        # Vectorize the input text
        news_vector = self.vectorizer.transform([processed_text])
        
        # Calculate similarity scores
        similarity_scores = cosine_similarity(news_vector, self.article_vectors)
        
        # Get top matches
        top_indices = similarity_scores.argsort()[0][-top_n:][::-1]
        
        results = []
        for idx in top_indices:
            article = self.articles[idx]
            score = similarity_scores[0][idx] * 100
            
            # Enhance score with keyword matching
            keyword_score = self._calculate_keyword_score(news_text, article['keywords'])
            final_score = min(99, score + keyword_score)
            
            results.append({
                'article_number': article['article_number'],
                'title': article['title'],
                'description': article['description'],
                'score': round(final_score, 2),
                'category': article['category'],
                'keywords_matched': self._get_matched_keywords(news_text, article['keywords'])
            })
        
        return results
    
    def _calculate_keyword_score(self, text, keywords):
        """Calculate additional score based on keyword matches"""
        text_lower = text.lower()
        matches = sum(1 for keyword in keywords if keyword.lower() in text_lower)
        return matches * 5  # 5 points per keyword match
    
    def _get_matched_keywords(self, text, keywords):
        """Get list of keywords that matched in the text"""
        text_lower = text.lower()
        return [keyword for keyword in keywords if keyword.lower() in text_lower]

# Initialize the analyzer
analyzer = ConstitutionalAnalyzer()

@app.route('/')
def index():
    """Serve the main application"""
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze_news():
    """
    Analyze news text and return constitutional matches
    
    Expected JSON payload:
    {
        "text": "News text to analyze",
        "top_n": 3 (optional, default 3)
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        news_text = data['text']
        top_n = data.get('top_n', 3)
        
        if not news_text.strip():
            return jsonify({'error': 'Empty text provided'}), 400
        
        # Perform analysis
        results = analyzer.analyze_news(news_text, top_n)
        
        # Add metadata
        response = {
            'results': results,
            'metadata': {
                'timestamp': datetime.now().isoformat(),
                'text_length': len(news_text),
                'articles_analyzed': len(CONSTITUTIONAL_ARTICLES),
                'model_version': '1.0.0'
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/articles', methods=['GET'])
def get_articles():
    """Get all constitutional articles"""
    return jsonify({
        'articles': CONSTITUTIONAL_ARTICLES,
        'count': len(CONSTITUTIONAL_ARTICLES)
    })

@app.route('/api/articles/<article_number>', methods=['GET'])
def get_article(article_number):
    """Get specific constitutional article"""
    article = next((a for a in CONSTITUTIONAL_ARTICLES if a['article_number'] == article_number), None)
    
    if not article:
        return jsonify({'error': 'Article not found'}), 404
    
    return jsonify(article)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': analyzer.vectorizer is not None
    })

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get platform statistics"""
    return jsonify({
        'total_articles': len(CONSTITUTIONAL_ARTICLES),
        'categories': list(set(a['category'] for a in CONSTITUTIONAL_ARTICLES)),
        'model_info': {
            'vectorizer_features': analyzer.vectorizer.get_feature_names_out().shape[0] if analyzer.vectorizer else 0,
            'article_vectors_shape': analyzer.article_vectors.shape if analyzer.article_vectors is not None else None
        }
    })

if __name__ == '__main__':
    print("🚀 Starting ConstiConnect Backend...")
    print(f"📚 Loaded {len(CONSTITUTIONAL_ARTICLES)} constitutional articles")
    print("🔍 AI model initialized and ready for analysis")
    print("🌐 Server starting on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
