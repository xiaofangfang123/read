const baseApi = 'http://api.zhuishushenqi.com'
const contentApi = 'http://chapterup.zhuishushenqi.com'
const staticPath = 'http://statics.zhuishushenqi.com'

let sys = uni.getSystemInfoSync();
const navigaH = 44
const statusH = sys.statusBarHeight || 0
const naviAndStatus = navigaH + statusH

export default {
	baseApi,
	contentApi,
	staticPath,
	navigaH,
	statusH,
	naviAndStatus
}