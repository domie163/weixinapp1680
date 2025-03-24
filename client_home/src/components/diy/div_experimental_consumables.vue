<template>
	<view class="diy_details diy_div_experimental_consumables">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','consumable_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>耗材编号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["consumable_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','consumable_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>耗材名称:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["consumable_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','cover_photo')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>封面图片:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['cover_photo'])" mode="widthFix"></image>
						</view>
						</view>
					<view v-if="$check_field('get','quantity_of_consumables')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>耗材数量:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["quantity_of_consumables"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','consumable_price')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>耗材价格:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["consumable_price"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','item_specifications')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>物品规格:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["item_specifications"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','consumable_details')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>耗材详情:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["consumable_details"] }}
							</text>
						</view>
						</view>
				</view>
			</view>
		</view>

			<view class="warp">
			<view class="container">
				<view class="row">
					<view class="col">
						<button type="button" class="diy_btn" @click="to_form('/pages/purchase_order/edit')" v-if="$check_action('/purchase_order/edit','add') || $check_action('/purchase_order/edit','set')" >购买</button>
					</view>
				</view>
			</view>
		</view>
		</view>
</template>

<script>
	import mixin from "@/libs/mixins/component.js";
	export default {
		mixins: [mixin],
		props: {
			obj_goods: {
				type: Object,
				default(){
					return {}
				}
			},
			query:{
				type: Object,
				default(){
					return {
						experimental_consumables_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
										}
		},
		methods: {
			async get_obj_goods_type() {
				var res = await this.$get("~/api/goods_type/get_obj", {
					name: this.obj_goods.type
				})

				if (res.result.obj) {
					this.obj_goods_type = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
			async get_obj_by_goods() {
				var {
					source_table,
					source_field
				} = this.obj_goods_type
				var {
					source_id
				} = this.obj_goods
				var query = {}
				query[source_field] = source_id
				this.$get("~/api/" + source_table + "/get_obj", {}, (res) => {
					if (res.result.obj) {
						this.obj = res.result.obj
					} else {
						console.log("没有请求到商品分类");
					}
				})
			},
			async get_obj_by_id(){
				var res = await this.$get("~/api/experimental_consumables/get_obj", {
					experimental_consumables_id:this.query.experimental_consumables_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
									},
		created() {
									},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["experimental_consumables_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_experimental_consumables_details {}

	.details {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
		border-bottom: 1px solid #eee;
	}

	.left_text {
		flex: 0 0 25%;
	}

	.right_text {
		flex: 0 0 75%;
	}
	.edit_nav{
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}
</style>
