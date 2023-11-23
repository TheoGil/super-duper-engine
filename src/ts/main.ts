import "../css/style.css";

import kaboom from "kaboom";

const settings = {
  player: {
    width: 60,
    height: 100,
    radius: 10,
    speed: 640,
    jumpForce: 1200,
  },
  groundThickness: window.innerHeight / 3,
  colors: {
    background: "#EAFFD0",
    ground: "#95E1D3",
    player: "#F38181",
    other: "#FCE38A",
  },
  gapWidth: 600,
};

const k = kaboom({ global: false, background: settings.colors.background });
k.setGravity(4000);

const playerColor = k.Color.fromHex(settings.colors.player);

const groundWidth = k.width() / 2 - settings.gapWidth / 2;

// Ground left
k.add([
  k.color(playerColor),
  k.rect(groundWidth, settings.groundThickness),
  k.outline(2, k.rgb(0, 0, 0)),
  k.area(),
  k.pos(0, k.height() - settings.groundThickness),
  k.body({ isStatic: true }),
]);

// Ground left
k.add([
  k.color(playerColor),
  k.rect(groundWidth, settings.groundThickness),
  k.outline(2, k.rgb(0, 0, 0)),
  k.area(),
  k.pos(k.width() - groundWidth, k.height() - settings.groundThickness),
  k.body({ isStatic: true }),
]);

// Left wall
k.add([
  k.area({ shape: new k.Rect(k.vec2(), 100, k.height() * 2) }),
  k.pos(-100, 0),
  k.body({ isStatic: true }),
]);

// Right wall
k.add([
  k.area({ shape: new k.Rect(k.vec2(), 100, k.height()) }),
  k.pos(k.width(), 0),
  k.body({ isStatic: true }),
]);

const playerSpawnPosition = k.vec2(groundWidth / 2, 0);

// Player
const player = k.add([
  k.rect(settings.player.width, settings.player.height, {
    radius: settings.player.radius,
  }),
  k.color(playerColor),
  k.outline(2, k.rgb(0, 0, 0)),
  k.area(),
  k.anchor("center"),
  k.pos(playerSpawnPosition),
  k.body({ jumpForce: settings.player.jumpForce }),
  k.rotate(0),
]);

function movePlayer(x: number) {
  player.move(x, 0);
}

function respawnPlayer() {
  player.pos.x = playerSpawnPosition.x;
  player.pos.y = playerSpawnPosition.y;
  player.vel.x = 0;
}

k.onKeyDown("left", () => {
  movePlayer(-settings.player.speed);
});

k.onKeyDown("right", () => {
  movePlayer(settings.player.speed);
});

k.onKeyPress("space", () => {
  if (player.isGrounded()) {
    player.jump();
  }
});

k.onUpdate(() => {
  if (player.pos.y >= k.height()) {
    respawnPlayer();
  }
});
