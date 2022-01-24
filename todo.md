- add confirmation for user before submitting the form
- for the ticket:
    title holds the full class + date
    the description holds sections with each attendee and their basic info
        seperated by a ----
    the comments hold additional information for each attendee ( additonal info, "none" if left blank)

function: if it exists
    make call to jira to see if project has an issue already with a specific summary
if not
    create the ticket with that summary
if yes
    return and do the rest of the logic


perhaps put all answers to the OPTIONAL questions on to a pdf (like tt-173) and attach that to the ticket?

put similar items into array for manipulation of them


