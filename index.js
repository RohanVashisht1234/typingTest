// DOM Elements
const $ = (id) => document.getElementById(id);
const $root           = $("root");
const $errorCount     = $("errorCount");
const $correctCount   = $("correctCount");
const $totalCharacters= $("totalCharacters");
const $Timer          = $("Timer");
const $refresh        = $("refresh");

// Game Settings
const GAME_TIME = 15;
const sentences = [
  "Cactus lantern biscuit velocity marble thunder wallet penguin galaxy domino ketchup radar vacuum blanket slipper walnut giraffe hammock tornado algebra jungle tractor lemonade faucet orbit eclipse yogurt canoe magnet fossil ..."
];

// Utility Functions
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const calculatePerformance = (correct, errors, time = GAME_TIME) => {
  const totalKeystrokes = correct + errors;
  const accuracy = totalKeystrokes
    ? (correct / totalKeystrokes) * 100
    : 0;
  const wpm = (correct / 5 / time) * 60;
  return {
    accuracy:   accuracy.toFixed(2),
    speedWPM:   wpm.toFixed(2),
    netScore:   correct - errors
  };
};

// Game State
let remainingTime    = GAME_TIME;
let timerInterval;
let nextCharId       = 0;
let position         = 0;
let correctCount     = 0;
let errorCount       = 0;
let backspaceCount   = 0;
let gameStarted      = false;

// Render the shuffled text
const words = shuffle(sentences[0].split(" "));
words.forEach(word => {
  const wordDiv = document.createElement("div");
  wordDiv.className = "word";

  [...word, " "].forEach(ch => {
    const span = document.createElement("div");
    span.id = String(nextCharId++);
    span.className = "character faded";
    span.innerText = ch;
    wordDiv.appendChild(span);
  });

  $root.appendChild(wordDiv);
});

// Timer logic
const startTimer = onEnd => {
  timerInterval = setInterval(() => {
    remainingTime--;
    $Timer.innerText = `${remainingTime}s`;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      onEnd();
    }
  }, 1000);
};

// Clean up and show results
const endGame = () => {
  document.removeEventListener("keydown", handleKey);
  const { accuracy, speedWPM, netScore } =
    calculatePerformance(correctCount, errorCount);

  alert(
    `Results:\n` +
    `Accuracy: ${accuracy}%\n` +
    `WPM: ${speedWPM}\n` +
    `Net Score: ${netScore}\n` +
    `Errors (incl. backspaces): ${errorCount}\n` +
    `Backspaces: ${backspaceCount}`
  );
};

// Main key handler
const handleKey = e => {
  if (!gameStarted) {
    gameStarted = true;
    startTimer(endGame);
  }

  // --- BACKSPACE HANDLING & PENALTY ---
  if (e.key === "Backspace") {
    if (position > 0) {
      position--;
      backspaceCount++;
      errorCount++;
      $errorCount.innerText = errorCount;

      // Re-fade the character we just “erased”
      const erased = $(String(position));
      erased.classList.remove("correct", "error", "cursor");
      erased.classList.add("faded");

      // Move cursor back
      const prev = $(String(position - 1));
      if (prev) {
        prev.classList.add("cursor");
      }

      $totalCharacters.innerText = position;
    }
    return;
  }

  // --- NORMAL CHAR HANDLING ---
  const current = $(String(position));
  const prev    = $(String(position - 1));
  if (!current) return;

  // Move the cursor styling
  if (prev) prev.classList.remove("cursor");
  current.classList.add("cursor", "active");
  current.classList.remove("faded");

  // Check correctness
  const typed = e.key === " " ? " " : e.key;
  if (typed === current.innerText) {
    current.classList.add("correct");
    correctCount++;
    $correctCount.innerText = correctCount;
  } else {
    current.classList.add("error");
    errorCount++;
    $errorCount.innerText = errorCount;
  }

  position++;
  $totalCharacters.innerText = position;

  // Auto-scroll once you get far enough
  if (position > 20) {
    $root.scrollLeft += 25;
  }
};

// Set up listeners
document.addEventListener("keydown", handleKey);
$refresh.addEventListener("click", () => location.reload());
