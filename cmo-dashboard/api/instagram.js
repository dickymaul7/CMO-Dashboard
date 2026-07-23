const https = require('https');

// Helper function to make HTTPS requests
function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => reject(err));
    });
}

// Vercel Serverless Function Handler
module.exports = async (req, res) => {
    // Set CORS headers so the frontend can call this API
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const token = 'EAATKiM3PnvQBSKxmWwDfRwFLW27VaiZBF4HWZB8ZAvybyZA';
    const igId = '17841464530048605';
    
    const urlAccount = `https://graph.facebook.com/v25.0/${igId}?fields=name,username,followers_count,media_count&access_token=${token}`;
    const urlMedia = `https://graph.facebook.com/v25.0/${igId}/media?fields=caption,like_count,comments_count,media_url,timestamp,permalink,media_type&limit=15&access_token=${token}`;
    
    try {
        const [account, media] = await Promise.all([fetchUrl(urlAccount), fetchUrl(urlMedia)]);
        res.status(200).json({ account, media });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
