
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



let ticketExistence;
// function checkTicketExistence(summary) {
const checkTicketExistence = (summary) => {
    return new Promise((resolve, reject) => {
        ticketExistence = false;
        let currentList;
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
        }).then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        }).then(text => {
            console.log("type of: " + typeof text)
            currentList = JSON.parse(text);
            let ticketList = []; // push every element from currentList.issues.summary into an array
            for (let i = 0; i < currentList.issues.length; i++) {
                ticketList.push(currentList.issues[i].fields.summary);
            }
            // forEach element in ticketList, check if the summary matches the summary of the ticket user wants to create
            ticketList.forEach(element => {
                console.log(element)
                if (element === summary) {
                    console.log("ticket exists in scope of function!");
                    ticketExistence = true;
                }
            });
            resolve();
        }).catch(err => {
            console.error(err)
            reject();
        });
    });
}


app.get('/postTicket', async (req, res) => {
    console.log(req.body);
    // await checkTicketExistence("tester MaacGee -- KeyBridge Training").catch(err => console.error(err));
    // if (ticketExistence === true) {
    //     console.log("ticketttttt exists");
    // } else {
    //     console.log("ticket does not exist");
    // }
})




app.post('/postTicket', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const cu = req.body.cu;
    const classSelect = req.body.class;
    const priorAttendance = req.body.priorAttendance;

    await checkTicketExistence(classSelect).catch(err => console.error(err));
    if (ticketExistence === true) {
        console.log("ticketttttt exists");
                // add comment and edit description to the ticket
    } else {
        console.log("ticket does not exist");
        // create ticket
    }



    // fetch('http://jira.corelationinc.com/rest/api/2/issue/', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Basic c3JvdGhtYW46UmF0dDNhdHQh',
    //     },
    //     body: JSON.stringify({
    //         "fields": {
    //             "project":
    //             {
    //                 "key": "VCRT"
    //             },
    //             "summary": `${classSelect}`,
    //             "description": `Name: ${name}
    //                             CU: ${cu},
    //                             Phone: ${phone}, 
    //                             Email: ${email},
    //                             Prior Attendance?: ${priorAttendance}
    //                             ----`,
    //             "issuetype": {
    //                 "name": "Basic Functionality"
    //             }
    //         }
    //     })
    // }).then(response => {
    //     res.send(response.json());
    //     console.log(response);
    // }).catch(error => console.error('Error:', error))
})




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
