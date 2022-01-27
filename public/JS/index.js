//variables that will start out hidden
const BJRTsection = $("#BJRT-section");
const AJRTsection = $("#AJRT-section");
const UISTsection = $("#UIST-section");
const BSTsection = $("#BST-section");
const SQLsection = $("#SQL-section");
const KSATsection = $("#KSAT-section");
const KBTsection = $("#KBT-section");
const FGUsection = $("#FGU-section");

const finalSection = $("#final-section");
//loader to display only when user has no class selected
const nextLoader = $("#next-loader");





// array of sections for manipulating their display
const sections = [BJRTsection,
    AJRTsection,
    UISTsection,
    finalSection,
    SQLsection,
    BSTsection,
    KSATsection,
    KBTsection,
    FGUsection
];

// let currentSectionSelection;
//function to look at whats selected and display the correct section based off that
function displaySection(selection, section, loader) {
    // if the selection.toString is equal to the sections class attribute
    if (selection.toString() === section.attr("class")) {
        section.show();
        loader.hide();
        let sectionTitle = $(".sectionTitle");
//change text of sectionTitle to be the name of the section
        sectionTitle.text(selection);

    } else if (selection.toString() === "select. . .") {
        section.hide();
        loader.show(); // if user changes, the display will change
    } else {
        section.hide();
    }
}
// todo: the above function needs help.. it works but need to differentiate the sections



$(() => {
    //disable the 'next' sections until the user has selected class
    // BJRTsection.hide();
    // AJRTsection.hide();
    // UISTsection.hide();
    // BSTsection.hide();
    sections.forEach(section => {
        section.hide()
    })
    //disable the final section until the user has finished the 'next' section
    //finalSection.hide();


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

    //BJRT variables
    const bjrtDateGroup = $("div#BJRT-select-group");
    let bjrtDateInput;
    // todo: implement arrays of elements to do stuff like below in forEach way.
    bjrtDateGroup.on("change", () => {
        bjrtDateInput = document.querySelector('input[name="oneAnswer"]:checked').value;
        console.log(bjrtDateInput);
    });


    // once classSelect is selected, enable the appropriate section to visible
    classSelect.on("change", () => {
        //display the section based on user-selected class:
        sections.forEach(section => {
            displaySection(classSelect.val(), section, nextLoader);
        })
    });



    questionForm.on("submit", (event) => {
        event.preventDefault();
        let classSelection = "";
        // this is to get the full title for the ticket-summary
        classSelection = `${classSelect.val()} : ${bjrtDateInput ? bjrtDateInput : "No Date Selected"}`;
        // console.log(classSelection); // debug
        if (personInfo.some(el => el.val() === "") || personInfo.some(el => el.val() === "select. . .")) {
            alert("please fill out all the required fields!")
        } else {
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "/postTicket",
                data: {
                    attendeeName: nameInput.val(),
                    email: emailInput.val(),
                    phone: phoneInput.val(),
                    cu: cuInput.val(),
                    class: classSelection,
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

