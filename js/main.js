var EvolutionGame = EvolutionGame || {};

var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('PreloadState', EvolutionGame.PreloadState);
game.state.add('BootState', EvolutionGame.BootState);
game.state.add('HomeState', EvolutionGame.HomeState);
game.state.add('GameState', EvolutionGame.GameState);

game.state.start('BootState');