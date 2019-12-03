<template>
	<view class="book-reader" :style="{'paddingTop':statusH+'px'}">
		
		<view class="text" :style="{'fontSize':readSet.fontsize+'rpx','lineHeight':readSet.lHeight+'rpx',
		'backgroundColor':readSet.bgColor,'color':readSet.fsColor}" @click="showModal">
			<rich-text :nodes="cpContent" v-if="cpContent"></rich-text>
			<view v-else>{{errMsg}}</view>
		</view>
		
		<!-- 头部、底部显示隐藏 -->
		<readModal :show="showHF" :text="text" :sourceId="sourceId" :title="title" :sourceList="sourceList"
		@editReadSet="editReadSet" @getChapt="getChapt" @prev="prev" @showMulu="showMulu" @next="next" />
		<!-- 目录 -->
		<chapList :visible="visible" @goLook="goLook" @close="visible=false" :list="chapterList" />
	</view>
</template>

<script>
	import * as Api from '@/config/api.js';
	import config from '@/config/config.js';
	import chapList from '@/components/chapter-list/chapter-list.vue';
	import readModal from "@/components/read-modal/read-modal.vue"
	export default {
		name: 'BookReader',
		data() {
			return {
				statusH: config.statusH,
				visible: false,			// 显示目录
				showHF: false,			// 显示头部、底部
				readSet: {
					fontsize: 28,		// 字体大小 原字号乘2得到，为了使用rpx单位
					lHeight: 40,		// 字体行高 原行高乘2得到，为了使用rpx单位
					bgColor: '#312A2A',	// 背景色
					fsColor: '#ADADAD'	// 字体颜色
				},
				sourceList: [],
				errMsg: '',			// 错误信息
				sourceId: null,		// 选择的源id
				chapterList: [],	// 章节目录
				readChapter: 0,		// 正在阅读的章节总体下标
				title: '',			// 书本名称
				cpContent: null		// 章节内容
			}
		},
		components: {chapList,readModal},
		onLoad(option) {
			this.id = option.id;
			this.sourceId = option.sid;
			this.name = option.name;
			uni.setNavigationBarTitle({title: this.name});
			this.getSourceLi(option.link);
		},
		methods: {
			// 点击章节
			goLook(i) {
				this.getInfo(i.link);
				this.visible = false;
				this.showHF = false;
			},
			// 获取源、章节目录、内容
			async getSourceLi(link) {
				this.sourceList = await Api.getBookSources({view: 'summary', book:this.id});
				if (!this.sourceId) this.sourceId = this.sourceList[0]._id;
				this.getChapt(this.sourceId,link);
			},
			// 获取章节
			async getChapt(isid,link) {
				this.chapterList = [];
				let chapter = await Api.getChapter(isid);
				this.chapterList = chapter.chapters;
				!link ? link=this.chapterList[0].link : '';
				this.getInfo(link);
			},
			// 获取书籍章节内容
			getInfo(link) {
				this.cpContent = null;
				this.getChaptIndex(link,'link');
				link = encodeURIComponent(link);
				Api.getBookChapter(link).then(res => {
					if (res.chapter && res.chapter.cpContent) {
						this.errMsg = '';
						let i = res.chapter.title.indexOf('第')
						this.title = res.chapter.title.substring(i)
						this.cpContent = res.chapter.cpContent.replace(/(\r\n|\n|\r)/gm, '<br />');
					} else {
						this.errMsg = res.chapter.body;
					}
				})
			},
			// 获取正在阅读的章节在目录中的下标
			getChaptIndex(readLink,type='link') {
				if (type == 'reduce') {
					this.readChapter -= 1;
				} else if(type == 'reduce') {
					this.readChapter += 1;
				} else if (type == 'link') {
					for (var i = 0; i < this.chapterList.length; i++) {
						let link = this.chapterList[i].link;
						if (link == readLink) {
							this.readChapter = i;
							break;
						}
					}
				}
			},
			// 显示上下部分
			showModal() {this.showHF = !this.showHF;},
			// 编辑修改了字体、颜色等readSet
			editReadSet(obj) {this.readSet = obj;},
			// 上一章
			prev() {
				if (this.readChapter < 1) {
					this.$Rewrite.showToast('已经是第一章了呦~');
					return;
				}
				let bookLink = this.chapterList[this.readChapter-1].link;
				this.getInfo(bookLink);
			},
			// 下一章
			next() {
				if (this.readChapter >= this.chapterList.length) {
					this.$Rewrite.showToast('没有啦，不要点了~');
					return;
				}
				let bookLink = this.chapterList[this.readChapter+1].link;
				this.getInfo(bookLink);
			},
			// 显示目录
			showMulu() {this.visible=true;}
		},
		computed: {
			text() {
				let nowInd = this.readChapter+1;
				let allLength = this.chapterList.length;
				return nowInd + '/' + allLength
			}
		}
	}
</script>

<style lang="scss" scoped>
	.book-reader{
		.text{
			box-sizing: border-box;
		}
	}
</style>