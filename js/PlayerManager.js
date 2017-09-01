//Classe que gerencia os players

var EvolutionGame = EvolutionGame || {};

EvolutionGame.PlayerManager = function(game) {
	this.game = game;
	this.players = this.game.add.group();
};

EvolutionGame.PlayerManager.prototype = {

	createPlayer: function(x, y, sprite, level, isEvolution) {
		// console.log('game: ');
		// console.log(this.game);

		var newY = (isEvolution ? y : -(sprite.height*2));
		var player = new EvolutionGame.Player(this.game, x, newY, sprite, level, isEvolution);
		this.players.add(player);


		if (!isEvolution) {
			var boxDropping = this.game.add.tween(player);
			boxDropping.to({y: y}, 500);
			// boxDropping.to({y: y}, 1000, 'Linear', true, 0);
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


		console.log(player1.name + ' fundiu com ' + player2.name);


		// player = new EvolutionGame.Player(this.game, player1.position.x, player1.position.y, 'toy', 2, true);
		// this.players.add(player);

		this.createPlayer(player1.position.x, player1.position.y, 'toy', 2, true);

		// player1.anim.pause();
		// player2.anim.pause();

		player1.destroy();
		player2.destroy();

	}

};

// EvolutionGame.PlayerManager.prototype.fundir = function(player1, player2) {
// 	if (player1.level != player2.level) {
// 		console.log('Impossível fundir players de níveis diferentes.');
// 		return false;
// 	}

// 	console.log(player1.name + ' fundiu com ' + player2.name);


// 	player = new EvolutionGame.Player(this.game, player1.position.x, player1.position.y, 'toy', 2, true);
// 	EvolutionGame.GameState.players.add(player);

// 	player1.destroy();
// 	player2.destroy();

// }