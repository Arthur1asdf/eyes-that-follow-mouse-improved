let lastTime = 0;
document.addEventListener("mousemove", function (e) {
  const currentTime = Date.now();
  if (currentTime - lastTime < 16) return; // Throttle updates to roughly 60Hz
  lastTime = currentTime;

  const eyeballs = document.querySelectorAll(".eyeball");

  eyeballs.forEach((eyeball) => {
    const pupil = eyeball.querySelector(".pupil");

    const eyeballRect = eyeball.getBoundingClientRect();

    const centerX = eyeballRect.left + eyeballRect.width / 2;
    const centerY = eyeballRect.top + eyeballRect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const cursorDistance = Math.sqrt(
      distanceX * distanceX + distanceY * distanceY
    );

    const radiusX = eyeballRect.width / 2 - pupil.offsetWidth / 2;
    const radiusY = eyeballRect.height / 2 - pupil.offsetHeight / 2;

    const maxEffectDistance = Math.max(radiusX, radiusY) * 60;
    const influence = Math.min(cursorDistance / maxEffectDistance, 1);

    const maxPupilDistanceX = radiusX * influence;
    const maxPupilDistanceY = radiusY * influence;

    const angle = Math.atan2(distanceY, distanceX);

    const extendBoundary = 1.7;
    const pupilX = extendBoundary * maxPupilDistanceX * Math.cos(angle);
    const pupilY = extendBoundary * maxPupilDistanceY * Math.sin(angle);

    pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
  });
});

const hideBocchiOuterRadius = document.getElementById("hideBocchiOuterRadius");
const pupil1 = document.getElementById("pupil1");
const pupil2 = document.getElementById("pupil2");
hideBocchiOuterRadius.addEventListener("mouseover", () => {
  pupil1.style.backgroundImage = "url('/images/dotPupil.png')";
  pupil2.style.backgroundImage = "url('/images/dotPupil.png')";
  pupil1.style.backgroundSize = "900%";
  pupil2.style.backgroundSize = "900%";
  pupil1.style.backgroundPosition = "50% 50%";
  pupil2.style.backgroundPosition = "50% 50%";
});
hideBocchiOuterRadius.addEventListener("mouseout", () => {
  pupil1.style.backgroundImage = "url('/images/bocchi-eye.png')";
  pupil2.style.backgroundImage = "url('/images/bocchi-eye2.png')";
  pupil1.style.backgroundSize = "1200%";
  pupil2.style.backgroundSize = "1200%";
  pupil1.style.backgroundPosition = "45% 47%";
  pupil2.style.backgroundPosition = "63% 52%";
});

const hideBocchi = document.getElementById("hideBocchi");
const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");
const bocchi = document.getElementById("bocchi");
const bulgingBocchi = document.getElementById("bulgingBocchi");
let bocchiHidden = false;
let bocchiPop;
hideBocchi.addEventListener("click", () => {
  clearTimeout(bocchiPop);
  if (!bocchiHidden) {
    bocchi.style.display = "none";
    bocchiHidden = true;

    leftEye.style.width = "180px";
    rightEye.style.width = "160px";
    leftEye.style.height = "110px";
    rightEye.style.height = "100px";

    leftEye.style.borderRadius = "40px 90px 90px 60px";
    rightEye.style.borderRadius = "40px 80px 80px 60px";
    bocchiPop = setTimeout(() => {
      bulgingBocchi.style.display = "none";
    }, 2000);
  } else {
    bocchiHidden = false;
    bocchi.style.display = "block";
    bulgingBocchi.style.display = "block";
    leftEye.style.width = "90px";
    rightEye.style.width = "80px";
    leftEye.style.height = "90px";
    rightEye.style.height = "80px";
    leftEye.style.borderRadius = "50%";
    rightEye.style.borderRadius = "50%";
  }
});
