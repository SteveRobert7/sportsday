


const logToConsole = (message, type = "info") => {
    
    const consoleDiv = document.getElementById('console');
    const div = document.createElement('div');
    
    div.className = type;
    div.innerHTML = message;
    consoleDiv.appendChild(div);

    consoleDiv.scrollTop = consoleDiv.scrollHeight;

  };
  


  const displayScores = (scores) => {
    const scoreContainer = document.createElement('div');

    scoreContainer.className = 'score-container';

    Object.entries(scores).forEach(([color, score]) => {
      const scoreBox = document.createElement('span');

      scoreBox.className = `score ${color}`;
      scoreBox.textContent = `${color}: ${score}`;
      scoreContainer.appendChild(scoreBox);

    });
    logToConsole(scoreContainer.outerHTML);
  };
  



  const displayRaceTimes = (times) => {
    const raceTimesContainer = document.createElement('div');

    raceTimesContainer.className = 'race-times-container';

    const raceTimesBox = document.createElement('span');

    raceTimesBox.className = 'race-times-box';
    raceTimesBox.textContent = '[';
    raceTimesContainer.appendChild(raceTimesBox);

    Object.entries(times).forEach(([color, time], index) => {
      const raceTime = document.createElement('span');
      
      raceTime.className = `race-time ${color}`;
      raceTime.textContent = `${color}: ${time}${index < Object.keys(times).length - 1 ? ', ' : ''}`;
      raceTimesContainer.appendChild(raceTime);

    });


    const closingBracket = document.createElement('span');

    closingBracket.textContent = ']';
    raceTimesContainer.appendChild(closingBracket);

    logToConsole(raceTimesContainer.outerHTML);
  };
  


  const OpeningCeremony = (callback) => {
    logToConsole("Let the games begin");

    setTimeout(() => {
      const initialScores = { red: 0, blue: 0, green: 0, yellow: 0 };

      logToConsole("<div class='heading'>Scores:</div>");
      displayScores(initialScores);
      callback(initialScores);

    }, 1000);

  };
  



  const Race100M = (scores) => {
    logToConsole("Starting 100m race...");

    return new Promise((resolve) => {
      setTimeout(() => {
        
        const times = Object.fromEntries(Object.keys(scores).map(color => [color, Math.floor(Math.random() * 6) + 10]));
        
        logToConsole("<div class='heading'>Race Times:</div>");
        displayRaceTimes(times);

        const sortedColors = Object.keys(times).sort((a, b) => times[a] - times[b]);
        scores[sortedColors[0]] += 50;
        scores[sortedColors[1]] += 25;

        logToConsole("<div class='heading'>Scores:</div>");
        
        displayScores(scores);
        resolve(scores);

      }, 3000);

    });

  };
  



  const LongJump = (scores) => {
    logToConsole("Performing long jump...");

    return new Promise((resolve) => {
      setTimeout(() => {
        
        const color = ['red', 'yellow', 'green', 'blue'][Math.floor(Math.random() * 4)];
        logToConsole(`${color} wins the long jump!`);
        
        scores[color] += 150;
        logToConsole("<div class='heading'>Scores:</div>");

        displayScores(scores);
        resolve(scores);

      }, 2000);

    });
  };
  


  const HighJump = (scores) => {
    logToConsole("Performing high jump...");

    return new Promise((resolve) => {
      setTimeout(() => {

        const userInput = prompt("What colour secured the highest jump?");

        if (userInput && scores.hasOwnProperty(userInput)) {
          scores[userInput] += 100;
          logToConsole(`${userInput} wins the high jump!`);
          logToConsole("<div class='heading'>Scores:</div>");
          displayScores(scores);
        } 
        
        else {
          logToConsole("Event was cancelled", "error");
        }

        resolve(scores);
      }, 1000);

    });
  };
  

  const AwardCeremony = (scores) => {
    
    logToConsole("<div class='heading'>Award Ceremony:</div>");

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    logToConsole(`${sortedScores[0][0]} came first with ${sortedScores[0][1]} points.`);
    logToConsole(`${sortedScores[1][0]} came second with ${sortedScores[1][1]} points.`);
    logToConsole(`${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`);
  };
  

  OpeningCeremony((initialScores) => {
    Race100M(initialScores)
      .then((scores) => LongJump(scores))
      .then((scores) => HighJump(scores))
      .then((scores) => AwardCeremony(scores));

  });
  