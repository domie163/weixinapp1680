<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','equipment_coding') || $check_field('add','equipment_coding') || $check_field('set','equipment_coding')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备编码" prop="equipment_coding">
												<el-input id="equipment_coding" v-model="form['equipment_coding']" placeholder="请输入设备编码"
							  v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','equipment_coding')) || (!form['equipment_borrowing_id'] && $check_field('add','equipment_coding'))" :disabled="disabledObj['equipment_coding_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','equipment_coding')">{{form['equipment_coding']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_name') || $check_field('add','device_name') || $check_field('set','device_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备名称" prop="device_name">
												<el-input id="device_name" v-model="form['device_name']" placeholder="请输入设备名称"
							  v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','device_name')) || (!form['equipment_borrowing_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','device_name')">{{form['device_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','storage_location') || $check_field('add','storage_location') || $check_field('set','storage_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="存放位置" prop="storage_location">
												<el-input id="storage_location" v-model="form['storage_location']" placeholder="请输入存放位置"
							  v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','storage_location')) || (!form['equipment_borrowing_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','storage_location')">{{form['storage_location']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','borrowing_users') || $check_field('add','borrowing_users') || $check_field('set','borrowing_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="借用用户" prop="borrowing_users">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_borrowing_users(form['borrowing_users']) }}
							<!--<el-input id="business_name" v-model="form['borrowing_users']" placeholder="请输入借用用户"-->
							<!--v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','borrowing_users')) || (!form['equipment_borrowing_id'] && $check_field('add','borrowing_users'))" :disabled="disabledObj['borrowing_users_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','borrowing_users')">{{form['borrowing_users']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','borrowing_users')) || (!form['equipment_borrowing_id'] && $check_field('add','borrowing_users'))" id="borrowing_users" v-model="form['borrowing_users']" :disabled="disabledObj['borrowing_users_isDisabled']">
								<el-option v-for="o in list_user_borrowing_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','borrowing_users')" id="borrowing_users" v-model="form['borrowing_users']" :disabled="true">
								<el-option v-for="o in list_user_borrowing_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="borrowing_users" v-model="form['borrowing_users']" :disabled="disabledObj['borrowing_users_isDisabled']">
							<el-option v-for="o in list_user_borrowing_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','borrowing_time') || $check_field('add','borrowing_time') || $check_field('set','borrowing_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="借用时间" prop="borrowing_time">
								<el-date-picker :disabled="disabledObj['borrowing_time_isDisabled']" v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','borrowing_time')) || (!form['equipment_borrowing_id'] && $check_field('add','borrowing_time'))" id="borrowing_time"
						v-model="form['borrowing_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','borrowing_time')">{{form['borrowing_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','borrowed_quantity') || $check_field('add','borrowed_quantity') || $check_field('set','borrowed_quantity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="借用数量" prop="borrowed_quantity">
								<el-input-number id="borrowed_quantity" v-model.number="form['borrowed_quantity']"
						v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','borrowed_quantity')) || (!form['equipment_borrowing_id'] && $check_field('add','borrowed_quantity'))" :disabled="disabledObj['borrowed_quantity_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','borrowed_quantity')">{{form['borrowed_quantity']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','borrowing_status') || $check_field('add','borrowing_status') || $check_field('set','borrowing_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="借用状态" prop="borrowing_status">
								<el-select id="borrowing_status" v-model="form['borrowing_status']"
						v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','borrowing_status')) || (!form['equipment_borrowing_id'] && $check_field('add','borrowing_status'))">
						<el-option v-for="o in list_borrowing_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','borrowing_status')">{{form['borrowing_status']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','borrowing_remarks') || $check_field('add','borrowing_remarks') || $check_field('set','borrowing_remarks')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="借用备注" prop="borrowing_remarks">
												<el-input id="borrowing_remarks" v-model="form['borrowing_remarks']" placeholder="请输入借用备注"
							  v-if="user_group === '管理员' || (form['equipment_borrowing_id'] && $check_field('set','borrowing_remarks')) || (!form['equipment_borrowing_id'] && $check_field('add','borrowing_remarks'))" :disabled="disabledObj['borrowing_remarks_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','borrowing_remarks')">{{form['borrowing_remarks']}}</div>
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
				field: "equipment_borrowing_id",
				url_add: "~/api/equipment_borrowing/add?",
				url_set: "~/api/equipment_borrowing/set?",
				url_get_obj: "~/api/equipment_borrowing/get_obj?",
				url_upload: "~/api/equipment_borrowing/upload?",

				query: {
					"equipment_borrowing_id": 0,
				},

				form: {
								"equipment_coding":  '', // 设备编码
										"device_name":  '', // 设备名称
										"storage_location":  '', // 存放位置
										"borrowing_users": 0, // 借用用户
										"borrowing_time":  '', // 借用时间
										"borrowed_quantity":  0, // 借用数量
										"borrowing_status":  '', // 借用状态
										"borrowing_remarks":  '', // 借用备注
											"equipment_borrowing_id": 0, // ID
						
				},
				disabledObj:{
								"equipment_coding_isDisabled": false,
										"device_name_isDisabled": false,
										"storage_location_isDisabled": false,
										"borrowing_users_isDisabled": false,
										"borrowing_time_isDisabled": false,
					          			"borrowed_quantity_isDisabled": false,
										"borrowing_status_isDisabled": false,
										"borrowing_remarks_isDisabled": false,
										},

	
		
		
		
					// 用户列表
				list_user_borrowing_users: [],
						// 用户组
				group_user_borrowing_users: "",
				
		
						// 借用状态选项列表
				list_borrowing_status: ['借用成功','借用失败'],
	
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_borrowing_users() {
                // if(this.user_group !== "管理员" && this.form["borrowing_users"] === 0) {
                //     this.form["borrowing_users"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_borrowing_users = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取注册用户用户组
			 */
			async get_group_user_borrowing_users() {
							this.form["borrowing_users"] = this.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					this.group_user_borrowing_users = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_borrowing_users(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_borrowing_users.source_table+"/get_obj?"
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
												_this.form["borrowing_users"] = id
									_this.disabledObj['borrowing_users' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "borrowing_users") {
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
					get_user_borrowing_users(id){
				var obj = this.list_user_borrowing_users.getObj({"user_id":id});
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
										        if (this.form["borrowing_time"].indexOf("-")===-1){
          this.form["borrowing_time"] = this.$toTime(parseInt(this.form["borrowing_time"]),"yyyy-MM-dd")
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


														        if(this.form["borrowing_time"]=="0000-00-00"){
          this.form["borrowing_time"] = null;
        }
				if(parseInt(this.form["borrowing_time"]) > 9999){
					this.form["borrowing_time"] = this.$toTime(parseInt(this.form["borrowing_time"]),"yyyy-MM-dd")
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
					bl = this.$check_action('/equipment_borrowing/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_borrowing/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_borrowing/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_borrowing/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_borrowing/view','get');
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
											this.get_list_user_borrowing_users();
					this.get_group_user_borrowing_users();
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
