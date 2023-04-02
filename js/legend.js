const addLegendText = (div, text) => {
    div.innerHTML += text;
}

const addLegendRow = (seatId, seatClass, text) => {

    let seat = document.createElement("div");
    seat.setAttribute("id", seatId);
    seat.classList.add("seat");
    seat.classList.add(seatClass);

    let row = document.createElement("div");
    row.classList.add("legendRow");
    row.appendChild(seat);
    row.innerHTML += text;

    let legend = document.getElementById("legend");
    legend.appendChild(row);
}

const addLegend = () => {

    addLegendRow("legend-category-A", "category-A", "Kategorie A");
    addLegendRow("legend-category-B", "category-B", "Kategorie B");
    addLegendRow("legend-taken", "taken", "besetzt");
    addLegendRow("legend-selected", "selected", "ausgewählt");

}

export { addLegend };