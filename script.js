// sorry for the ugly code :D

const attrButtons = document.getElementsByClassName('atributes');
const modal = document.getElementById("modal-backdrop");
const dragPill = document.querySelectorAll(".drag-pill.full");
const dragDestinations = document.querySelectorAll(".receive");

const closeModal = () => {
    modal.setAttribute("style", "display:none")
}

const showModal = () => {
    modal.setAttribute("style", " ")
}


// expand attibutes list
for (let i = 0; i < attrButtons.length; i++) {
    attrButtons[i].onclick = function() {
        let parent = this.parentElement;
        let counter = parent.previousElementSibling;
        let id = this.getAttribute("data-target");
        let section = document.getElementById(id);
        let svg = this.getElementsByClassName("icon");

        // check if clicked button is open or not
        if ( this.getAttribute("data-open")=="false") {
            checkForOpenStuff();
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

const checkForOpenStuff = () => {
        //search for open buttons
        let openBTN = document.querySelector("button[data-open='true']");
        let openList  = document.querySelector(".attr-list.open");
        let svg;
        let parent;
        let counter;

        if (openBTN !== null) {
            let svg = openBTN.getElementsByClassName("icon")[0];
            let parent = openBTN.parentElement;
            let counter = parent.previousElementSibling;
            openBTN.setAttribute("data-open", "false");
            parent.setAttribute("style", " ");
            counter.setAttribute("style", " ");
            svg.firstElementChild.setAttribute("xlink:href", "#caret");
            openList.classList.remove("open");
        } else {}
}
//-------------------------------------------------
//-------------------Drag stuff--------------------

const details = document.getElementsByClassName('details'); 
var getTag;
var getAttr;
var nested;

// drag functions
function dragStart(e) {
    let crt = this.cloneNode(true);
    crt.setAttribute("style", "position:absolute; transform: translateX(-10000px)");
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
    let activeAttr = document.querySelector('[data-attr="true"]').getElementsByTagName("code")[0].getAttribute("data-tag");

    getTag = 
        (this.parentElement.getAttribute("data-tag") !== null) 
        ? 
        this.parentElement.getAttribute("data-tag") : 
        activeAttr;

    nested = 
        (this.parentElement.getAttribute("data-tag") == null) 
        ?
        true :
        false;
    getAttr = this.getElementsByTagName("span")[0].innerHTML;

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
        clono.getElementsByClassName("tagsinfo")[0].innerHTML = getTag;
        clono.getElementsByClassName("local-attribute")[0].innerHTML = ` - ${getAttr}`;
        this.append(clono);
        clono.getElementsByClassName("tagsinfo");
        asd[0].classList.add("display-none"); 
        asd[0].setAttribute("data-view", "false");
  
    } else {}

    if (nested === false) {
        clono.getElementsByClassName("filter")[0].setAttribute("style", "display: none");
    } else {
        clono.getElementsByClassName("filter")[0].setAttribute("style", " ");
        modal.setAttribute("style", " ");
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

//---------------------------------------
//---------------------------------------



