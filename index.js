const player = require("play-sound")();

const app = require("express")();

app.get("/chime", (req, res) => {
  player.play("chime.mp3", {}, null);
  res.status(204).send();
});

app.listen(30080);
