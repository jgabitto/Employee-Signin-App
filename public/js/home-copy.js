const registerForm = document.getElementById('registerForm');
const navbar = document.getElementById('nav');
const date = document.getElementById('date');
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const email = document.getElementById("email");
const hoursWorked = document.getElementById("hoursWorked");
const editBtn = document.getElementById('edit');
const submitBtn = document.getElementById('submit');
const logOutBtn = document.getElementById('logout');
const message = document.getElementById('message');
const firstRow = document.getElementById('firstRow');
const secondRow = document.getElementById('secondRow');
const resultsDate = document.getElementById('1FF');
const resultsFName = document.getElementById('2FF');
const resultsLName = document.getElementById('3FF');
const resultsEmail = document.getElementById('4FF');
const resultsDateIn = document.getElementById('5FF')
const resultsDateOut = document.getElementById('6FF')
const resultsTimeIn = document.getElementById('7FF');
const resultsTimeOut = document.getElementById('8FF');
const resultsHoursWorked = document.getElementById('9FF');
const timeIn = document.getElementById('timeIn');
const timeOut = document.getElementById('timeOut');
const timeInFirefox = document.getElementById('timeInFirefox');
const timeOutFirefox = document.getElementById('timeOutFirefox');
const dateInH = document.getElementById('dateInH');
const dateOutH = document.getElementById('dateOutH');
const dateInI = document.getElementById('dateInI');
const dateOutI = document.getElementById('dateOutI');

function checkBrowser() {
    // Get the user-agent string 
    let userAgentString = navigator.userAgent;
    
    // Detect Firefox 
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

    if (firefoxAgent) {
        nav.style.width = "1490.0px";
    } else {
        nav.style.width = "1540.68px";
    }
}

checkBrowser();

logOutBtn.classList.remove('hideBtn');

// Edit button
editBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // // Get the user-agent string 
    // let userAgentString = navigator.userAgent;
    
    // // Detect Firefox 
    // let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

    submitBtn.classList.remove('hideBtn');
    thirdRow.classList.add('hideBtn');
    message.classList.add('hideBtn');
        
    if (firstRow.classList.contains('hideBtn'))
        firstRow.classList.remove('hideBtn');
    
    if (fName.readOnly) {
        date.removeAttribute('readonly');
        fName.removeAttribute('readonly');
        lName.removeAttribute('readonly');
        email.removeAttribute('readonly');
        timeIn.removeAttribute('readonly');
        timeOut.removeAttribute('readonly');
        submitBtn.classList.add('hideBtn');

        
        dateIn.removeAttribute('readonly');
        dateOut.removeAttribute('readonly');

        if (timeIn.readOnly) {
            timeIn.removeAttribute('readonly');
            timeOut.removeAttribute('readonly');
        }
    } else {
        date.setAttribute('readonly', true);
        fName.setAttribute('readonly', true);
        lName.setAttribute('readonly', true);
        email.setAttribute('readonly', true);
        timeIn.setAttribute('readonly', true);
        timeOut.setAttribute('readonly', true);
        submitBtn.classList.remove('hideBtn');

        
        dateIn.setAttribute('readonly', true);
        dateOut.setAttribute('readonly', true);
            
        if (!timeIn.readOnly) {
            timeIn.setAttribute('readonly', true);
            timeOut.setAttribute('readonly', true);
        }
    }
})
// Submit button
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // // Get the user-agent string 
    // let userAgentString = navigator.userAgent;
    
    // // Detect Firefox 
    // let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

    if (!fName.readOnly) {
        date.setAttribute('readonly', true);
        fName.setAttribute('readonly', true);
        lName.setAttribute('readonly', true);
        email.setAttribute('readonly', true);
        timeIn.setAttribute('readonly', true);
        timeOut.setAttribute('readonly', true);
        submitBtn.classList.remove('hideBtn');
    }

    let data = {};

    try {    

        let formData = new FormData(registerForm);

        const timeInSplit = calculateTime(timeIn);
        const timeOutSplit = calculateTime(timeOut);

        data = {
            'date': formData.get('dateIn'),
            'firstName': formData.get('fName'),
            'lastName': formData.get('lName'),
            'email': formData.get('email'),
            'dateIn': formData.get('dateIn'),
            'timeIn': `${timeInSplit[0]}:${timeInSplit[1]}`,
            'timeOut': `${timeOutSplit[0]}:${timeOutSplit[1]}`,
            'hoursWorked': formData.get('hoursWorked')
        }; 
        
        const res = await fetch('/record', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        
        const json = await res.json();
        
        message.classList.remove('hideBtn');
        message.innerHTML = json.message;
        
        if (json.status === 'Success') {
                firstRow.classList.add('hideBtn');
                thirdRow.classList.remove('hideBtn');

                resultsDate.innerHTML = json.data.date;
                resultsFName.innerHTML = json.data.firstName;
                resultsLName.innerHTML = json.data.lastName;
                resultsEmail.innerHTML = json.data.email;
                resultsDateIn.innerHTML = json.data.dateIn;
                resultsDateOut.innerHTML = json.data.dateIn;
                resultsTimeIn.innerHTML = json.data.timeIn;
                resultsTimeOut.innerHTML = json.data.timeOut;
                resultsHoursWorked.innerHTML = json.data.hoursWorked;
        }
    } catch (e) {
        message.classList.remove('hideBtn');
        message.innerHTML = e.message;
    }
})
// Difference between timeIn and timeOut
function diffTime(timeEle1, timeEle2) {
    const diffHours = timeEle2 - timeEle1;

    return diffHours;
}
// timeIn changes to timeOut
timeIn.addEventListener('change', () => {
    const element = calculateTime(timeIn);
    const month = element[1];

    nextDay = ((parseInt(element[2]) + 1).toString()).padStart(2, '0');

    timeOut.setAttribute("min", `${element[0]}-${element[1]}-${element[2]}T${element[3]}:${element[4]}`);
    timeOut.setAttribute("max", `${element[0]}-${element[1]}-${nextDay}T00:00`);
})


