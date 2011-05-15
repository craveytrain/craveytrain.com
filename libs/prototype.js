Object.defineProperty(Date.prototype, 'toRelative', {
	enumerable: false,
	value: function() {
		var now = new Date().getTime() / 1000,
				then = this.getTime() / 1000,
				delta = Math.floor(now - then);
				
		if (delta === 1) return '1 second ago';
		if (delta < 60) return delta + ' seconds ago';
		if (delta < 120) return '1 minute ago';
		if (delta < 3600) return Math.floor(delta / 60) + ' minutes ago';
		if (delta < 7200) return '1 hour ago';
		if (delta < 86400) return Math.floor(delta / 3600) + ' hours ago';
		if (delta < 172800) return '1 day ago';
		if (delta < 2592000) return Math.floor(delta / 86400) + ' days ago';
		if (delta < 5184000) return '1 month ago';
		if (delta < 31536000) return Math.floor(delta / 2592000) + ' months ago';
		if (delta < 63072000) return '1 year ago';
		return Math.floor(delta / 31536000) + ' years ago';
	}
});

Object.defineProperty(String.prototype, 'urlify', {
	enumerable: false,
	value: function() {
		return this.replace(/\s/g, '-');
	}
});

Object.defineProperty(String.prototype, 'unurlify', {
	enumerable: false,
	value: function() {
		return this.replace(/\-/g, ' ');
	}
});

Object.defineProperty(String.prototype, 'pluralize', {
	enumerable: false,
	value: function(/* Int */count, /* String? */plural) {
		var text = this, lastIdx;
		
		if (count !== 1) {
			if (plural) return plural; // String
			
			lastIdx = text.length - 1;
			switch (text[lastIdx]) {
				case 'x':
				case 'h':
				case 's':
					text += 'es';
					break;
				case 'y':
					text = text.substring(0, lastIdx) + 'ies';
					break;
				default:
					text += 's';
					break;
			}
		}
		
		return text.toString(); //String
	}
});