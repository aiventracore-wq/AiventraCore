const { google } = require('googleapis');

function getSheetsClient() {
  let auth = null;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      auth = google.auth.fromJSON(credentials);
      auth.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
    } catch (err) {
      console.error('[GOOGLE-SHEETS] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON env var:', err.message);
    }
  }

  if (!auth || !spreadsheetId) {
    console.warn('[GOOGLE-SHEETS] Google Service Account credentials or Spreadsheet ID not configured. Google Sheets sync is disabled.');
    return null;
  }

  try {
    return google.sheets({ version: 'v4', auth });
  } catch (err) {
    console.error('[GOOGLE-SHEETS] Failed to initialize sheets client:', err.message);
    return null;
  }
}

module.exports = async (req, res) => {
  // CORS Headers for Vercel Serverless Function
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, organization, message } = req.body;

  // Basic validation (same rules as express-validator)
  if (!name || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ success: false, errors: [{ field: 'name', message: 'Name is required (max 100 chars)' }] });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, errors: [{ field: 'email', message: 'Please provide a valid email address' }] });
  }
  if (organization && organization.length > 100) {
    return res.status(400).json({ success: false, errors: [{ field: 'organization', message: 'Organization must not exceed 100 chars' }] });
  }
  if (!message || message.trim().length < 10 || message.length > 2000) {
    return res.status(400).json({ success: false, errors: [{ field: 'message', message: 'Message must be between 10 and 2000 chars' }] });
  }

  try {
    const sheets = getSheetsClient();
    if (sheets) {
      const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
      const range = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:E';
      const values = [
        [
          new Date().toISOString(),
          name,
          email,
          organization || '',
          message
        ]
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: { values },
      });
      console.log('[GOOGLE-SHEETS] Lead successfully appended to sheet.');
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Our system architecture team will follow up within 24 hours.',
      mode: 'sheets'
    });
  } catch (error) {
    console.error('[SERVER ERROR] Error processing lead submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing inquiry submission. Please try again later.'
    });
  }
};
