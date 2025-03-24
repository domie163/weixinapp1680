<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','equipment_coding') || $check_field('add','equipment_coding') || $check_field('set','equipment_coding')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备编码" prop="equipment_coding">
												<el-input id="equipment_coding" v-model="form['equipment_coding']" placeholder="请输入设备编码"
							  v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','equipment_coding')) || (!form['equipment_and_equipment_id'] && $check_field('add','equipment_coding'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','equipment_coding')">{{form['equipment_coding']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_name') || $check_field('add','device_name') || $check_field('set','device_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备名称" prop="device_name">
												<el-input id="device_name" v-model="form['device_name']" placeholder="请输入设备名称"
							  v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','device_name')) || (!form['equipment_and_equipment_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','device_name')">{{form['device_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','storage_location') || $check_field('add','storage_location') || $check_field('set','storage_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="存放位置" prop="storage_location">
												<el-input id="storage_location" v-model="form['storage_location']" placeholder="请输入存放位置"
							  v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','storage_location')) || (!form['equipment_and_equipment_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','storage_location')">{{form['storage_location']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_status') || $check_field('add','device_status') || $check_field('set','device_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备状态" prop="device_status">
								<el-select id="device_status" v-model="form['device_status']"
						v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','device_status')) || (!form['equipment_and_equipment_id'] && $check_field('add','device_status'))">
						<el-option v-for="o in list_device_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','device_status')">{{form['device_status']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','cover_photo') || $check_field('add','cover_photo') || $check_field('set','cover_photo')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面图片" prop="cover_photo">
								<el-upload :disabled="disabledObj['cover_photo_isDisabled']" id="cover_photo" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover_photo"
						:show-file-list="false" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','cover_photo')) || (!form['equipment_and_equipment_id'] && $check_field('add','cover_photo'))">
						<img v-if="form['cover_photo']" :src="$fullUrl(form['cover_photo'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','cover_photo')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['cover_photo'])" :preview-src-list="[$fullUrl(form['cover_photo'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','lending_notice') || $check_field('add','lending_notice') || $check_field('set','lending_notice')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出借须知" prop="lending_notice">
												<el-input id="lending_notice" v-model="form['lending_notice']" placeholder="请输入出借须知"
							  v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','lending_notice')) || (!form['equipment_and_equipment_id'] && $check_field('add','lending_notice'))" :disabled="disabledObj['lending_notice_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','lending_notice')">{{form['lending_notice']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','usage_duration') || $check_field('add','usage_duration') || $check_field('set','usage_duration')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="使用时长" prop="usage_duration">
								<el-date-picker :disabled="disabledObj['usage_duration_isDisabled']" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','usage_duration')) || (!form['equipment_and_equipment_id'] && $check_field('add','usage_duration'))" id="usage_duration"
						v-model="form['usage_duration']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','usage_duration')">{{form['usage_duration']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','device_details') || $check_field('add','device_details') || $check_field('set','device_details')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="设备详情" prop="device_details">
												<el-input id="device_details" v-model="form['device_details']" placeholder="请输入设备详情"
							  v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','device_details')) || (!form['equipment_and_equipment_id'] && $check_field('add','device_details'))" :disabled="disabledObj['device_details_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','device_details')">{{form['device_details']}}</div>
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
				field: "equipment_and_equipment_id",
				url_add: "~/api/equipment_and_equipment/add?",
				url_set: "~/api/equipment_and_equipment/set?",
				url_get_obj: "~/api/equipment_and_equipment/get_obj?",
				url_upload: "~/api/equipment_and_equipment/upload?",

				query: {
					"equipment_and_equipment_id": 0,
				},

				form: {
								"equipment_coding": this.$get_stamp(), // 设备编码
										"device_name":  '', // 设备名称
										"storage_location":  '', // 存放位置
										"device_status":  '', // 设备状态
										"cover_photo":  '', // 封面图片
										"lending_notice":  '', // 出借须知
										"usage_duration":  '', // 使用时长
										"device_details":  '', // 设备详情
											"equipment_and_equipment_id": 0, // ID
						
				},
				disabledObj:{
								"equipment_coding_isDisabled": false,
										"device_name_isDisabled": false,
										"storage_location_isDisabled": false,
										"device_status_isDisabled": false,
										"cover_photo_isDisabled": false,
										"lending_notice_isDisabled": false,
										"usage_duration_isDisabled": false,
										"device_details_isDisabled": false,
										},

	
		
		
						// 设备状态选项列表
				list_device_status: ['已出借','空闲中'],
	
		
		
		
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
						/**
			 * 上传封面图片
			 * @param {Object} param 图片参数
			 */
			upload_cover_photo(param){
						this.uploadFile(param.file, "cover_photo");
					},
	
	
			
	
			
	
			
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
																												
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
					bl = this.$check_action('/equipment_and_equipment/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_and_equipment/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_and_equipment/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_and_equipment/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/equipment_and_equipment/view','get');
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
