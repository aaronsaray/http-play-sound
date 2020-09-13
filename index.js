// Testing running playing a sound

const player = require('play-sound')();

player.play('chime.mp3', {}, err => {
    console.log(err);
});