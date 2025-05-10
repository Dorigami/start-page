function createBGWidget(root){
    // make the input
    let input = document.createElement('input');
    input.setAttribute("id", "bg-widget-input");
    input.setAttribute("type", "file");
    input.className = 'bg-widget-input';
    input.style.display = "none";
    // make the button
    let button = document.getElementById("bg-widget-btn");
    button.setAttribute("style", "");

    // add onchange to update the image
    input.onchange = bgUpdate;
    button.onclick = () => input.click(); 
    // append the elements
    root.appendChild(input);
    root.appendChild(button);
    // check local storage for an image, and set it if possible
    var bgFile = localStorage.getItem('bgFile');
    if(bgFile){
        document.body.style.backgroundImage = bgFile;
        document.body.style.backgroundSize = "cover";
    }
}

// background update function
function bgUpdate(){
    console.log("input change: " + this);
    //console.log("event: " + e);
    var file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("bgFile", `url(${e.target.result})`);
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = "cover";
        };
        reader.readAsDataURL(file);
    }
}