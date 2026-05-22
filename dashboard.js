// SIMPLE PASSWORD
function login(){
  const pass = document.getElementById("adminPass").value;
  const error = document.getElementById("error");

  if(pass === "admin123"){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    error.innerText = "Wrong password!";
  }
}// POST ANNOUNCEMENT
function postAnnouncement(){

  let title = document.getElementById("title").value;
  let message = document.getElementById("message").value;
  let image = document.getElementById("image").value;

  if(!title || !message){
    alert("Please fill all required fields");
    return;
  }

  let announcements = JSON.parse(localStorage.getItem("announcements")) || [];

  let newPost = {
    id: Date.now(),
    title: title,
    message: message,
    image: image || "images/default.jpg",
    date: new Date().toLocaleDateString()
  };

  announcements.unshift(newPost);

  localStorage.setItem("announcements", JSON.stringify(announcements));

  alert("Announcement Posted Successfully!");
}
let home = JSON.parse(localStorage.getItem("announcements")) || [];

let homeBox = document.getElementById("homeAnnouncements");

home.slice(0,3).forEach(item => {

  homeBox.innerHTML += `
    <div class="ann-card">

      <div class="ann-img" style="background-image:url('${item.image}')"></div>

      <div class="ann-content">

        <h3>${item.title}</h3>
        <p>${item.message.substring(0,80)}...</p>
        <span class="date">${item.date}</span>

      </div>

    </div>
  `;

});
firebase.database().ref("announcements").push({
  title: titleInput.value,
  message: messageInput.value,
  date: new Date().toLocaleString()
});
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

      container.innerHTML += `
        <div class="announcement-item">
          <h4>${data.title}</h4>
          <p>${data.message}</p>
          <small>${data.date || ""}</small>
        </div>
      `;
    });
  }, (error) => {
    console.log("Load error:", error);
  });
}

loadAnnouncements();