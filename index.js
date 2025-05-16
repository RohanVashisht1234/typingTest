// Select a sentence:
const sentences = [
    "Cactus lantern biscuit velocity marble thunder wallet penguin galaxy domino ketchup radar vacuum blanket slipper walnut giraffe hammock tornado algebra jungle tractor lemonade faucet orbit eclipse yogurt canoe magnet fossil lantern pyramid avocado oxygen bicycle dinosaur trumpet kiwi triangle zipper volcano penguin saxophone igloo mustard telescope suitcase planet shoelace blueprint crocodile satellite jellyfish unicorn parachute eclipse shovel pancake iceberg lantern cupboard snorkel trampoline rainbow battery calculator whistle donut shoelace spaghetti tambourine snorkel blueprint suitcase wardrobe jellybean cupcake raccoon telescope maracas xylophone cocoon hammock pancake waffle anchor mustard blender tornado snowflake jellyfish yo-yo zipper volcano pancake magnet saxophone unicorn marshmallow elevator trampoline hammock cupboard mustard volcano trumpet coconut lava triangle hammock tornado spaghetti calculator tambourine yo-yo avocado blueprint jellybean cupboard saxophone zipper volcano pancake marshmallow yo-yo oxygen jellyfish triangle parachute telescope unicorn igloo spaghetti shoelace snowflake cocoon mustard calculator lava tambourine maracas jungle volcano elevator blueprint cupcake saxophone hammock fossil blueprint yo-yo spaghetti tambourine jellybean pancake shoelace coconut jellyfish rainbow calculator marshmallow parachute cocoon jungle satellite xylophone blender parachute fossil jellyfish elevator avalanche saxophone volcano pancake suitcase xylophone marshmallow blueprint cupcake jungle blueprint raccoon oxygen blueprint pancake tornado avocado shoelace igloo jellyfish cocoon tambourine blender triangle parachute giraffe shoelace xylophone satellite fossil raccoon suitcase marshmallow yo-yo elevator blueprint cupcake jellybean pancake tornado giraffe satellite maracas shoelace volcano blender saxophone blueprint marshmallow tambourine elevator jungle triangle shoelace pancake blueprint marshmallow maracas tambourine volcano suitcase satellite elevator jellyfish blender."
];

const $startButtton = document.getElementById("startButtton");
const $root = document.getElementById("root");

// Make it random:
function shuffle(array) {
    let result = array.slice();
    let currentIndex = result.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [result[currentIndex], result[randomIndex]] = [
            result[randomIndex], result[currentIndex]];
    }

    return result;
}

const splitted_sentence = shuffle(sentences[0].split(" "));

const listOfDivs = [];

splitted_sentence.map((word) => {
    const div = document.createElement("div");
    div.classList.add("word");
    word.split("").map((character) => {
        const inner = document.createElement("div");
        inner.classList.add("character");
        inner.classList.add("faded");

        inner.innerText = character;
        div.appendChild(inner)
    });
    listOfDivs.push(div);
});

listOfDivs.map((div) => {
    $root.appendChild(div);
});


$startButtton.addEventListener("click", ()=> {
    setTimeout(() => {
        console.log("time over");
    }, 15000);
});

