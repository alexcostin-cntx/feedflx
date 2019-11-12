const attrButtons = document.getElementsByClassName('atributes');

const dragPill = document.querySelectorAll(".drag-pill.full");
const dragDestinations = document.querySelectorAll(".receive");

// expand attibutes list
for (let i = 0; i < attrButtons.length; i++) {
    attrButtons[i].onclick = function() {
        let parent = this.parentElement;
        let counter = parent.previousElementSibling;
        let id = this.getAttribute("data-target");
        let section = document.getElementById(id);
        let svg = this.getElementsByClassName("icon");
        
        if ( this.getAttribute("data-open")=="false") {
            this.setAttribute("data-open", "true")
            section.setAttribute("style", "display:initial");
            parent.setAttribute("style", "z-index:4");
            counter.setAttribute("style", "z-index:4");
            setTimeout(function(){ section.classList.add("open"); }, 0);
            svg[0].firstElementChild.setAttribute("xlink:href", "#close");
        } else {
            this.setAttribute("data-open", "false");
            section.setAttribute("style", " ");
            parent.setAttribute("style", " ");
            counter.setAttribute("style", " ");
            section.classList.remove("open");
            svg[0].firstElementChild.setAttribute("xlink:href", "#caret");
        }
    }
}

const details = document.getElementsByClassName('details');
// drag functions
function dragStart(e) {
    var crt = this.cloneNode(true);
    crt.setAttribute("style", "position:absolute; transform: translateX(-10000px)");
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
}

function dragEnd() {
    this.classList.remove("dragging");
}

function dragOver(e) {
    console.log("over");
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    let asd = this.getElementsByClassName("empty");
    asd[0].classList.add("hovered");
}

function dragLeave() {
    let asd = this.getElementsByClassName("empty");
    asd[0].classList.remove("hovered");
}

function dragDrop() {
    let clono = details[0].cloneNode(true);
    let nextCell = this.nextElementSibling;
    let btn = nextCell.firstElementChild;
    let asd = this.getElementsByClassName("empty");

    if ( asd[0].getAttribute("data-view") == "true") {
        btn.setAttribute("style", "display:flex");
        this.append(clono);
        asd[0].classList.add("display-none"); 
        asd[0].setAttribute("data-view", "false");
    } else {
        
    }
}

// drag pill listeners
for (let i = 0; i < dragPill.length; i++) {
    dragPill[i].addEventListener("dragstart", dragStart);
    dragPill[i].addEventListener("dragend", dragEnd);
}

for(destination of dragDestinations) {
    destination.addEventListener("dragover", dragOver);
    destination.addEventListener("dragenter", dragEnter);
    destination.addEventListener("dragleave", dragLeave);
    destination.addEventListener("drop", dragDrop);
}


