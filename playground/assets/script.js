const addSeat = () => {

    let rows = document.getElementsByClassName("row");
    let row = rows[rows.length -1];

    let seat = document.createElement("div");
    seat.classList.add("seat");
    seat.setAttribute("onclick", "changeColor(this);");

    row.appendChild(seat);
}

const addLineOfSeats = (num) => {

    let rows = document.getElementsByClassName("rows")[0];

    let row = document.createElement("div");
    row.classList.add("row");

    rows.appendChild(row);

    for (let i = 0; i<num; i++) {
        addSeat();
    };
}

const addSeatBlock = (seats, rows) => {

    for (let i=0; i<rows; i++) {
        addLineOfSeats(seats);
    }

}

const changeColor = (el) => {
    if (el.classList.contains("selected")) {
        el.classList.remove("selected");
    } else {
        el.classList.add("selected")
    }
    
}