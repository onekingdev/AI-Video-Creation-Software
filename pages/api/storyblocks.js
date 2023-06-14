import crypto from "crypto";

export default async function handler(req, res) {
    const publicKey = process.env.NEXT_PUBLIC_STORYBLOCKS_PUBLIC_KEY;
    const privateKey = process.env.NEXT_PUBLIC_STORYBLOCKS_PRIVATE_KEY;
    const storyBlocksURL = process.env.NEXT_PUBLIC_STORYBLOCKS_URL;

    // url info
    const baseUrl = 'https://api.videoblocks.com';
    const resource = '/api/v2/videos/search';

    // HMAC generation
    const expires = Math.floor(Date.now() / 1000) + 100;
    const hmacBuilder = crypto.createHmac('sha256', privateKey + expires);
    hmacBuilder.update(resource);
    const hmac = hmacBuilder.digest('hex');

    try {
        const url = storyBlocksURL;
        const queryParams = new URLSearchParams({
            results_per_page: 1,
            page: 1,
            max_duration: 10,
            // min_duration: 3,
            APIKEY: publicKey,
            project_id: 'aivideogenerator',
            user_id: 'alexseniordev',
            keywords: req.query.keywords,
            EXPIRES: expires,
            HMAC: hmac
        });

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const results = await fetch(`${url}?${queryParams.toString()}`, requestOptions);
        const resultsJson = await results.json();
        return res.status(200).json({ success: true, data: resultsJson.results });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, message: 'Something went wrong!', err });
    }    
}