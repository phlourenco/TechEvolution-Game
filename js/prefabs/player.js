//Prefab dos players. Extende da classe Sprite do Phaser

var EvolutionGame = EvolutionGame || {};

EvolutionGame.Player = function(game, x, y, key, level, isEvolution) {
	Phaser.Sprite.call(this, game, x, y, key);

	this.game = game;

	this.name = 'player' + Utils.getRandomInt(1, 50);
	this.isBox = true;
	this.level = level;

	this.lastPosition = this.position;

	this.isMoving = false;
	this.lastX = this.position.x;
	this.lastY = this.position.y;

	this.anchor.setTo(0.5);
	this.scale.setTo(0.1);

	this.inputEnabled = true;

	if (isEvolution) {
		this.openBox(true);
	}

	this.input.pixelPerfectClick = true;

	this.events.onInputUp.add(this.onClick, this);
	// this.input.enableDrag();
    this.events.onDragStart.add(this.onMoveStart, this);
    this.events.onDragStop.add(this.onMoveEnd, this);
    this.events.onDragUpdate.add(this.onMoving, this);

    var animFunc = function() {
    	if (!this.isMoving) {
	    	var tweenAnim = this.game.add.tween(this);
			tweenAnim.to({y: this.position.y - 10}, 250);

			tweenAnim.onComplete.add(function(){
		    	var tweenAnim2 = this.game.add.tween(this);
				var x = tweenAnim2.to({y: this.position.y + 10}, 250, 'Linear', true);
			}, this);
			tweenAnim.start();
		}
    }

    //Cria timer que executa animação a cada 3 segundos
    this.animTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 3, animFunc, this);

};

EvolutionGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
EvolutionGame.Player.prototype.constructor = EvolutionGame.Player;

EvolutionGame.Player.prototype.onClick = function(sprite, pointer) {
	this.openBox(false);
}


EvolutionGame.Player.prototype.openBox = function(isEvolution) {
	if (this.isBox) {
		console.log('Abriu ' + this.name);
		this.isBox = false;
		this.input.enableDrag();

		if (!isEvolution) {
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
	if (sprite.position.x != this.lastX || sprite.position.y != this.lastY) {
		this.isMoving = true;
	}
};

EvolutionGame.Player.prototype.onMoveEnd = function(sprite, pointer) {

	if (sprite.position.x == this.lastX && sprite.position.y == this.lastY) {
		// console.log('Não pode fundir pois não moveu o personagem.');
		return;
	}
	this.lastX = sprite.position.x;
	this.lastY = sprite.position.y;
	this.isMoving = false;


	var checkOverlap = function(spriteA, spriteB) {
	    var boundsA = spriteA.getBounds();
	    var boundsB = spriteB.getBounds();
	    return Phaser.Rectangle.intersects(boundsA, boundsB);
	};

	for(var element of this.parent.children) {
		if (element != this) {
			if (checkOverlap(this, element)) {
				EvolutionGame.GameState.playerManager.mergePlayers(this, element);
				return;
			}
		}
	}

};

EvolutionGame.Player.prototype.update = function() {

};

EvolutionGame.Player.prototype.destroy = function() {
	this.game.time.events.remove(this.animTimer);

	//chama super
	Phaser.Sprite.prototype.destroy.call(this);
}























