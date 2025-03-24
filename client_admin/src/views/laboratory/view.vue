<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_number') || $check_field('add','laboratory_number') || $check_field('set','laboratory_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室编号" prop="laboratory_number">
												<el-input id="laboratory_number" v-model="form['laboratory_number']" placeholder="请输入实验室编号"
							  v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','laboratory_number')) || (!form['laboratory_id'] && $check_field('add','laboratory_number'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','laboratory_number')">{{form['laboratory_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','capacity') || $check_field('add','capacity') || $check_field('set','capacity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="容纳人数" prop="capacity">
												<el-input id="capacity" v-model="form['capacity']" placeholder="请输入容纳人数"
							  v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','capacity')) || (!form['laboratory_id'] && $check_field('add','capacity'))" :disabled="disabledObj['capacity_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','capacity')">{{form['capacity']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','cover_photo') || $check_field('add','cover_photo') || $check_field('set','cover_photo')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面图片" prop="cover_photo">
								<el-upload :disabled="disabledObj['cover_photo_isDisabled']" id="cover_photo" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover_photo"
						:show-file-list="false" v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','cover_photo')) || (!form['laboratory_id'] && $check_field('add','cover_photo'))">
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
								<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_status') || $check_field('add','laboratory_status') || $check_field('set','laboratory_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室状态" prop="laboratory_status">
								<el-select id="laboratory_status" v-model="form['laboratory_status']"
						v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','laboratory_status')) || (!form['laboratory_id'] && $check_field('add','laboratory_status'))">
						<el-option v-for="o in list_laboratory_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','laboratory_status')">{{form['laboratory_status']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_name') || $check_field('add','laboratory_name') || $check_field('set','laboratory_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室名称" prop="laboratory_name">
												<el-input id="laboratory_name" v-model="form['laboratory_name']" placeholder="请输入实验室名称"
							  v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','laboratory_name')) || (!form['laboratory_id'] && $check_field('add','laboratory_name'))" :disabled="disabledObj['laboratory_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','laboratory_name')">{{form['laboratory_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_details') || $check_field('add','laboratory_details') || $check_field('set','laboratory_details')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室详情" prop="laboratory_details">
												<el-input id="laboratory_details" v-model="form['laboratory_details']" placeholder="请输入实验室详情"
							  v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','laboratory_details')) || (!form['laboratory_id'] && $check_field('add','laboratory_details'))" :disabled="disabledObj['laboratory_details_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','laboratory_details')">{{form['laboratory_details']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','location') || $check_field('add','location') || $check_field('set','location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="所在位置" prop="location">
												<el-input id="location" v-model="form['location']" placeholder="请输入所在位置"
							  v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','location')) || (!form['laboratory_id'] && $check_field('add','location'))" :disabled="disabledObj['location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','location')">{{form['location']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','laboratory_equipment') || $check_field('add','laboratory_equipment') || $check_field('set','laboratory_equipment')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实验室设备" prop="laboratory_equipment">
								<el-input type="textarea" id="laboratory_equipment" v-model="form['laboratory_equipment']" placeholder="请输入实验室设备"
						v-if="user_group === '管理员' || (form['laboratory_id'] && $check_field('set','laboratory_equipment')) || (!form['laboratory_id'] && $check_field('add','laboratory_equipment'))" :disabled="disabledObj['laboratory_equipment_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','laboratory_equipment')">{{form['laboratory_equipment']}}</div>
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
				field: "laboratory_id",
				url_add: "~/api/laboratory/add?",
				url_set: "~/api/laboratory/set?",
				url_get_obj: "~/api/laboratory/get_obj?",
				url_upload: "~/api/laboratory/upload?",

				query: {
					"laboratory_id": 0,
				},

				form: {
								"laboratory_number": this.$get_stamp(), // 实验室编号
										"capacity":  '', // 容纳人数
										"cover_photo":  '', // 封面图片
										"laboratory_status":  '', // 实验室状态
										"laboratory_name":  '', // 实验室名称
										"laboratory_details":  '', // 实验室详情
										"location":  '', // 所在位置
										"laboratory_equipment":  '', // 实验室设备
											"laboratory_id": 0, // ID
						
				},
				disabledObj:{
								"laboratory_number_isDisabled": false,
										"capacity_isDisabled": false,
										"cover_photo_isDisabled": false,
										"laboratory_status_isDisabled": false,
										"laboratory_name_isDisabled": false,
										"laboratory_details_isDisabled": false,
										"location_isDisabled": false,
										"laboratory_equipment_isDisabled": false,
										},

	
		
		
						// 实验室状态选项列表
				list_laboratory_status: ['已预订','空闲'],
	
		
		
		
		
	
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
																				$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){


																								


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
					bl = this.$check_action('/laboratory/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/laboratory/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/laboratory/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/laboratory/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/laboratory/view','get');
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
