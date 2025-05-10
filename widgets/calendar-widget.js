// Variables to track current month and year
let currentMonth = new Date().getMonth(); // Get current month (0-11)
let currentYear = new Date().getFullYear(); // Get current year
let currentDay = new Date().getDate(); // Get current day (1-31)
let today = new Date(); // Store the current date for "Go to Today" functionality

function createCalendarWidget(root){
    var rightIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8'/></svg>";
    var leftIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'/></svg>";
    var todayIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-calendar2-minus' viewBox='0 0 16 16'><path d='M5.5 10.5A.5.5 0 0 1 6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5'/><path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z'/><path d='M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z'/></svg>";
    let btnContainer = document.createElement('div');
    btnContainer.setAttribute("id", "calendar-btn-container");
    btnContainer.className = 'calendar-btn-container d-flex justify-content-between mb-3';
    let prevButton = document.createElement('button');
    prevButton.setAttribute("id", "calendar-prev");
    prevButton.className = 'calendar-prev btn btn-secondary  d-flex justify-content-center';
    prevButton.innerHTML = leftIcon;
    let nextButton = document.createElement('button');
    nextButton.setAttribute("id", "calendar-next");
    nextButton.className = 'calendar-next btn btn-secondary d-flex justify-content-center';
    nextButton.innerHTML = rightIcon;
    let todayButton = document.createElement('button');
    todayButton.setAttribute("id", "calendar-today");
    todayButton.className = 'calendar-today btn btn-primary d-flex justify-content-center';
    todayButton.innerHTML = todayIcon;
    let header = document.createElement('div');
    header.setAttribute("id", "calendar-header");
    header.className = 'calendar-header';
    let days = document.createElement('div');
    days.setAttribute("id", "calendar-days");
    days.className = 'calendar-days';


    // add event listeners to buttons
    prevButton.onclick = goToPrevMonth;
    todayButton.onclick = goToToday;
    nextButton.onclick = goToNextMonth;

    // add buttons to the button container
    btnContainer.appendChild(prevButton);
    btnContainer.appendChild(todayButton);
    btnContainer.appendChild(nextButton);

    // add elements to the root
    root.appendChild(btnContainer);
    root.appendChild(header)
    root.appendChild(days);

    // Initial rendering of the calendar
    renderCalendar();
}

// Function to render the calendar
function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay(); 
    const totalDaysInMonth = lastDayOfMonth.getDate(); 

    // Set the calendar header (Month and Year)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const calendarHeader = `${months[currentMonth]} ${currentYear}`;
    document.getElementById('calendar-header').textContent = calendarHeader;

    // Generate the calendar days
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = ''; // Clear any previous calendar

    // Empty cells before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'disabled');
        calendarDays.appendChild(emptyCell);
    }

    // Days of the month
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;

        // Highlight the current day
        if (day === currentDay && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
            dayCell.classList.add('current-day');
        }

        // Add the day cell to the calendar
        calendarDays.appendChild(dayCell);
    }
}

// Function to go to the previous month
function goToPrevMonth() {
    if (--currentMonth < 0) {
        currentMonth = 11; // December
        currentYear--;
    }
    renderCalendar();
}

// Function to go to the next month
function goToNextMonth() {
    if (++currentMonth > 11) {
        currentMonth = 0; // January
        currentYear++;
    }
    renderCalendar();
}

// Function to go to the current date (today)
function goToToday() {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    currentDay = today.getDate();
    renderCalendar();
}

