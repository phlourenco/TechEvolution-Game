//Classe que gerencia os players

var EvolutionGame = EvolutionGame || {};

EvolutionGame.PlayerManager = function(game) {
	this.game = game;
	this.players = this.game.add.group();
};

EvolutionGame.PlayerManager.prototype = {

	createPlayer: function(x, y, level, isEvolution) {
		if (!isEvolution) {
			var sprite = 'box';
		} else {
			var sprite = LevelManager.getSpriteByLevelId(level);
		}

		var newY = (isEvolution ? y : -(sprite.height*2));
		var player = new EvolutionGame.Player(this.game, x, newY, sprite, level, isEvolution);
		this.players.add(player);

		if (!isEvolution) {
			var boxDropping = this.game.add.tween(player);
			boxDropping.to({y: y}, 500);
			boxDropping.onComplete.add(function(){
				player.lastY = y;
			}, this);
			boxDropping.start();
		}

		return player;
	},

	mergePlayers: function(player1, player2) {
		if (player1.level != player2.level) {
			console.log('Impossível fundir players de níveis diferentes.');
			return false;
		}

		if (player1.isBox || player2.isBox) {
			console.log('Impossível fundir com players que ainda estão na caixa.');
			return false;
		}

		console.log(player1.name + ' fundiu com ' + player2.name);

		var newLevel = player1.level + 1;
		this.createPlayer(player1.position.x, player1.position.y, newLevel, true);

		player1.destroy();
		player2.destroy();
	}

};