//Carrega os assets que serão exibidos na loading screen (logo, background, etc)

var EvolutionGame = EvolutionGame || {};

EvolutionGame.BootState = {

	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},

	preload: function() {
		this.load.image('preloadBar', 'assets/images/bar.png');
		this.load.image('logo', 'assets/images/logofiap2.png');
		this.load.json('levels', 'assets/data/levels.json');
	},

	create: function() {
		this.game.stage.backgroundColor = '#fff';
		this.state.start('PreloadState');
	}

};