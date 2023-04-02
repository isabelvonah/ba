const addSeat = (id, category, taken) => {

    let rows = document.getElementsByClassName("row");
    let row = rows[rows.length -1];

    let seat = document.createElement("div");
    seat.setAttribute("id", id);
    seat.classList.add("seat");
    seat.classList.add("category-" + category);
    if(taken) {seat.classList.add("taken")};
    //seat.setAttribute("onclick", "changeColor(this);");
    //seat.addEventListener("click", changeColor);

    row.appendChild(seat);
}

const addSeatSetting = (setting) => {

    let seatsAdded = 0;
    let rows = document.getElementById("rows");

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
    console.log(el);
    if (!el.classList.contains("taken")) {
        if (el.classList.contains("selected")) {
            el.classList.remove("selected");
        } else {
            el.classList.add("selected")
        }
    }
    updateCounter();
    
}

export {addSeatSetting, changeColor};