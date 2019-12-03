<template>
	<view class="reach-bottom">
		<view class="left"></view>
		<view class="center">{{text}}</view>
		<view class="right"></view>
	</view>
</template>

<script>
	export default {
		name: 'ReachBottom',
		data() {
			return {
			};
		},
		props: ['text'],
		onLoad() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.reach-bottom{
		color: #969696;
		margin: $xff-page-padding 0;
		@include flex(center, center);
		.left, .right{
			flex: 0 0 20%;
			height: 1px;
			background-color: #969696;
		}
		.center{margin: 0 $xff-page-padding;}
	}
</style>
