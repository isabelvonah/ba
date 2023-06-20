console.log("puk");

const changeColor = (el) => {

    if (document.getElementsByClassName("selected").length > 0) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }

    el.classList.add("selected");

}

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

const finishTask = (filename) => {

    // timeout so that the last clickevent is logged into the csv
    setTimeout(function() {
        document.getElementById("summaryOverlay").classList.remove("hidden");
        uploadCsv(data, filename);
      }, 10);
    

}

