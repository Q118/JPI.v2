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



//todo add in  description to 'see comments for registers details' 
//todo also add the 'IP' and 'Notes' in the main description


app.use(cors());

app.get("/", (req, res) => {
    res.render("index");
});

//variable to hold the description of the ticket that exists
// we need this to save and then append to it the next section of info
let ticketDescription;
let issueName; //also need the title for the same reason
let ticketExistence; //boolean to keep track of existence of ticket
const checkTicketExistence = (summary) => {
    return new Promise((resolve, reject) => {
        ticketExistence = false;
        let currentList;
        //todo: must change projectName to TT once in production!!!
        const bodyData = `{ "jql": "project = VCRT AND status=Open AND resolution = Unresolved",
                            "maxResults": 100,
                            "fields": [
                                "summary",
                                "description"
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
            currentList = JSON.parse(text);
            let issueList = []; // push every element from currentList.issues into an array
            for (let i = 0; i < currentList.issues.length; i++) {
                issueList.push(currentList.issues[i]);
            }
            // forEach element in issueList, check if the summary matches the summary of the ticket user wants to create
            issueList.forEach(element => {
                if (element?.fields?.summary === summary) {
                    console.log("ticket exists in scope of function!");
                    ticketExistence = true;
                    ticketDescription = element?.fields?.description;
                    issueName = element?.key;
                }
            });
            resolve();
        }).catch(err => {
            console.error(err)
            reject();
        });
    });
}

//function to send ticket if it does not exist
const sendTicket = (classSelect, attendeeName, cu, phone, email, priorAttendance) => {
    return new Promise((resolve, reject) => {
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
                    "description": `Name: ${attendeeName}
                                    CU: ${cu},
                                    Phone: ${phone}, 
                                    Email: ${email},
                                    Prior Attendance?: ${priorAttendance}
                                    IP: (IP address of attendee)
                                    Notes: (Additional info provided in comments)
                                    ----`,
                    "issuetype": {
                        "name": "Basic Functionality"
                    }
                }
            })
        }).then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        }).catch(error => {
            console.error('Error:', error)
            reject();
        })
    });
}

//todo: function to add comment to a newly created ticket that will run right after the above one. to notify the trainer and put the additonal info in


//function to send if it does exist
const updateTicket = (classSelect, attendeeName, cu, phone, email, priorAttendance) => {
    return new Promise((resolve, reject) => {
        fetch(`http://jira.corelationinc.com/rest/api/2/issue/${issueName}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic c3JvdGhtYW46UmF0dDNhdHQh',
            },
            body: JSON.stringify({
                "update": {
                    "description": [
                        {
                            "set": `${ticketDescription}
                                    Name: ${attendeeName}
                                    CU: ${cu},
                                    Phone: ${phone},
                                    Email: ${email},
                                    Prior Attendance?: ${priorAttendance}
                                    IP: (IP address of attendee)
                                    Notes: (Additional info provided in comments)
                                    ----`
                        }
                    ],
                    "comment": [
                        {
                            "add": {
                                "body": "This comment will hold additional info about the new attendee and it will tag a trainer to notify them of a new registration."
                            }
                        }
                    ]
                }
            })
        }).then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        }).catch(error => {
            console.error('Error:', error)
            reject();
        })
    });
}

app.get('/postTicket', async (req, res) => {
    console.log(req.body);
})



app.post('/postTicket', async (req, res) => {
    const attendeeName = req.body.attendeeName;
    const email = req.body.email;
    const phone = req.body.phone;
    const cu = req.body.cu;
    const classSelect = req.body.class;
    const priorAttendance = req.body.priorAttendance;

    await checkTicketExistence(classSelect).catch(err => console.error(err));

    if (ticketExistence === true || ticketExistence) {
        console.log("ticketttttt exists");
        // add comment and edit description to the ticket
        await updateTicket(classSelect, attendeeName, cu, phone, email, priorAttendance)
            .catch(err => console.error(err));
    } else {
        console.log("ticket does not exist");
        await sendTicket(classSelect, attendeeName, cu, phone, email, priorAttendance)
            .catch(err => console.error(err));
    }
})




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
