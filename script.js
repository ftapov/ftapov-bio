let audio = document.getElementById("audio");
let playButton = document.getElementById("playButton");

playButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "❚❚";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
});

audio.addEventListener("timeupdate", function () {
    let progress = (audio.currentTime / audio.duration) * 100;

    document.getElementById("progressBar").style.width = progress + "%";
});
audio.addEventListener("loadedmetadata", function () {
    document.getElementById("duration").textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function () {
    document.getElementById("currentTime").textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    return minutes + ":" + secs;
}
let progressLine = document.querySelector(".progress");

progressLine.addEventListener("click", function (event) {
    let clickPosition = event.offsetX;
    let lineWidth = progressLine.clientWidth;

    let percent = clickPosition / lineWidth;

    audio.currentTime = percent * audio.duration;
    if (audio.paused) {
    playButton.textContent = "▶";
} else {
    playButton.textContent = "❚❚";
}
});
audio.addEventListener("play", function () {
    playButton.textContent = "❚❚";
});

audio.addEventListener("pause", function () {
    playButton.textContent = "▶";
});
let enterScreen = document.getElementById("enterScreen");
let profile = document.querySelector(".profile");

enterScreen.addEventListener("click", function () {
    audio.currentTime = 0;
    audio.play();

    enterScreen.style.opacity = "0";

    setTimeout(function () {
        enterScreen.style.display = "none";
        profile.classList.add("show");
    }, 250);
});
let cursorDot = document.querySelector(".cursor-dot");
let cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", function (event) {
    cursorDot.style.left = event.clientX + "px";
    cursorDot.style.top = event.clientY + "px";

    cursorRing.style.left = event.clientX + "px";
    cursorRing.style.top = event.clientY + "px";
});
let clickableElements = document.querySelectorAll(
    "a, button, .progress, #enterScreen"
);

clickableElements.forEach(function (element) {

    element.addEventListener("mouseenter", function () {
        cursorRing.classList.add("active");
    });

    element.addEventListener("mouseleave", function () {
        cursorRing.classList.remove("active");
    });

});


let discordLink = document.getElementById("discordLink");
let discordPopup = document.getElementById("discordPopup");
let closeDiscord = document.getElementById("closeDiscord");

discordLink.addEventListener("click", function (event) {
    event.preventDefault();

    discordPopup.classList.add("show");
});

closeDiscord.addEventListener("click", function () {
    discordPopup.classList.remove("show");
});

discordPopup.addEventListener("click", function (event) {

    if (event.target === discordPopup) {
        discordPopup.classList.remove("show");
    }

});
let discordName = document.getElementById("discordName");
let copyNotification = document.getElementById("copyNotification");

discordName.addEventListener("click", function () {

    copyNotification.classList.add("show");

    navigator.clipboard.writeText("ftapov").catch(function () {
        console.log("Копирование недоступно локально");
    });

    setTimeout(function () {
        copyNotification.classList.remove("show");
    }, 1500);

});