<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_number') || $check_field('add','laboratory_number') || $check_field('set','laboratory_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室编号" prop="laboratory_number">
												<el-input id="laboratory_number" v-model="form['laboratory_number']" placeholder="请输入实验室编号"
							  v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','laboratory_number')) || (!form['appointment_information_id'] && $check_field('add','laboratory_number'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','laboratory_number')">{{form['laboratory_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_name') || $check_field('add','laboratory_name') || $check_field('set','laboratory_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室名称" prop="laboratory_name">
												<el-input id="laboratory_name" v-model="form['laboratory_name']" placeholder="请输入实验室名称"
							  v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','laboratory_name')) || (!form['appointment_information_id'] && $check_field('add','laboratory_name'))" :disabled="disabledObj['laboratory_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','laboratory_name')">{{form['laboratory_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_status') || $check_field('add','laboratory_status') || $check_field('set','laboratory_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室状态" prop="laboratory_status">
												<el-input id="laboratory_status" v-model="form['laboratory_status']" placeholder="请输入实验室状态"
							  v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','laboratory_status')) || (!form['appointment_information_id'] && $check_field('add','laboratory_status'))" :disabled="disabledObj['laboratory_status_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','laboratory_status')">{{form['laboratory_status']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','appointment_users') || $check_field('add','appointment_users') || $check_field('set','appointment_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预约用户" prop="appointment_users">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_appointment_users(form['appointment_users']) }}
							<!--<el-input id="business_name" v-model="form['appointment_users']" placeholder="请输入预约用户"-->
							<!--v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_users')) || (!form['appointment_information_id'] && $check_field('add','appointment_users'))" :disabled="disabledObj['appointment_users_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','appointment_users')">{{form['appointment_users']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_users')) || (!form['appointment_information_id'] && $check_field('add','appointment_users'))" id="appointment_users" v-model="form['appointment_users']" :disabled="disabledObj['appointment_users_isDisabled']">
								<el-option v-for="o in list_user_appointment_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','appointment_users')" id="appointment_users" v-model="form['appointment_users']" :disabled="true">
								<el-option v-for="o in list_user_appointment_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="appointment_users" v-model="form['appointment_users']" :disabled="disabledObj['appointment_users_isDisabled']">
							<el-option v-for="o in list_user_appointment_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','time_of_appointment') || $check_field('add','time_of_appointment') || $check_field('set','time_of_appointment')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预约时间" prop="time_of_appointment">
								<el-date-picker :disabled="disabledObj['time_of_appointment_isDisabled']" v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','time_of_appointment')) || (!form['appointment_information_id'] && $check_field('add','time_of_appointment'))" id="time_of_appointment"
						v-model="form['time_of_appointment']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','time_of_appointment')">{{form['time_of_appointment']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','appointment_duration') || $check_field('add','appointment_duration') || $check_field('set','appointment_duration')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预约时长" prop="appointment_duration">
												<el-input id="appointment_duration" v-model="form['appointment_duration']" placeholder="请输入预约时长"
							  v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_duration')) || (!form['appointment_information_id'] && $check_field('add','appointment_duration'))" :disabled="disabledObj['appointment_duration_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','appointment_duration')">{{form['appointment_duration']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','appointment_status') || $check_field('add','appointment_status') || $check_field('set','appointment_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预约状态" prop="appointment_status">
								<el-select id="appointment_status" v-model="form['appointment_status']"
						v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_status')) || (!form['appointment_information_id'] && $check_field('add','appointment_status'))">
						<el-option v-for="o in list_appointment_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','appointment_status')">{{form['appointment_status']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','appointment_notes') || $check_field('add','appointment_notes') || $check_field('set','appointment_notes')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预约备注" prop="appointment_notes">
								<el-input type="textarea" id="appointment_notes" v-model="form['appointment_notes']" placeholder="请输入预约备注"
						v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_notes')) || (!form['appointment_information_id'] && $check_field('add','appointment_notes'))" :disabled="disabledObj['appointment_notes_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','appointment_notes')">{{form['appointment_notes']}}</div>
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
				field: "appointment_information_id",
				url_add: "~/api/appointment_information/add?",
				url_set: "~/api/appointment_information/set?",
				url_get_obj: "~/api/appointment_information/get_obj?",
				url_upload: "~/api/appointment_information/upload?",

				query: {
					"appointment_information_id": 0,
				},

				form: {
								"laboratory_number": this.$get_stamp(), // 实验室编号
										"laboratory_name":  '', // 实验室名称
										"laboratory_status":  '', // 实验室状态
										"appointment_users": 0, // 预约用户
										"time_of_appointment":  '', // 预约时间
										"appointment_duration":  '', // 预约时长
										"appointment_status":  '', // 预约状态
										"appointment_notes":  '', // 预约备注
											"appointment_information_id": 0, // ID
						
				},
				disabledObj:{
								"laboratory_number_isDisabled": false,
										"laboratory_name_isDisabled": false,
										"laboratory_status_isDisabled": false,
										"appointment_users_isDisabled": false,
										"time_of_appointment_isDisabled": false,
										"appointment_duration_isDisabled": false,
										"appointment_status_isDisabled": false,
										"appointment_notes_isDisabled": false,
										},

	
		
		
		
					// 用户列表
				list_user_appointment_users: [],
						// 用户组
				group_user_appointment_users: "",
				
		
						// 预约状态选项列表
				list_appointment_status: ['预约成功','预约失败'],
	
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_appointment_users() {
                // if(this.user_group !== "管理员" && this.form["appointment_users"] === 0) {
                //     this.form["appointment_users"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_appointment_users = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取注册用户用户组
			 */
			async get_group_user_appointment_users() {
							this.form["appointment_users"] = this.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					this.group_user_appointment_users = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_appointment_users(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_appointment_users.source_table+"/get_obj?"
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
												_this.form["appointment_users"] = id
									_this.disabledObj['appointment_users' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "appointment_users") {
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
					get_user_appointment_users(id){
				var obj = this.list_user_appointment_users.getObj({"user_id":id});
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
									        if (this.form["time_of_appointment"].indexOf("-")===-1){
            this.form["time_of_appointment"] = this.$toTime(parseInt(this.form["time_of_appointment"]),"yyyy-MM-dd hh:mm:ss")
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


													        if(this.form["time_of_appointment"]=="0000-00-00 00:00:00"){
          this.form["time_of_appointment"] = null;
        }
				if(parseInt(this.form["time_of_appointment"]) > 9999){
					this.form["time_of_appointment"] = this.$toTime(parseInt(this.form["time_of_appointment"]),"yyyy-MM-dd hh:mm:ss")
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
					bl = this.$check_action('/appointment_information/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/appointment_information/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/appointment_information/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/appointment_information/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/appointment_information/view','get');
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
											this.get_list_user_appointment_users();
					this.get_group_user_appointment_users();
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
