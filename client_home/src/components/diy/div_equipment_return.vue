<template>
	<view class="diy_details diy_div_equipment_return">
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
					<view v-if="$check_field('get','return_to_user')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>归还用户:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_return_to_user(obj['return_to_user']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','return_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>归还时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["return_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','return_quantity')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>归还数量:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["return_quantity"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','return_status')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>归还状态:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["return_status"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','return_remarks')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>归还备注:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["return_remarks"] }}
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
						equipment_return_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
								// 用户列表
				list_user_return_to_user: [],
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
				var res = await this.$get("~/api/equipment_return/get_obj", {
					equipment_return_id:this.query.equipment_return_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
							/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_return_to_user() {
				var json = await this.$get("~/api/user/get_list?user_group=注册用户");
				if(json.result && json.result.list){
					this.list_user_return_to_user = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_return_to_user(id){
				let obj = this.list_user_return_to_user;
				let ret = "";
				for(let i=0;i<obj.length;i++){
					if(obj[i].user_id==id){
						ret = obj[i].nickname+"-"+obj[i].username;
					}
				}
				return ret;
			},
							},
		created() {
							this.get_list_user_return_to_user();
							},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["equipment_return_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_equipment_return_details {}

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
