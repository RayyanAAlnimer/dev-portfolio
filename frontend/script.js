const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

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