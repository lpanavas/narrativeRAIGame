// Game variables
let expertisePoints = 0; // start with 2 expertise points
let manpowerPoints = 0;
// start with 2 manpower points
// hold the AI tech data
let currentTechIndex = 0; // to keep track of the current tech being evaluated
let score = 0; // the player's score
let gameTimer = null; // for timing the game
let upgradeClicked = false;
let knowledgeUpgrades = 0;
let decisionsMade = 0;

let gameData = {
  lowInfo: [
    {
      UseID: "USE001",
      Title: "Community Reputation System",
      RiskCategory: "Unacceptable",
      Description:
        "Our system leverages facial recognition to identify individuals and assign them a community reputation score based on their public behavior.",
    },
    {
      UseID: "USE002",
      Title: "Public Safety Surveillance System",
      RiskCategory: "High",
      Description:
        "Our facial recognition system assists law enforcement agencies in maintaining public safety through vigilant surveillance of public spaces.",
    },
    {
      UseID: "USE003",
      Title: "Age Assurance System",
      RiskCategory: "High",
      Description:
        "Our system uses facial recognition technology to ensure age-appropriate content accessibility on online platforms.",
    },
    {
      UseID: "USE004",
      Title: "Personal Photo Organizer",
      RiskCategory: "Low",
      Description:
        "Our system uses facial recognition technology to help users easily organize their personal photo collections.",
    },
    {
      UseID: "USE005",
      Title: "Smart Social Media Assistant",
      RiskCategory: "Low",
      Description:
        "Our system uses facial recognition to make photo tagging suggestions on social media, enhancing user experience.",
    },
    {
      UseID: "USE006",
      Title: "Smartphone Security Enhancer",
      RiskCategory: "Low",
      Description:
        "Our system uses facial recognition for user authentication, offering a secure and convenient way to unlock smartphones.",
    },
  ],
  mediumInfo: [
    {
      UseID: "USE001",
      Title: "Community Reputation System",
      RiskCategory: "Unacceptable",
      Description:
        "This system uses facial recognition to identify people and give them a score based on how they behave in public. However, it might label someone based on a single incident or mistake.",
    },
    {
      UseID: "USE002",
      Title: "Public Safety Surveillance System",
      RiskCategory: "High",
      Description:
        "This system uses facial recognition to help police watch over public places. It might raise privacy concerns, as people might feel they are being watched all the time.",
    },
    {
      UseID: "USE003",
      Title: "Age Assurance System",
      RiskCategory: "High",
      Description:
        "This system uses facial recognition to check if someone is old enough to access certain online content. There's a risk it could mistakenly allow or deny access based on inaccurate age estimation.",
    },
    {
      UseID: "USE004",
      Title: "Personal Photo Organizer",
      RiskCategory: "Low",
      Description:
        "This system uses facial recognition to help sort out personal photos. It might sometimes misidentify people, leading to incorrect photo categorization.",
    },
    {
      UseID: "USE005",
      Title: "Smart Social Media Assistant",
      RiskCategory: "Low",
      Description:
        "This system uses facial recognition to suggest who to tag in photos on social media. There's a chance it could suggest wrong tags, leading to awkward situations.",
    },
    {
      UseID: "USE006",
      Title: "Smartphone Security Enhancer",
      RiskCategory: "Low",
      Description:
        "This system uses facial recognition so you can unlock your phone by looking at it. However, it might sometimes fail to recognize the owner or mistakenly unlock for someone else.",
    },
  ],
  highInfo: [
    {
      UseID: "USE001",
      Title: "Community Reputation System",
      RiskCategory: "Unacceptable",
      Description:
        "This system employs facial recognition to identify individuals and assign them a reputation score based on observed behavior. This can lead to privacy breaches and unwarranted stigmatization, as it could be used to label individuals based on isolated incidents or even inaccurately.",
    },
    {
      UseID: "USE002",
      Title: "Public Safety Surveillance System",
      RiskCategory: "High",
      Description:
        "This system uses facial recognition to assist law enforcement in monitoring public spaces. While it may aid in maintaining public safety, it also poses a significant threat to privacy, potentially leading to constant surveillance and misuse of personal data.",
    },
    {
      UseID: "USE003",
      Title: "Age Assurance System",
      RiskCategory: "High",
      Description:
        "This system leverages facial recognition to verify age for content access on online platforms. Despite its intended safety measures, it can mistakenly grant or deny access due to inaccurate age estimation, raising concerns about content appropriateness and discrimination.",
    },
    {
      UseID: "USE004",
      Title: "Personal Photo Organizer",
      RiskCategory: "Low",
      Description:
        "This system employs facial recognition to aid users in organizing their personal photos. Although beneficial, it may lead to misidentification and incorrect photo categorization, potentially causing personal distress or confusion.",
    },
    {
      UseID: "USE005",
      Title: "Smart Social Media Assistant",
      RiskCategory: "Low",
      Description:
        "This system uses facial recognition to suggest photo tags on social media. While it may enhance user experience, it may also suggest incorrect tags, leading to social awkwardness or potential misuse of personal images.",
    },
    {
      UseID: "USE006",
      Title: "Smartphone Security Enhancer",
      RiskCategory: "Low",
      Description:
        "This system utilizes facial recognition for user authentication on smartphones. Although it provides a convenient security measure, it may fail to recognize the owner or mistakenly authenticate an unauthorized user, posing a risk to personal data security.",
    },
  ],
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
let indices = Array.from({ length: gameData.lowInfo.length }, (_, i) => i);

// Shuffle the indices array
shuffleArray(indices);

// Create new shuffled technology lists based on the shuffled indices
let shuffledLowInfo = indices.map((i) => gameData.lowInfo[i]);
let shuffledMediumInfo = indices.map((i) => gameData.mediumInfo[i]);
let shuffledHighInfo = indices.map((i) => gameData.highInfo[i]);

// Replace the original lists with the shuffled lists
gameData.lowInfo = shuffledLowInfo;
gameData.mediumInfo = shuffledMediumInfo;
gameData.highInfo = shuffledHighInfo;

// Then, when accessing the technologies, use the shuffled indices
function displayCurrentTech() {
  let tech;
  let index = indices[currentTechIndex];
  if (currentExpertiseLevel === "lowInfo") {
    tech = gameData.lowInfo[indices[index]];
  } else if (currentExpertiseLevel === "mediumInfo") {
    tech = gameData.mediumInfo[indices[index]];
  } else if (currentExpertiseLevel === "highInfo") {
    tech = gameData.highInfo[indices[index]];
  }
  console.log(tech);
  if (tech) {
    document.getElementById("tech-title").textContent = tech.Title;
    document.getElementById("tech-description").textContent = tech.Description;
    document.getElementById("upgrade-knowledge").disabled =
      expertisePoints <= 0;
  } else {
    // Game is over, display final score
    document.getElementById("score").textContent = `Final Score: ${score}`;
  }
}

// Handle the player's choice
// Handle the player's choice
function handleChoice(choice) {
  currentExpertiseLevel = "lowInfo"; // Reset expertise level to low
  if (currentTechIndex >= gameData.lowInfo.length) {
    // No more technologies to evaluate, game is over
    displayFinalScore();
    return;
  }
  let tech;
  let index = indices[currentTechIndex];
  if (currentExpertiseLevel === "lowInfo") {
    tech = gameData.lowInfo[indices[index]];
  } else if (currentExpertiseLevel === "mediumInfo") {
    tech = gameData.mediumInfo[indices[index]];
  } else if (currentExpertiseLevel === "highInfo") {
    tech = gameData.highInfo[indices[index]];
  }
  let points = 0;

  if (choice === tech.RiskCategory) {
    points = 2; // correct choice, add 2 points
  } else if (choice === "Unacceptable") {
    // Mislabeled an Unacceptable tech, lose all points
    points = -score;
  } else if (choice === "High") {
    points = -3; // mislabeled a High risk tech, lose 3 points
  }

  score += points; // update the score

  const feedbackElement = document.getElementById("feedback");
  if (choice === tech.RiskCategory) {
    feedbackElement.textContent = "Correct choice!";
  } else {
    feedbackElement.textContent = "Incorrect choice!";
  }

  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("knowledge-upgrade-count").textContent = `(0/2)`;

  // Move to the next tech
  currentTechIndex++;
  upgradeClicked = false; // Reset the upgradeClicked flag
  if (currentTechIndex < gameData.lowInfo.length) {
    displayCurrentTech();
  } else {
    // No more technologies to evaluate, game is over
    displayFinalScore();
  }
}

// Function to display the final score
function displayFinalScore() {
  const finalScoreElement = document.getElementById("score");
  finalScoreElement.textContent = `Final Score: ${score}`;
  finalScoreElement.style.display = "block";
}

// Handle the "Upgrade Knowledge" button
// function handleUpgrade() {
//   if (expertisePoints > 0) {
//     expertisePoints--;
//     if (gameData.mediumInfo.length > 0) {
//       const newTechs = gameData.mediumInfo.splice(0, expertisePoints);
//       console.log(newTechs);
//       gameData.lowInfo = gameData.lowInfo.concat(newTechs);
//     }
//     displayCurrentTech();
//   }
// }
let totalDecisions = gameData.lowInfo.length;
document.getElementById("progress-bar").max = totalDecisions;

let currentExpertiseLevel = "lowInfo";
function updateProgressBar() {
  decisionsMade++;
  document.getElementById("progress-bar").value = decisionsMade;
}

function upgradeKnowledge() {
  console.log(knowledgeUpgrades);
  if (knowledgeUpgrades < 2) {
    knowledgeUpgrades++;

    // Update the button text
    document.getElementById(
      "knowledge-upgrade-count"
    ).textContent = `(${knowledgeUpgrades}/2)`;

    // Put the rest of your upgradeKnowledge logic here
  }
}

function handleUpgrade() {
  if (expertisePoints > 0) {
    upgradeKnowledge();
    expertisePoints--;
    if (currentExpertiseLevel === "lowInfo") {
      currentExpertiseLevel = "mediumInfo";
    } else if (currentExpertiseLevel === "mediumInfo") {
      currentExpertiseLevel = "highInfo";
    }

    document.getElementById(
      "expertise"
    ).textContent = `Expertise points left: ${expertisePoints}`;
    displayCurrentTech(); // Display the current technology with the upgraded knowledge level
  }
}

// Show the setup screen when the 'Start Setup' button is clicked
document.getElementById("start-game").addEventListener("click", function () {
  document.getElementById("intro").style.display = "none";
  document.getElementById("main").style.display = "none";

  document.getElementById("setup").style.display = "block";
});

// Start the game when the 'Finish Setup' button is clicked, and update the expertise and manpower points
document.getElementById("finish-setup").addEventListener("click", () => {
  const expertisePointsTwo = parseInt(
    document.getElementById("expertise-points").value
  );
  const manpowerPointsTwo = parseInt(
    document.getElementById("manpower-points").value
  );

  if (isNaN(expertisePointsTwo) || isNaN(manpowerPointsTwo)) {
    alert("Please enter valid numbers for both fields");
    return;
  }

  if (expertisePointsTwo + manpowerPointsTwo !== 6) {
    alert(
      "The total points allocated should be exactly 6. Please adjust your allocations."
    );
    return;
  }

  // Save points for later use
  expertisePoints = expertisePointsTwo;
  manpowerPoints = manpowerPointsTwo;
  console.log(expertisePoints, manpowerPoints);

  // Hide setup and start the game
  document.getElementById("setup").style.display = "none";
  document.getElementById("main").style.display = "block";
  startGame();
});
// Start the game
function startGame() {
  document.getElementById(
    "expertise"
  ).textContent = `Expertise points left: ${expertisePoints}`;
  // Hide intro and show main game
  document.getElementById("intro").style.display = "none";
  // document.getElementById("setup").style.display = "none";
  //   document.getElementById("main").style.display = "block";

  // Fetch the data based on the expertise level
  currentTechIndex = 0;
  upgradeClicked = false; // Reset the upgradeClicked flag
  displayCurrentTech();

  // Set up the game timer based on the manpower level
  const timerDuration =
    manpowerPoints === 0
      ? 30
      : manpowerPoints === 6
      ? 80
      : 45 + (manpowerPoints - 1) * 5;

  timeRemaining = timerDuration;

  // Call updateTimer immediately to display the initial time
  // updateTimer();

  // Call updateTimer every second
  gameTimer = setInterval(updateTimer, 1500);
}
let timeRemaining = 0;
const timerElement = document.getElementById("timer");

function updateTimer() {
  timerElement.textContent = `Time Remaining: ${timeRemaining} seconds`;

  if (timeRemaining < 0) {
    // Time's up, game over
    clearInterval(gameTimer);
    document.getElementById(
      "score"
    ).textContent = `Time's up! Final Score: ${score}`;
    document.getElementById("main").style.display = "none"; // Hide the main game
    document.getElementById("result").style.display = "block"; // Show the result
    document.getElementById(
      "scoreResult"
    ).textContent = `Time's up! Final Score: ${score}`;
  }
  timeRemaining--;
}

// Add event listeners to the choice buttons
document
  .getElementById("low-risk")
  .addEventListener("click", () => handleChoice("Low"));
document
  .getElementById("high-risk")
  .addEventListener("click", () => handleChoice("High"));
document
  .getElementById("unacceptable")
  .addEventListener("click", () => handleChoice("Unacceptable"));
document
  .getElementById("upgrade-knowledge")
  .addEventListener("click", handleUpgrade);
function handleSkip() {
  score += 1; // add 1 point for skipping
  currentTechIndex++; // move to the next tech
  currentExpertiseLevel = "lowInfo"; // Reset expertise level to low
  if (currentTechIndex < gameData.lowInfo.length) {
    displayCurrentTech();
  } else {
    // No more technologies to evaluate, game is over
    displayFinalScore();
  }
}
document
  .getElementById("low-risk")
  .addEventListener("click", updateProgressBar);
document
  .getElementById("high-risk")
  .addEventListener("click", updateProgressBar);
document
  .getElementById("unacceptable")
  .addEventListener("click", updateProgressBar);
document
  .getElementById("skip-choice")
  .addEventListener("click", updateProgressBar);

// Add event listener to the "Skip" button
document.getElementById("skip-choice").addEventListener("click", handleSkip);
document.getElementById("start-game").addEventListener("click", startGame);
