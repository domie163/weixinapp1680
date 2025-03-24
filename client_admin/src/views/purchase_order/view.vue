<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','consumable_number') || $check_field('add','consumable_number') || $check_field('set','consumable_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材编号" prop="consumable_number">
												<el-input id="consumable_number" v-model="form['consumable_number']" placeholder="请输入耗材编号"
							  v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','consumable_number')) || (!form['purchase_order_id'] && $check_field('add','consumable_number'))" :disabled="disabledObj['consumable_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','consumable_number')">{{form['consumable_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','consumable_name') || $check_field('add','consumable_name') || $check_field('set','consumable_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材名称" prop="consumable_name">
												<el-input id="consumable_name" v-model="form['consumable_name']" placeholder="请输入耗材名称"
							  v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','consumable_name')) || (!form['purchase_order_id'] && $check_field('add','consumable_name'))" :disabled="disabledObj['consumable_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','consumable_name')">{{form['consumable_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','item_specifications') || $check_field('add','item_specifications') || $check_field('set','item_specifications')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="物品规格" prop="item_specifications">
												<el-input id="item_specifications" v-model="form['item_specifications']" placeholder="请输入物品规格"
							  v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','item_specifications')) || (!form['purchase_order_id'] && $check_field('add','item_specifications'))" :disabled="disabledObj['item_specifications_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','item_specifications')">{{form['item_specifications']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','consumable_price') || $check_field('add','consumable_price') || $check_field('set','consumable_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材价格" prop="consumable_price">
								<el-input-number id="consumable_price" v-model.number="form['consumable_price']"
						v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','consumable_price')) || (!form['purchase_order_id'] && $check_field('add','consumable_price'))" :disabled="disabledObj['consumable_price_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','consumable_price')">{{form['consumable_price']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','purchasing_users') || $check_field('add','purchasing_users') || $check_field('set','purchasing_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买用户" prop="purchasing_users">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_purchasing_users(form['purchasing_users']) }}
							<!--<el-input id="business_name" v-model="form['purchasing_users']" placeholder="请输入购买用户"-->
							<!--v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchasing_users')) || (!form['purchase_order_id'] && $check_field('add','purchasing_users'))" :disabled="disabledObj['purchasing_users_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','purchasing_users')">{{form['purchasing_users']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchasing_users')) || (!form['purchase_order_id'] && $check_field('add','purchasing_users'))" id="purchasing_users" v-model="form['purchasing_users']" :disabled="disabledObj['purchasing_users_isDisabled']">
								<el-option v-for="o in list_user_purchasing_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','purchasing_users')" id="purchasing_users" v-model="form['purchasing_users']" :disabled="true">
								<el-option v-for="o in list_user_purchasing_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="purchasing_users" v-model="form['purchasing_users']" :disabled="disabledObj['purchasing_users_isDisabled']">
							<el-option v-for="o in list_user_purchasing_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','purchase_time') || $check_field('add','purchase_time') || $check_field('set','purchase_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买时间" prop="purchase_time">
								<el-date-picker :disabled="disabledObj['purchase_time_isDisabled']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_time')) || (!form['purchase_order_id'] && $check_field('add','purchase_time'))" id="purchase_time"
						v-model="form['purchase_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','purchase_time')">{{form['purchase_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('set','purchase_quantity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买数量" prop="purchase_quantity">
								<el-input-number id="purchase_quantity" v-model.number="form['purchase_quantity']"
						v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_quantity')) || (!form['purchase_order_id'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','purchase_quantity')">{{form['purchase_quantity']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','purchase_status') || $check_field('add','purchase_status') || $check_field('set','purchase_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买状态" prop="purchase_status">
								<el-select id="purchase_status" v-model="form['purchase_status']"
						v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_status')) || (!form['purchase_order_id'] && $check_field('add','purchase_status'))">
						<el-option v-for="o in list_purchase_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','purchase_status')">{{form['purchase_status']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','total_price') || $check_field('add','total_price') || $check_field('set','total_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="合计总价" prop="total_price">
												<el-input id="total_price" v-model="form['total_price']" placeholder="请输入合计总价"
							  v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','total_price')) || (!form['purchase_order_id'] && $check_field('add','total_price'))"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','total_price')">{{form['total_price']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','purchase_notes') || $check_field('add','purchase_notes') || $check_field('set','purchase_notes')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买备注" prop="purchase_notes">
								<el-input type="textarea" id="purchase_notes" v-model="form['purchase_notes']" placeholder="请输入购买备注"
						v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_notes')) || (!form['purchase_order_id'] && $check_field('add','purchase_notes'))" :disabled="disabledObj['purchase_notes_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','purchase_notes')">{{form['purchase_notes']}}</div>
							</el-form-item>
			</el-col>
					
	
	
	
	
	
	
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item>
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "purchase_order_id",
				url_add: "~/api/purchase_order/add?",
				url_set: "~/api/purchase_order/set?",
				url_get_obj: "~/api/purchase_order/get_obj?",
				url_upload: "~/api/purchase_order/upload?",

				query: {
					"purchase_order_id": 0,
				},

				form: {
								"consumable_number":  '', // 耗材编号
										"consumable_name":  '', // 耗材名称
										"item_specifications":  '', // 物品规格
										"consumable_price":  0, // 耗材价格
										"purchasing_users": 0, // 购买用户
										"purchase_time":  '', // 购买时间
										"purchase_quantity":  0, // 购买数量
										"purchase_status":  '', // 购买状态
										"total_price":  '', // 合计总价
										"purchase_notes":  '', // 购买备注
											"purchase_order_id": 0, // ID
						
				},
				disabledObj:{
								"consumable_number_isDisabled": false,
										"consumable_name_isDisabled": false,
										"item_specifications_isDisabled": false,
					          			"consumable_price_isDisabled": false,
										"purchasing_users_isDisabled": false,
										"purchase_time_isDisabled": false,
					          			"purchase_quantity_isDisabled": false,
										"purchase_status_isDisabled": false,
										"total_price_isDisabled": false,
										"purchase_notes_isDisabled": false,
										},

	
		
		
		
		
					// 用户列表
				list_user_purchasing_users: [],
						// 用户组
				group_user_purchasing_users: "",
				
		
						// 购买状态选项列表
				list_purchase_status: ['购买成功','购买失败'],
	
		
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
			
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_purchasing_users() {
                // if(this.user_group !== "管理员" && this.form["purchasing_users"] === 0) {
                //     this.form["purchasing_users"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_purchasing_users = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取注册用户用户组
			 */
			async get_group_user_purchasing_users() {
							this.form["purchasing_users"] = this.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					this.group_user_purchasing_users = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_purchasing_users(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_purchasing_users.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
									for (let key in _this.form) {
							arrForm.push(key)
						}
												_this.form["purchasing_users"] = id
									_this.disabledObj['purchasing_users' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "purchasing_users") {
			                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
			                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								  break;
								} else {
								  _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								}
							  }
							}
						  }
						}
					}
				});
			},
					get_user_purchasing_users(id){
				var obj = this.list_user_purchasing_users.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
			
	
			
	
			
	
			
	
										set_total_price(){
				this.form.total_price = parseFloat(this.form.consumable_price) * parseFloat(this.form.purchase_quantity)
			},
							
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
																														// 获取缓存数据附加
				form = $.db.get("form");
							$.push(this.form ,form);
							
				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
												        if (this.form["purchase_time"].indexOf("-")===-1){
          this.form["purchase_time"] = this.$toTime(parseInt(this.form["purchase_time"]),"yyyy-MM-dd")
        }
													$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){


																	        if(this.form["purchase_time"]=="0000-00-00"){
          this.form["purchase_time"] = null;
        }
				if(parseInt(this.form["purchase_time"]) > 9999){
					this.form["purchase_time"] = this.$toTime(parseInt(this.form["purchase_time"]),"yyyy-MM-dd")
				}
														


			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
				let msg = null
																																				return msg;
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/purchase_order/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/purchase_order/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/purchase_order/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/purchase_order/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/purchase_order/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
													this.get_list_user_purchasing_users();
					this.get_group_user_purchasing_users();
															},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}




</style>
