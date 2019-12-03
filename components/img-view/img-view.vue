<template>
	<view class="img-view">
		<image :style="{'width':w+'rpx','height':w*1.3+'rpx'}" class="img" :src="imgUrl" lazy-load></image>
	</view>
</template>

<script>
	import config from '@/config/config.js'
	export default {
		name: 'ImgView',
		data() {
			return {};
		},
		props: {
			url: {type: String, default: ''},
			w: {type: Number, default: 160}
		},
		methods: {},
		computed: {
			imgUrl() {
				if (this.url.startsWith('http')) {
					return this.url
				} else {
					return config.staticPath+this.url
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
