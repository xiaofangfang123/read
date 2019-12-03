<template>
	<view class="book-info">
		<view class="header">
			<view class="left">
				<Img :url="book.cover" :w="200" />
			</view>
			<view class="right">
				<view class="title">{{book.title}}</view>
				<view class="user">
					<view class="author">{{book.author}}</view>
					<text>{{`${`&#12288;`}`}}|{{`${`&#12288;`}`}}</text>
					<view class="minorCate">{{book.minorCate}}</view>
				</view>
				<view class="wordCount">{{book.wordCount}}字</view>
				<view class="updated">最近更新：{{book.updated | toTime}}</view>
				<view class="tag">
					<view class="tag-view" v-for="(i,ind) in tagArr" :key="ind">{{i}}</view>
				</view>
			</view>
		</view>
		<view class="section">
			<view>简介</view>
			<view class="cont">{{book.longIntro}}</view>
		</view>
		
		<view class="cli">
			<uni-list>
				<uni-list-item @click="btn(1)" title="章节目录"></uni-list-item>
				<uni-list-item @click="btn(2)" title="立即阅读"></uni-list-item>
				<uni-list-item @click="btn(3)" title="加入书架"></uni-list-item>
			</uni-list>
		</view>
		
		<chapList :visible="visible" @goLook="goLook" @close="visible=false" :list="chapterList" />
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import chapList from '@/components/chapter-list/chapter-list.vue'
	import * as Api from '@/config/api.js';
	export default {
		name: 'BookInfo',
		data() {
			return {
				visible: false,
				book: {},
				chapterList: [],	// 存储所有的章节
				showchapterList: []	// 要显示的章节
			}
		},
		components: {uniList,uniListItem,chapList},
		onLoad(option) {
			this.id = option.id;
			this.name = option.name;
			uni.setNavigationBarTitle({title: this.name});
			this.getBookInfo(option.id);
			this.getChapt();
		},
		methods: {
			// 获取书籍详情
			getBookInfo(id) {
				Api.getBookInfo(id).then(res => {this.book = res;})
			},
			// 获取章节目录
			async getChapt() {
				let source = await Api.getBookSources({view: 'summary', book:this.id});
				this.sid = source[0]._id;
				let chapter = await Api.getChapter(this.sid);
				this.chapterList = chapter.chapters;
			},
			// 点击按钮事件
			btn(i) {
				if (i==1) {
					// 查看章节目录
					this.visible = true;
				} else if (i==2) {
					// 立即阅读
					this.$Rewrite.go('/pages/book-reader/book-reader', {id:this.id,name:this.name});
				}
			},
			// 点击要阅读的章节列表
			goLook(i) {
				let obj = {id:this.id,sid:this.sid,name:this.name,link:i.link}
				this.visible = false;
				this.$Rewrite.go('/pages/book-reader/book-reader', obj);
			}
		},
		computed: {
			tagArr() {return this.book.tags}
		}
	}
</script>

<style lang="scss" scoped>
	$imgW: 200rpx;
	.book-info{
		.header{
			position: relative;
			background-color: #FFFFFF;
			padding-left: $imgW+$xff-page-padding*2;
			padding-top: $xff-page-padding;
			padding-bottom: $xff-page-padding;
			.left{
				position: absolute;
				left: $xff-page-padding;
				top: $xff-page-padding;
			}
			.right{
				.title{font-size: $xff-font18;}
				.user{
					font-size: $xff-font16;
					margin: 10rpx 0;
					@include flex(center);
					.author{color: #d01515;}
				}
				.user,.wordCount,.updated,.tag-view{color: #5a5a5a;}
				.updated{margin: 10rpx 0;}
				.tag{
					.tag-view{
						display: inline-block;
						background-color: #dadada;
						padding: 6rpx 8rpx;
						border-radius: 16rpx;
						margin-right: 20rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}
		
		.section{
			background-color: #FFFFFF;
			padding: $xff-page-padding;
			margin-top: $xff-page-padding;
			.cont{
				text-indent: 60rpx;
			}
		}
		
		.cli{
			margin-top: $xff-page-padding;
		}
	}
</style>
