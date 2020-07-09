/** Lorem Ipsum Generator *******
********** Examples *************
console.log(start());
console.log(sentence());
console.log(sentence(10));
console.log(sentence(5, 10));
console.log(paragraph());
console.log(paragraph(10));
console.log(paragraph(10, 50));
********************************/
let wordsCount = 0;
let sentencesCount = 0;
let paragraphsCount = 0;

const allWords = [
  "a",
  "ac",
  "accumsan",
  "ad",
  "adipiscing",
  "aenean",
  "aenean",
  "aliquam",
  "aliquam",
  "aliquet",
  "amet",
  "ante",
  "aptent",
  "arcu",
  "at",
  "auctor",
  "augue",
  "bibendum",
  "blandit",
  "class",
  "commodo",
  "condimentum",
  "congue",
  "consectetur",
  "consequat",
  "conubia",
  "convallis",
  "cras",
  "cubilia",
  "curabitur",
  "curabitur",
  "curae",
  "cursus",
  "dapibus",
  "diam",
  "dictum",
  "dictumst",
  "dolor",
  "donec",
  "donec",
  "dui",
  "duis",
  "egestas",
  "eget",
  "eleifend",
  "elementum",
  "elit",
  "enim",
  "erat",
  "eros",
  "est",
  "et",
  "etiam",
  "etiam",
  "eu",
  "euismod",
  "facilisis",
  "fames",
  "faucibus",
  "felis",
  "fermentum",
  "feugiat",
  "fringilla",
  "fusce",
  "gravida",
  "habitant",
  "habitasse",
  "hac",
  "hendrerit",
  "himenaeos",
  "iaculis",
  "id",
  "imperdiet",
  "in",
  "inceptos",
  "integer",
  "interdum",
  "ipsum",
  "justo",
  "lacinia",
  "lacus",
  "laoreet",
  "lectus",
  "leo",
  "libero",
  "ligula",
  "litora",
  "lobortis",
  "lorem",
  "luctus",
  "maecenas",
  "magna",
  "malesuada",
  "massa",
  "mattis",
  "mauris",
  "metus",
  "mi",
  "molestie",
  "mollis",
  "morbi",
  "nam",
  "nec",
  "neque",
  "netus",
  "nibh",
  "nisi",
  "nisl",
  "non",
  "nostra",
  "nulla",
  "nullam",
  "nunc",
  "odio",
  "orci",
  "ornare",
  "pellentesque",
  "per",
  "pharetra",
  "phasellus",
  "placerat",
  "platea",
  "porta",
  "porttitor",
  "posuere",
  "potenti",
  "praesent",
  "pretium",
  "primis",
  "proin",
  "pulvinar",
  "purus",
  "quam",
  "quis",
  "quisque",
  "quisque",
  "rhoncus",
  "risus",
  "rutrum",
  "sagittis",
  "sapien",
  "scelerisque",
  "sed",
  "sem",
  "semper",
  "senectus",
  "sit",
  "sociosqu",
  "sodales",
  "sollicitudin",
  "suscipit",
  "suspendisse",
  "taciti",
  "tellus",
  "tempor",
  "tempus",
  "tincidunt",
  "torquent",
  "tortor",
  "tristique",
  "turpis",
  "ullamcorper",
  "ultrices",
  "ultricies",
  "urna",
  "ut",
  "ut",
  "varius",
  "vehicula",
  "vel",
  "velit",
  "venenatis",
  "vestibulum",
  "vitae",
  "vivamus",
  "viverra",
  "volutpat",
  "vulputate"
];

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const random = (min, max) => {
  let result;
  if (min && max) result = Math.floor(Math.random() * (max - min) + min);
  else if (min) result = min;
  else if (max) result = max;
  else result = random(2, 10);
  return result;
};

const start = () =>
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const words = (min, max) => {
  let result = [];
  const count = random(min, max);
  wordsCount += count;
  while (result.length < count) {
    const position = Math.floor(Math.random() * allWords.length);
    const randomWord = allWords[position];

    // prevent adding a word twice
    if (result.length && result[result.length - 1] === randomWord) continue;
    result.push(randomWord);
  }
  return result;
};

const sentence = (min, max) => {
  sentencesCount++;
  const wordsArr = words(min, max);

  // adding commas randomly
  let index = random(8, 3);
  while (index < wordsArr.length - 2) {
    wordsArr[index] += ",";
    index += random(8, 3);
  }

  // adding punctuation marks at the end
  const punct = ".!?";
  wordsArr[wordsArr.length - 1] += punct.charAt(
    Math.floor(Math.random() * punct.length)
  );

  wordsArr[0] = capitalize(wordsArr[0]);
  return wordsArr.join(" ");
};

const paragraph = (min, max) => {
  paragraphsCount++;
  if (!min && !max) {
    min = 20;
    max = 50;
  }
  let result = "";
  const count = random(min, max);
  while (result.slice(0, -1).split(" ").length < count) {
    result += sentence() + " ";
  }
  result = result.slice(0, -1);
  return result;
};

const page = (min, max) => {
  if (!min && !max) {
    min = 5;
    max = 10;
  }
  let result = "";
  const count = random(min, max);
  while (result.slice(0, -1).split("\n\n").length < count) {
    result += paragraph() + "\n\n";
  }
  return result;
};

const htmlParagraph = (parent, text) => {
  const p = document.createElement("p");
  p.innerText = text;
  parent.appendChild(p);
};

// Handles scrolling and filling
const placeholder = document.querySelector("#page");
const toTopButton = document.querySelector("#backToTop");
let scrollVal = 0;

const fillStat = (id, value) => {
  document.getElementById(id).innerText = value;
};

const fillAllStats = () => {
  fillStat("scrollVal", scrollVal + " px");
  fillStat("wordsCount", wordsCount);
  fillStat("sentencesCount", sentencesCount);
  fillStat("paragraphsCount", paragraphsCount);
};

htmlParagraph(placeholder, page(10));
document.getElementById("start").innerText = start();

fillAllStats();

document.addEventListener("scroll", (event) => {
  scrollVal =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

  fillAllStats();

  if (document.body.scrollHeight <= scrollVal + window.innerHeight + 200) htmlParagraph(placeholder, page(5, 10));
  toTopButton.style.display = scrollVal > 150 ? "block" : "none";
});
