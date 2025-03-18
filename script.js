const category = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];
let randomImage = null;
let image = null;

const quoteContainer = document.getElementById("quote-container");
const newQuoteBttn = document.getElementById("new-quote");
const twitter = document.getElementById("twitter");
const copy = document.getElementById("copy");
const download = document.getElementById("download");
const quoteUrl = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
let randomIndex = null;

async function fetchedData() {
  const data = await fetch(quoteUrl);
  return data.json();
}

const addQuoteAuthor = async () => {
  const result = await fetchedData();
  const quoteDiv = document.createElement("div");
  const authorDiv = document.createElement("span");

  quoteDiv.id = "quote";
  authorDiv.id = "author";

  if (quoteContainer.childElementCount === 2) {
    const div = document.getElementById("quote");
    const span = document.getElementById("author");

    div.innerText = `"${result.data.content}"`;
    span.innerText = `"${result.data.author}"`;

    bgImage();
  } else {
    quoteDiv.innerText = `"${result.data.content}"`;
    quoteContainer.appendChild(quoteDiv);

    authorDiv.innerText = `"${result.data.author}"`;
    quoteContainer.appendChild(authorDiv);

    bgImage();
  }
};

const copyToClipboard = async () => {
  try {
    if (quoteContainer.childElementCount == 2) {
      const content = quoteContainer.children[0].innerHTML;
      navigator.clipboard.writeText(content);
      alert("Text Copied");
    } else {
      navigator.clipboard.writeText(" ");
    }
  } catch (error) {
    throw new Error("cannot copy this text");
  }
};

const bgImage = async () => {
  randomImageCategory = Math.floor(Math.random() * (category.length - 0 + 1) + 0);
  console.log(category[randomImageCategory]);

  const randomImage = await fetch(
    `https://api.algobook.info/v1/randomimage?category=${category[randomImageCategory]}`
  );
  image = randomImage.url
  document.body.style.backgroundImage = `url(${randomImage.url})`;
};

const shareInTwitter = () => {
  if (quoteContainer.childElementCount === 2) {
    const shareQuote = document.getElementById("quote").innerText;
    const shareAuthor = document.getElementById("author").innerText;
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(`${shareQuote}\nAuthor - `) +
        encodeURIComponent(shareAuthor)
    );
  } else {
    alert("There is not text to share");
  }
};

const downloadBgImage = async () => {
  if (document.body.style[0] === undefined) {
    alert("There is no Bg Image");
  } else {
    try {
      console.log(image);
      
      const response = await fetch(image);
      const blob = await response.blob();
      console.log(blob);
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "unsplash-image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }
};

newQuoteBttn.addEventListener("click", addQuoteAuthor);

twitter.addEventListener("click", shareInTwitter);

download.addEventListener("click", downloadBgImage);

copy.addEventListener("click", copyToClipboard);
