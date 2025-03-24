<template>
	<view class="diy_details diy_div_record_log">
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
					<view v-if="$check_field('get','recording_personnel')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>记录人员:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["recording_personnel"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','record_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>记录时间:</span>
						</view>
							<view class="diy_field diy_date">
							<text>
								{{ $toTime(obj["record_time"],"yyyy-MM-dd") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','usage')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>使用情况:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["usage"]}}
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
					<view v-if="$check_field('get','total_duration')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>总时长:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["total_duration"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','record_details')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>记录详情:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["record_details"] }}
							</text>
						</view>
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
						record_log_id: 0
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
				var res = await this.$get("~/api/record_log/get_obj", {
					record_log_id:this.query.record_log_id
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
			} else if (this.query["record_log_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_record_log_details {}

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
