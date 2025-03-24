<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','equipment_coding') || $check_field('add','equipment_coding') || $check_field('set','equipment_coding')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备编码" prop="equipment_coding">
												<el-input id="equipment_coding" v-model="form['equipment_coding']" placeholder="请输入设备编码"
							  v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','equipment_coding')) || (!form['record_log_id'] && $check_field('add','equipment_coding'))" :disabled="disabledObj['equipment_coding_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','equipment_coding')">{{form['equipment_coding']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_name') || $check_field('add','device_name') || $check_field('set','device_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备名称" prop="device_name">
												<el-input id="device_name" v-model="form['device_name']" placeholder="请输入设备名称"
							  v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','device_name')) || (!form['record_log_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','device_name')">{{form['device_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','storage_location') || $check_field('add','storage_location') || $check_field('set','storage_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="存放位置" prop="storage_location">
												<el-input id="storage_location" v-model="form['storage_location']" placeholder="请输入存放位置"
							  v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','storage_location')) || (!form['record_log_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','storage_location')">{{form['storage_location']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','recording_personnel') || $check_field('add','recording_personnel') || $check_field('set','recording_personnel')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="记录人员" prop="recording_personnel">
												<el-input id="recording_personnel" v-model="form['recording_personnel']" placeholder="请输入记录人员"
							  v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','recording_personnel')) || (!form['record_log_id'] && $check_field('add','recording_personnel'))" :disabled="disabledObj['recording_personnel_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','recording_personnel')">{{form['recording_personnel']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','record_time') || $check_field('add','record_time') || $check_field('set','record_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="记录时间" prop="record_time">
								<el-date-picker :disabled="disabledObj['record_time_isDisabled']" v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','record_time')) || (!form['record_log_id'] && $check_field('add','record_time'))" id="record_time"
						v-model="form['record_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','record_time')">{{form['record_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','usage') || $check_field('add','usage') || $check_field('set','usage')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="使用情况" prop="usage">
												<el-input id="usage" v-model="form['usage']" placeholder="请输入使用情况"
							  v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','usage')) || (!form['record_log_id'] && $check_field('add','usage'))" :disabled="disabledObj['usage_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','usage')">{{form['usage']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','usage_duration') || $check_field('add','usage_duration') || $check_field('set','usage_duration')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="使用时长" prop="usage_duration">
								<el-date-picker :disabled="disabledObj['usage_duration_isDisabled']" v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','usage_duration')) || (!form['record_log_id'] && $check_field('add','usage_duration'))" id="usage_duration"
						v-model="form['usage_duration']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','usage_duration')">{{form['usage_duration']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','total_duration') || $check_field('add','total_duration') || $check_field('set','total_duration')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="总时长" prop="total_duration">
												<el-input id="total_duration" v-model="form['total_duration']" placeholder="请输入总时长"
							  v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','total_duration')) || (!form['record_log_id'] && $check_field('add','total_duration'))" :disabled="disabledObj['total_duration_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','total_duration')">{{form['total_duration']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','record_details') || $check_field('add','record_details') || $check_field('set','record_details')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="记录详情" prop="record_details">
								<el-input type="textarea" id="record_details" v-model="form['record_details']" placeholder="请输入记录详情"
						v-if="user_group === '管理员' || (form['record_log_id'] && $check_field('set','record_details')) || (!form['record_log_id'] && $check_field('add','record_details'))" :disabled="disabledObj['record_details_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','record_details')">{{form['record_details']}}</div>
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
				field: "record_log_id",
				url_add: "~/api/record_log/add?",
				url_set: "~/api/record_log/set?",
				url_get_obj: "~/api/record_log/get_obj?",
				url_upload: "~/api/record_log/upload?",

				query: {
					"record_log_id": 0,
				},

				form: {
								"equipment_coding":  '', // 设备编码
										"device_name":  '', // 设备名称
										"storage_location":  '', // 存放位置
										"recording_personnel":  '', // 记录人员
										"record_time":  '', // 记录时间
										"usage":  '', // 使用情况
										"usage_duration":  '', // 使用时长
										"total_duration":  '', // 总时长
										"record_details":  '', // 记录详情
											"record_log_id": 0, // ID
						
				},
				disabledObj:{
								"equipment_coding_isDisabled": false,
										"device_name_isDisabled": false,
										"storage_location_isDisabled": false,
										"recording_personnel_isDisabled": false,
										"record_time_isDisabled": false,
										"usage_isDisabled": false,
										"usage_duration_isDisabled": false,
										"total_duration_isDisabled": false,
										"record_details_isDisabled": false,
										},

	
		
		
		
		
		
		
		
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
			
	
			
	
			
	
			
	
			
	
		
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
										        if (this.form["record_time"].indexOf("-")===-1){
          this.form["record_time"] = this.$toTime(parseInt(this.form["record_time"]),"yyyy-MM-dd")
        }
				        if (this.form["usage_duration"].indexOf("-")===-1){
            this.form["usage_duration"] = this.$toTime(parseInt(this.form["usage_duration"]),"yyyy-MM-dd hh:mm:ss")
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


														        if(this.form["record_time"]=="0000-00-00"){
          this.form["record_time"] = null;
        }
				if(parseInt(this.form["record_time"]) > 9999){
					this.form["record_time"] = this.$toTime(parseInt(this.form["record_time"]),"yyyy-MM-dd")
				}
						        if(this.form["usage_duration"]=="0000-00-00 00:00:00"){
          this.form["usage_duration"] = null;
        }
				if(parseInt(this.form["usage_duration"]) > 9999){
					this.form["usage_duration"] = this.$toTime(parseInt(this.form["usage_duration"]),"yyyy-MM-dd hh:mm:ss")
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
					bl = this.$check_action('/record_log/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/record_log/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/record_log/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/record_log/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/record_log/view','get');
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
