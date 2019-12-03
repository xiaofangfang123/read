<template>
	<view class="search">
		<view class="head" :style="{top: topHeigt+'px'}">
			<image class="search-img" src="/static/icon/search.png" mode=""></image>
			<input class="is-input" v-model="searchWord" @confirm="toSearch" type="text" confirm-type="search" focus placeholder="书名或作者名" />
		</view>
		<view class="list">
			<template v-if="result.length<1">
				<view class="hot">
					<text class="hot-tag" @click="searchBook(item.word)" :style="{'backgroundColor': item.bgColor}"
					v-for="(item,index) in hotwords" :key="index">{{item.word}}</text>
				</view>
			</template>
			<template v-else>
				<view class="listitem" v-for="i in result" :key="i._id">
					<listItem @cli="goBookInfo" :item="i" :isList="true" />
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import config from '@/config/config.js'
	import * as Api from '@/config/api.js'
	import listItem from '@/components/list-item/list-item.vue'
	export default {
		name: 'Search',
		data() {
			return {
				// #ifdef H5
				topHeigt: config.naviAndStatus,
				// #endif
				// #ifndef H5
				topHeigt: 0,
				// #endif
				searchWord: '',
				result: [],
				hotwords: []
			}
		},
		onPullDownRefresh() {
			this.result = [];
			this.hotwords = [];
			this.searchWord = '';
			this.getHotList();
			uni.stopPullDownRefresh();
		},
		components: {listItem},
		onLoad() {
			this.getHotList();
		},
		methods: {
			// 获取热搜
			getHotList() {
				Api.getSearchHotwords().then(res => {
					this.hotwords = res.searchHotWords;
					this.randomcolor();
				})
			},
			// 给热搜随机上颜色
			randomcolor(){
				let colors=['#FF6666','#33CC99','#006699','#FF9966','#0066CC','#339933','#FFCC33','#336699','#FF9900','#99CC33','#0099CC','#FF0033']
				for(let i=0;i<this.hotwords.length;i++){
					let num = parseInt(Math.random()*colors.length - 1);
					this.hotwords[i].bgColor = colors[num];
				}
			},
			// 输入框输入
			toSearch(e) {
				if (e.detail.value) {
					this.searchBook(e.detail.value)
				}
			},
			// 开始搜索
			async searchBook(str) {
				if (!this.searchWord) {this.searchWord = str;}
				let book = await Api.getSearchResult({query:str});
				let Authorbook = await Api.getAuthorBook({author:str});
				this.result = this.result.concat(book.books);
			},
			// 跳转到书籍详情
			goBookInfo(item) {
				this.$Rewrite.go('/pages/book-info/book-info', {id:item._id,name:item.title});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		.head{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 88rpx;
			background-color: #FFFFFF;
			padding: $xff-page-padding;
			z-index: 10;
			&, & * {box-sizing: border-box;}
			.is-input{
				margin-left: $xff-page-padding+40rpx;
			}
			.search-img{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
			}
		}
		
		.list{
			padding-top: 88rpx;
			overflow: hidden;
			box-sizing: border-box;
			.hot{
				margin-top: $xff-page-padding;
				.hot-tag{
					margin-right: $xff-page-padding;
					margin-bottom: $xff-page-padding;
					display: inline-block;
					padding: 6rpx 10rpx;
				}
			}
			.listitem{
				background-color: #FFFFFF;
				margin-top: $xff-page-padding;
				padding: $xff-page-padding;
			}
		}
	}
</style>
