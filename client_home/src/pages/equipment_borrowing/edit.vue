<template>
	<view class="diy_edit page_equipment_borrowing" id="equipment_borrowing_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
						<view v-if="$check_field('set','equipment_coding') || $check_field('add','equipment_coding') || $check_field('get','equipment_coding')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								设备编码:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_equipment_coding" v-model="form['equipment_coding']" placeholder="请输入设备编码" v-if="(form['equipment_coding'] && $check_field('set','equipment_coding')) || (!form['equipment_coding'] && $check_field('add','equipment_coding'))" :disabled="disabledObj['equipment_coding_isDisabled']" />
							<text v-else-if="$check_field('get','equipment_coding')">{{ form['equipment_coding'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','device_name') || $check_field('add','device_name') || $check_field('get','device_name')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								设备名称:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_device_name" v-model="form['device_name']" placeholder="请输入设备名称" v-if="(form['device_name'] && $check_field('set','device_name')) || (!form['device_name'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']" />
							<text v-else-if="$check_field('get','device_name')">{{ form['device_name'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','storage_location') || $check_field('add','storage_location') || $check_field('get','storage_location')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								存放位置:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_storage_location" v-model="form['storage_location']" placeholder="请输入存放位置" v-if="(form['storage_location'] && $check_field('set','storage_location')) || (!form['storage_location'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']" />
							<text v-else-if="$check_field('get','storage_location')">{{ form['storage_location'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','borrowing_users') || $check_field('add','borrowing_users') || $check_field('get','borrowing_users')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								借用用户:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_borrowing_users"
									v-model="form['borrowing_users']"
									:localdata="list_user_borrowing_users"
									:clear="!disabledObj['borrowing_users_isDisabled']"
									:disabled="disabledObj['borrowing_users_isDisabled']"
									v-if="(form['borrowing_users'] && $check_field('set','borrowing_users')) || (!form['borrowing_users'] && $check_field('add','borrowing_users'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','borrowing_users')">{{ form['borrowing_users'] }}</text>
						</view>
					</view>
							<view v-if="$check_field('set','borrowing_time') || $check_field('add','borrowing_time') || $check_field('get','borrowing_time')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								借用时间:
							</text>
						</view>
								<!-- 日期 -->
						<view class="diy_field diy_date">
							<uni-datetime-picker :disabled="disabledObj['borrowing_time_isDisabled']" type="date" id="form_borrowing_time" v-model="form['borrowing_time']" placeholder="请输入借用时间" v-if="(form['borrowing_time'] && $check_field('set','borrowing_time')) || (!form['borrowing_time'] && $check_field('add','borrowing_time'))" />
							<text v-else-if="$check_field('get','borrowing_time')">{{ form['borrowing_time'] }}</text>
						</view>
							</view>
							<view v-if="$check_field('set','borrowed_quantity') || $check_field('add','borrowed_quantity') || $check_field('get','borrowed_quantity')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								借用数量:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_borrowed_quantity" v-model="form['borrowed_quantity']" placeholder="请输入借用数量" v-if="(form['borrowed_quantity'] && $check_field('set','borrowed_quantity')) || (!form['borrowed_quantity'] && $check_field('add','borrowed_quantity'))" :disabled="disabledObj['borrowed_quantity_isDisabled']" />
							<text v-else-if="$check_field('get','borrowed_quantity')">{{ form['borrowed_quantity'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','borrowing_status') || $check_field('add','borrowing_status') || $check_field('get','borrowing_status')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								借用状态:
							</text>
						</view>
								<!-- 选项 -->
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_borrowing_status"
									v-model="form['borrowing_status']"
									:localdata="list_borrowing_status"
									v-if="(form['borrowing_status'] && $check_field('set','borrowing_status')) || (!form['borrowing_status'] && $check_field('add','borrowing_status'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','borrowing_status')">{{ form['borrowing_status'] }}</text>
						</view>
							</view>
							<view v-if="$check_field('set','borrowing_remarks') || $check_field('add','borrowing_remarks') || $check_field('get','borrowing_remarks')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								借用备注:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_borrowing_remarks" v-model="form['borrowing_remarks']" placeholder="请输入借用备注" v-if="(form['borrowing_remarks'] && $check_field('set','borrowing_remarks')) || (!form['borrowing_remarks'] && $check_field('add','borrowing_remarks'))" :disabled="disabledObj['borrowing_remarks_isDisabled']" />
							<text v-else-if="$check_field('get','borrowing_remarks')">{{ form['borrowing_remarks'] }}</text>
						</view>
										</view>
	
				</view>
				<view class="row">
					<view class="col-12">
						<view class="btn_box">
							<button class="btn_submit primary_btn" @click="submit()">提交</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mixin from "@/libs/mixins/page.js";
export default {
	mixins:[mixin],
	components:{},
	data(){
		return{
			url_get_obj:"~/api/equipment_borrowing/get_obj?",
			url_add:"~/api/equipment_borrowing/add?",
			url_set:"~/api/equipment_borrowing/set?",

			// 登录权限
			oauth: {
				"signIn": true,
				"user_group": []
			},

			// 查询条件
			query: {
					"equipment_coding": "",
						"device_name": "",
						"storage_location": "",
						"borrowing_users": 0,
						"borrowing_time": "",
						"borrowed_quantity": 0,
						"borrowing_status": "",
						"borrowing_remarks": "",
					"equipment_borrowing_id": 0
			},

			obj: {
					"equipment_coding":  '', // 设备编码
						"device_name":  '', // 设备名称
						"storage_location":  '', // 存放位置
						"borrowing_users": 0, // 借用用户
						"borrowing_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
						"borrowed_quantity":  0 , // 借用数量
						"borrowing_status":  '', // 借用状态
						"borrowing_remarks":  '', // 借用备注
					"equipment_borrowing_id": 0,

			},

			// 表单字段
			form: {
					"equipment_coding":  '', // 设备编码
						"device_name":  '', // 设备名称
						"storage_location":  '', // 存放位置
						"borrowing_users": 0, // 借用用户
						"borrowing_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
						"borrowed_quantity":  0 , // 借用数量
						"borrowing_status":  '', // 借用状态
						"borrowing_remarks":  '', // 借用备注
					"equipment_borrowing_id": 0,
			},
			disabledObj:{
					"equipment_coding_isDisabled": false,
						"device_name_isDisabled": false,
						"storage_location_isDisabled": false,
						"borrowing_users_isDisabled": false,
						"borrowing_time_isDisabled": false,
								"borrowing_status_isDisabled": false,
						"borrowing_remarks_isDisabled": false,
				},

											// 用户列表
			list_user_borrowing_users: [],
									list_borrowing_status: [],
				
			field:"equipment_borrowing_id",
			table_key:"equipment_borrowing",

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
				json.result.list.map((o) => this.list_user_borrowing_users.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
				async get_user_session_borrowing_users(){
			var _this = this;
			var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
			if(json.result && json.result.obj){
				var source_table = json.result.obj.source_table;
				var user_id = _this.$store.state.user.user_id;
				if (user_id){
					var url = "~/api/"+source_table+"/get_obj?"
					this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
						if (res.result && res.result.obj) {
							var arr = []
							for (let key in res.result.obj) {
								arr.push(key)
							}
							var arrForm = []
							for (let key in _this.form) {
								arrForm.push(key)
							}
							_this.form["borrowing_users"] = user_id
							_this.disabledObj['borrowing_users' + '_isDisabled'] = true
							for (var i=0;i<arr.length;i++){
                if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                  for (var j = 0; j < arrForm.length; j++) {
                    if (arr[i] === arrForm[j]) {
                      if (arr[i] !== "borrowing_users") {
                        _this.form[arrForm[j]] = res.result.obj[arr[i]]
                        _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                        break;
                      }
                    }
                  }
                }
							}
						}
					});
				}
			}
			else if(json.error){
				console.error(json.error);
			}
		},
	
	
				
	
				
	
				/**
		 * 获取借用状态列表
		 */
		async get_list_borrowing_status() {
					['借用成功','借用失败'].map((o) => this.list_borrowing_status.push({value:o,text:o}));
						},
			
	
				
	
			change_file(key_name){
			var _self = this;
				this.$chooseFile().then(res=>{
					console.log(res)

						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl("/api/feedback/upload?"),
							filePath: res[0].path,
							name: "file",
							formData: {
								i_want_to_customize: "test",
							},
							header: {
								"x-auth-token": _self.$store.state.user.token,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes)
								var filename = JSON.parse(uploadFileRes.data).result.url;
								_self.form[key_name] = filename;
							},
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log("上传进度" + res.progress);
							console.log("已经上传的数据长度" + res.totalBytesSent);
							console.log(
								"预期需要上传的数据总长度" + res.totalBytesExpectedToSend
							);
						});

				})
		},
		change_img(key_name) {
			var _self = this;
			_self.upload_img_flag = false
			// 选择图像方法
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url: _self.$fullUrl('/api/equipment_borrowing/upload?'),
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'equipment_borrowing': 'test'
						},
						header: {
							'x-auth-token': _self.$store.state.user.token
						},
						success: function(uploadFileRes) {
							var filename = JSON.parse(uploadFileRes.data).result.url
							var img_url = filename
							_self.form[key_name] = img_url
						}
					});

					uploadTask.onProgressUpdate(function(res) {
						_self.percent = res.progress;
						console.log('上传进度' + res.progress);
						console.log('已经上传的数据长度' + res.totalBytesSent);
						console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					});
				},
				error: function(e) {
					console.log(e);
				}
			});
		},

		/**
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_before(param){
			var form = uni.db.get("form");
			if (form) {
        delete(form.examine_state)
        delete(form.examine_reply)
				this.obj = uni.push(this.obj ,form);
				this.form = uni.push(this.form ,form);
			}
			var arr = []
			for (let key in form) {
				arr.push(key)
			}
			for (var i=0;i<arr.length;i++){
				this.disabledObj[arr[i] + '_isDisabled'] = true
			}
													if (this.form["borrowing_time"] && JSON.stringify(this.form["borrowing_time"]).indexOf("-")===-1) {
				this.form["borrowing_time"] = this.$toTime(parseInt(this.form["borrowing_time"]), "yyyy-MM-dd")
			}
										uni.db.del("form");
			return param;
		},

		/**
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_after(json ,func){
			var form = uni.db.get("form");
			var obj = Object.assign({} ,form ,this.obj);
			if (form) {
				this.obj = uni.push(this.obj ,obj);
			}
			if (form) {
				this.form = uni.push(this.form ,form);
			}
			if(func){
				func(json);
			}
		},

	},
	onLoad(){
													this.get_user_session_borrowing_users();
				this.get_list_user_borrowing_users();
										this.get_list_borrowing_status();
							},
}
</script>

<style scoped>
	input{
		font-size: 10px;
	}

	.form_edit {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
	}

	.left_text {
		flex: 0 0 25%;
		display: flex;
		align-items: center;
	}

	.right_text {
		flex: 0 0 75%;
		border-bottom: 1px solid #eee;
	}
	.right_text.btn_warp{
		border-bottom: 0;
	}

	.btn_submit {
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}

	.btn_submit:hover {
		opacity: 0.5;
	}
	.btn_add_img{
		color: #D3D3D3;
		text-align: center;
		border: 1px solid #eee;
		height: 5rem;
		width: 5rem;
		position: relative;
	}
	.btn_add_img text{
		font-size: 35px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}




</style>
<style scoped>
/*新样式*/
.diy_text_row {
  display: inline-block;
}
.container {
	margin-top:1rem ;
	padding: 1rem;
    -webkit-box-shadow: 0px 0px 0px #888888;
    box-shadow: 0px 0px 0px #888888;
}
.primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
	.btn_submit{
		padding: 0;
		margin-top:1rem ;
	}
	.row-item {
		padding: 10px 10px;
	    background: #f8f6fc;
		margin-bottom: 1rem;
	}
	.diy_field{
		padding-left: 1rem;
	}
	.diy_title{
		align-items: center;
        font-size: 14px;
        color: #333;
	}

	.row-item{
		display: flex !important;
		align-items: baseline;
	}
	.diy_select_flex{
		flex: 1;
	}
	.query_select{
		flex: 1;
		border-color: rgb(229, 229, 229);
		background-color: rgb(255, 255, 255);
		border-radius: 4px;
		box-sizing: border-box;
		flex: 1;
		width: 100%;
		line-height: 2;
		font-size: 14px;
		height: 2.4em;
		min-height: 2.4em;
		display: block;
		outline:none;
	}
</style>

