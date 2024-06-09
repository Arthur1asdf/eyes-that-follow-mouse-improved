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

    const maxEffectDistance = Math.max(radiusX, radiusY) * 4;
    const influence = Math.min(cursorDistance / maxEffectDistance, 1);

    const maxPupilDistanceX = radiusX * influence;
    const maxPupilDistanceY = radiusY * influence;

    const angle = Math.atan2(distanceY, distanceX);

    const extendBoundary = 1.2;
    const pupilX = extendBoundary * maxPupilDistanceX * Math.cos(angle);
    const pupilY = extendBoundary * maxPupilDistanceY * Math.sin(angle);

    pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
  });
});
