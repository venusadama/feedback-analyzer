# Product Feedback Analyzer

A simple Cloudflare Worker that analyzes product feedback using AI.

## What It Does

- Accepts product feedback as JSON
- Uses Cloudflare Workers AI to analyze sentiment and themes  
- Returns a short summary
- Ready to deploy on Cloudflare Workers

## How to Test It

Send a POST request with JSON like this:
```json
{"feedback": "I love the new features but the app crashes sometimes"}
```

You'll get back a response with the analysis!
