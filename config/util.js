import config from '@/config/config.js'
import tool from '@/common/funTool.js';
import Rewrite from '@/common/rewriteUniFun.js';

const fetch = async (url='', data={}, method='GET') => {
	let baseUrl = config.baseApi + url;
	// #ifndef H5
	if (url.startsWith('/content')) {baseUrl = config.contentApi + url.replace(/^\/content/,'');}
	// #endif
	// #ifdef H5
	baseUrl = url;
	// #endif
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl,
			method: method,
			data: data,
			success: (res) => { return resolve(res.data); },
			fail: (err) => { Rewrite.showToast('访问失败！') },
			complete: () => {}
		})
	})
}

const get = async (url = '', params = {}) => {
	// #ifdef H5
	if (!url.startsWith('/content')) {url = '/api' + url;}
	// #endif
	return fetch(url, params, 'GET');
}

/**
 * params: 需要拼接到url后面的参数
 * data: api需要的参数
 */
const post = async (url = '',params = {}, data = {}) => {
	return fetch(tool.getFetchUrl(url, params), data, 'POST');
}

export default {
	get,
	post
}