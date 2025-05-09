
// add the date widget
let dateWidgetContainer = document.getElementById("date-widget-container");
createDateWidget(dateWidgetContainer);
/*
// Clock function
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);*/