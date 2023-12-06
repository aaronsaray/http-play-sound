# HTTP Play Sound

This is a very simple tool to play a sound locally in response to an HTTP post request.  

My use case is that I have a HomeKit Homebridge virtual switch that can post a message when it's pressed.  The posted message will hit this software and then play a door chime sound. This will be running on a rapsberry pi with external speakers connected.

## Configuration

* Install pm2: `sudo npm install -g pm2`
* Checkout code: `git clone git@github.com:aaronsaray/http-play-sound.git`
* Change directory: `cd http-play-sound`
* Install with NPM `npm install`
* Run init command (You don't have to but you most likely will want to) `npm run init`
* Copy `.env.example` to `.env` and customize it if you wish (This specifies the port. The default is 30080)
* Start with PM2: `pm2 start index.js`
* Generate start up script and follow instructions: `pm2 startup systemd`
* Save dump file (for reboots): `pm2 save`

## Usage

Make sure speakers are on!

All of these URLs are prefixed with `http://your-host-here:30080` where `your-host-here` is the machine running this software and `30080` matches the port configured in the `.env` file.

### List of Sounds

**GET** `/list` - This will show you a list of URLs that indicate files that can be played from HTTP POST requests.

Example with CURL that lists all available items to play

```
curl -X GET http://localhost:30080/list
```

**POST** `/play/:name` - Plays the MP3 file locally based on `${name}.mp3`.  If you ran `npm run init`, you should have two out of the box: `/play/emergency` and `/play/chime`.  You will get a 422 validation error if the sound can not be found.

Example with CURL that plays the chime sound

```
curl -X POST http://localhost:30080/play/chime
```

**POST** `/upload` with multiform data an MP3 file as a field named `mp3`.  You will get a 422 validation error if the upload fails - for example, the file already exists.

Example with CURL to upload a local file to the system - ready to be played at `/play/party`

```
curl -F 'mp3=@/Users/aaron/Downloads/party.mp3' http://localhost:30080/upload
```

Note that these are uploaded to a local `uploads` folder in this project. You can delete them by hand if you no longer need them.

## Security

This is meant to run locally and in your home network.  That being said, it's always good to validate data. In this case, I did very basic validation. Pull requests would be accepted for better validation. Do not open this to the outside world.

## Credits

[MP3 Sound included in repository](http://soundbible.com/1599-Store-Door-Chime.html)

[MP3 Sound included in repository](https://soundbible.com/1577-Siren-Noise.html)
