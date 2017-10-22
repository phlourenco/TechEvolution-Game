//TODO: remover este state

var EvolutionGame = EvolutionGame || {};

EvolutionGame.HomeState = {

	init: function(message) {
		this.message = message;
	},

	create: function() {
		var background = this.game.add.sprite(0, 0, 'space');
		background.inputEnabled = true;

		background.events.onInputDown.add(function() {
			this.state.start('GameState');
		}, this);

		var style = { font: '35px Arial', fill: '#fff' };
		var style2 = { font: '35px Arial', fill: '#f00' };
		this.game.add.text(30, this.game.world.centerY + 200, 'Clique para iniciar', style);

		if (this.message) {
			this.game.add.text(60, this.game.world.centerY - 200, this.message, style2);
		}

	}

};