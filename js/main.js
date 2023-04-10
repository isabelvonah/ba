import { setting1, setting2 } from "./settings.js";
import { addSeatSetting, changeColor } from "./seats.js";
import { addLegend } from "./legend.js";


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

export const startTracking = () => {
    addSeatSetting(setting1);
    addLegend();
    trackMousePosition();
    trackMouseClicks();
}

const stopTracking = () => {
    untrackMousePosition();
    untrackMouseClicks();
}

//eventListeners / previously: onclick-functions
document.querySelector("#start-button").addEventListener("click", startTracking);
document.querySelector("#stop-button").addEventListener("click", stopTracking);
//querySelector with class doesnt work so far...
//document.querySelector(".seat").addEventListener("click", changeColor);
