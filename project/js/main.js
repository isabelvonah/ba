const changeColor = (el) => {
    console.log(el);
    if (!el.classList.contains("taken")) {
        if (el.classList.contains("selected")) {
            el.classList.remove("selected");
        } else {
            el.classList.add("selected")
        }
    }
}


