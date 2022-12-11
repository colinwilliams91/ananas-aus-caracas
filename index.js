var ROT = require("rot.js");

// #!/usr/bin/env node

const ROT = require("../..");

const o = {
	width: 11,
	height: 5,
	layout: "term"
}
let d = new ROT.Display(o);

for (let i=0; i<o.width; i++) {
	for (let j=0; j<o.height; j++) {
		if (!i || !j || i+1 == o.width || j+1 == o.height) {
			d.draw(i, j, "#", "gray");
		} else {
			d.draw(i, j, ".", "#666");
		}
	}
}
d.draw(o.width >> 1, o.height >> 1, "@", "goldenrod");


var Game = {
  display: null,

  init: function() {
    // <-- output prints to "tty console" html <canvas> -->
    // <-- ROT.DEFAULT_WIDTH and ROT.DEFAULT_HEIGHT --> to change size...
    this.display = new ROT.display();
    document.body.appendChild(this.display.getContainer());
    this._generateMap();
  }
}

Game.map = {};
Game._generateMap = () => {
  let digger = new ROT.Map.Digger();

  let digCallback = (x, y, value) => {
    if (value) { return; }

    let key = x + "," + y;
    this.map[key] = ".";
  }
  digger.create(digCallback.bind(this));
  this._drawWholeMap();
}

Game._drawWholeMap = () => {
  for (let key in this.map) {
    let parts = key.split(",");
    let x = parseInt(parts[0]);
    let y = parseInt(parts[1]);
    this.display.draw(x, y, this.map[key]);
  }
}