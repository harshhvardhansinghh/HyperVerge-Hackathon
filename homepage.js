// Pomodoro Timer Functionality
let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      alert('Pomodoro session complete!');
      timeLeft = 25 * 60; // Reset to 25 minutes
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60; // Reset to 25 minutes
  document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
}

document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', stopTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);

// Load Google Slides
function loadGoogleSlides(url) {
  const googleSlidesDiv = document.getElementById('googleSlides');
  googleSlidesDiv.innerHTML = `
    <div class="widget">
      <h2>Google Slides</h2>
      <div class="slide-input">
        <input type="text" id="slideUrl" placeholder="Enter Google Slides URL" value="${url}">
        <button id="loadSlide">Load Slide</button>
      </div>
      <iframe src="${url}/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="400" allowfullscreen="true"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadSlide').addEventListener('click', () => {
    const newUrl = document.getElementById('slideUrl').value;
    if (newUrl) {
      localStorage.setItem('googleSlidesUrl', newUrl);
      loadGoogleSlides(newUrl);
    } else {
      alert('Please enter a valid Google Slides URL.');
    }
  });
}

// Load Google Spreadsheet
function loadGoogleSpreadsheet(url) {
  const googleSpreadsheetDiv = document.getElementById('googleSpreadsheet');
  googleSpreadsheetDiv.innerHTML = `
    <div class="widget">
      <h2>Google Spreadsheet</h2>
      <div class="sheet-input">
        <input type="text" id="sheetUrl" placeholder="Enter Google Spreadsheet URL" value="${url}">
        <button id="loadSheet">Load Sheet</button>
      </div>
      <iframe src="${url}/pubhtml?widget=true&amp;headers=false" frameborder="0" width="100%" height="400" allowfullscreen="true"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadSheet').addEventListener('click', () => {
    const newUrl = document.getElementById('sheetUrl').value;
    if (newUrl) {
      localStorage.setItem('googleSpreadsheetUrl', newUrl);
      loadGoogleSpreadsheet(newUrl);
    } else {
      alert('Please enter a valid Google Spreadsheet URL.');
    }
  });
}

// Load Google Forms
function loadGoogleForm(url) {
  const googleFormDiv = document.getElementById('googleForm');
  googleFormDiv.innerHTML = `
    <div class="widget">
      <h2>Google Form</h2>
      <div class="form-input">
        <input type="text" id="formUrl" placeholder="Enter Google Form URL" value="${url}">
        <button id="loadForm">Load Form</button>
      </div>
      <iframe src="${url}" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadForm').addEventListener('click', () => {
    const newUrl = document.getElementById('formUrl').value;
    if (newUrl) {
      localStorage.setItem('googleFormUrl', newUrl);
      loadGoogleForm(newUrl);
    } else {
      alert('Please enter a valid Google Form URL.');
    }
  });
}

// Load Music Player
function loadMusic(url) {
  const musicDiv = document.getElementById('music');
  musicDiv.innerHTML = `
    <div class="widget">
      <h2>Music Player</h2>
      <div class="music-input">
        <input type="text" id="musicUrl" placeholder="Enter Music URL" value="${url}">
        <button id="loadMusic">Load Music</button>
      </div>
      <audio controls>
        <source src="${url}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadMusic').addEventListener('click', () => {
    const newUrl = document.getElementById('musicUrl').value;
    if (newUrl) {
      localStorage.setItem('musicUrl', newUrl);
      loadMusic(newUrl);
    } else {
      alert('Please enter a valid Music URL.');
    }
  });
}

