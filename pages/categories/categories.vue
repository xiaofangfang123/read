<template>
	<view class="categories">
		<view class="content">
			<view class="list" v-for="list in cateList" :key="list.name">
				<view class="title male">{{list.name | cateToText}}</view>
				<view class="item" @click="toList(i, list.name)" v-for="(i,ind) in list.list" :key="ind">
					<view class="name">{{i.name}}</view>
					<view class="number">{{i.bookCount}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/config/api.js'
	export default {
		data() {
			return {
				cateList: []	// 所有分类数据
			};
		},
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			getList() {
				let _this = this;
				Api.getCategories().then(res => {
					Object.keys(res).forEach(key => {
						if (key != 'ok') {
							let obj = {'name': key,'list': res[key]};
							_this.cateList.push(obj);
						}
					})
				})
			},
			// 跳转到分类列表
			toList(i, gender) {
				this.$Rewrite.go('/pages/categorylist/categorylist', {name: i.name, gender: gender});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.categories{
		.content{
			margin-bottom: $xff-page-padding;
			.list{
				background-color: #FFFFFF;
				margin-top: $xff-page-padding;
				padding: 100rpx 0 $xff-page-padding;
				@include flex(center);
				flex-wrap: wrap;
				position: relative;
				.title{
					position: absolute;
					top: 34rpx;
					left: 34rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					color: #969696;
				}
				.item{
					flex: 0 0 33%;
					text-align: center;
					padding: $xff-page-padding 0;
					border-bottom: 1px solid #c8c8c8;
					.number{color: #969696;}
				}
				.item:nth-child(-n+4){
					border-top: 1px solid #c8c8c8;
				}
				.item:nth-child(3n+0){
					border-left: 1px solid #c8c8c8;
					border-right: 1px solid #c8c8c8;
				}
			}
		}
		// .list{
		// 	overflow: hidden;
		// 	margin: $xff-page-padding 0;
		// 	background-color: #FFFFFF;
		// }
		// .tab{margin: $xff-page-padding auto;}
	}
</style>
