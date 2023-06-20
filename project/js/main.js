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
    let uuid = uuid();

    let age = document.getElementById("alter");
    let gender = document.getElementById("gender");
    let mouse_touchpad = document.getElementById("mouse_touchp");

    data = age + gender + mouse_touchpad;

    uploadCsv(data, uuid + "_info");
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
        document.getElementById("summaryOverlay").classList.remove("hidden");
        uploadCsv(data, filename);
      }, 10);
    

}

// abstract tasks

const changeColor = (el) => {

    if (document.getElementsByClassName("selected").length > 0) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }

    el.classList.add("selected");

}

