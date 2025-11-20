document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
  const diary = document.getElementById("diary");
  const audio = document.getElementById("bgm");
  const rotateScreen = document.getElementById("rotate-screen");

  // Hàm check orientation cho diary
  function checkOrientationDiary() {
    if (window.innerWidth <= 900 && window.matchMedia("(orientation: portrait)").matches) {
      rotateScreen.classList.add("show");
      diary.classList.add("hidden");  // ẩn diary nếu portrait
    } else {
      rotateScreen.classList.remove("show");
      diary.classList.remove("hidden"); // hiện diary khi landscape
    }
  }

  // Mở bìa sách
  cover.addEventListener("click", () => {
    cover.style.transition = "all 1.5s ease";
    cover.style.transform = "rotateY(180deg)";
    cover.style.opacity = "0";

    setTimeout(() => {
      cover.classList.add("hidden");
      diary.classList.remove("hidden");

      // Chỉ phát nhạc khi mở bìa
      audio.play().catch(() => {});

      // Bắt đầu check orientation cho diary
      checkOrientationDiary();
      window.addEventListener("resize", checkOrientationDiary);
      window.addEventListener("orientationchange", () => setTimeout(checkOrientationDiary, 300));
    }, 1500);
  });

  // Hoa rơi
  function createPetal() {
    const petal = document.createElement("div");
    petal.style.position = "absolute";
    petal.style.width = "20px";
    petal.style.height = "20px";
    petal.style.background = "radial-gradient(circle, #ff69b4, #ff1493)";
    petal.style.borderRadius = "100% 0 100% 0";
    petal.style.opacity = Math.random() * 0.8 + 0.2;
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = "-20px";
    petal.style.animation = `fall ${5 + Math.random() * 10}s linear forwards`;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.getElementById("petals").appendChild(petal);

    setTimeout(() => petal.remove(), 15000);
  }

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(720deg);
      }
    }
  `;
  document.head.appendChild(style);
  setInterval(createPetal, 300);

  // Bấm bất kỳ để bật nhạc (nếu trình duyệt chặn autoplay)
  document.body.addEventListener("click", () => audio.play(), { once: true });
});
