<template>
	<view class="read-modal" v-show="show">
		<!-- 顶部信息 -->
		<view class="header" :style="{'top':statusH+'px'}">
			<view class="header-left" @click="backBt">
				<image class="backImg" src="/static/icon/back.png" mode=""></image>
			</view>
			<view class="header-center">{{title}}</view>
			<view class="header-right">
				<view class="source" @click="showSource=!showSource">源</view>
				<view class="source-list" v-show="showSource">
					<view @click="newSource(i,ind)" :class="{'active': sourceIndex==ind}"
					class="source-item" v-for="(i,ind) in sourceList" :key="i._id">{{i.name}}</view>
				</view>
			</view>
		</view>
		
		<!-- 底部信息 -->
		<view class="footer">
			<view class="chapterlist">
				<view @click="prev" class="prev">上一章</view>
				<view @click="showMulu" class="prev">{{text}}</view>
				<view @click="next" class="next">下一章</view>
			</view>
			<view class="number-view" :key="ind" v-for="(i,ind) in numberArr">
				<view class="title">{{i.t}}</view>
				<view class="number-content">
					<view class="left" @click="lostBtn(i.n)">—</view>
					<view class="center">{{readSet[i.n]/2}}</view>
					<view class="right" @click="addBtn(i.n)">+</view>
				</view>
			</view>
			<view class="is-row" :key="i.n" v-for="i in colorArr">
				<view class="title">{{i.t}}</view>
				<view class="list">
					<view class="item bgColor" @click="selectBgColor(item,i.n)" :style="{'backgroundColor':item}" v-for="(item,ind) in i.list" :key="ind" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config/config.js';
	export default {
		name: 'ReadModal',
		data() {
			return {
				sourceIndex: null,
				statusH: config.statusH,	// 状态栏高度
				showSource: false,
				numberArr: [{t:'字体',n:'fontsize'},{t:'间距',n:'lHeight'}],
				colorArr: [
					{t:'背景',n:'bgColor',list:['#312A2A','#FF6666','#33CC99','#006699','#FF9966','#0066CC','#339933']},
					{t:'字色',n:'fsColor',list:['#ADADAD','#FFFFFF', '#000000','#e64340']},
				],
				readSet: {
					fontsize: 28,		// 字体大小 原字号乘2得到，为了使用rpx单位
					lHeight: 40,		// 字体行高 原行高乘2得到，为了使用rpx单位
					bgColor: '#312A2A',	// 背景色
					fsColor: '#ADADAD'	// 字体颜色
				}
			};
		},
		props: {
			text: {type: String, default: ''},		// 当前/目录
			show: {type: Boolean, default: false},	// 显示隐藏当前
			title: {type: String, default: ''},		// 标题
			sourceList: {type: Array, default() { return [] }}	// 源列表
		},
		methods: {
			// 上一章
			prev() {this.$emit('prev')},
			// 显示目录
			showMulu() {this.$emit('showMulu')},
			// 下一章
			next() {this.$emit('next')},
			// 返回事件
			backBt() {this.$Rewrite.goBack();},
			// 选择新的源
			newSource(item,index) {
				if (this.sourceIndex == index) {return}
				this.sourceIndex = index;
				this.showSource = false;
				this.$emit('getChapt', item._id);
			},
			// 减小字体大小、字间距
			lostBtn(name) {
				if (this.readSet.fontsize < 24 || this.readSet.lHeight < this.readSet.fontsize) {
					this.$Rewrite.showToast('别减啦~');
					return
				}
				if (name == 'fontsize') {this.readSet.fontsize -= 2;}
				this.readSet.lHeight -= 2;
				this.$emit('editReadSet', this.readSet);
			},
			// 增加字体大小、字间距
			addBtn(name) {
				if (name == 'fontsize') {this.readSet.fontsize += 2;}
				this.readSet.lHeight += 2;
				this.$emit('editReadSet', this.readSet);
			},
			selectBgColor(color,name) {
				this.readSet[name] = color;
				this.$emit('editReadSet', this.readSet);
			},
		},
		watch: {
			show: function(val) {
				if (!val) this.showSource=false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$modalFontColor: #B0B0B0;
	$modalBgColor: #1E1E1E;
	$headHeight: 88rpx;
	$iconWidth: 50rpx;
	$iconHeight: $iconWidth;
	.read-modal{
		&, & *{box-sizing: border-box;}
		.header,.footer{
			position: fixed;
			left: 0;
			right: 0;
			z-index: 10;
			background-color: $modalBgColor;
			color: $modalFontColor;
		}
		
		// 头部样式
		.header{
			@include flex(center,space-between);
			height: $headHeight;
			padding: 0 $xff-page-padding;
			.backImg{width: 60rpx;height: 60rpx;}
			.header-right{
				position: relative;
				.source{
					width: 50rpx;
					line-height: 50rpx;
					border: 1px solid $modalFontColor;
					border-radius: 50%;
					text-align: center;
				}
				.source-list{
					position: absolute;
					background-color: #735353;
					top: 60rpx;
					right: 0;
					width: 250rpx;
					padding: $xff-page-padding;
					.source-item{
						padding: 10rpx 0;
					}
				}
			}
		}
		
		// 底部样式
		.footer{
			bottom: 0;
			height: 360rpx;
			padding: 0 40rpx;
			overflow: hidden;
			.number-view,.number-content,.title,.left, .center, .right{display: inline-block;}
			.title{
				width: 60rpx;
				text-align: center;
				margin-right: $xff-page-padding;
			}
			.chapterlist{
				@include flex(center, space-between);
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}
			// 字体、行高类
			.number-view{
				width: 50%;
				width: calc(100%-60rpx);
				.number-content{
					.left, .right{
						border: 1px solid $modalFontColor;
						border-radius: 15rpx;
						width: $iconWidth;
						height: $iconHeight;
						line-height: $iconHeight - 2rpx;
						text-align: center;
					}
					.center{
						line-height: $iconHeight;
						width: 100rpx;
						text-align: center;
					}
				}
			}
			// 颜色类
			.is-row{
				margin-top: $xff-page-padding;
				&, & *{vertical-align: middle;}
				.list{
					width: 560rpx;
					display: inline-block;
				}
			}
			.bgColor{
				width: $iconWidth;
				height: $iconHeight;
				border-radius: 50%;
				display: inline-block;
				margin-right: $xff-page-padding;
			}
		}
		
		.active{color: red;}
	}
</style>
