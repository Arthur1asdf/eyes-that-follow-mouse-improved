let lastTime = 0;
document.addEventListener("mousemove", function (e) {
  const currentTime = Date.now();
  if (currentTime - lastTime < 16) return; // Throttle updates to roughly 60Hz
  lastTime = currentTime;
  const eyeball = document.querySelector(".eyeball");
  const pupil = document.querySelector(".pupil");
  const eyeballRect = eyeball.getBoundingClientRect();

  // Center of the eyeball
  const centerX = eyeballRect.left + eyeballRect.width / 2;
  const centerY = eyeballRect.top + eyeballRect.height / 2;

  // Distance from the center of the eyeball to the mouse position
  const distanceX = e.clientX - centerX;
  const distanceY = e.clientY - centerY;

  // Calculate the distance from the eyeball center to the cursor
  const cursorDistance = Math.sqrt(
    distanceX * distanceX + distanceY * distanceY
  );

  // Maximum radius the pupil can move is different for x and y due to oval shape
  const radiusX = eyeballRect.width / 2 - pupil.offsetWidth / 2;
  const radiusY = eyeballRect.height / 2 - pupil.offsetHeight / 2;

  // Calculate the ratio of the cursor distance to a maximum effect distance
  const maxEffectDistance = Math.max(radiusX, radiusY) * 4;
  const influence = Math.min(cursorDistance / maxEffectDistance, 1);

  // Calculate the maximum pupil distance based on the influence
  const maxPupilDistanceX = radiusX * influence;
  const maxPupilDistanceY = radiusY * influence;

  // Angle from the center of the eyeball to the mouse cursor
  const angle = Math.atan2(distanceY, distanceX);

  // New position of the pupil
  const pupilX = 1.01 * maxPupilDistanceX * Math.cos(angle);
  const pupilY = 1.01 * maxPupilDistanceY * Math.sin(angle);

  // Apply the new position, centered around the middle of the pupil
  pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
});
