class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/gameboard.png");

    this.load("red", "assets/red.png");
    this.load("yellow", "assets/yellow.png");
    this.load("restartbtn", "assets/restart.png");
    this.load("easybtn", "assets/easybtn.png");
    this.load("playbtn", "assets/playbtn.png");
    this.load("hardbtn", "assets/hardbtn.png");
  }
}
