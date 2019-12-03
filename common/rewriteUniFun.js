import urlUtil from '@/common/funTool.js'

function go(url='', params={}) {
	url = urlUtil.getFetchUrl(url, params);
	uni.navigateTo({url: url})
}

function goRedi(url='', params={}) {
	url = urlUtil.getFetchUrl(url, params);
	uni.redirectTo({url: url})
}

function goReL(url='', params={}) {
	url = urlUtil.getFetchUrl(url, params);
	uni.reLaunch({url: url})
}

function goSwicth(url='') {
	let us = url.split('?');
	uni.switchTab({url: us[0]});
}

function goBack(option) {
	let stash = getCurrentPages();
	let delta = option&&option.delta ? option.delta : 1
	if (stash.length <= delta) {
		goSwicth('/pages/index/index');
	} else {
		uni.navigateBack(option)
	}
}

function get(key) {
	return uni.getStorageSync(key)
}

function set(key, obj) {
	return uni.setStorageSync(key, obj)
}

function remove(key) {
	return uni.removeStorageSync(key)
}

function showLoading(title='加载中', mask=true) {
	uni.showLoading({
		title: title,
		mask: mask
	})
}

function hideLoading() {uni.hideLoading()}

/**
 * @param:msg(String) -> showToast文字描述
 * @param:delay(int) -> 多久后显示，默认为0
 */
function showToast(msg, delay = 0) {
	setTimeout(() => {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	}, delay)
}

/**
 * @param {String} title 标题
 * @param {String} content 提示的内容
 * @param {String} cancelText 取消按钮文字
 * @param {String} confirmText 确定按钮文字
 * res.confirm true:确定		res.cancel true:取消
 */
function showModal(title, content, cancelText='取消', confirmText='确定') {
	let isCancel = cancelText ? true : false
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			showCancel: isCancel,
			cancelText: cancelText,
			confirmText: confirmText,
			success: res => {resolve(res);},
			fail: () => {},
			complete: () => {}
		});
	})
}

export default {
	go,
	goRedi,
	goReL,
	goSwicth,
	goBack,
	get,
	set,
	remove,
	showLoading,
	hideLoading,
	showModal,
	showToast
}