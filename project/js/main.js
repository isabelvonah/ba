// supporting functions

const uploadCsv = (data, filename) => {
    const csvData = data;
    const csvFilename = filename;

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
    document.getElementById("summaryOverlay").classList.remove("hidden");

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

    let data = userId + ", " + age + ", " + gender + ", " + mouse_touchpad;

    console.log(data);

    uploadCsv(data, userId + "_info");

    
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

const finishTask = (filename) => {

    // timeout so that the last clickevent is logged into the csv
    setTimeout(function() {
        uploadCsv(data, filename);
        document.getElementById("summaryOverlay").classList.remove("hidden");
      }, 10);
    

}

// abstract tasks

const changeColor = (el) => {

    if (document.getElementsByClassName("selected").length > 0) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }

    el.classList.add("selected");

}

