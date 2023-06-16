const changeColor = (el) => {

    if (document.getElementsByClassName("selected").length > 0) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }

    el.classList.add("selected");

}

const startTask = () => {

    document.getElementById("introductionOverlay").classList.add("hidden")

}

const finishTask = () => {

    document.getElementById("summaryOverlay").classList.remove("hidden")

}

