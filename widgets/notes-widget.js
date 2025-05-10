let zIndexCounter = 1;
const LOCAL_STORAGE_KEY = 'stickyNotes';

function formatDate() {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let yyyy = now.getFullYear();
    let hr = now.getHours().toString().padStart(2, '0');
    let mn = now.getMinutes().toString().padStart(2, '0');
    let sc = now.getSeconds().toString().padStart(2, '0');
    return `${dd}/${mm}/${yyyy} [${hr}:${mn}:${sc}]`;// now.toLocaleString();
}

document.getElementById('create-note-btn').addEventListener('click', () => {
    var spawnX = Math.floor(window.innerWidth/2);
    var spawnY = Math.floor(window.innerHeight/2);
    const noteData = {
        content: 'Text...',
        w: 180,
        h: 300,
        x: spawnX,
        y: spawnY,
        timestamp: formatDate()
    };
    createNoteElement(noteData);
    saveNotesToLocalStorage();
});

function createNoteElement(data) {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.style.top = data.y + 'px';
    note.style.left = data.x + 'px';
    note.style.width = data.w + 'px';
    note.style.height = data.h + 'px';
    note.style.zIndex = zIndexCounter++;

    // Header
    const header = document.createElement('div');
    header.className = 'note-header';

    const dateText = document.createElement('span');
    dateText.textContent = data.timestamp;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn btn btn-lg btn-outline-primary w-auto h-auto';
    deleteBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-lg' viewBox='0 0 16 16'><path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z'/></svg>";
    deleteBtn.title = 'Delete Note';
    deleteBtn.onclick = () => {
        note.remove();
        saveNotesToLocalStorage();
    };

    header.appendChild(dateText);
    header.appendChild(deleteBtn);

    // Content
    const content = document.createElement('div');
    content.className = 'note-body';
    content.contentEditable = true;
    content.textContent = data.content;

    content.addEventListener('input', saveNotesToLocalStorage);

    note.appendChild(header);
    note.appendChild(content);

    // Resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    resizeHandle.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-arrow-down-right' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z'/></svg>"
    note.appendChild(resizeHandle);

    // Drag functionality via header
    header.onmousedown = function(e) {
        const shiftX = e.clientX - note.getBoundingClientRect().left;
        const shiftY = e.clientY - note.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            note.style.left = pageX - shiftX + 'px';
            note.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
            saveNotesToLocalStorage();
        };
    };

    header.ondragstart = () => false;

    // Resize functionality
    resizeHandle.onmousedown = function(e) {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = note.offsetWidth;
        const startHeight = note.offsetHeight;

        function onMouseMove(e) {
            note.style.width = startWidth + (e.clientX - startX) + 'px';
            note.style.height = startHeight + (e.clientY - startY) + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            saveNotesToLocalStorage();
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    document.body.appendChild(note);
}
function saveNotesToLocalStorage() {
    const notes = [];
    document.querySelectorAll('.sticky-note').forEach(note => {
    const content = note.querySelector('.note-body').textContent;
    const timestamp = note.querySelector('.note-header span').textContent;
    const x = parseInt(note.style.left);
    const y = parseInt(note.style.top);
    const w = parseInt(note.style.width);
    const h = parseInt(note.style.height);

    notes.push({ content, timestamp, x, y, w, h });
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
    const savedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    savedNotes.forEach(data => createNoteElement(data));
}

// Load saved notes on page load
window.onload = loadNotesFromLocalStorage;

