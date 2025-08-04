let overLimit, team1, team2, choice, tossResult, tossWinner;
let innings = 1, ball = 0, over = 1, score1 = 0, score2 = 0, wickets = 0;
let target = -1, currentTeam, currentScore = 0, log, nextBallButton;
const maxWickets = 3;

function startGame() {
    overLimit = parseInt(document.getElementById("overs").value);
    team1 = document.getElementById("team1").value;
    team2 = document.getElementById("team2").value;
    choice = document.getElementById("choice").value.toLowerCase();
    if (!["head", "tail"].includes(choice) || !team1 || !team2 || overLimit < 1 || overLimit > 5) {
        alert("Please enter valid inputs!");
        return;
    }

    tossResult = Math.random() < 0.5 ? "head" : "tail";
    tossWinner = (choice === tossResult) ? team1 : team2;
    currentTeam = (tossWinner === team1) ? team1 : team2;

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    log = document.getElementById("log");
    nextBallButton = document.getElementById("nextBall");
    log.innerHTML += `<p>${tossWinner} won the toss (${tossResult}) and will bat first.</p>`;
}

function nextBall() {
    if (wickets >= maxWickets || over > overLimit) {
        endInnings();
        return;
    }

    let outcome = Math.floor(Math.random() * 10);
    let output = `Over ${over}.${ball + 1}: `;

    if (outcome === 0) {
        output += "OUT!";
        wickets++;
    } else if ([1,2,3,4,6].includes(outcome)) {
        output += `${outcome} runs`;
        currentScore += outcome;
    } else {
        output += "Wide Ball! +1 run";
        currentScore += 1;
        log.innerHTML += `<p>${output}</p>`;
        return;
    }

    log.innerHTML += `<p>${output}</p>`;
    ball++;
    if (ball === 6) {
        over++;
        ball = 0;
    }

    if (target !== -1 && currentScore >= target) {
        log.innerHTML += `<p>${currentTeam} has chased the target!</p>`;
        endInnings();
    }
}

function endInnings() {
    if (innings === 1) {
        score1 = currentScore;
        target = score1 + 1;
        currentScore = 0;
        wickets = 0;
        ball = 0;
        over = 1;
        innings = 2;
        currentTeam = (currentTeam === team1) ? team2 : team1;
        log.innerHTML += `<p>Innings ended. ${team1}: ${score1}</p>`;
        log.innerHTML += `<p>${currentTeam} now needs ${target} to win.</p>`;
    } 
    else 
        {
        score2 = currentScore;
        log.innerHTML += `<p>Innings ended. ${team2}: ${score2}</p>`;
        document.getElementById("game").style.display = "none";
        document.getElementById("results").style.display = "block";
        let result = "";
        if (score2 > score1) result = `${team2} wins the match!🥳`;
        else if (score1 > score2) result = `${team1} wins tha match!🥳`;
        else result = "Match Draw!";
        document.getElementById("scoreSummary").innerText = `${team1}: ${score1}
        ${team2}: ${score2}
        ${result}`;
    }
}