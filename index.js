export default {
  async fetch(request, env, ctx) {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Parse JSON from request body
      const data = await request.json();
      
      // Validate feedback field exists and is a string
      if (!data.feedback || typeof data.feedback !== 'string') {
        return new Response(JSON.stringify({ error: 'Missing or invalid feedback field' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Simple sentiment analysis
      const feedback = data.feedback.toLowerCase();
      let analysis = 'Neutral';
      
      // Positive keywords
      const positiveWords = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'perfect', 'awesome', 'nice',
        'brilliant', 'outstanding', 'superb', 'magnificent', 'spectacular', 'impressive', 'remarkable', 'exceptional', 'fabulous', 'terrific',
        'delightful', 'pleased', 'satisfied', 'happy', 'joyful', 'thrilled', 'excited', 'glad', 'content', 'pleasure',
        'beautiful', 'stunning', 'gorgeous', 'attractive', 'appealing', 'charming', 'elegant', 'sleek', 'modern', 'innovative',
        'helpful', 'useful', 'effective', 'efficient', 'reliable', 'consistent', 'stable', 'fast', 'quick', 'responsive',
        'recommend', 'best', 'favorite', 'perfectly', 'flawless', 'smooth', 'seamless', 'intuitive', 'easy', 'simple'
      ];
      // Negative keywords
      const negativeWords = [
        'bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointing', 'poor', 'useless', 'broken',
        'dreadful', 'atrocious', 'appalling', 'disgusting', 'repulsive', 'abysmal', 'pathetic', 'lame', 'weak', 'inferior',
        'annoying', 'frustrating', 'irritating', 'aggravating', 'bothersome', 'disturbing', 'unpleasant', 'uncomfortable', 'painful', 'stressful',
        'ugly', 'messy', 'cluttered', 'confusing', 'complicated', 'difficult', 'hard', 'complex', 'unclear', 'ambiguous',
        'slow', 'laggy', 'unresponsive', 'buggy', 'crash', 'error', 'fail', 'problem', 'issue', 'glitch',
        'never', 'avoid', 'regret', 'waste', 'disaster', 'catastrophe', 'nightmare', 'horrendous', 'shocking', 'unacceptable'
      ];
      
      // Count positive and negative words
      const positiveCount = positiveWords.filter(word => feedback.includes(word)).length;
      const negativeCount = negativeWords.filter(word => feedback.includes(word)).length;
      
      // Determine sentiment
      if (positiveCount > negativeCount) {
        analysis = 'Positive';
      } else if (negativeCount > positiveCount) {
        analysis = 'Negative';
      } else {
        analysis = 'Neutral';
      }

      // Return response in specified format
      return new Response(JSON.stringify({
        feedback: data.feedback,
        analysis: analysis
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
