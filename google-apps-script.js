/**
 * House of Rapheal's — website order form -> Google Sheet
 *
 * SETUP (one-time):
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Name it something like "Website Orders".
 * 2. In row 1, add these column headers exactly:
 *    Timestamp | Name | Email | Phone | City | Pickle | Quantity | Order Type | Notes
 * 3. In the sheet, go to Extensions -> Apps Script.
 * 4. Delete any starter code in the editor and paste this whole file in its place.
 * 5. Click Deploy -> New deployment.
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: anything, e.g. "Order form endpoint".
 *    - Execute as: Me.
 *    - Who has access: Anyone.
 *    - Click Deploy, then authorize it with your Google account when asked.
 * 6. Copy the "Web app URL" it gives you (ends in /exec).
 * 7. In index.html, find the line:
 *      var SHEET_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
 *    and replace the placeholder with that URL.
 *
 * Every time someone submits the order form on the site, a new row is
 * appended to this sheet automatically.
 *
 * If you ever change the form's fields, update the row order below to match.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter || {};

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.city || '',
    data.pickle || '',
    data.quantity || '',
    data.orderType || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: lets you open the /exec URL directly in a browser to confirm
 * the deployment is live (it will just show a plain OK message).
 */
function doGet(e) {
  return ContentService
    .createTextOutput('House of Rapheal\'s enquiry endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
