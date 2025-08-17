// Constitutional Articles Database
const constitutionalArticles = [
    {
        id: "art-19",
        articleNumber: "Article 19",
        title: "Protection of certain rights regarding freedom of speech etc.",
        description: "Right to freedom of speech and expression",
        fullText: "All citizens shall have the right to freedom of speech and expression; to assemble peaceably and without arms; to form associations or unions; to move freely throughout the territory of India; to reside and settle in any part of the territory of India; and to practise any profession, or to carry on any occupation, trade or business.",
        keywords: ["freedom", "speech", "expression", "assembly", "association", "movement", "profession", "trade", "business"],
        category: "Fundamental Rights",
        relatedArticles: ["Article 19(2)", "Article 25", "Article 26"],
        landmarkCases: [
            "Kesavananda Bharati v. State of Kerala (1973)",
            "Maneka Gandhi v. Union of India (1978)",
            "S. Rangarajan v. P. Jagjivan Ram (1989)"
        ]
    },
    {
        id: "art-14",
        articleNumber: "Article 14",
        title: "Equality before law",
        description: "Right to equality before law and equal protection of laws",
        fullText: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
        keywords: ["equality", "law", "protection", "discrimination", "justice"],
        category: "Fundamental Rights",
        relatedArticles: ["Article 15", "Article 16", "Article 17"],
        landmarkCases: [
            "State of West Bengal v. Anwar Ali Sarkar (1952)",
            "E.P. Royappa v. State of Tamil Nadu (1974)",
            "Indra Sawhney v. Union of India (1992)"
        ]
    },
    {
        id: "art-21",
        articleNumber: "Article 21",
        title: "Protection of life and personal liberty",
        description: "Right to life and personal liberty",
        fullText: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
        keywords: ["life", "liberty", "procedure", "law", "deprivation", "due process"],
        category: "Fundamental Rights",
        relatedArticles: ["Article 20", "Article 22", "Article 23"],
        landmarkCases: [
            "Maneka Gandhi v. Union of India (1978)",
            "Olga Tellis v. Bombay Municipal Corporation (1985)",
            "Vishaka v. State of Rajasthan (1997)"
        ]
    },
    {
        id: "art-32",
        articleNumber: "Article 32",
        title: "Right to Constitutional Remedies",
        description: "Right to move the Supreme Court for enforcement of fundamental rights",
        fullText: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.",
        keywords: ["remedies", "supreme court", "enforcement", "rights", "writs"],
        category: "Fundamental Rights",
        relatedArticles: ["Article 226", "Article 227", "Article 136"],
        landmarkCases: [
            "Kesavananda Bharati v. State of Kerala (1973)",
            "S.P. Gupta v. Union of India (1981)",
            "People's Union for Civil Liberties v. Union of India (2003)"
        ]
    },
    {
        id: "art-15",
        articleNumber: "Article 15",
        title: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
        description: "Right against discrimination",
        fullText: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.",
        keywords: ["discrimination", "religion", "race", "caste", "sex", "birth"],
        category: "Fundamental Rights",
        relatedArticles: ["Article 14", "Article 16", "Article 17"],
        landmarkCases: [
            "State of Madras v. Champakam Dorairajan (1951)",
            "Indra Sawhney v. Union of India (1992)",
            "Ashoka Kumar Thakur v. Union of India (2008)"
        ]
    }
];

