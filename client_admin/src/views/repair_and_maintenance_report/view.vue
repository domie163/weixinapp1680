<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','equipment_coding') || $check_field('add','equipment_coding') || $check_field('set','equipment_coding')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备编码" prop="equipment_coding">
												<el-input id="equipment_coding" v-model="form['equipment_coding']" placeholder="请输入设备编码"
							  v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','equipment_coding')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','equipment_coding'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','equipment_coding')">{{form['equipment_coding']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_name') || $check_field('add','device_name') || $check_field('set','device_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备名称" prop="device_name">
												<el-input id="device_name" v-model="form['device_name']" placeholder="请输入设备名称"
							  v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','device_name')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','device_name')">{{form['device_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','storage_location') || $check_field('add','storage_location') || $check_field('set','storage_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="存放位置" prop="storage_location">
												<el-input id="storage_location" v-model="form['storage_location']" placeholder="请输入存放位置"
							  v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','storage_location')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','storage_location')">{{form['storage_location']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','inspection_type') || $check_field('add','inspection_type') || $check_field('set','inspection_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="检查类型" prop="inspection_type">
								<el-select id="inspection_type" v-model="form['inspection_type']"
						v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','inspection_type')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','inspection_type'))">
						<el-option v-for="o in list_inspection_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','inspection_type')">{{form['inspection_type']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','encounter_problems') || $check_field('add','encounter_problems') || $check_field('set','encounter_problems')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="遇见问题" prop="encounter_problems">
												<el-input id="encounter_problems" v-model="form['encounter_problems']" placeholder="请输入遇见问题"
							  v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','encounter_problems')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','encounter_problems'))" :disabled="disabledObj['encounter_problems_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','encounter_problems')">{{form['encounter_problems']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','inspection_time') || $check_field('add','inspection_time') || $check_field('set','inspection_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="检查时间" prop="inspection_time">
								<el-date-picker :disabled="disabledObj['inspection_time_isDisabled']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','inspection_time')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','inspection_time'))" id="inspection_time"
						v-model="form['inspection_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','inspection_time')">{{form['inspection_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','inspectors') || $check_field('add','inspectors') || $check_field('set','inspectors')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="检查人员" prop="inspectors">
												<el-input id="inspectors" v-model="form['inspectors']" placeholder="请输入检查人员"
							  v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','inspectors')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','inspectors'))" :disabled="disabledObj['inspectors_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','inspectors')">{{form['inspectors']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','repair_details') || $check_field('add','repair_details') || $check_field('set','repair_details')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="修理详情" prop="repair_details">
								<el-input type="textarea" id="repair_details" v-model="form['repair_details']" placeholder="请输入修理详情"
						v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','repair_details')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','repair_details'))" :disabled="disabledObj['repair_details_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','repair_details')">{{form['repair_details']}}</div>
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
				field: "repair_and_maintenance_report_id",
				url_add: "~/api/repair_and_maintenance_report/add?",
				url_set: "~/api/repair_and_maintenance_report/set?",
				url_get_obj: "~/api/repair_and_maintenance_report/get_obj?",
				url_upload: "~/api/repair_and_maintenance_report/upload?",

				query: {
					"repair_and_maintenance_report_id": 0,
				},

				form: {
								"equipment_coding": this.$get_stamp(), // 设备编码
										"device_name":  '', // 设备名称
										"storage_location":  '', // 存放位置
										"inspection_type":  '', // 检查类型
										"encounter_problems":  '', // 遇见问题
										"inspection_time":  '', // 检查时间
										"inspectors":  '', // 检查人员
										"repair_details":  '', // 修理详情
											"repair_and_maintenance_report_id": 0, // ID
						
				},
				disabledObj:{
								"equipment_coding_isDisabled": false,
										"device_name_isDisabled": false,
										"storage_location_isDisabled": false,
										"inspection_type_isDisabled": false,
										"encounter_problems_isDisabled": false,
										"inspection_time_isDisabled": false,
										"inspectors_isDisabled": false,
										"repair_details_isDisabled": false,
										},

	
		
		
						// 检查类型选项列表
				list_inspection_type: ['维修','检修'],
	
		
		
		
		
	
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
												        if (this.form["inspection_time"].indexOf("-")===-1){
          this.form["inspection_time"] = this.$toTime(parseInt(this.form["inspection_time"]),"yyyy-MM-dd")
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


																	        if(this.form["inspection_time"]=="0000-00-00"){
          this.form["inspection_time"] = null;
        }
				if(parseInt(this.form["inspection_time"]) > 9999){
					this.form["inspection_time"] = this.$toTime(parseInt(this.form["inspection_time"]),"yyyy-MM-dd")
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
					bl = this.$check_action('/repair_and_maintenance_report/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/repair_and_maintenance_report/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/repair_and_maintenance_report/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/repair_and_maintenance_report/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/repair_and_maintenance_report/view','get');
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