// Poll Widget
function loadPoll() {
  const pollDiv = document.getElementById('pollWidget');
  pollDiv.innerHTML = `
    <div class="widget">
      <h2>Poll</h2>
      <div class="poll-input">
        <input type="text" id="pollQuestion" placeholder="Enter Poll Question" value="Do you like this digital notice board?">
        <button id="submitPoll">Submit Poll</button>
      </div>
      <p>Do you like this digital notice board?</p>
      <button onclick="submitPoll('yes')">Yes</button>
      <button onclick="submitPoll('no')">No</button>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Book + Quote
function loadBookAndQuote(book, quote) {
  const bookQuoteDiv = document.getElementById('bookQuote');
  bookQuoteDiv.innerHTML = `
    <div class="widget">
      <h2>Book & Quote</h2>
      <div class="book-input">
        <input type="text" id="bookTitle" placeholder="Enter Book Title" value="${book}">
        <input type="text" id="bookQuote" placeholder="Enter Book Quote" value="${quote}">
        <button id="updateBookQuote">Update</button>
      </div>
      <p><strong>Book:</strong> ${book}</p>
      <p><strong>Quote:</strong> "${quote}"</p>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Issue Tracker
function loadIssueTracker() {
  const issueTrackerDiv = document.getElementById('issueTracker');
  issueTrackerDiv.innerHTML = `
    <div class="widget">
      <h2>Issue Tracker</h2>
      <div class="issue-input">
        <textarea id="issueDescription" placeholder="Describe the issue"></textarea>
        <button id="submitIssue">Submit Issue</button>
      </div>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// DGC (Daily Growth Checklist)
function loadDGC() {
  const dgcDiv = document.getElementById('dgc');
  dgcDiv.innerHTML = `
    <div class="widget">
      <h2>Daily Growth Checklist</h2>
      <ul>
        <li><input type="checkbox"> Task 1</li>
        <li><input type="checkbox"> Task 2</li>
        <li><input type="checkbox"> Task 3</li>
      </ul>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Announcements
function loadAnnouncements() {
  const announcementsDiv = document.getElementById('announcements');
  announcementsDiv.innerHTML = `
    <div class="widget">
      <h2>Announcements</h2>
      <div class="announcements">
        <marquee>Important Announcement: The new policy will be effective from next month.</marquee>
      </div>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Steps/Health Tracker
function loadStepsTracker() {
  const stepsDiv = document.getElementById('stepsTracker');
  stepsDiv.innerHTML = `
    <div class="widget">
      <h2>Steps Tracker</h2>
      <div class="steps-input">
        <p>Steps Walked Today: <span id="stepsCount">0</span></p>
        <button id="increaseSteps">Increase Steps</button>
      </div>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('increaseSteps').addEventListener('click', () => {
    const stepsCount = document.getElementById('stepsCount');
    stepsCount.textContent = parseInt(stepsCount.textContent) + 1000;
  });
}

// Opportunity Board
function loadOpportunityBoard() {
  const opportunityBoardDiv = document.getElementById('opportunityBoard');
  opportunityBoardDiv.innerHTML = `
    <div class="widget">
      <h2>Opportunity Board</h2>
      <ul>
        <li>AI Team: Automate repetitive tasks.</li>
        <li>Engineering Team: Develop an in-house tool for marketing.</li>
      </ul>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Leaderboard
function loadLeaderboard() {
  const leaderboardDiv = document.getElementById('leaderboard');
  leaderboardDiv.innerHTML = `
    <div class="widget">
      <h2>Leaderboard</h2>
      <ul>
        <li>Most Steps Walked: 5000</li>
        <li>Most Pages Read: 5</li>
        <li>Most Pomodoro Timers Completed: 8</li>
      </ul>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// TIL (Today I Learned) Corner
function loadTIL() {
  const tilDiv = document.getElementById('til');
  tilDiv.innerHTML = `
    <div class="widget">
      <h2>Today I Learned</h2>
      <p>Content from a recent book/blog relevant to the domain.</p>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Google Calendar
function loadGoogleCalendar() {
  const googleCalendarDiv = document.getElementById('googleCalendar');
  googleCalendarDiv.innerHTML = `
    <div class="widget">
      <h2>Google Calendar</h2>
      <iframe src="https://calendar.google.com/calendar/embed?src=your-calendar-id&ctz=America%2FNew_York" width="100%" height="600" frameborder="0"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Google Meet
function loadGoogleMeet() {
  const googleMeetDiv = document.getElementById('googleMeet');
  googleMeetDiv.innerHTML = `
    <div class="widget">
      <h2>Google Meet</h2>
      <a href="https://meet.google.com/your-meet-link" target="_blank">Join Google Meet</a>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Google Keep
function loadGoogleKeep() {
  const googleKeepDiv = document.getElementById('googleKeep');
  googleKeepDiv.innerHTML = `
    <div class="widget">
      <h2>Google Keep</h2>
      <iframe src="https://keep.google.com" width="100%" height="600" frameborder="0"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// ChatGPT/Perplexity Chat Box
function loadChatGPT() {
  const chatGPTDiv = document.getElementById('chatGPT');
  chatGPTDiv.innerHTML = `
    <div class="widget">
      <h2>Chat with AI</h2>
      <iframe src="https://chat.openai.com" width="100%" height="600" frameborder="0"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Notion Page
function loadNotionPage() {
  const notionPageDiv = document.getElementById('notionPage');
  notionPageDiv.innerHTML = `
    <div class="widget">
      <h2>Notion Page</h2>
      <iframe src="https://notion.so/your-notion-page-link" width="100%" height="600" frameborder="0"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;
}

// Initialize Widgets
document.addEventListener('DOMContentLoaded', () => {
  loadGoogleSlides(localStorage.getItem('googleSlidesUrl') || 'https://docs.google.com/presentation/d/1zkmVGobdPfQgsjIw6gUqJsjB8wvv9uBdT7ZHdaCjZ7Q/edit#slide=id.p');
  loadGoogleSpreadsheet(localStorage.getItem('googleSpreadsheetUrl') || 'https://docs.google.com/spreadsheets/d/1D0mR9Vv9-cU8Wj7O7GT1gT9Fq3vT8xkfwZs5mM7w8Wg/edit?usp=sharing');
  loadGoogleForm(localStorage.getItem('googleFormUrl') || 'https://docs.google.com/forms/d/e/1FAIpQLSfD_tWcd5MRbJtPqXtiR8u7C6q4jqYosYMyOuRIVfzMOfZ9gA/viewform');
  loadMusic(localStorage.getItem('musicUrl') || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  loadPoll();
  loadBookAndQuote('The Great Gatsby', 'So we beat on, boats against the current, borne back ceaselessly into the past.');
  loadIssueTracker();
  loadDGC();
  loadAnnouncements();
  loadStepsTracker();
  loadOpportunityBoard();
  loadLeaderboard();
  loadTIL();
  loadGoogleCalendar();
  loadGoogleMeet();
  loadGoogleKeep();
  loadChatGPT();
  loadNotionPage();
});

// Resize functionality
document.querySelectorAll('.widget').forEach(widget => {
  const handle = widget.querySelector('.resize-handle');
  if (handle) {
    handle.addEventListener('mousedown', e => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = parseInt(window.getComputedStyle(widget).width, 10);
      const startHeight = parseInt(window.getComputedStyle(widget).height, 10);

      function onMouseMove(e) {
        widget.style.width = `${startWidth + e.clientX - startX}px`;
        widget.style.height = `${startHeight + e.clientY - startY}px`;
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
});

// Drag and Drop Functionality
function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = parseInt(window.getComputedStyle(element).left, 10) || 0;
    initialTop = parseInt(window.getComputedStyle(element).top, 10) || 0;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    element.style.left = `${initialLeft + dx}px`;
    element.style.top = `${initialTop + dy}px`;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

// Initialize widgets
document.addEventListener('DOMContentLoaded', () => {
  // Initialize draggable functionality for all widgets
  document.querySelectorAll('.widget').forEach(widget => {
    makeDraggable(widget);
    // Existing widget loading functions here
    loadGoogleSlides(localStorage.getItem('googleSlidesUrl') || 'https://docs.google.com/presentation/d/1zkmVGobdPfQgsjIw6gUqJsjB8wvv9uBdT7ZHdaCjZ7Q/edit#slide=id.p');
    loadGoogleSpreadsheet(localStorage.getItem('googleSpreadsheetUrl') || 'https://docs.google.com/spreadsheets/d/1D0mR9Vv9-cU8Wj7O7GT1gT9Fq3vT8xkfwZs5mM7w8Wg/edit?usp=sharing');
    loadGoogleForm(localStorage.getItem('googleFormUrl') || 'https://docs.google.com/forms/d/e/1FAIpQLSfD_tWcd5MRbJtPqXtiR8u7C6q4jqYosYMyOuRIVfzMOfZ9gA/viewform');
    loadMusic(localStorage.getItem('musicUrl') || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    loadPoll();
    loadBookAndQuote('The Great Gatsby', 'So we beat on, boats against the current, borne back ceaselessly into the past.');
    loadIssueTracker();
    loadDGC();
    loadAnnouncements();
    loadStepsTracker();
    loadOpportunityBoard();
    loadLeaderboard();
    loadTIL();
    loadGoogleCalendar();
    loadGoogleMeet();
    loadGoogleKeep();
    loadChatGPT();
    loadNotionPage();
  });
});



