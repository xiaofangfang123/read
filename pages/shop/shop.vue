<template>
	<view class="shop">
		<view class="swiper" :style="{'paddingTop':statusH+'px'}">
			<image @click="goSearch" :style="{'top':statusH+'px'}" class="search" src="/static/icon/search.png" mode=""></image>
			<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="2000">
				<swiper-item v-for="(i,ind) in swiperArr" :key="ind">
					<view class="swiper-item uni-bg-red">{{i}}</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类列表 -->
		<view class="cate-list">
			<uni-grid :showBorder="false" :column="5" @change="cateBtn">
				<uni-grid-item v-for="i in cateList" :key="i.key">
					<image class="cate-img" :src="`/static/icon/${i.icon}`"></image>
					<view class="xffFont12">{{i.n}}</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- 推荐 -->
		<view class="tuiian-list">
			<view class="content" v-for="i in rankList" :key="i.name">
				<view class="title">{{i.name | cateToText}}推荐</view>
				<listItem @cli="cli" v-if="i.list[0]" :item="i.list[0]"></listItem>
				<view class="list">
					<view class="item" @click="cli(item)" v-for="(item,ind) in i.list" v-if="ind>0" :key="ind">
						<image class="item-img" :src="item.cover"></image>
						<view class="book-name">{{item.title}}</view>
						<view class="book-user">{{item.author}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import * as Api from '@/config/api.js'
	import config from '@/config/config.js'
	import listItem from '@/components/list-item/list-item.vue'
	export default {
		name: 'Shop',
		data() {
			return {
				statusH: config.statusH,
				swiperArr: ['我','真','帅'],
				cateList: [
					{key:'cate1',n:'分类',url:'/pages/categories/categories',icon:'categories.png'},
					{key:'rank',n:'排行',url:'/pages/rank/rank',icon:'rank.png'}
				],
				rankList: []
			};
		},
		components: {uniGrid,uniGridItem,listItem},
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			this.initData();
			this.getList();
			uni.stopPullDownRefresh();
		},
		methods: {
			// 重置本页面中的参数
			initData() {
				this.rankList = [];
			},
			// 获取随机数
			randomnum(arr){return parseInt((Math.random()*(arr.length - 1)));},
			// list跳转
			cateBtn(e) {
				let url = this.cateList[e.detail.index].url;
				this.$Rewrite.go(url);
				console.log(url);
			},
			// 获取分类列表--用于显示推荐
			getList() {
				console.log(Api);
				Api.getRankCategory().then(res=>{
					Object.keys(res).forEach(key => {
						if (key != 'ok') {
							let id = res[key][this.randomnum(res[key])]._id;
							let obj = {'name': key,'list': []};
							this.getbooklist(id,obj);
						}
					})
				})
			},
			// 获取对应类别下的书籍列表
			getbooklist(id,obj){
				Api.getRank(id).then(res=>{
					let books = res.ranking.books.slice(0,10);
					books.forEach((book)=>{
						book.cover = config.staticPath + book.cover;
						obj.list.push(book);
					})
				})
				this.rankList.push(obj);
			},
			// 去搜索
			goSearch() {this.$Rewrite.go('/pages/search/search')},
			// 点击书籍
			cli(item) {
				this.$Rewrite.go('/pages/book-info/book-info', {id:item._id,name:item.title});
			}
		}
	}
</script>

<style lang="scss" scoped>
	$imgWidth: 160rpx;
	$imgHeight: $imgWidth * 1.3;
	.shop{
		.swiper{
			background-color: #9F8574;text-align: center;
			.search{
				position: fixed;
				right: $xff-page-padding;
				width: 50rpx;
				height: 50rpx;
				z-index: 20;
			}
		}
		* {box-sizing: border-box;}
		.cate-list{
			background-color: #FFFFFF;
			margin-bottom: $xff-page-padding;
		}
		.cate-img{
			width: 50rpx;
			height: 50rpx;
		}
		.tuiian-list{
			.content{
				padding: $xff-page-padding;
				margin-bottom: $xff-page-padding;
				background-color: #FFFFFF;
				.title{margin-bottom: $xff-page-padding;}
				.item-img{
					width: $imgWidth;
					height: $imgHeight;
				}
				.list{
					.item{
						width: $imgWidth;
						margin-top: $xff-page-padding;
						margin-right: $xff-page-padding;
						display: inline-block;
						.book-user{color: #969696;}
						.book-name, .book-user{
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
					.item:nth-child(4n+0){margin-right: 0;}
				}
			}
		}
	}
</style>
