class Utils {
	
	static getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static removeExtension(filename){
	    var lastDotPosition = filename.lastIndexOf(".");
	    if (lastDotPosition === -1) return filename;
	    else return filename.substr(0, lastDotPosition);
	}

}