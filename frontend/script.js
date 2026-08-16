const visitorCount = document.getElementById("visitor-count");

fetch("https://sarrzo6vq7.execute-api.eu-north-1.amazonaws.com/visitors")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    visitorCount.textContent = data.count;
  })
  .catch((error) => {
    console.error("Failed to retrieve visitor count:", error);
    visitorCount.textContent = "—";
  });