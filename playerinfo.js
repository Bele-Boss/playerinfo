function fetchPlayerInfo() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    // Validate inputs
    if (!name || !number) {
        alert('Please enter both name and number.');
        return;
    }

    // Fetch data from Google Sheets
    // Note: You'll need to use your API key and sheet ID
    const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
    const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
    const SHEET_NAME = 'Snookerplus*';

    // Initialize Google Sheets API client
    gapi.load('client', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(() => {
            // Fetch player data from "Snookerplus*" sheet
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: SHEET_ID,
                range: SHEET_NAME,
            }).then((response) => {
                const values = response.result.values;
                // Find player data and display it
                // Note: You'll need to add logic here to find the relevant player data
                // and then update the DOM to display it.

                // Example: 
                const player = values.find(row => row[2] === name && row[4] === number);
                if (player) {
                    document.getElementById('playerInfo').innerText = `Name: ${player[2]}, Total: ${player[5]}, Table Money: ${player[6]}`;
                } else {
                    document.getElementById('playerInfo').innerText = 'Player not found.';
                }
            }, (response) => {
                console.error('Error fetching data:', response.result.error.message);
            });

            // Fetch and display frame data similarly...
        });
    });
}
