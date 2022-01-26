import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// Сохраняем время в локальное хранилище

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

// Делаем обновление раз в секунду

player.on('timeupdate', throttle(onPlay, 1000));

// Получаем текущее время

const savedTime = localStorage.getItem('videoplayer-current-time');
const parsedTime = JSON.parse(savedTime);
const currentTime = parsedTime.seconds;

// console.log(currentTime);

// Делаем сброс, если видео закончилось

if (currentTime === 571.52) {
  localStorage.removeItem('videoplayer-current-time');
} else {
  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
