var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var riddle = null;
var riddleanswer= "";
var combo = 0;

function preload() {

    this.load.image('background', 'assets/background/background.jpg');
    this.load.image('shuriken', 'assets/weapons/shuriken.png');
    this.load.spritesheet('ninja', 'assets/ninja/ninja.png', 232, 439);
    this.load.spritesheet('zombie', 'assets/zombie/zombie.png', 430, 519);


}

function create() {
    this.background = this.game.add.sprite(0, 0, 'background');
    this.ninja = this.game.add.sprite(100, 180, 'ninja');
    this.ninja.scale.setTo(0.30);
    this.ninja.animations.add('left', [0, 1, 2, 3], 10, true);
    this.ninja.animations.play('left');

    this.zombie = this.game.add.sprite(100, 160, 'zombie');
    this.zombie.scale.setTo(-0.30, 0.30);
    this.zombie.animations.add('left', [0, 1, 2, 3], 10, true);
    this.zombie.animations.play('left');
    maingame();



    game.physics.enable([this.zombie, this.ninja], Phaser.Physics.ARCADE);

    ////////////////////////////////////////////////////////////////Key Input////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(function() {
        var input = [];
        $(window).keypress(function(e) {
            var key = e.which;

            //List of key-codes->https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

            switch (key) {
                ////////////////Enter Key Behavior//////////////////
                case 13:
                    var clear = String.fromCharCode.apply(null, input);
                    if (clear==riddleanswer){
                    console.log("yup");
                    this.shuriken = this.game.add.sprite(100, 160, 'shuriken');
                    game.physics.enable([this.shuriken], Phaser.Physics.ARCADE);
                    this.shuriken.body.velocity.x= +200;
                    collisionHandler(this.shuriken,this.zombie)
                    maingame();
                    }
                    input = []
                    break;
                    ////////////////Backspace key Behavior//////////////////
                case 8:

                    console.log("something else pressed space pressed");

                    break;
                    ////////////////Rest of keys Behavior//////////////////
                default:
                    input.push(key)
                    var clear = String.fromCharCode.apply(null, input);
                    //console.log(String.fromCharCode.apply(null, input));
                    //console.log(clear);
            }

        });
    });
    ////////////////////////////////////////////////////////////////Key Input END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

function update() {






    game.physics.arcade.collide(this.zombie, this.ninja, collisionHandler, null, this);

    this.zombie.x -= 2;

    if (this.zombie.x < -this.zombie.width) {
        this.zombie.x = game.world.width;
    }

    if (this.shuriken!=null){
     this.shuriken.body.velocity.x= -100;
    }

}

function collisionHandler(obj1, obj2) {

    if (obj1==this.shuriken&&obj2==this.zombie){
      console.log("dead")

      zombie.destroy();
    }
    game.stage.backgroundColor = '#992d2d';

}

function shootquestion(question) {

}

function maingame(){
  var style = {
      font: "20px Courier",
      fill: "#fff",
      tabs: [164, 120, 80]
  };
  var riddlelist = [
      ["Name the command to change directory", "cd"],
      ["Name the command to list directory", "ls"],
      ["Name the command to rm directory", "rm"]
  ];

  Random = Math.floor((Math.random() * riddlelist.length) + 0);
  riddleanswer=riddlelist[Random][1]
  if (riddle != null) {
      riddle.destroy();
      var riddletext = game.add.text(320, 400, riddlelist[Random][0], style);
  }
  if (riddle == null) {
      var riddletext = game.add.text(320, 400, riddlelist[Random][0], style);
  }

  function attack(){
  //function to attack


}
}
