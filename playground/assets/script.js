let layout1 = {};
let layout2 = {};
let layout3 = {};

let setting1 = {};
let setting2 = {};
let setting3 = {};
let setting4 = {};
let setting5 = {};

const addSeat = (seatId) => {

    let rows = document.getElementsByClassName("row");
    let row = rows[rows.length -1];

    let seat = document.createElement("div");
    seat.classList.add("seat");
    seat.setAttribute("id", seatId)
    seat.setAttribute("onclick", "changeColor(this);");

    row.appendChild(seat);
}

const addLineOfSeats = (num, double=false) => {

    let rows = document.getElementsByClassName("rows")[0];

    let row = document.createElement("div");
    let rowNumber = (document.getElementsByClassName("row").length + 1).toString();
    row.setAttribute("id", rowNumber);
    row.classList.add("row");

    rows.appendChild(row);

    for (let i = 0; i<num; i++) {
        addSeat(rowNumber + "-" + (i+1).toString());
    };

    if (double) {

        let seats = document.getElementsByClassName("seat");
        let lastSeat = seats[seats.length -1];
        lastSeat.classList.add("marginRight");

        for (let i = 0; i<num; i++) {
            addSeat(rowNumber + "-" + (i+1+num).toString());
        };
    }
}

const addSeatBlock = (seats, rows, double=false) => {

    for (let i=0; i<rows; i++) {
        addLineOfSeats(seats, double);
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
    if (el.classList.contains("selected")) {
        el.classList.remove("selected");
    } else {
        el.classList.add("selected")
    }

    updateCounter();
    
}