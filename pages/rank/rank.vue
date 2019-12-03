<template>
	<view class="rank">
		<view class="list" v-for="list in rankList" :key="list.name">
			<view class="title male">{{list.name | cateToText}}</view>
			<uni-list>
				<uni-list-item @click="click(i)" v-for="(i,ind) in list.list" :key="ind"
				:title="i.title" :thumb="staticPath + i.cover"></uni-list-item>
				<!-- <uni-list-item title="标题文字" :show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item> -->
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import {getRankCategory} from '@/config/api.js'
	import config from '@/config/config.js'
	export default {
		data() {
			return {
				staticPath: config.staticPath,
				rankList: []
			};
		},
		components: {uniList,uniListItem},
		onLoad() {
			this.getRank();
		},
		methods: {
			getRank() {
				getRankCategory().then(res => {
					Object.keys(res).forEach(key => {
						if (key != 'ok') {
							let obj = {'name': key,'list': res[key]};
							this.rankList.push(obj);
						}
					})
					console.log(this.rankList);
				})
			},
			click(i) {
				this.$Rewrite.go('/pages/rank-list/rank-list', {id:i._id,name:i.shortTitle});
				console.log(i);
			}
		}
	}
</script>

<style lang="scss">
	.rank{
		.list{
			.title{
				padding: 12px 15px;
			}
		}
	}
</style>
