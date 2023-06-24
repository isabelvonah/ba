const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const uuidParam = urlParams.get('id');
const sortingOption = urlParams.get('sorting');
let taskNr = Number(urlParams.get('nr'));
taskNr++;

let url = "http://127.0.0.1:5500/project/pages/"

// task sorting

let sorting1 = ["A1.html", "A2.html", "A3.html", "A4.html", "A5.html", 
                "06.html", "07.html", "08.html", "09.html", "10.html", 
                "11.html", "12.html", "13.html", "14.html", "15.html", "thanks.html"];

let sorting2 = ["A1.html", "A2.html", "A3.html", "A4.html", "A5.html", 
                "06.html", "07.html", "08.html", "09.html", "10.html", 
                "11.html", "12.html", "13.html", "14.html", "15.html", "thanks.html"];

let sorting3 = ["A1.html", "A2.html", "A3.html", "A4.html", "A5.html", 
                "06.html", "07.html", "08.html", "09.html", "10.html", 
                "11.html", "12.html", "13.html", "14.html", "15.html", "thanks.html"];

// supporting functions

const uploadCsv = (data, filename) => {
    const csvData = data;
    const csvFilename = filename + "_" + new Date().getTime();

    const csvBlob = new Blob([csvData], { type: 'text/csv' });

    const formData = new FormData();
    formData.append('csvFile', csvBlob, csvFilename);

    fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const uuid = function () {
	let a, c, d;
	let time = Math.round(new Date().getTime() / 1000);
	let href = window.location.href;
	
	// a - unix timestamp
	a = time.toString(16).substring(0, 8);

	// c - url
	c = (href.length * href.length * href.length).toString(16).substring(0, 4);

	// d - random
	d = Math.random().toString().substring(2);
	d = parseInt(d, 10);
	d = d.toString(16).substring(0, 12);

	return [a, c, d].join('');
};

// landing page

const startStudy = () => {

    let userId = uuid();

    let age = document.getElementById("alter").value;

    let gender = "";
    if (document.getElementById("male").checked) {
        gender = "male";
    } else if (document.getElementById("female").checked) {
        gender = "female";
    } else {
        gender = "other";
    }

    let mouse_touchpad = "";
    if (document.getElementById("mouse").checked) {
        mouse_touchpad = "mouse";
    } else {
        mouse_touchpad = "touchpad";
    }

    let randomNumber = Math.floor(Math.random() * 3) + 1;
    let data = userId + ", " + age + ", " + gender + ", " + mouse_touchpad + ", " + randomNumber;

    uploadCsv(data, userId + "_info");

    if(randomNumber == 1) {
        window.location.href = url + sorting1[0] + "?id=" + userId + "&nr=0" + "&sorting=" + randomNumber;
    } else if (randomNumber == 2) {
        window.location.href = url + sorting2[0] + "?id=" + userId + "&nr=0" + "&sorting=" + randomNumber;
    } else if (randomNumber == 3) {
        window.location.href = url + sorting3[0] + "?id=" + userId + "&nr=0" + "&sorting=" + randomNumber;
    }
    

    
}

// tracking task

let data = '';

const startTracking = () => {
    let startTime = new Date().getTime(); 

    document.addEventListener('mousemove', function(event) {
      const currentTime = new Date().getTime(); 
      const elapsedTime = currentTime - startTime; 

      data += `p, ${event.clientX}, ${event.clientY}, ${elapsedTime}\n`;
    });

    document.addEventListener('click', function(event) {
        const currentTime = new Date().getTime(); 
        const elapsedTime = currentTime - startTime;

        data += `c, ${event.clientX}, ${event.clientY}, ${elapsedTime}\n`;
    });
};

const startTask = () => {

    document.getElementById("introductionOverlay").classList.add("hidden");
    startTracking();

}

const finishTask = () => {

    // timeout so that the last clickevent is logged into the csv
    setTimeout(function() {
        uploadCsv(data, uuidParam + "_" + taskNr + "_" + sorting1[taskNr-1] + "_" + sortingOption);
        document.getElementById("summaryOverlay").classList.remove("hidden");
      }, 10);

    if(sortingOption == 1) {
        window.location.href = url + sorting1[taskNr] + "?id=" + uuidParam + "&nr=" + taskNr.toString() + "&sorting=" + sortingOption;
    } else if (sortingOption == 2) {
        window.location.href = url + sorting2[taskNr] + "?id=" + uuidParam + "&nr=" + taskNr.toString() + "&sorting=" + sortingOption;
    } else if (sortingOption == 3) {
        window.location.href = url + sorting3[taskNr] + "?id=" + uuidParam + "&nr=" + taskNr.toString() + "&sorting=" + sortingOption;
    }

}

// abstract tasks

const changeColor = (el) => {

    if (document.getElementsByClassName("selected").length > 0) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }

    el.classList.add("selected");

}

// ui tasks

const selectCard = (el) => {

    if (document.getElementsByClassName("cardSelected").length > 0) {
        document.getElementsByClassName("cardSelected")[0].classList.remove("cardSelected");
    }

    el.classList.add("cardSelected");

}
