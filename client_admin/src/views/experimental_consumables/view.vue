<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','consumable_number') || $check_field('add','consumable_number') || $check_field('set','consumable_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材编号" prop="consumable_number">
												<el-input id="consumable_number" v-model="form['consumable_number']" placeholder="请输入耗材编号"
							  v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','consumable_number')) || (!form['experimental_consumables_id'] && $check_field('add','consumable_number'))" :disabled="disabledObj['consumable_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','consumable_number')">{{form['consumable_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','consumable_name') || $check_field('add','consumable_name') || $check_field('set','consumable_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材名称" prop="consumable_name">
												<el-input id="consumable_name" v-model="form['consumable_name']" placeholder="请输入耗材名称"
							  v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','consumable_name')) || (!form['experimental_consumables_id'] && $check_field('add','consumable_name'))" :disabled="disabledObj['consumable_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','consumable_name')">{{form['consumable_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','cover_photo') || $check_field('add','cover_photo') || $check_field('set','cover_photo')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面图片" prop="cover_photo">
								<el-upload :disabled="disabledObj['cover_photo_isDisabled']" id="cover_photo" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover_photo"
						:show-file-list="false" v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','cover_photo')) || (!form['experimental_consumables_id'] && $check_field('add','cover_photo'))">
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
								<el-col v-if="user_group === '管理员' || $check_field('get','quantity_of_consumables') || $check_field('add','quantity_of_consumables') || $check_field('set','quantity_of_consumables')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材数量" prop="quantity_of_consumables">
								<el-input-number id="quantity_of_consumables" v-model.number="form['quantity_of_consumables']"
						v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','quantity_of_consumables')) || (!form['experimental_consumables_id'] && $check_field('add','quantity_of_consumables'))" :disabled="disabledObj['quantity_of_consumables_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','quantity_of_consumables')">{{form['quantity_of_consumables']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','consumable_price') || $check_field('add','consumable_price') || $check_field('set','consumable_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材价格" prop="consumable_price">
								<el-input-number id="consumable_price" v-model.number="form['consumable_price']"
						v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','consumable_price')) || (!form['experimental_consumables_id'] && $check_field('add','consumable_price'))" :disabled="disabledObj['consumable_price_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','consumable_price')">{{form['consumable_price']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','item_specifications') || $check_field('add','item_specifications') || $check_field('set','item_specifications')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="物品规格" prop="item_specifications">
												<el-input id="item_specifications" v-model="form['item_specifications']" placeholder="请输入物品规格"
							  v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','item_specifications')) || (!form['experimental_consumables_id'] && $check_field('add','item_specifications'))" :disabled="disabledObj['item_specifications_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','item_specifications')">{{form['item_specifications']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','consumable_details') || $check_field('add','consumable_details') || $check_field('set','consumable_details')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="耗材详情" prop="consumable_details">
								<el-input type="textarea" id="consumable_details" v-model="form['consumable_details']" placeholder="请输入耗材详情"
						v-if="user_group === '管理员' || (form['experimental_consumables_id'] && $check_field('set','consumable_details')) || (!form['experimental_consumables_id'] && $check_field('add','consumable_details'))" :disabled="disabledObj['consumable_details_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','consumable_details')">{{form['consumable_details']}}</div>
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
				field: "experimental_consumables_id",
				url_add: "~/api/experimental_consumables/add?",
				url_set: "~/api/experimental_consumables/set?",
				url_get_obj: "~/api/experimental_consumables/get_obj?",
				url_upload: "~/api/experimental_consumables/upload?",

				query: {
					"experimental_consumables_id": 0,
				},

				form: {
								"consumable_number":  '', // 耗材编号
										"consumable_name":  '', // 耗材名称
										"cover_photo":  '', // 封面图片
										"quantity_of_consumables":  0, // 耗材数量
										"consumable_price":  0, // 耗材价格
										"item_specifications":  '', // 物品规格
										"consumable_details":  '', // 耗材详情
											"experimental_consumables_id": 0, // ID
						
				},
				disabledObj:{
								"consumable_number_isDisabled": false,
										"consumable_name_isDisabled": false,
										"cover_photo_isDisabled": false,
					          			"quantity_of_consumables_isDisabled": false,
					          			"consumable_price_isDisabled": false,
										"item_specifications_isDisabled": false,
										"consumable_details_isDisabled": false,
										},

	
		
		
		
		
		
		
	
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
					bl = this.$check_action('/experimental_consumables/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/experimental_consumables/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/experimental_consumables/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/experimental_consumables/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/experimental_consumables/view','get');
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
