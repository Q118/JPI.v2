
const express = require('express');
const path = require('path');
const app = express();
const port = 8020;
const cors = require('cors');
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
// import { fetch } from 'node-fetch';

// Serve static content for the app from the "public" directory 
app.use(express.static("public"));
// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/postTicket', (req, res) => {
    console.log(req.body);
})

app.post('/postTicket', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const cu = req.body.cu;
    const classSelect = req.body.class;
    const priorAttendance = req.body.priorAttendance;

    console.log(`name: ${name}`);
    console.log(`email: ${email}`);
    console.log(`phone: ${phone}`);
    console.log(`cu: ${cu}`);
    console.log(`class: ${classSelect}`);
    console.log(`priorAttendance: ${priorAttendance}`);

    fetch('http://jira.corelationinc.com/rest/api/2/issue/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic c3JvdGhtYW46UmF0dDNhdHQh',
        },
        body: JSON.stringify({
            "fields": {
                "project":
                {
                    "key": "VCRT"
                },
                "summary": `${name} -- ${classSelect}`,
                "description": `CU: ${cu},
                                Phone: ${phone}, 
                                Email: ${email},
                                Prior Attendance?: ${priorAttendance}`,
                "issuetype": {
                    "name": "Basic Functionality"
                }
            }
        })
    })
        .then(response => {
            res.send(response.json());
            console.log(response);
        })
        .catch(error => console.error('Error:', error))

})




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
