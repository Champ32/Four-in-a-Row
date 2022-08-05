 class MenuScene extends Phaser.Scene{
    constructor(){
       super("playGame");
    }
    init(data){
        console.log(data);
        console.log("data here")
    }
    create(){
        this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.20, "logo").setDepth(1);
        this.add.image(0,0,"title_bg").setOrigin(0).setDepth(0);

       let playbutton = this.add.image(this.game.renderer.width /2, this.game.renderer.height /2, "play_button").setDepth(1);

        this.add.image(this.game.renderer.width /2, this.game.renderer.height /2 +100, "option").setDepth(1);

        playbutton.setInteractive();
        playbutton.on("pointerdown",()=> this.scene.start('game'));
    }
}