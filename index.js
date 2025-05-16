const $root = document.getElementById("root");
const $errorCount = document.getElementById("errorCount");
const $correctCount = document.getElementById("correctCount");
const $totalCharacters = document.getElementById("totalCharacters");
const $Timer = document.getElementById("Timer");
const $refresh = document.getElementById("refresh");

const sentences = [
  "Cactus lantern biscuit velocity marble thunder wallet penguin galaxy domino ketchup radar vacuum blanket slipper walnut giraffe hammock tornado algebra jungle tractor lemonade faucet orbit eclipse yogurt canoe magnet fossil lantern pyramid avocado oxygen bicycle dinosaur trumpet kiwi triangle zipper volcano penguin saxophone igloo mustard telescope suitcase planet shoelace blueprint crocodile satellite jellyfish unicorn parachute eclipse shovel pancake iceberg lantern cupboard snorkel trampoline rainbow battery calculator whistle donut shoelace spaghetti tambourine snorkel blueprint suitcase wardrobe jellybean cupcake raccoon telescope maracas xylophone cocoon hammock pancake waffle anchor mustard blender tornado snowflake jellyfish yo-yo zipper volcano pancake magnet saxophone unicorn marshmallow elevator trampoline hammock cupboard mustard volcano trumpet coconut lava triangle hammock tornado spaghetti calculator tambourine yo-yo avocado blueprint jellybean cupboard saxophone zipper volcano pancake marshmallow yo-yo oxygen jellyfish triangle parachute telescope unicorn igloo spaghetti shoelace snowflake cocoon mustard calculator lava tambourine maracas jungle volcano elevator blueprint cupcake saxophone hammock fossil blueprint yo-yo spaghetti tambourine jellybean pancake shoelace coconut jellyfish rainbow calculator marshmallow parachute cocoon jungle satellite xylophone blender parachute fossil jellyfish elevator avalanche saxophone volcano pancake suitcase xylophone marshmallow blueprint cupcake jungle blueprint raccoon oxygen blueprint pancake tornado avocado shoelace igloo jellyfish cocoon tambourine blender triangle parachute giraffe shoelace xylophone satellite fossil raccoon suitcase marshmallow yo-yo elevator blueprint cupcake jellybean pancake tornado giraffe satellite maracas shoelace volcano blender saxophone blueprint marshmallow tambourine elevator jungle triangle shoelace pancake blueprint marshmallow maracas tambourine volcano suitcase satellite elevator jellyfish blender."
];

function shuffle(array) {
  let result = array.slice();
  let currentIndex = result.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex], result[currentIndex]
    ];
  }
  return result;
}

function calculatePerformance(correctCount, errorCount, timeInSeconds = 15) {
  const total = correctCount + errorCount;
  const accuracy = total === 0 ? 0 : (correctCount / total) * 100;
  const speed = (correctCount / 5 / timeInSeconds) * 60;
  const netScore = correctCount - errorCount;
  return {
    accuracy: accuracy.toFixed(2),
    speed: speed.toFixed(2),
    netScore
  };
}

const reload = () => location.reload();

let time = 15;
let timerInterval;
function startTimer(onEnd) {
  timerInterval = setInterval(() => {
    time -= 1;
    $Timer.innerText = `${time}s`;
    if (time <= 0) {
      clearInterval(timerInterval);
      onEnd();
    }
  }, 1000);
}

const words = shuffle(sentences[0].split(" "));
const listOfWordsAsDivs = [];
let charId = 0;
words.forEach((word) => {
  const wordDiv = document.createElement("div");
  wordDiv.classList.add("word");
  word.split("").forEach((char) => {
    const charDiv = document.createElement("div");
    charDiv.id = charId++;
    charDiv.classList.add("character", "faded");
    charDiv.innerText = char;
    wordDiv.appendChild(charDiv);
  });
  const spaceDiv = document.createElement("div");
  spaceDiv.id = charId++;
  spaceDiv.classList.add("character", "faded");
  spaceDiv.innerText = " ";
  wordDiv.appendChild(spaceDiv);
  listOfWordsAsDivs.push(wordDiv);
});
listOfWordsAsDivs.forEach((wordDiv) => $root.appendChild(wordDiv));

let personTypedCount = 0;
let errorCount = 0;
let correctCount = 0;
let gameStarted = false;
function endGame() {
  document.removeEventListener("keypress", handleTyping);
  const result = calculatePerformance(correctCount, errorCount);
  alert(
    `Result:\nAccuracy: ${result.accuracy}%\nScore: ${result.netScore}\nSpeed (WPM): ${result.speed}`
  );
}

function handleTyping(e) {
  if (!gameStarted) {
    gameStarted = true;
    startTimer(endGame);
  }
  const currentChar = document.getElementById(personTypedCount.toString());
  if (!currentChar) return;
  const typedChar = e.key === " " ? " " : e.key;
  currentChar.classList.remove("faded");
  if (typedChar === currentChar.innerText) {
    currentChar.classList.add("done");
    correctCount++;
  } else {
    currentChar.classList.add("error");
    $errorCount.innerText = ++errorCount;
  }
  if (personTypedCount > 20) {
    $root.scrollLeft += 15;
  }
  $correctCount.innerText = correctCount;
  $totalCharacters.innerText = personTypedCount + 1;
  personTypedCount++;
}

document.addEventListener("keypress", handleTyping);
$refresh.addEventListener("click", reload);
