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

const downloadTextFile = (text, filename) => {
    // Create a Blob object from the text content
    const blob = new Blob([text], { type: 'text/plain' });
  
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename + ".csv";
  
    // Append the anchor element to the document body and trigger the download
    document.body.appendChild(a);
    a.click();
  
    // Clean up the temporary anchor element
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

const finishTask = (filename) => {

    document.getElementById("summaryOverlay").classList.remove("hidden");
    downloadTextFile(data, filename);

}

