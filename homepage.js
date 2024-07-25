// Initialize widgets with stored values and add interactive features
document.addEventListener('DOMContentLoaded', () => {
  // Load Widgets
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

  // Apply drag-and-drop and resize functionality to all widgets
  document.querySelectorAll('.widget').forEach(widget => {
    makeDraggable(widget);
    makeResizable(widget.querySelector('.resize-handle'));
  });
});

// Utility Functions for Drag-and-Drop and Resizable Widgets
function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  element.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(window.getComputedStyle(element).left, 10);
    startTop = parseInt(window.getComputedStyle(element).top, 10);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    element.style.left = `${startLeft + dx}px`;
    element.style.top = `${startTop + dy}px`;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

function makeResizable(handle) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    const element = handle.parentElement;
    startWidth = parseInt(window.getComputedStyle(element).width, 10);
    startHeight = parseInt(window.getComputedStyle(element).height, 10);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isResizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const element = handle.parentElement;
    element.style.width = `${startWidth + dx}px`;
    element.style.height = `${startHeight + dy}px`;
  }

  function onMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

// Define loading functions for all widgets
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
  makeDraggable(googleSlidesDiv);
  makeResizable(googleSlidesDiv.querySelector('.resize-handle'));
}

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
  makeDraggable(googleSpreadsheetDiv);
  makeResizable(googleSpreadsheetDiv.querySelector('.resize-handle'));
}

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
  makeDraggable(googleFormDiv);
  makeResizable(googleFormDiv.querySelector('.resize-handle'));
}

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
  makeDraggable(musicDiv);
  makeResizable(musicDiv.querySelector('.resize-handle'));
}

function loadPoll() {
  const pollDiv = document.getElementById('pollWidget');
  pollDiv.innerHTML = `
    <div class="widget">
      <h2>Poll</h2>
      <div class="poll-input">
        <input type="text" id="pollQuestion" placeholder="Enter Poll Question" value="Do you like this digital notice board?">
        <button id="addOption">Add Option</button>
      </div>
      <ul id="pollOptions">
        <li><input type="checkbox" id="option1"> Option 1</li>
      </ul>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('addOption').addEventListener('click', () => {
    const pollOptions = document.getElementById('pollOptions');
    const optionCount = pollOptions.children.length + 1;
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="option${optionCount}"> Option ${optionCount}`;
    pollOptions.appendChild(li);
  });
  makeDraggable(pollDiv);
  makeResizable(pollDiv.querySelector('.resize-handle'));
}

function loadBookAndQuote(title, quote) {
  const bookQuoteDiv = document.getElementById('bookQuote');
  bookQuoteDiv.innerHTML = `
    <div class="widget">
      <h2>Book & Quote</h2>
      <div class="book-input">
        <input type="text" id="bookTitle" placeholder="Enter Book Title" value="${title}">
        <input type="text" id="bookQuote" placeholder="Enter Book Quote" value="${quote}">
        <button id="updateBookQuote">Update</button>
      </div>
      <div class="book-info">
        <p id="bookTitleDisplay">${title}</p>
        <p id="bookQuoteDisplay">${quote}</p>
      </div>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('updateBookQuote').addEventListener('click', () => {
    const newTitle = document.getElementById('bookTitle').value;
    const newQuote = document.getElementById('bookQuote').value;
    if (newTitle && newQuote) {
      document.getElementById('bookTitleDisplay').textContent = newTitle;
      document.getElementById('bookQuoteDisplay').textContent = newQuote;
      localStorage.setItem('bookTitle', newTitle);
      localStorage.setItem('bookQuote', newQuote);
    } else {
      alert('Please enter both title and quote.');
    }
  });
  makeDraggable(bookQuoteDiv);
  makeResizable(bookQuoteDiv.querySelector('.resize-handle'));
}

function loadIssueTracker() {
  const issueTrackerDiv = document.getElementById('issueTracker');
  issueTrackerDiv.innerHTML = `
    <div class="widget">
      <h2>Issue Tracker</h2>
      <div class="issue-input">
        <input type="text" id="issueTitle" placeholder="Enter Issue Title">
        <input type="text" id="issueDescription" placeholder="Enter Issue Description">
        <button id="addIssue">Add Issue</button>
      </div>
      <ul id="issueList"></ul>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('addIssue').addEventListener('click', () => {
    const title = document.getElementById('issueTitle').value;
    const description = document.getElementById('issueDescription').value;
    if (title && description) {
      const issueList = document.getElementById('issueList');
      const li = document.createElement('li');
      li.textContent = `${title}: ${description}`;
      issueList.appendChild(li);
      document.getElementById('issueTitle').value = '';
      document.getElementById('issueDescription').value = '';
    } else {
      alert('Please enter both title and description.');
    }
  });
  makeDraggable(issueTrackerDiv);
  makeResizable(issueTrackerDiv.querySelector('.resize-handle'));
}

