import { setting1, setting2 } from "./settings.js";
import { addSeatSetting, changeColor } from "./seats.js";
import { addLegend } from "./legend.js";

const changeToStartView = () => {
  document.body.innerHTML = `

  <div id='start-view'>
    <button id='start-view-button'>Start</button>
  </div>

  `;
  document.querySelector("#start-view-button").addEventListener("click", changeToTicketView);
}

const changeToTicketView = () => {

  let probNr = document.getElementById("probNr").value;

  document.body.innerHTML = `

  <input id="probNr" class="hidden" value="`+ probNr.toString() + `"></input>

  <!-- Konzertsaal -->
  <div id="plan">
      <div id="stage">Bühne</div>
      <div id="rows">
          <div class="row"></div>
      </div>
  </div>
  
  <!-- Beschreibung -->
  <div id="textDiv" >

      <div id="legend"></div>

      <div id="counter">
          ausgewählte Plätze:<br>
      </div>

      <button id="start-button">Start</button> 
      <button id="stop-button">Stop</button> 
  </div> 
  
  `;

  document.querySelector("#start-button").addEventListener("click", startTracking);
  document.querySelector("#stop-button").addEventListener("click", stopTracking);
}


const trackMousePosition = () => {
    document.addEventListener('mousemove', function(event) {
      console.log('Mouse position:', event.clientX, event.clientY, new Date().getTime());
    });
  };

/*
const trackMousePositionWithDownload = () => {
    let data = '';
    document.addEventListener('mousemove', function(event) {
      data += `Mouse position: ${event.clientX}, ${event.clientY}, ${new Date().getTime()}\n`;
    });
    
    // Add a button to download the result into a file
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Result';
    downloadButton.addEventListener('click', () => {
      const blob = new Blob([data], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mouse_positions.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
    document.body.appendChild(downloadButton);
  } */

const untrackMousePosition = () => {
    document.removeEventListener('mousemove', trackMousePosition);
}

const trackMouseClicks = () => {
document.addEventListener('click', function(event) {
    console.log('Clicked:', event.clientX, event.clientY, new Date().getTime());
});
}

const untrackMouseClicks = () => {
    document.removeEventListener('click', trackMouseClicks);
}

const startTracking = () => {
    let probNr = document.getElementById("probNr").value;

    if(probNr == 1) {
      addSeatSetting(setting1);
    } else {
      addSeatSetting(setting2)
    }
    //addSeatSetting(setting1);
    addLegend();
    trackMousePosition();
    trackMouseClicks();
}

const stopTracking = () => {
    changeToStartView();
    untrackMousePosition();
    untrackMouseClicks();
}

//eventListeners / previously: onclick-functions
document.querySelector("#start-view-button").addEventListener("click", changeToTicketView);
//querySelector with class doesnt work so far...
//document.querySelector(".seat").addEventListener("click", changeColor);
