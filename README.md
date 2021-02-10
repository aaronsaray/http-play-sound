# HTTP Play Sound

This is a very simple example or proof-of-concept of how you can receive a HTTP post request to play a sound.  My use case is that I have a HomeKit Homebridge virtual switch that can post a message when it's pressed.  The posted message will hit this software and then play a door chime sound. This will be running on a rapsberry pi with external speakers connected.

## Configuration

* Install pm2: `sudo npm install -g pm2`
* Checkout code: `git clone git@github.com:aaronsaray/http-play-sound.git`
* Change directory: `cd http-play-sound`
* Install NPM `npm install`
* Start with PM2: `pm2 start index.js`
* Generate start up script and follow instructions: `pm2 startup systemd`
* Save dump file (for reboots): `pm2 save`

## Usage

* Make sure speakers are on
* Post to `http://your-host-here:30080/chime` for a chime
* Post to `http://your-host-here:30080/emergency` for a chime

## Credits

[MP3 Sound included in repository](http://soundbible.com/1599-Store-Door-Chime.html)

[MP3 Sound included in repository](https://soundbible.com/1577-Siren-Noise.html)
