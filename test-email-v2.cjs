const https = require('https');

const data = JSON.stringify({
    email: 'test_recipient@gmail.com'
});

const options = {
    hostname: 'fnymjffskndfgcpcydsh.supabase.co',
    path: '/functions/v1/send-welcome',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueW1qZmZza25kZmdjcGN5ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MzgzNjEsImV4cCI6MjA4NDQxNDM2MX0.O36D4E23UyfJd8HeT7NuIRyEgiPHudywqz5b6VU9L18',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
