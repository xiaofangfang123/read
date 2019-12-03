export function cateToText(data) {
	let str;
	switch (data){
		case 'male': str = '男生';break;
		case 'female': str = '女生';break;
		case 'picture': str = '动漫';break;
		case 'press': str = '出版';break;
		case 'epub': str = '叫电子书？';break;
		default: break;
	}
	return str;
}

export function toTime(date) {
	if (date) {
		let str = date.replace(/T/g, ' ');
		str = str.substr(0, 16);
		return str;
	}
}

export function chapterName(data) {
	let i = data.indexOf('第')
	if (i > -1) return data.substring(i)
	return data
}