// Запуск игры
document.getElementById("start-btn").addEventListener("click", function () {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0.4;
    music.play().catch(() => {});
  }
});

// Сообщения по эмодзи
const memoryMessages = {
  "🏕️": "Лучший ДР🌠",
  "🚞": "Вайб в поезде🚂",
  "🎞️": "Твое хобби = 😍",
  "🗿": 'Без комментариев 😤',
  "🚤": "Покорим любую волну🌊",
  "😻": "Самая красивая✨",
  "📸": "Самая фотогеничная📷",
  "💌": "Благодаря тебе у меня есть клевые фотки💘",
  "🧡": "мы)",
  "👾": "Топ свиданка🎮",
  "😁": "Комментарии?...😁",
  "🥞": "Масленница :*",

};

// Фото по эмодзи (указать путь к изображениям)
const memoryMedia = {
  "🎞️": "plenka.jpg",
  "🗿": "kamen.jpg",
  "🚤": "lodki.jpg",
  "🏕️": "domik.jpg",
  "🚞": "poezd.jpg",
  "😻": "krasotka.jpg",
  "📸": "lesya.jpg",
  "💌": "me.jpg",
  "🧡": "we.jpg",
  "👾": "game.jpg",
  "😁": "ugar.jpg",
  "🥞": "blin.jpg",
};

// Обработка клика на воспоминание
document.querySelectorAll(".memory").forEach(memory => {
  memory.addEventListener("click", function () {
    const emoji = this.textContent;
    const message = memoryMessages[emoji] || "Этот момент бесценен...";
    const media = memoryMedia[emoji];

    const popup = document.createElement("div");
    popup.className = "popup-message";

    const isVideo = media && media.endsWith(".mp4");

    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-emoji">${emoji}</span>
        <p>${message}</p>
        ${
          media
            ? isVideo
              ? `<video class="popup-media" controls>
                   <source src="${media}" type="video/mp4">
                   Ваш браузер не поддерживает видео.
                 </video>`
              : `<img class="popup-media" src="${media}" alt="Memory">`
            : ""
        }
        <button class="close-btn">Закрыть</button>
      </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".close-btn").addEventListener("click", () => {
      popup.classList.add("fade-out");
      setTimeout(() => {
        popup.remove();
        memory.style.display = "none";
        checkAllFound();
      }, 500);
    });
  });
});

// Проверка на завершение игры
function checkAllFound() {
  const remaining = document.querySelectorAll('.memory:not([style*="display: none"])');
  if (remaining.length === 0) {
    setTimeout(() => {
      document.getElementById("game-screen").style.display = "none";
      document.getElementById("end-screen").style.display = "block";
      for (let i = 0; i < 100; i++) {
        createConfetti();
      }
    }, 1000);
  }
}

// Конфетти
function createConfetti() {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  document.getElementById("end-screen").appendChild(confetti);
}

// Перезапуск
document.getElementById("restart-btn").addEventListener("click", () => location.reload());

// Хвостик-сердечки за курсором
let canSpawnHeart = true;

document.addEventListener("mousemove", (e) => {
  if (!canSpawnHeart) return;

  canSpawnHeart = false;

  const heart = document.createElement("div");
  heart.className = "cursor-heart";
  heart.textContent = "🌸";
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);

  setTimeout(() => {
    canSpawnHeart = true;
  }, 200);
});
