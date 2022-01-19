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
    const priorAttendance = $("select#priorAttendance-select");

    const personInfo = [nameInput, emailInput, phoneInput, cuInput, classSelect, priorAttendance];


    questionForm.on("submit", function (event) {
        event.preventDefault();
        if (personInfo.some(el => el.val() === "") || personInfo.some(el => el.val() === "select. . .")) {
            alert("please fill out all the required fields!")
        } else {
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "/postTicket",
                data: {
                    name: nameInput.val(),
                    email: emailInput.val(),
                    phone: phoneInput.val(),
                    cu: cuInput.val(),
                    class: classSelect.val(),
                    priorAttendance: priorAttendance.val()
                },
                success: () => {
                    console.log('Sent to server-side');
                }
            });
        }
    })


});