dateIn.addEventListener('change', () => {
    const element = calculateDate(dateIn);
    const years = element[0];
    const months = element[1];
    const days = element[2];

    timeIn.removeAttribute('readOnly');

    nextDay = ((parseInt(element[2]) + 1).toString()).padStart(2, '0');

    
        dateOut.setAttribute("min", `${years}-${months}-${days}`);
        dateOut.setAttribute("max", `${years}-${months}-${days}`);
     
})

dateOut.addEventListener('change', () => {
    const element = calculateDate(dateOut);
    const years = element[0];
    const months = element[1];
    const days = element[2];
    timeOut.removeAttribute('readOnly');

   
        dateIn.setAttribute("min", `${years}-${months}-${days}`);
        dateIn.setAttribute("max", `${years}-${months}-${days}`);
     
})

timeIn.addEventListener('change', () => {
    const element = calculateTime(timeIn);
    const hours = element[0];
    const minutes = element[1];

    timeOut.setAttribute("min", `${element[0]}:${element[1]}`);
    timeOut.setAttribute("max", `T00:00`);

    if (timeIn.value && timeOut.value) {
        calculateHoursWorkedFirefox();
    } else {
        hoursWorked.value = '';
    }
})

timeOut.addEventListener('change', () => {
   if (timeIn.value && timeOut.value) {
       calculateHoursWorkedFirefox();
   } else {
       hoursWorked.value = '';
   }
})

function calculateHoursWorkedFirefox() {
    const start = calculateTime(timeIn);
    const end = calculateTime(timeOut);
    // const daySplitTimeIn = calculateDateFirefox(dateIn);
    // const daySplitTimeOut = calculateDateFirefox(dateOut);
    // const nextDayTimeIn = daySplitTimeIn[2];
    // const nextDayTimeOut = daySplitTimeOut[2];
    let startHours = start[0];
    let startMinutes = start[1];
    let endHours = end[0];
    let endMinutes = end[1];
    let diffTime;

    // Start Hours
    if (startHours[0] == 0) {
        startHours = parseInt(startHours[1], 10);
    } else {
        startHours = parseInt(startHours, 10);
    }
    // End Hours
    if (endHours[0] == 0) {
        endHours = parseInt(endHours[1], 10);
    } else {
        endHours = parseInt(endHours, 10);
    }
    // Start minutes
    if (startMinutes[0] == 0) {
        startMinutes = parseInt(startMinutes[1], 10);
    } else {
        startMinutes = parseInt(startMinutes, 10);
    }
    // End minutes
    if (endMinutes[0] == 0) {
        endMinutes = parseInt(endMinutes[1], 10);
    } else {
        endMinutes = parseInt(endMinutes, 10);
    }

    // // Convert Military time to regular time
    // if (startHours > 12) {
    //     meridian = 'PM';
    //     startHours -= 12;
    // } else if (startHours < 12) {
    //     meridian = 'AM';
    //     // if (startHours == 0) {
    //     //     startHours = 12;
    //     // }
    // } else {
    //     meridian = 'PM';
    // }
    
    // // Convert Military time to regular time
    // if (endHours > 12) {
    //     meridian = 'PM';
    //     endHours -= 12;
    // } else if (endHours < 12) {
    //     meridian = 'AM';
    //     // if (endHours == 0) {
    //     //     endHours = 12;
    //     // }
    // } else {
    //     meridian = 'PM';
    // }

    startHours = startHours * 60 + startMinutes;
    endHours = endHours * 60 + endMinutes;

    if (startHours < endHours) {
        diffTime = endHours - startHours;

        if (diffTime > 59) {
            diffTime = (parseInt(diffTime/60) + (diffTime % 60)/100).toFixed(2);
        } else {
            diffTime = (diffTime / 100).toFixed(2);
        }
    
        hoursWorked.value = diffTime;
    } else {
        hoursWorked.value = '';
    }

    // if (nextDayTimeOut == nextDayTimeIn) {
        
    // } 
    // else {
    //     startHours = startHours * 60 + startMinutes;
    //     endHours = endHours * 60 + (24 * 60) + endMinutes;

    //     if (startHours < endHours) {
    //         diffTime = endHours - startHours;

    //         if (diffTime > 59) {
    //             diffTime = (parseInt(diffTime/60) + (diffTime % 60)/100).toFixed(2);
    //         } else {
    //             diffTime = (diffTime / 100).toFixed(2);
    //         }
    
    //         hoursWorked.value = diffTime;
    //     } else {
    //         hoursWorked.value = '';
    //     }
    // }
}

function calculateDate(dateEle) {
    let dateSplit = dateEle.value.split('-');

    years = dateSplit[0];
    months = dateSplit[1];
    days = dateSplit[2];

    dateSplit = [years, months, days];

    return dateSplit;
}

function calculateTime(timeEle) {
    let timeSplit = timeEle.value.split(':');

    hours = timeSplit[0];
    minutes = timeSplit[1];

    timeSplit = [hours, minutes];

    return timeSplit;
}
