import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { domain, firstName, lastName, company } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const apiKey = process.env.HUNTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Hunter.io API key not configured' });
    }

    // Build Hunter.io API URL
    let url = `https://api.hunter.io/v2/email-finder?domain=${encodeURIComponent(domain)}&api_key=${apiKey}`;

    if (firstName) {
      url += `&first_name=${encodeURIComponent(firstName)}`;
    }

    if (lastName) {
      url += `&last_name=${encodeURIComponent(lastName)}`;
    }

    if (company) {
      url += `&company=${encodeURIComponent(company)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Hunter.io API error',
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Hunter.io API error:', error);
    return res.status(500).json({
      error: 'Failed to process Hunter.io request',
      details: error.message
    });
  }
}
