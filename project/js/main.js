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
  
    //document.querySelector("#start-button").addEventListener("click", startTracking);
    //document.querySelector("#stop-button").addEventListener("click", stopTracking);
  }

  document.querySelector("#start-view-button").addEventListener("click", changeToTicketView);