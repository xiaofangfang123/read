<template>
	<view class="categorylist">
		<view class="listitem" v-for="i in list" :key="i._id">
			<listItem @cli="goBookInfo" :item="i" :isList="true" />
		</view>
	</view>
</template>

<script>
	import * as Api from '@/config/api.js'
	import listItem from '@/components/list-item/list-item.vue'
	export default {
		name: 'RankList',
		data() {
			return {
				id: '',
				name: '',
				list: []
			};
		},
		components: {listItem},
		onLoad(option) {
			this.id = option.id;
			this.name = option.name;
			uni.setNavigationBarTitle({title: option.name});
			this.getListInfo();
		},
		methods: {
			// 获取当前分类下书籍详情
			getListInfo() {
				Api.getRank(this.id).then(res=>{
					this.list = res.ranking.books;
					console.log(res);
				})
			},
			// 跳转到书籍详情
			goBookInfo(item) {
				console.log(item);
				this.$Rewrite.go('/pages/book-info/book-info', {id:item._id,name:item.title});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.categorylist{
		position: relative;
		.listitem{
			background-color: #FFFFFF;
			margin-top: $xff-page-padding;
			padding: $xff-page-padding;
		}
	}
</style>