// News Articles Database
const newsArticles = [
    {
        id: "news-1",
        title: "Supreme Court Upholds Freedom of Speech in Digital Age",
        excerpt: "The Supreme Court delivered a landmark judgment protecting online speech while addressing concerns about misinformation.",
        content: "The Supreme Court today delivered a landmark judgment protecting freedom of speech in digital spaces. The ruling emphasized that online platforms are protected under Article 19 of the Constitution, which guarantees freedom of expression to all citizens. The court acknowledged the need for reasonable restrictions but maintained that digital speech deserves constitutional protection.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800",
        category: "Legal",
        source: "Legal Times India",
        date: "2024-01-15",
        constitutionalMatches: [
            {
                article: "Article 19",
                score: 95,
                description: "Protection of certain rights regarding freedom of speech, etc."
            }
        ],
        tags: ["freedom of speech", "digital rights", "supreme court", "constitutional law"]
    },
    {
        id: "news-2",
        title: "New Employment Laws Ensure Equal Opportunities",
        excerpt: "Parliament passes comprehensive employment legislation aimed at eliminating workplace discrimination.",
        content: "Parliament has passed comprehensive employment legislation aimed at eliminating workplace discrimination. The new law ensures equal opportunities for all citizens regardless of their background, implementing the principles enshrined in Article 14 and Article 15 of the Constitution.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800",
        category: "Employment",
        source: "Economic Herald",
        date: "2024-01-14",
        constitutionalMatches: [
            {
                article: "Article 14",
                score: 88,
                description: "Equality before law"
            },
            {
                article: "Article 15",
                score: 82,
                description: "Prohibition of discrimination"
            }
        ],
        tags: ["employment", "discrimination", "equality", "workplace rights"]
    },
    {
        id: "news-3",
        title: "Healthcare Rights Expanded Under Right to Life",
        excerpt: "Government announces universal healthcare initiative citing constitutional obligations under Article 21.",
        content: "The government has announced a comprehensive universal healthcare initiative, citing constitutional obligations under Article 21 which guarantees the right to life and personal liberty. The new policy expands healthcare access to all citizens, recognizing health as a fundamental aspect of the right to life.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800",
        category: "Healthcare",
        source: "Health Today",
        date: "2024-01-13",
        constitutionalMatches: [
            {
                article: "Article 21",
                score: 92,
                description: "Protection of life and personal liberty"
            }
        ],
        tags: ["healthcare", "right to life", "universal health", "constitutional rights"]
    },
    {
        id: "news-4",
        title: "Digital Privacy Bill Introduced in Parliament",
        excerpt: "New legislation aims to protect citizens' digital privacy rights under constitutional framework.",
        content: "A comprehensive digital privacy bill has been introduced in Parliament, aiming to protect citizens' digital privacy rights within the constitutional framework. The bill draws from Article 21's protection of personal liberty and Article 19's freedom of expression to establish robust privacy safeguards.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800",
        category: "Technology",
        source: "Digital Rights Journal",
        date: "2024-01-12",
        constitutionalMatches: [
            {
                article: "Article 21",
                score: 89,
                description: "Protection of life and personal liberty"
            },
            {
                article: "Article 19",
                score: 76,
                description: "Freedom of speech and expression"
            }
        ],
        tags: ["privacy", "digital rights", "technology law", "constitutional protection"]
    },
    {
        id: "news-5",
        title: "Supreme Court Rules on Environmental Rights",
        excerpt: "Court recognizes clean environment as fundamental right under Article 21.",
        content: "The Supreme Court has ruled that the right to a clean environment is a fundamental right under Article 21 of the Constitution. The judgment expands the scope of the right to life to include environmental protection, setting a precedent for future environmental litigation.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800",
        category: "Environment",
        source: "Environmental Law Review",
        date: "2024-01-11",
        constitutionalMatches: [
            {
                article: "Article 21",
                score: 94,
                description: "Protection of life and personal liberty"
            }
        ],
        tags: ["environment", "right to life", "environmental law", "supreme court"]
    },
    {
        id: "news-6",
        title: "Education Rights Case Reaches Supreme Court",
        excerpt: "Petition challenges discrimination in educational institutions under Article 15.",
        content: "A landmark petition challenging discrimination in educational institutions has reached the Supreme Court. The case tests the scope of Article 15's prohibition of discrimination and its application to educational access and opportunities.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?auto=format&fit=crop&w=800",
        category: "Education",
        source: "Education Times",
        date: "2024-01-10",
        constitutionalMatches: [
            {
                article: "Article 15",
                score: 91,
                description: "Prohibition of discrimination"
            },
            {
                article: "Article 14",
                score: 85,
                description: "Equality before law"
            }
        ],
        tags: ["education", "discrimination", "constitutional rights", "supreme court"]
    }
];

// Python Code for AI Analysis
const pythonAnalysisCode = `import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load constitutional articles dataset
constitution_df = pd.read_csv('constitution_articles.csv')

# Preprocess text
def preprocess(text):
    """Clean and normalize text for analysis"""
    import re
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    return text

# Vectorize constitutional articles
vectorizer = TfidfVectorizer(
    preprocessor=preprocess,
    max_features=5000,
    ngram_range=(1, 2)
)
constitution_vectors = vectorizer.fit_transform(constitution_df['full_text'])

# Function to find relevant articles
def find_relevant_articles(news_text, top_n=3):
    """Analyze news text and find relevant constitutional articles"""
    # Vectorize input text
    news_vector = vectorizer.transform([news_text])
    
    # Calculate similarity scores
    similarity_scores = cosine_similarity(news_vector, constitution_vectors)
    
    # Get top matches
    top_indices = similarity_scores.argsort()[0][-top_n:][::-1]
    results = []
    
    for idx in top_indices:
        article = constitution_df.iloc[idx]
        score = similarity_scores[0][idx] * 100
        results.append({
            'article_number': article['article_number'],
            'title': article['title'],
            'description': article['description'],
            'score': round(score, 2),
            'category': article['category']
        })
    
    return results

# Enhanced analysis with keyword matching
def enhanced_analysis(news_text):
    """Enhanced analysis combining TF-IDF and keyword matching"""
    # TF-IDF analysis
    tfidf_results = find_relevant_articles(news_text)
    
    # Keyword matching
    keyword_matches = []
    for article in constitution_df.itertuples():
        keywords = article.keywords.split(',')
        matches = sum(1 for keyword in keywords if keyword.strip().lower() in news_text.lower())
        if matches > 0:
            keyword_matches.append({
                'article_number': article.article_number,
                'title': article.title,
                'keyword_matches': matches,
                'total_keywords': len(keywords)
            })
    
    # Combine and rank results
    combined_results = combine_analysis_results(tfidf_results, keyword_matches)
    return combined_results

def combine_analysis_results(tfidf_results, keyword_matches):
    """Combine TF-IDF and keyword analysis results"""
    # Implementation for combining results
    return tfidf_results  # Simplified for demo`;

// Sample news text for demo
const sampleNewsText = "The Supreme Court today delivered a landmark judgment protecting freedom of speech in digital spaces. The ruling emphasized that online platforms are protected under Article 19 of the Constitution, which guarantees freedom of expression to all citizens. The court acknowledged the need for reasonable restrictions but maintained that digital speech deserves constitutional protection.";

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        constitutionalArticles,
        newsArticles,
        pythonAnalysisCode,
        sampleNewsText
    };
}
