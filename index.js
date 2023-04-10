const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let startTime, requestId;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (duration) => {
    startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(duration - elapsedTime, 0);
      const remainingSeconds = Math.floor(remainingTime / 1000);

      timerEl.textContent = formatTime(remainingSeconds);

      if (remainingTime > 0) {
        requestId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(requestId);
        timerEl.textContent = 'Time is up';
      }
    };

    requestId = requestAnimationFrame(animate);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
    inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds * 1000);

  inputEl.value = '';
});
