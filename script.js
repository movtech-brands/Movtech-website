// MENU
function openMenu(){
  document.getElementById("menu").classList.add("show");
}

function closeMenu(){
  document.getElementById("menu").classList.remove("show");
}

// SLIDER
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);
// COUNTER ANIMATION
const counters = document.querySelectorAll('.count');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 100;

    if(current < target){
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});
// SCROLL REVEAL
function reveal(){

  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(item => {

    const windowHeight = window.innerHeight;
    const top = item.getBoundingClientRect().top;

    if(top < windowHeight - 100){
      item.classList.add("active");
    }

  });

}

window.addEventListener("scroll", reveal);

reveal();
document.addEventListener("DOMContentLoaded", () => {

    /* HAMBURGER MENU */

    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    hamburger.addEventListener("click", (e) => {

        e.stopPropagation();

        mobileMenu.classList.toggle("active");

    });

    /* CLOSE MENU WHEN CLICKING OUTSIDE */

    document.addEventListener("click", (e) => {

        if (
            !mobileMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            mobileMenu.classList.remove("active");
        }

    });

    /* HERO SLIDER */

    const slides = document.querySelectorAll(".slide");

    let currentSlide = 0;

    setInterval(() => {

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slides[currentSlide].classList.add("active");

    }, 4000);

});
function openDashboard(){

    const password = prompt("Enter Dashboard Password");

    if(password === "movtech123"){

        window.location.href = "dashboard.html";

    }else{

        alert("Wrong Password");

    }

}
function loadAnnouncements() {
  const container = document.getElementById("announcement-list");

  firebase.database().ref("announcements").on("value", (snapshot) => {
    container.innerHTML = "";

    if (!snapshot.exists()) {
      container.innerHTML = "<p>No announcements yet.</p>";
      return;
    }

    snapshot.forEach((child) => {
      const data = child.val();

      const div = document.createElement("div");
      div.classList.add("announcement-item");

      div.innerHTML = `
        <h4>${data.title}</h4>
        <p>${data.message}</p>
        <small>${data.date || ""}</small>
      `;

      container.appendChild(div);
    });
  });
}

loadAnnouncements();