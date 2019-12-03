<template>
	<view class="categorylist">
		<view class="navi-tab">
			<!-- #ifdef H5 -->
			<view class="tab-list" :style="{top: topHeigt+'px'}">
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view class="tab-list">
			<!-- #endif -->
				<view @click="selectTab(i,ind)" class="tab-item" :class="{'is-active':ind==selectType}"
				v-for="(i,ind) in booksType" :key="i.t">{{i.n}}</view>
			</view>
			<view class="navi-null"></view>
		</view>
		<view class="listitem" v-for="i in list" :key="i._id">
			<listItem @cli="goBookInfo" :item="i" :isList="true" />
		</view>
		<ReachBottom :text="loadingText"></ReachBottom>
	</view>
</template>

<script>
	import * as Api from '@/config/api.js'
	import listItem from '@/components/list-item/list-item.vue'
	import ReachBottom from '@/components/reach-bottom/reach-bottom.vue'
	import config from '@/config/config.js'
	export default {
		name: 'Categorylist',
		data() {
			return {
				topHeigt: config.naviAndStatus,
				booksType: [{n:'热门',t:'hot'},{n:'新书',t:'new'},{n:'好评',t:'reputation'},{n:'完结',t:'over'}],
				selectType: 0,
				list: [],
				loadingText:'',		// 上拉底部加载文字提示
				isover: false,		// 是否已经加载全部
				query: {
					gender: '',
					type: '',
					major: '',
					start: 0,
					limit: 15
				}
			};
		},
		components: {listItem,ReachBottom},
		onPullDownRefresh() {
			this.initParams();
			this.getListInfo();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (!this.isover) {
				this.getListInfo();
			}
		},
		onLoad(params) {
			this.query.major = params.name;
			this.query.gender = params.gender;
			this.query.type = this.booksType[this.selectType].t;
			uni.setNavigationBarTitle({title: params.name});
			this.getListInfo();
		},
		methods: {
			// 初始化各参数
			initParams() {
				this.isover = false;
				this.list = [];
				this.query.start = 0;
			},
			// 获取当前分类下书籍详情
			getListInfo() {
				this.loadingText = '加载中...';
				Api.getCategoryInfo(this.query).then(res => {
					if (res.books.length<15)  {
						this.loadingText = '我是有底线的，不要拉了';
						this.isover = true;
					} else {
						this.loadingText = '加载更多';
						if (this.query.start < 1) {
							this.query.start += this.query.limit + 2;
						} else {
							this.query.start += this.query.limit;
						}
					}
					this.list = this.list.concat(res.books);
					console.log(res);
				})
			},
			// 选择tab栏目
			selectTab(i,ind) {
				this.selectType = ind;
				this.query.type = i.t;
				this.initParams();
				this.getListInfo();
			},
			// 跳转到书籍详情
			goBookInfo(item) {
				this.$Rewrite.go('/pages/book-info/book-info', {id:item._id,name:item.title});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.categorylist{
		position: relative;
		.navi-tab{}
		.tab-list{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10;
			padding: $xff-page-padding;
			background-color: #FFFFFF;
			@include flex(center);
			.tab-item{
				margin-left: $xff-page-padding;
				font-size: $xff-font14;
				line-height: 32rpx;
			}
		}
		.navi-null{
			width: 100%;
			height: $xff-page-padding*2+32rpx;
		}
		.listitem{
			background-color: #FFFFFF;
			margin-top: $xff-page-padding;
			padding: $xff-page-padding;
		}
		.is-active{color: red;}
	}
</style>
