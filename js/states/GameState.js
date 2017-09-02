
var EvolutionGame = EvolutionGame || {};

EvolutionGame.GameState = {

	create: function() {
		this.background = this.game.add.sprite(0, 0, 'backyard');
		this.background.inputEnabled = true;
		this.background.events.onInputDown.add(this.placeItem, this);

    	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	this.playerManager = new EvolutionGame.PlayerManager(this.game);

    	this.DROP_BOX_INTERVAL = 6;
    	this.MAX_PLAYER_COUNT = 16;

		this.playerCreatorTimer = this.game.time.events.loop(Phaser.Timer.SECOND * this.DROP_BOX_INTERVAL, this.createPlayer, this);

	},

	createPlayer: function() {

		// console.log(this.playerManager.players.length);

		if (this.playerManager.players.length < this.MAX_PLAYER_COUNT) {

			var minX = 30,
				maxX = this.game.width-30,
				minY = 370,
				maxY = this.game.height-60;

			dropX = Utils.getRandomInt(minX, maxX);
			dropY = Utils.getRandomInt(minY, maxY);

			this.playerManager.createPlayer(dropX, dropY, 1, false);

		}
	},

	onDragStop: function(sprite, pointer) {
		console.log(sprite.key + 'foi reposicionado!!');
	},

	update: function() {
		// this.game.physics.arcade.overlap(this.players, this.players, this.playerOverlap, null, this);
		// if (this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
		// 	this.pet.frame = 4;
		// 	this.uiBlocked = true;
		// 	this.game.time.events.add(2000, this.gameOver, this);
		// }
	},

	pickItem: function(sprite, event) {
		if (!this.uiBlocked) {
			console.log('pick item');

			this.clearSelection();

			sprite.alpha = 0.4;

			this.selectedItem = sprite;
		}
	},

	rotatePet: function(sprite, event) {
		if (!this.uiBlocked) {
			console.log('rotate pet');
			this.uiBlocked = true;
			this.clearSelection();
			sprite.alpha = 0.4;

			var petRotation = this.game.add.tween(this.pet);
			petRotation.to({angle: '+720'}, 1000);
			petRotation.onComplete.add(function(){
				this.uiBlocked = false;
				// sprite.alpha = 1;
				this.clearSelection();
				this.pet.customParams.fun += 10;
				this.refreshStats();
				console.log(this.pet.customParams);
			}, this);
			petRotation.start();

		}
	},

	clearSelection: function() {
		this.buttons.forEach(function(element, index) {
			element.alpha = 1;
		});
		this.selectedItem = null;
	},

	placeItem: function(sprite, event) {
		if (this.selectedItem && !this.uiBlocked) {
			var x = event.position.x;
			var y = event.position.y;

			var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
			newItem.anchor.setTo(0.5);
			newItem.customParams = this.selectedItem.customParams;

			this.uiBlocked = true;

			var petMovement = this.game.add.tween(this.pet);
			petMovement.to({x:x, y:y}, 700);
			petMovement.onComplete.add(function() {
				newItem.destroy();

				this.pet.animations.play('funnyfaces');

				this.uiBlocked = false;

				var stat;
				for(stat in newItem.customParams) {
					if (newItem.customParams.hasOwnProperty(stat)) {
						console.log(stat);
						this.pet.customParams[stat] += newItem.customParams[stat];
					}
				}

				this.refreshStats();

			}, this);
			petMovement.start();
		}
	},

	refreshStats: function() {
		this.healthText.text = this.pet.customParams.health;
		this.funText.text = this.pet.customParams.fun;
	},

	reduceProperties: function() {
		this.pet.customParams.health -= 10;
		this.pet.customParams.fun -= 15;
		this.refreshStats();
	},

	gameOver: function() {
		this.state.start('HomeState', true, false, 'GAME OVER!!!');
	}

};