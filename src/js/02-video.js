import Player from '@vimeo/player';
import _ from 'lodash.throttle';

var iframe = document.getElementById('vimeo-player');
var player = new Player(iframe);
const key = 'videoplayer-current-time';
player.setCurrentTime(localStorage.getItem(key));

const onTimeUpdate = ({ seconds }) => {
  localStorage.setItem(key, seconds);
  console.log(seconds);
};
const throtteledOnTimeUpdate = _(onTimeUpdate, 1000);

player.on('timeupdate', throtteledOnTimeUpdate);
