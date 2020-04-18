//Renkui (Gary) Ye
//gary.ye@uwaterloo.ca, 6472301872
//All tasks completed, including extra credit, excluding publishing to a domain

//Extra Credit 1. Changing copy/URLs
class ElementHandler {
  element(element){
    //title
    if (element.tagName === 'title') {
      element.setInnerContent('New Title!!!');
    }
    //h1#title
    else if (element.tagName === "h1") {
      element.setInnerContent('New Main Title!!!');
    }
    //p#description
    else if (element.tagName === 'p') {
      element.setInnerContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate velit id lacinia bibendum.");
    }
    //a#url
    else if (element.tagName ==='a') {
      element.setInnerContent("Here's a cute seal");
      element.setAttribute('href', "https://imgur.com/r/aww/h66Adat");
    }
  }
}


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
async function handleRequest(request) {
  // 1. Request the URLs from the API
  const data = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
      .then(res=>res.json());
  const variants = data.variants;
  //Extra Credit 2. Persisting variants
  const cookie = request.headers.get('cookie');
  let selVar;
  if (cookie && cookie.includes("url=https://cfw-takehome.developers.workers.dev/variants/")){
    selVar = cookie.substring(cookie.indexOf("https://"));
  } else {
    // 2. Request a (random: see #3) variant
    selVar = variants[Math.round(Math.random())];
  }
  // 3. Distribute requests between variants
  const page = await fetch(selVar);
  let response = new HTMLRewriter().on('*', new ElementHandler()).transform(page);
  const header = "url="+selVar;
  response.headers.append("Set-Cookie", header);
  return response;
}
