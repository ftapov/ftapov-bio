// =========================
// МУЗЫКА
// =========================

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");


// Play / Pause
playBtn.addEventListener("click", function () {

    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

});


// Формат времени 0:00
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" + secs.toString().padStart(2, "0");
}


// Когда музыка загрузилась
audio.addEventListener("loadedmetadata", function () {

    duration.textContent = formatTime(audio.duration);

});


// Обновление полоски музыки
audio.addEventListener("timeupdate", function () {

    currentTime.textContent = formatTime(audio.currentTime);

    if (audio.duration) {

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percent;

    }

});


// Перемотка музыки
progress.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// =========================
// ENTER SCREEN
// =========================

const enterScreen = document.getElementById("enterScreen");
const profile = document.querySelector(".profile");

enterScreen.addEventListener("click", function () {

    enterScreen.style.display = "none";

    profile.classList.add("show");

    audio.play()
        .then(function () {

            playBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        })
        .catch(function () {

            console.log("Музыка не запустилась");

        });

});


// =========================
// КАСТОМНЫЙ КУРСОР
// =========================

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", function (event) {

    cursorDot.style.left = event.clientX + "px";
    cursorDot.style.top = event.clientY + "px";

    cursorRing.style.left = event.clientX + "px";
    cursorRing.style.top = event.clientY + "px";

});


// Увеличение курсора при наведении
const hoverElements =
    document.querySelectorAll(
        "a, button, .progress, #enterScreen"
    );

hoverElements.forEach(function (element) {

    element.addEventListener("mouseenter", function () {

        cursorRing.classList.add("hover");

    });

    element.addEventListener("mouseleave", function () {

        cursorRing.classList.remove("hover");

    });

});


// =========================
// DISCORD POPUP
// =========================

const discordLink = document.getElementById("discordLink");
const discordPopup = document.getElementById("discordPopup");
const closeDiscord = document.getElementById("closeDiscord");


// Открыть Discord
discordLink.addEventListener("click", function (event) {

    event.preventDefault();

    discordPopup.classList.add("show");

});


// Закрыть Discord
closeDiscord.addEventListener("click", function () {

    discordPopup.classList.remove("show");

});


// Закрыть при клике за окном
discordPopup.addEventListener("click", function (event) {

    if (event.target === discordPopup) {

        discordPopup.classList.remove("show");

    }

});


// =========================
// СЧЁТЧИК ПРОСМОТРОВ
// =========================

const viewCounter = new Counter({
    workspace: "ftapov"
});

async function updateViews() {
    try {
        // +1 просмотр
        await viewCounter.up("first-counter-5755");

        // Получаем актуальное значение
        const result = await viewCounter.get("first-counter-5755");

        console.log("COUNTER:", result);

        document.getElementById("views").textContent =
            result.data.up_count;

    } catch (error) {
        console.error("Ошибка счётчика:", error);
    }
}

updateViews();
