#!/bin/bash

# ConstiConnect Startup Script
echo "🚀 Starting ConstiConnect - Constitutional Awareness Platform"
echo "================================================================"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    
    # Check if we're in the right directory
    if [ -f "index.html" ] && [ -d "js" ] && [ -d "css" ]; then
        echo "✅ Project files found"
        echo ""
        echo "🌐 Starting local server..."
        echo "📱 Open your browser and go to: http://localhost:8000"
        echo "🛑 Press Ctrl+C to stop the server"
        echo ""
        
        # Start the HTTP server
        python3 -m http.server 8000
    else
        echo "❌ Error: Please run this script from the ConstiConnect project directory"
        echo "   Make sure index.html, js/, and css/ directories are present"
        exit 1
    fi
else
    echo "❌ Error: Python 3 is required but not found"
    echo "   Please install Python 3 and try again"
    exit 1
fi
