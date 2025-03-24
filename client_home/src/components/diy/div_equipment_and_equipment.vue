<template>
	<view class="diy_details diy_div_equipment_and_equipment">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','equipment_coding')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>设备编码:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["equipment_coding"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','device_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>设备名称:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["device_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','storage_location')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>存放位置:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["storage_location"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','device_status')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>设备状态:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["device_status"]}}
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
					<view v-if="$check_field('get','lending_notice')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>出借须知:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["lending_notice"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','usage_duration')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>使用时长:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["usage_duration"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','device_details')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>设备详情:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["device_details"]}}
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
						<button type="button" class="diy_btn" @click="to_form('/pages/equipment_borrowing/edit')" v-if="$check_action('/equipment_borrowing/edit','add') || $check_action('/equipment_borrowing/edit','set')" >借用</button>
					</view>
				</view>
			</view>
		</view>
			<view class="warp">
			<view class="container">
				<view class="row">
					<view class="col">
						<button type="button" class="diy_btn" @click="to_form('/pages/record_log/edit')" v-if="$check_action('/record_log/edit','add') || $check_action('/record_log/edit','set')" >记录</button>
					</view>
				</view>
			</view>
		</view>
			<view class="warp">
			<view class="container">
				<view class="row">
					<view class="col">
						<button type="button" class="diy_btn" @click="to_form('/pages/repair_and_maintenance_report/edit')" v-if="$check_action('/repair_and_maintenance_report/edit','add') || $check_action('/repair_and_maintenance_report/edit','set')" >报修检修</button>
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
						equipment_and_equipment_id: 0
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
				var res = await this.$get("~/api/equipment_and_equipment/get_obj", {
					equipment_and_equipment_id:this.query.equipment_and_equipment_id
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
			} else if (this.query["equipment_and_equipment_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_equipment_and_equipment_details {}

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
