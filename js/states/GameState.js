
var EvolutionGame = EvolutionGame || {};

EvolutionGame.GameState = {

	create: function() {
		this.background = this.game.add.sprite(0, 0, 'space'); //fundo
		this.background.inputEnabled = true;

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
	}

};