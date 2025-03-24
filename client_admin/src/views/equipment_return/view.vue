<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','equipment_coding') || $check_field('add','equipment_coding') || $check_field('set','equipment_coding')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备编码" prop="equipment_coding">
												<el-input id="equipment_coding" v-model="form['equipment_coding']" placeholder="请输入设备编码"
							  v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','equipment_coding')) || (!form['equipment_return_id'] && $check_field('add','equipment_coding'))" :disabled="disabledObj['equipment_coding_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','equipment_coding')">{{form['equipment_coding']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_name') || $check_field('add','device_name') || $check_field('set','device_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备名称" prop="device_name">
												<el-input id="device_name" v-model="form['device_name']" placeholder="请输入设备名称"
							  v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','device_name')) || (!form['equipment_return_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','device_name')">{{form['device_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','storage_location') || $check_field('add','storage_location') || $check_field('set','storage_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="存放位置" prop="storage_location">
												<el-input id="storage_location" v-model="form['storage_location']" placeholder="请输入存放位置"
							  v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','storage_location')) || (!form['equipment_return_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','storage_location')">{{form['storage_location']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','return_to_user') || $check_field('add','return_to_user') || $check_field('set','return_to_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="归还用户" prop="return_to_user">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_return_to_user(form['return_to_user']) }}
							<!--<el-input id="business_name" v-model="form['return_to_user']" placeholder="请输入归还用户"-->
							<!--v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_to_user')) || (!form['equipment_return_id'] && $check_field('add','return_to_user'))" :disabled="disabledObj['return_to_user_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','return_to_user')">{{form['return_to_user']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_to_user')) || (!form['equipment_return_id'] && $check_field('add','return_to_user'))" id="return_to_user" v-model="form['return_to_user']" :disabled="disabledObj['return_to_user_isDisabled']">
								<el-option v-for="o in list_user_return_to_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','return_to_user')" id="return_to_user" v-model="form['return_to_user']" :disabled="true">
								<el-option v-for="o in list_user_return_to_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="return_to_user" v-model="form['return_to_user']" :disabled="disabledObj['return_to_user_isDisabled']">
							<el-option v-for="o in list_user_return_to_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','return_time') || $check_field('add','return_time') || $check_field('set','return_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="归还时间" prop="return_time">
								<el-date-picker :disabled="disabledObj['return_time_isDisabled']" v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_time')) || (!form['equipment_return_id'] && $check_field('add','return_time'))" id="return_time"
						v-model="form['return_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','return_time')">{{form['return_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','return_quantity') || $check_field('add','return_quantity') || $check_field('set','return_quantity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="归还数量" prop="return_quantity">
								<el-input-number id="return_quantity" v-model.number="form['return_quantity']"
						v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_quantity')) || (!form['equipment_return_id'] && $check_field('add','return_quantity'))" :disabled="disabledObj['return_quantity_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','return_quantity')">{{form['return_quantity']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','return_status') || $check_field('add','return_status') || $check_field('set','return_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="归还状态" prop="return_status">
								<el-select id="return_status" v-model="form['return_status']"
						v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_status')) || (!form['equipment_return_id'] && $check_field('add','return_status'))">
						<el-option v-for="o in list_return_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','return_status')">{{form['return_status']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','return_remarks') || $check_field('add','return_remarks') || $check_field('set','return_remarks')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="归还备注" prop="return_remarks">
								<el-input type="textarea" id="return_remarks" v-model="form['return_remarks']" placeholder="请输入归还备注"
						v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_remarks')) || (!form['equipment_return_id'] && $check_field('add','return_remarks'))" :disabled="disabledObj['return_remarks_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','return_remarks')">{{form['return_remarks']}}</div>
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
				field: "equipment_return_id",
				url_add: "~/api/equipment_return/add?",
				url_set: "~/api/equipment_return/set?",
				url_get_obj: "~/api/equipment_return/get_obj?",
				url_upload: "~/api/equipment_return/upload?",

				query: {
					"equipment_return_id": 0,
				},

				form: {
								"equipment_coding":  '', // 设备编码
										"device_name":  '', // 设备名称
										"storage_location":  '', // 存放位置
										"return_to_user": 0, // 归还用户
										"return_time":  '', // 归还时间
										"return_quantity":  0, // 归还数量
										"return_status":  '', // 归还状态
										"return_remarks":  '', // 归还备注
											"equipment_return_id": 0, // ID
						
				},
				disabledObj:{
								"equipment_coding_isDisabled": false,
										"device_name_isDisabled": false,
										"storage_location_isDisabled": false,
										"return_to_user_isDisabled": false,
										"return_time_isDisabled": false,
					          			"return_quantity_isDisabled": false,
										"return_status_isDisabled": false,
										"return_remarks_isDisabled": false,
										},

	
		
		
		
					// 用户列表
				list_user_return_to_user: [],
						// 用户组
				group_user_return_to_user: "",
				
		
						// 归还状态选项列表
				list_return_status: ['归还成功','归还失败'],
	
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_return_to_user() {
                // if(this.user_group !== "管理员" && this.form["return_to_user"] === 0) {
                //     this.form["return_to_user"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_return_to_user = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取注册用户用户组
			 */
			async get_group_user_return_to_user() {
							this.form["return_to_user"] = this.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					this.group_user_return_to_user = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_return_to_user(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_return_to_user.source_table+"/get_obj?"
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
												_this.form["return_to_user"] = id
									_this.disabledObj['return_to_user' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "return_to_user") {
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
					get_user_return_to_user(id){
				var obj = this.list_user_return_to_user.getObj({"user_id":id});
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
									        if (this.form["return_time"].indexOf("-")===-1){
            this.form["return_time"] = this.$toTime(parseInt(this.form["return_time"]),"yyyy-MM-dd hh:mm:ss")
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


													        if(this.form["return_time"]=="0000-00-00 00:00:00"){
          this.form["return_time"] = null;
        }
				if(parseInt(this.form["return_time"]) > 9999){
					this.form["return_time"] = this.$toTime(parseInt(this.form["return_time"]),"yyyy-MM-dd hh:mm:ss")
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
					bl = this.$check_action('/equipment_return/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_return/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_return/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_return/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_return/view','get');
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
											this.get_list_user_return_to_user();
					this.get_group_user_return_to_user();
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
