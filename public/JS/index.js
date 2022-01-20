//main functions for the index page

//variables that will start out hidden
const BJRTsection = $("#BJRT-section");
const BJRTloader = $("#BJRT-loader");

$(() => {

    console.log("sanity check")

    //disable the next section until the user has selected class


    // get references to our form and inputs
    const questionForm = $("form.questionForm");
    const nameInput = $("input#name-input");
    const emailInput = $("input#email-input");
    const phoneInput = $("input#phone-input");
    //! do not set it = to the value here bc that will set is as the empty value bc its onLoad
    const cuInput = $("input#cu-input");
    const classSelect = $("select#class-select");
    const priorAttendance = $("select#priorAttendance-select");
    //this info is *required* and the user cannot continue without filling them out
    const personInfo = [nameInput, emailInput, phoneInput, cuInput, classSelect, priorAttendance];

    //supervisor info
    const supervisorNameInput = $("input#supervisor-name-input");
    const supervisorEmailInput = $("input#supervisor-email-input");
    const supervisorPhoneInput = $("input#supervisor-phone-input");
    // const supervisorInfo = [supervisorNameInput, supervisorEmailInput, supervisorPhoneInput];

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
                    priorAttendance: priorAttendance.val(),
                    supervisorName: supervisorNameInput.val() === "" ? "none provided" : supervisorNameInput.val(),
                    supervisorEmail: supervisorEmailInput.val() === "" ? "none provided" : supervisorEmailInput.val(),
                    supervisorPhone: supervisorPhoneInput.val() === "" ? "none provided" : supervisorPhoneInput.val()
                },
                success: () => {
                    console.log('Sent to server-side');
                }
            });
        }
    })


});