function loadDGC() {
  const dgcDiv = document.getElementById('dgc');
  dgcDiv.innerHTML = `
    <div class="widget">
      <h2>Daily Goal Calculator</h2>
      <div class="dgc-input">
        <input type="number" id="totalGoal" placeholder="Total Goal">
        <input type="number" id="daysRemaining" placeholder="Days Remaining">
        <button id="calculateGoal">Calculate</button>
      </div>
      <p id="dailyGoal">Daily Goal: 0</p>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('calculateGoal').addEventListener('click', () => {
    const totalGoal = parseFloat(document.getElementById('totalGoal').value);
    const daysRemaining = parseInt(document.getElementById('daysRemaining').value, 10);
    if (!isNaN(totalGoal) && !isNaN(daysRemaining) && daysRemaining > 0) {
      const dailyGoal = (totalGoal / daysRemaining).toFixed(2);
      document.getElementById('dailyGoal').textContent = `Daily Goal: ${dailyGoal}`;
    } else {
      alert('Please enter valid numbers.');
    }
  });
  makeDraggable(dgcDiv);
  makeResizable(dgcDiv.querySelector('.resize-handle'));
}

function loadAnnouncements() {
  const announcementsDiv = document.getElementById('announcements');
  announcementsDiv.innerHTML = `
    <div class="widget">
      <h2>Announcements</h2>
      <div class="announcements-input">
        <input type="text" id="announcementTitle" placeholder="Enter Announcement Title">
        <input type="text" id="announcementBody" placeholder="Enter Announcement Body">
        <button id="addAnnouncement">Add Announcement</button>
      </div>
      <ul id="announcementList"></ul>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('addAnnouncement').addEventListener('click', () => {
    const title = document.getElementById('announcementTitle').value;
    const body = document.getElementById('announcementBody').value;
    if (title && body) {
      const announcementList = document.getElementById('announcementList');
      const li = document.createElement('li');
      li.textContent = `${title}: ${body}`;
      announcementList.appendChild(li);
      document.getElementById('announcementTitle').value = '';
      document.getElementById('announcementBody').value = '';
    } else {
      alert('Please enter both title and body.');
    }
  });
  makeDraggable(announcementsDiv);
  makeResizable(announcementsDiv.querySelector('.resize-handle'));
}

function loadOpportunityBoard() {
  const opportunityBoardDiv = document.getElementById('opportunityBoard');
  opportunityBoardDiv.innerHTML = `
    <div class="widget">
      <h2>Opportunity Board</h2>
      <div class="opportunity-input">
        <input type="text" id="opportunityTitle" placeholder="Enter Opportunity Title">
        <input type="text" id="opportunityDescription" placeholder="Enter Opportunity Description">
        <button id="addOpportunity">Add Opportunity</button>
      </div>
      <ul id="opportunityList"></ul>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('addOpportunity').addEventListener('click', () => {
    const title = document.getElementById('opportunityTitle').value;
    const description = document.getElementById('opportunityDescription').value;
    if (title && description) {
      const opportunityList = document.getElementById('opportunityList');
      const li = document.createElement('li');
      li.textContent = `${title}: ${description}`;
      opportunityList.appendChild(li);
      document.getElementById('opportunityTitle').value = '';
      document.getElementById('opportunityDescription').value = '';
    } else {
      alert('Please enter both title and description.');
    }
  });
  makeDraggable(opportunityBoardDiv);
  makeResizable(opportunityBoardDiv.querySelector('.resize-handle'));
}

function loadLeaderboard() {
  const leaderboardDiv = document.getElementById('leaderboard');
  leaderboardDiv.innerHTML = `
    <div class="widget">
      <h2>Leaderboard</h2>
      <div class="leaderboard-input">
        <input type="text" id="playerName" placeholder="Enter Player Name">
        <input type="number" id="playerScore" placeholder="Enter Player Score">
        <button id="addScore">Add Score</button>
      </div>
      <ul id="leaderboardList"></ul>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('addScore').addEventListener('click', () => {
    const name = document.getElementById('playerName').value;
    const score = parseInt(document.getElementById('playerScore').value, 10);
    if (name && !isNaN(score)) {
      const leaderboardList = document.getElementById('leaderboardList');
      const li = document.createElement('li');
      li.textContent = `${name}: ${score}`;
      leaderboardList.appendChild(li);
      document.getElementById('playerName').value = '';
      document.getElementById('playerScore').value = '';
    } else {
      alert('Please enter both player name and score.');
    }
  });
  makeDraggable(leaderboardDiv);
  makeResizable(leaderboardDiv.querySelector('.resize-handle'));
}

