function createDateWidget(root){
    // make the date portion
    var dateWig = document.createElement('div');
    dateWig.setAttribute("id", "date-widget");
    dateWig.className = 'date-widget';
    // make the clock portion
    var clockWig = document.createElement('div');
    clockWig.setAttribute("id", "clock-widget");
    clockWig.className = 'clock-widget text-left';
    clockWig.textContent = "00:00:00";
    // append the elements
    root.appendChild(dateWig);
    root.appendChild(clockWig);
    // style the root of the widget
    root.setAttribute("style","display: flex; flex-direction: column; justify-content: left;");
    // Call the function to display the date when the page loads
    displayCurrentDate();
    // start the clock
    setInterval(updateClock, 1000);
}
// Function to display the current date in the format: "Monday, October 8, 2025"
function displayCurrentDate() {
    const date = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const currentDate = date.toLocaleDateString('en-US', options);
    document.getElementById('date-widget').textContent = currentDate;
}

// Clock function
function updateClock() {
    const clockElement = document.getElementById('clock-widget');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
