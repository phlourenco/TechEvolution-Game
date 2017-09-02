class LevelManager {

	static init(levels) {
		this.levelList = levels;
	}

	static getSpriteByLevelId(levelId) {
		var spriteName = "";
		for(var level of this.levelList) {
			if (level.id == levelId) {
				spriteName = level.image.file;
				break;
			}
		}
		return Utils.removeExtension(spriteName);
	}

	static getDataByLevelId(levelId) {
		var data = null;
		for(var level of this.levelList) {
			if (level.id == levelId) {
				data = level;
				break;
			}
		}
		return data;
	}

}