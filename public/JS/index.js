//main functions for the index page

$(() => {

    console.log("sanity check")

    // get references to our form and inputs
    const questionForm = $("form.questionForm");
    const nameInput = $("input#name-input");
    const emailInput = $("input#email-input");
    const phoneInput = $("input#phone-input");
    const cuInput = $("input#cu-input");
    const classSelect = $("select#class-select");
    const priorAttendance = $("input#priorAttendance-select");

    const personInfo = [nameInput, emailInput, phoneInput, cuInput, classSelect];

    // let dataObj;
    //on submit of form
    // questionForm.on("submit", function (event) {
    //     //prevent the default behavior of the form
    //     event.preventDefault();
    //     // get the value of the selected
    //     // const selectedClass = classSelect.val();
    //     console.log(classSelect.val());

    //     // if (nameInput.val() != "") {
    //     // if any of the elements from personINfo are empty, alert the user
    //     if (personInfo.some(el => el.val() === "") || personInfo.some(el => el.val() === "select. . .")) {
    //         //run the function
    //         alert("please fill out all the required fields!")
    //     } else {
    //         // dataObj = {
    //         //     "fields": {
    //         //         "project":
    //         //         {
    //         //             "key": "VCRT"
    //         //         },
    //         //         "summary": `${nameInput.val()} -- ${classSelect.val()}`,
    //         //         "description": `CU: ${cuInput.val()}}, Phone: ${phoneInput.val()}, Email: ${emailInput.val()}`,
    //         //         "issuetype": {
    //         //             "name": "Basic Functionality"
    //         //         }
    //         //     }
    //         // }

    //         // personInfo.forEach(el => sendData(el.val()));
    //         $.ajax
    //             ({
    //                 ReferrerPolicy: 'no-referrer',
    //                 type: "POST",
    //                 contentType: "application/json",
    //                 url: "/api",
    //                 data: {
    //                     "name": "shelby",
    //                     "email": "Some Email"
    //                 },
    //                 success: () => {
    //                     console.log('Sent to server-side');
    //                 }
    //             });
    //         // use fetch to send form data to /api
    //         // fetch.ReferrerPolicy = 'no-referrer';
    //         //             fetch('/api', {
    //         //                 method: 'POST',
    //         //                 headers: {
    //         //                     'Content-Type': 'application/json'
    //         //                 },
    //         //                 data: {
    //         //                     'name': nameInput.val(),
    //         //                     'email': emailInput.val(),
    //         //                     'phone': phoneInput.val(),
    //         //                     'cu': cuInput.val(),
    //         //                     'class': classSelect.val(),
    //         //                     'priorAttendance': priorAttendance.val()
    //         //                 },
    //         //                 // ReferrerPolicy: "strict-origin-when-cross-origin",
    //         //             }).then(response => {
    //         //                 console.log(response);
    //         //             }).catch(error => console.error('Error:', error))


    //     }
    // });

    questionForm.on("submit", function (event) {
        event.preventDefault();
                    $.ajax
                ({
                    Headers: { 'ReferrerPolicy': 'Access-Control-Allow-Origin' },
                    type: "POST",
                    contentType: "application/json",
                    url: "/postTicket",
                    data: {
                        "name": "shelby",
                        "email": "Some Email"
                    },
                    success: () => {
                        console.log('Sent to server-side');
                    }
                });
    })


});

