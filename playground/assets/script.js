let style1 = {};
let style2 = {};
let style3 = {};

let setting1 = [
    {"id": "1-1", "category": "A", "taken": false},
    {"id": "1-2", "category": "A", "taken": false},
    {"id": "1-3", "category": "A", "taken": false},
    {"id": "1-4", "category": "A", "taken": false},
    {"id": "1-5", "category": "A", "taken": false},
    {"id": "1-6", "category": "A", "taken": false},
    {"id": "2-1", "category": "A", "taken": false},
    {"id": "2-2", "category": "A", "taken": false},
    {"id": "2-3", "category": "A", "taken": true},
    {"id": "2-4", "category": "A", "taken": true},
    {"id": "2-5", "category": "A", "taken": true},
    {"id": "2-6", "category": "A", "taken": true},
    {"id": "3-1", "category": "A", "taken": false},
    {"id": "3-2", "category": "A", "taken": false},
    {"id": "3-3", "category": "A", "taken": true},
    {"id": "3-4", "category": "A", "taken": false},
    {"id": "3-5", "category": "A", "taken": false},
    {"id": "3-6", "category": "A", "taken": false},
    {"id": "4-1", "category": "B", "taken": false},
    {"id": "4-2", "category": "B", "taken": false},
    {"id": "4-3", "category": "B", "taken": false},
    {"id": "4-4", "category": "B", "taken": false},
    {"id": "4-5", "category": "B", "taken": false},
    {"id": "4-6", "category": "B", "taken": false},
    {"id": "5-1", "category": "B", "taken": false},
    {"id": "5-2", "category": "B", "taken": false},
    {"id": "5-3", "category": "B", "taken": false},
    {"id": "5-4", "category": "B", "taken": false},
    {"id": "5-5", "category": "B", "taken": false},
    {"id": "5-6", "category": "B", "taken": false},
];

let setting2 = {};
let setting3 = {};
let setting4 = {};
let setting5 = {};

const addSeat = (id, category, taken) => {

    let rows = document.getElementsByClassName("row");
    let row = rows[rows.length -1];

    let seat = document.createElement("div");
    seat.setAttribute("id", id);
    seat.classList.add("seat");
    seat.classList.add("category-" + category);
    if(taken) {seat.classList.add("taken")};
    seat.setAttribute("onclick", "changeColor(this);");

    row.appendChild(seat);
}

const addSeatSetting = (setting) => {

    let seatsAdded = 0;
    let rows = document.getElementsByClassName("rows")[0];

    let setting_rows = setting[setting.length -1].id.split("-")[0];
    let setting_seats = setting[setting.length -1].id.split("-")[1];

    for (let i=0; i<setting_rows; i++) {
        for (let j=0; j<setting_seats; j++) {
            let currentSeat = setting[seatsAdded];
            addSeat(currentSeat.id, currentSeat.category, currentSeat.taken);
            seatsAdded++;
        }
        let row = document.createElement("div");
        row.classList.add("row");
        rows.appendChild(row);
    }

}

const updateCounter = () => {

    let selectedSeats = document.getElementsByClassName("selected");
    let counter = document.getElementById("counter");

    counter.innerHTML = "ausgewählte Plätze: <br>";

    for (let i=0; i<selectedSeats.length; i++) {
        
        counter.innerHTML += selectedSeats[i].id + "<br>";
    }
}

const changeColor = (el) => {
    if (!el.classList.contains("taken")) {
        if (el.classList.contains("selected")) {
            el.classList.remove("selected");
        } else {
            el.classList.add("selected")
        }
    }
    updateCounter();
    
}


  
const trackMousePosition = () => {
document.addEventListener('mousemove', function(event) {
    console.log('Mouse position:', event.clientX, event.clientY, new Date().getTime());
});
}

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
  }

const untrackMousePosition = () => {
    document.removeEventListener('mousemove', trackMousePosition);
    console.log("asdöfkjas");
}

const trackMouseClicks = () => {
document.addEventListener('click', function(event) {
    console.log('Clicked:', event.clientX, event.clientY, new Date().getTime());
});
}

const untrackMouseClicks = () => {
    document.removeEventListener('click', trackMouseClicks);
    console.log("öasdföasdkljf");
}

const startTracking = () => {
    addSeatSetting(setting1);
    trackMousePosition();
    trackMouseClicks();
}

const stopTracking = () => {
    untrackMousePosition();
    untrackMouseClicks();
}