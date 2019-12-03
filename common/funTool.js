/**
 * 传入key获取url参数值，参数不存在返回null
 */
function getQueryValueByKey(key) {
	
	let paramStr = window.location.search.substr(1)
	if (paramStr === '') { // url参数串不存在则表示可能在hash中
		let url = window.location.href
		let hash = window.location.hash
		if (hash.indexOf('?') === -1) {
			return null
		}
		paramStr = hash.split('?')[1]
	}
	var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
	var r = paramStr.match(reg)
	if (r != null) return unescape(r[2])
	return null
}

/**
 * 获取url的所有参数对象及原始url,分离url的路径和所带参数
 * {
	 path: '',  去除queryString的原始路径
	 params: { url参数对象
		 key : value
	 }
	}
 */
function getQueryObject(url = '') {
	let us = url.split('?')
	let params = {}
	if (us.length === 2) {
		for (const kv of us[1].split('&')) {
			let arr = kv.split('=')
			if (arr.length == 2) {
				params[arr[0]] = arr[1]
			}
		}
	}
	
	return {
		url: us[0],
		params
	}
}

/**
 * 根据入参对象生成url。即将参数拼接到所给url之后
 */
function getFetchUrl(url = '', data = {}) {
	if (typeof(data) !== 'object') {
		console.error('指定data不合法')
		return url;
	}
	const qo = getQueryObject(url);
	Object.assign(data, qo.params);
	url = '';
	for (let k in data) url += '&' + k + '=' + data[k];
	return qo.url + '?' + url.substring(1)
}

export default {
	getQueryValueByKey,
	getFetchUrl,
	getQueryObject
}
