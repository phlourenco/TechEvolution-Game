//Carrega todos os assets usados no jogo

var EvolutionGame = EvolutionGame || {};

EvolutionGame.PreloadState = {

	preload: function() {
		this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.logo.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('backyard', 'assets/images/backyard.png');
		this.load.image('box', 'assets/images/box.png');

		//Loop no arquivo levels.json para carregar a imagem de todos os levels
		var levelsJSON = game.cache.getJSON('levels');
		levelsJSON.levels.forEach(function(level) {
			this.load.image(Utils.removeExtension(level.image.file), 'assets/images/'+level.image.file);
		}, this);

		LevelManager.init(levelsJSON.levels);
	},

	create: function() {
		this.state.start('HomeState');
	}

};