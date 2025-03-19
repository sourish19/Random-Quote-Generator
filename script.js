const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

const quoteContainer = document.getElementById("quote-container");
const newQuoteBttn = document.getElementById("new-quote");
const twitter = document.getElementById("twitter");
const copy = document.getElementById("copy");
const download = document.getElementById("download");
const quoteUrl = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

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

const bgImage = () => {
  const minCeiled = 0;
  const maxFloored = 3;
  const randomImageIndex = Math.floor(
    Math.random() * (maxFloored - minCeiled + 1) + minCeiled
  );
  console.log(randomImageIndex);

  document.body.style.backgroundImage = `url(${images[randomImageIndex].url})`;
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
