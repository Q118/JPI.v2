
const express = require('express');
const path = require('path');
const app = express();
const port = 8020;
const cors = require('cors');
const fetch = require('node-fetch');
// Serve static content for the app from the "public" directory 
app.use(express.static("public"));
// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//todo: change logic in postTicket route to have title be the title of the class (+only creating ticket if one not exist already) and description hold the name and info in a row of a table
// if ticket exists, then update ticket with new info
//todo add in  description to 'see comments for registers details'


app.use(cors());

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/postTicket', (req, res) => {
    console.log(req.body);
})

//function to check if ticket with class title and date exists
// bool = true if ticket exists and false if not
// let ticketExistence;;
// function checkTicketExistence(summary) {
//     app.get('/checkTicketExistence', (req, res) => {
//     ticketExistence = false;
//     fetch('http://jira.corelationinc.com/rest/api/2/issue/', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic c3JvdGhtYW46UmF0dDNhdHQh',
//         },
//         body: JSON.stringify({
//             "body": {
//                 "jql": "project = VCRT AND status=Open AND resolution = Unresolved",
//                 "maxResults": 100,
//                 "fields": [
//                     "summary"
//                 ],
//                 "startAt": 0
//             }
//         })
//     })
//         .then(response => {
//             res.send(response.json());
//             console.log(response.json().text());
//         })
//         .catch(error => console.error('Error:', error))
// })

let currentList;

function checkTicketExistence(summary) {
    const bodyData = `{ "jql": "project = VCRT AND status=Open AND resolution = Unresolved",
                            "maxResults": 100,
                            "fields": [
                                "summary"
                            ],
                            "startAt": 0
                            }`;
    fetch('http://jira.corelationinc.com/rest/api/2/search/', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic c3JvdGhtYW46UmF0dDNhdHQh',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: bodyData
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => {
            // console.log(text)
            console.log("type of: " + typeof text)
            currentList = JSON.parse(text);
            console.log(currentList)
            console.log(typeof currentList)
            
            // currentList.push(text);
        }).catch(err => console.error(err));
}

checkTicketExistence();

// console.log(currentList[0]);



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
                "summary": `${classSelect}`,
                "description": `Name: ${name}
                                CU: ${cu},
                                Phone: ${phone}, 
                                Email: ${email},
                                Prior Attendance?: ${priorAttendance}
                                ----`,
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
