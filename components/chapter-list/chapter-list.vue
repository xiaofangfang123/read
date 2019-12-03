<template>
	<view class="chapter-list" :visible="visible">
		<uni-drawer :visible="visible" @close="close">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scroll="scroll" class="scroll-Y">
				<uni-list>
					<block v-for="i in showList" :key="i.id">
						<uni-list-item @click="goLook(i)" :title="i.title | chapterName"></uni-list-item>
					</block>
					<!-- <uni-list-item @click="goLook(i)" :title="i.title | chapterName"></uni-list-item> -->
					<view class="cerrut">
						<picker @change="bindPickerChange" :value="index" :range="pageArray">
							<view class="uni-input">{{pageArray[index]}}</view>
						</picker>
					</view>
				</uni-list>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import config from '@/config/config.js';
	import uniList from "@/components/uni-list/uni-list.vue";
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
	export default {
		name: 'ChapterList',
		data() {
			return {
				scrollTop: 0,
				old: {scrollTop: 0},
				index: 0,
				pageArray: [],
				showList: [],
				ind: 0
			};
		},
		components: {uniList,uniListItem,uniDrawer},
		props: {
			list: {type: Array, default() { return [] }},
			visible: {type: Boolean, default: false}
		},
		watch: {
			list: {
				handler() {
					this.showList = this.list.slice(this.index*100, this.index*100+100);
					this.setPage();
				},
				deep: true,
			}
		},
		methods: {
			// 滚动事件
			scroll: function(e) {this.old.scrollTop = e.detail.scrollTop;},
			// 去顶部
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {this.scrollTop = 0});
			},
			// 设置分页
			setPage() {
				let length = this.list.length;
				let total = Math.ceil(length / 100);
				for (let i=0;i<total;i++) {
					if((i+1)==total) {
						this.pageArray.push(`第${i*100+1}章----第${length}章`);
					} else {
						this.pageArray.push(`第${i*100+1}章----第${i*100+100}章`);
					}
				}
			},
			// 关闭抽屉
			close() {this.$emit('close')},
			// 选择切换章节
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				this.showList = this.list.slice(this.index*100, this.index*100+100);
				this.goTop();
			},
			// 选择阅读章节
			goLook(i) {
				this.$emit('goLook', i)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y{
		height: 100%;
		.cerrut{
			text-align: center;
			margin: 0 20rpx;
			padding: 20rpx 0;
			border: 1px solid #969696;
		}
	}
</style>
