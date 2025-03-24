<template>
	<view class="diy_details diy_div_equipment_borrowing">
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
					<view v-if="$check_field('get','borrowing_users')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>借用用户:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_borrowing_users(obj['borrowing_users']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','borrowing_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>借用时间:</span>
						</view>
							<view class="diy_field diy_date">
							<text>
								{{ $toTime(obj["borrowing_time"],"yyyy-MM-dd") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','borrowed_quantity')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>借用数量:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["borrowed_quantity"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','borrowing_status')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>借用状态:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["borrowing_status"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','borrowing_remarks')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>借用备注:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["borrowing_remarks"]}}
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
						<button type="button" class="diy_btn" @click="to_form('/pages/equipment_return/edit')" v-if="$check_action('/equipment_return/edit','add') || $check_action('/equipment_return/edit','set')" >归还</button>
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
						equipment_borrowing_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
								// 用户列表
				list_user_borrowing_users: [],
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
				var res = await this.$get("~/api/equipment_borrowing/get_obj", {
					equipment_borrowing_id:this.query.equipment_borrowing_id
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
			async get_list_user_borrowing_users() {
				var json = await this.$get("~/api/user/get_list?user_group=注册用户");
				if(json.result && json.result.list){
					this.list_user_borrowing_users = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_borrowing_users(id){
				let obj = this.list_user_borrowing_users;
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
							this.get_list_user_borrowing_users();
							},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["equipment_borrowing_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_equipment_borrowing_details {}

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