function loadTIL() {
  const tilDiv = document.getElementById('til');
  tilDiv.innerHTML = `
    <div class="widget">
      <h2>Today I Learned</h2>
      <div class="til-input">
        <input type="text" id="tilTitle" placeholder="Enter TIL Title">
        <input type="text" id="tilDescription" placeholder="Enter TIL Description">
        <button id="addTIL">Add TIL</button>
      </div>
      <ul id="tilList"></ul>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('addTIL').addEventListener('click', () => {
    const title = document.getElementById('tilTitle').value;
    const description = document.getElementById('tilDescription').value;
    if (title && description) {
      const tilList = document.getElementById('tilList');
      const li = document.createElement('li');
      li.textContent = `${title}: ${description}`;
      tilList.appendChild(li);
      document.getElementById('tilTitle').value = '';
      document.getElementById('tilDescription').value = '';
    } else {
      alert('Please enter both title and description.');
    }
  });
  makeDraggable(tilDiv);
  makeResizable(tilDiv.querySelector('.resize-handle'));
}

function loadGoogleCalendar() {
  const googleCalendarDiv = document.getElementById('googleCalendar');
  googleCalendarDiv.innerHTML = `
    <div class="widget">
      <h2>Google Calendar</h2>
      <div class="calendar-input">
        <input type="text" id="calendarUrl" placeholder="Enter Google Calendar URL">
        <button id="loadCalendar">Load Calendar</button>
      </div>
      <iframe src="https://calendar.google.com/calendar/embed?src=${document.getElementById('calendarUrl').value}" style="border: 0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadCalendar').addEventListener('click', () => {
    const newUrl = document.getElementById('calendarUrl').value;
    if (newUrl) {
      localStorage.setItem('googleCalendarUrl', newUrl);
      loadGoogleCalendar();
    } else {
      alert('Please enter a valid Google Calendar URL.');
    }
  });
  makeDraggable(googleCalendarDiv);
  makeResizable(googleCalendarDiv.querySelector('.resize-handle'));
}

function loadGoogleMeet() {
  const googleMeetDiv = document.getElementById('googleMeet');
  googleMeetDiv.innerHTML = `
    <div class="widget">
      <h2>Google Meet</h2>
      <div class="meet-input">
        <input type="text" id="meetUrl" placeholder="Enter Google Meet URL">
        <button id="loadMeet">Load Meet</button>
      </div>
      <iframe src="${document.getElementById('meetUrl').value}" width="100%" height="600" frameborder="0" allowfullscreen="true"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadMeet').addEventListener('click', () => {
    const newUrl = document.getElementById('meetUrl').value;
    if (newUrl) {
      localStorage.setItem('googleMeetUrl', newUrl);
      loadGoogleMeet();
    } else {
      alert('Please enter a valid Google Meet URL.');
    }
  });
  makeDraggable(googleMeetDiv);
  makeResizable(googleMeetDiv.querySelector('.resize-handle'));
}

function loadGoogleKeep() {
  const googleKeepDiv = document.getElementById('googleKeep');
  googleKeepDiv.innerHTML = `
    <div class="widget">
      <h2>Google Keep</h2>
      <div class="keep-input">
        <input type="text" id="keepUrl" placeholder="Enter Google Keep URL">
        <button id="loadKeep">Load Keep</button>
      </div>
      <iframe src="${document.getElementById('keepUrl').value}" width="100%" height="600" frameborder="0" allowfullscreen="true"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadKeep').addEventListener('click', () => {
    const newUrl = document.getElementById('keepUrl').value;
    if (newUrl) {
      localStorage.setItem('googleKeepUrl', newUrl);
      loadGoogleKeep();
    } else {
      alert('Please enter a valid Google Keep URL.');
    }
  });
  makeDraggable(googleKeepDiv);
  makeResizable(googleKeepDiv.querySelector('.resize-handle'));
}

function loadChatGPT() {
  const chatGPTDiv = document.getElementById('chatGPT');
  chatGPTDiv.innerHTML = `
    <div class="widget">
      <h2>ChatGPT</h2>
      <div class="chat-input">
        <input type="text" id="chatGPTPrompt" placeholder="Enter ChatGPT Prompt">
        <button id="sendPrompt">Send Prompt</button>
      </div>
      <div id="chatGPTResponse"></div>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('sendPrompt').addEventListener('click', () => {
    const prompt = document.getElementById('chatGPTPrompt').value;
    if (prompt) {
      // Assuming you have a function to send prompt to ChatGPT API
      sendChatGPTPrompt(prompt).then(response => {
        document.getElementById('chatGPTResponse').textContent = response;
      }).catch(error => {
        alert('Error: ' + error.message);
      });
    } else {
      alert('Please enter a prompt.');
    }
  });
  makeDraggable(chatGPTDiv);
  makeResizable(chatGPTDiv.querySelector('.resize-handle'));
}

function loadNotionPage() {
  const notionPageDiv = document.getElementById('notionPage');
  notionPageDiv.innerHTML = `
    <div class="widget">
      <h2>Notion Page</h2>
      <div class="notion-input">
        <input type="text" id="notionUrl" placeholder="Enter Notion Page URL">
        <button id="loadNotion">Load Notion</button>
      </div>
      <iframe src="${document.getElementById('notionUrl').value}" width="100%" height="600" frameborder="0" allowfullscreen="true"></iframe>
      <div class="resize-handle se"></div>
    </div>
  `;

  document.getElementById('loadNotion').addEventListener('click', () => {
    const newUrl = document.getElementById('notionUrl').value;
    if (newUrl) {
      localStorage.setItem('notionPageUrl', newUrl);
      loadNotionPage();
    } else {
      alert('Please enter a valid Notion Page URL.');
    }
  });
  makeDraggable(notionPageDiv);
  makeResizable(notionPageDiv.querySelector('.resize-handle'));
}
