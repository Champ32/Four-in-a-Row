class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/gameboard.png");

    this.load.spritesheet("ship", "assets/red.png");
    this.load.spritesheet("ship", "assets/yellow.png");
    this.load.spritesheet("ship", "assets/restart.png");
  }
}
