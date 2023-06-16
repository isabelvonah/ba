const changeColor = (el) => {

    if (document.getElementsByClassName("selected").length > 0) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }

    el.classList.add("selected");

}

const finishTask = () => {

    document.getElementById("summaryOverlay").classList.remove("hidden")

}

