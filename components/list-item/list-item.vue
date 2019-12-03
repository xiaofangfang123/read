<template>
	<view class="list-item" @click="goInfo">
		<image class="item-img" :src="imgUrl"></image>
		<view class="item-lelt">
			<view class="book-name">{{item.title}}</view>
			<view class="book-author">{{item.author}}●{{item.majorCate}}●{{item.minorCate}}</view>
			<view class="book-info">{{item.shortIntro}}</view>
			<view class="book-user" v-if="isList">
				{{item.latelyFollower}}人气
				<text>{{`${`&#12288;`}`}}|{{`${`&#12288;`}`}}</text>
				{{item.retentionRatio}}%读者留存
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config/config.js'
	export default {
		name: 'ListItem',
		data() {
			return {
			};
		},
		props: {
			isList: {type: Boolean, default: false},
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		onLoad() {},
		methods: {
			// 点击书籍信息
			goInfo() {
				this.$emit('cli', this.item);
			}
		},
		computed: {
			imgUrl() {
				if (this.item.cover.startsWith('http')) {
					return this.item.cover
				} else {
					return config.staticPath+this.item.cover
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$imgWidth: 160rpx;
	$imgHeight: $imgWidth * 1.3;
	.list-item{
		@include flex(center);
		.item-img{
			flex: 0 0 $imgWidth;
			height: $imgHeight;
		}
		
		.item-lelt{
			min-height: $imgHeight;
			padding: 0 $xff-page-padding;
			@include flex(flex-start,space-between);
			flex-direction: column;
			flex: 0 1 auto;
			.book-info{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				color: #969696;
			}
			.book-author{
				color: #969696;
				margin-top: 4rpx;
				margin-bottom: 4rpx;
			}
			.book-user{
				margin-top: 6rpx;
				font-size: $xff-font12;
				color: #666666;
			}
		}
	}
</style>
