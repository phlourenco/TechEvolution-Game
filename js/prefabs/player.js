//Prefab dos players. Extende da classe Sprite do Phaser

var EvolutionGame = EvolutionGame || {};

EvolutionGame.Player = function(game, x, y, key, level, evoluido) {
	Phaser.Sprite.call(this, game, x, y, key);

	this.game = game;

	this.name = 'player' + getRandomInt(1, 50);
	this.isBox = true;
	this.level = level;

	// console.log(this.position);

	this.lastPosition = this.position;

	this.lastX = this.position.x;
	this.lastY = this.position.y;

	this.anchor.setTo(0.5);
	this.scale.setTo(0.1);


	// console.log(this);

	this.inputEnabled = true;

	if (evoluido) {
		this.openBox(true);
	}

	this.input.pixelPerfectClick = true;

	this.events.onInputUp.add(this.onClick, this);
	// this.input.enableDrag();
    this.events.onDragStart.add(this.onMoveStart, this);
    this.events.onDragStop.add(this.onMoveEnd, this);
    this.events.onDragUpdate.add(this.onMoving, this);

    var animFunc = function() {
    	var tweenAnim = this.game.add.tween(this);
    	console.log('atual: ' + this.height);
		tweenAnim.to({height: this.height * 0.75}, 500);

		tweenAnim.onComplete.add(function(){

    		console.log('novo: ' + this.height);

	    	var tweenAnim2 = this.game.add.tween(this);

			var x = tweenAnim2.to({height: this.height * 1.30}, 500, 'Linear', true);


    		console.log('voltou para: ' + this.height * 1.30);


		}, this);
		tweenAnim.start();
    }


    this.anim = this.game.time.events.loop(Phaser.Timer.SECOND * 3, animFunc, this);

};

EvolutionGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
EvolutionGame.Player.prototype.constructor = EvolutionGame.Player;

EvolutionGame.Player.prototype.onClick = function(sprite, pointer) {
	this.openBox(false);
}


EvolutionGame.Player.prototype.openBox = function(evoluido) {
	if (this.isBox) {
		console.log('Abriu ' + this.name);
		this.isBox = false;
		this.input.enableDrag();

		if (!evoluido) {
			this.loadTexture('pet', 0);
		}
		this.scale.setTo(0.5);
	}
}

EvolutionGame.Player.prototype.onMoveStart = function(sprite, pointer) {
	// console.log('movendo...');

	//Coloca o sprite atual na frente dos outros
	sprite.bringToTop(); 
};

EvolutionGame.Player.prototype.onMoving = function(sprite, pointer) {
	 // console.log('onMoving...');
	// sprite.bringToTop();
};

EvolutionGame.Player.prototype.onMoveEnd = function(sprite, pointer) {

	if (sprite.position.x == this.lastX && sprite.position.y == this.lastY) {
		// console.log('Não pode fundir pois não moveu o personagem.');
		return;
	}
	this.lastX = sprite.position.x;
	this.lastY = sprite.position.y;


	var checkOverlap = function(spriteA, spriteB) {
	    var boundsA = spriteA.getBounds();
	    var boundsB = spriteB.getBounds();
	    return Phaser.Rectangle.intersects(boundsA, boundsB);
	};

	for(var element of this.parent.children) {
		if (element != this) {
			if (checkOverlap(this, element)) {
				EvolutionGame.GameState.playerManager.mergePlayers(this, element);
				// element.kill();
				// this.kill();
				return;
			}
		}
	}

};


EvolutionGame.Player.prototype.update = function() {

};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}























