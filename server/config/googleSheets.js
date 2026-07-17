const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

let sheetsClient = null;

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  let auth = null;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  // Option 1: Load from env variable as JSON string
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      auth = google.auth.fromJSON(credentials);
      auth.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
      console.log('[GOOGLE-SHEETS] Loaded credentials from GOOGLE_SERVICE_ACCOUNT_JSON env var.');
    } catch (err) {
      console.error('[GOOGLE-SHEETS] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON env var:', err.message);
    }
  }

  // Option 2: Fallback to reading google-credentials.json
  if (!auth) {
    const credPath = path.join(__dirname, '../google-credentials.json');
    if (fs.existsSync(credPath)) {
      try {
        auth = new google.auth.GoogleAuth({
          keyFile: credPath,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('[GOOGLE-SHEETS] Loaded credentials from google-credentials.json file.');
      } catch (err) {
        console.error('[GOOGLE-SHEETS] Failed to load credentials from google-credentials.json:', err.message);
      }
    }
  }

  if (!auth) {
    console.warn('[GOOGLE-SHEETS] Google Service Account credentials not configured. Google Sheets sync is disabled.');
    return null;
  }

  if (!spreadsheetId) {
    console.warn('[GOOGLE-SHEETS] GOOGLE_SPREADSHEET_ID is not configured in environment variables. Google Sheets sync is disabled.');
    return null;
  }

  try {
    sheetsClient = google.sheets({ version: 'v4', auth });
    return sheetsClient;
  } catch (err) {
    console.error('[GOOGLE-SHEETS] Failed to initialize sheets client:', err.message);
    return null;
  }
}

/**
 * Appends a lead row to the configured Google Sheet
 * @param {Object} lead - The lead details { name, email, organization, message, createdAt }
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
async function appendLeadToSheet(lead) {
  const sheets = getSheetsClient();
  if (!sheets) {
    console.log('[GOOGLE-SHEETS] Sync skipped (credentials or spreadsheet ID missing).');
    return false;
  }

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:E';

  const values = [
    [
      new Date(lead.createdAt || Date.now()).toISOString(),
      lead.name || '',
      lead.email || '',
      lead.organization || '',
      lead.message || ''
    ]
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });
    console.log(`[GOOGLE-SHEETS] Lead successfully appended to sheet ${spreadsheetId} inside range ${range}`);
    return true;
  } catch (error) {
    console.error('[GOOGLE-SHEETS] Error appending to sheet:', error.message);
    return false;
  }
}

module.exports = {
  appendLeadToSheet
};
