// =========================
// МУЗЫКА
// =========================

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playButton");
const progressBar = document.getElementById("progressBar");
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


// Обновление времени и полоски
audio.addEventListener("timeupdate", function () {

    currentTime.textContent = formatTime(audio.currentTime);

    if (audio.duration) {

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progressBar.style.width = percent + "%";

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
const hoverElements = document.querySelectorAll(
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


// Закрыть Discord при клике вне окна
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

    const views = document.getElementById("views");

    try {

        // Добавляем +1 просмотр
        await viewCounter.up("first-counter-5755");


        // Получаем актуальное общее значение напрямую из API
        const response = await fetch(
            "https://api.counterapi.dev/v2/ftapov/first-counter-5755"
        );


        const result = await response.json();

        console.log("COUNTER:", result);


        // Показываем число
        views.textContent = result.data.up_count;

    } catch (error) {

        console.error("Ошибка счётчика:", error);

        // Если API временно не работает,
        // хотя бы оставляем 0
        views.textContent = "0";

    }

}


updateViews();
