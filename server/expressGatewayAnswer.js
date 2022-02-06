const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors);

const corsOptions = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
};

const jsonResponse = {
    "data": [
        {
            "campaign_id": "123",
            "campaign": "campaign0",
            "cpc": "0.4",
            "date_start": "2021-01-01",
            "date_stop": "2021-01-08"
        },
        {
            "campaign_id": "123",
            "campaign": "campaign0",
            "cpc": "0.6",
            "date_start": "2021-01-09",
            "date_stop": "2021-01-15"
        },
        {
            "campaign_id": "123",
            "campaign": "campaign0",
            "cpc": "0.2",
            "date_start": "2021-01-16",
            "date_stop": "2021-01-21"
        },
        {
            "campaign_id": "456",
            "campaign": "campaign1",
            "cpc": "0.6",
            "date_start": "2022-01-01",
            "date_stop": "2022-01-08"
        },
        {
            "campaign_id": "456",
            "campaign": "campaign1",
            "cpc": "0.8",
            "date_start": "2022-01-09",
            "date_stop": "2022-01-15"
        },
        {
            "campaign_id": "456",
            "campaign": "campaign1",
            "cpc": "0.9",
            "date_start": "2022-01-16",
            "date_stop": "2022-01-21"
        },
    ],
    "paging": {
        "cursors": {
            "before": "MAZDZD",
            "after": "MAZDZD"
        }
    }
}

var answerFunction = function (request, response) {
    var event = {
        httpMethod: request.method.toLowerCase(),
        headers: request.headers
    }
    if (event.httpMethod == 'get') {
        response.writeHead(200)
        response.write(JSON.stringify(jsonResponse))
    } else {
        response.writeHead(401)
        response.write(JSON.stringify({ message: 'Unauthorized' }))
    }
    response.end()
}



module.exports = { answerFunction }