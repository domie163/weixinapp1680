<template>
	<view class="diy_edit page_appointment_information" id="appointment_information_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
						<view v-if="$check_field('set','laboratory_number') || $check_field('add','laboratory_number') || $check_field('get','laboratory_number')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								实验室编号:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_laboratory_number" v-model="form['laboratory_number']" placeholder="请输入实验室编号" v-if="(form['laboratory_number'] && $check_field('set','laboratory_number')) || (!form['laboratory_number'] && $check_field('add','laboratory_number'))" :disabled="true" />
							<text v-else-if="$check_field('get','laboratory_number')">{{ form['laboratory_number'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','laboratory_name') || $check_field('add','laboratory_name') || $check_field('get','laboratory_name')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								实验室名称:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_laboratory_name" v-model="form['laboratory_name']" placeholder="请输入实验室名称" v-if="(form['laboratory_name'] && $check_field('set','laboratory_name')) || (!form['laboratory_name'] && $check_field('add','laboratory_name'))" :disabled="disabledObj['laboratory_name_isDisabled']" />
							<text v-else-if="$check_field('get','laboratory_name')">{{ form['laboratory_name'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','laboratory_status') || $check_field('add','laboratory_status') || $check_field('get','laboratory_status')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								实验室状态:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_laboratory_status" v-model="form['laboratory_status']" placeholder="请输入实验室状态" v-if="(form['laboratory_status'] && $check_field('set','laboratory_status')) || (!form['laboratory_status'] && $check_field('add','laboratory_status'))" :disabled="disabledObj['laboratory_status_isDisabled']" />
							<text v-else-if="$check_field('get','laboratory_status')">{{ form['laboratory_status'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','appointment_users') || $check_field('add','appointment_users') || $check_field('get','appointment_users')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								预约用户:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_appointment_users"
									v-model="form['appointment_users']"
									:localdata="list_user_appointment_users"
									:clear="!disabledObj['appointment_users_isDisabled']"
									:disabled="disabledObj['appointment_users_isDisabled']"
									v-if="(form['appointment_users'] && $check_field('set','appointment_users')) || (!form['appointment_users'] && $check_field('add','appointment_users'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','appointment_users')">{{ form['appointment_users'] }}</text>
						</view>
					</view>
							<view v-if="$check_field('set','time_of_appointment') || $check_field('add','time_of_appointment') || $check_field('get','time_of_appointment')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								预约时间:
							</text>
						</view>
								<!-- 日长 -->
						<view class="diy_field diy_datetime diy_text_row">
							<uni-datetime-picker :disabled="disabledObj['time_of_appointment_isDisabled']" type="datetime" id="form_time_of_appointment" v-model="form['time_of_appointment']" placeholder="请输入预约时间" v-if="(form['time_of_appointment'] && $check_field('set','time_of_appointment')) || (!form['time_of_appointment'] && $check_field('add','time_of_appointment'))" />
							<text v-else-if="$check_field('get','time_of_appointment')">{{ form['time_of_appointment'] }}</text>
						</view>
							</view>
							<view v-if="$check_field('set','appointment_duration') || $check_field('add','appointment_duration') || $check_field('get','appointment_duration')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								预约时长:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_appointment_duration" v-model="form['appointment_duration']" placeholder="请输入预约时长" v-if="(form['appointment_duration'] && $check_field('set','appointment_duration')) || (!form['appointment_duration'] && $check_field('add','appointment_duration'))" :disabled="disabledObj['appointment_duration_isDisabled']" />
							<text v-else-if="$check_field('get','appointment_duration')">{{ form['appointment_duration'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','appointment_status') || $check_field('add','appointment_status') || $check_field('get','appointment_status')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								预约状态:
							</text>
						</view>
								<!-- 选项 -->
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_appointment_status"
									v-model="form['appointment_status']"
									:localdata="list_appointment_status"
									v-if="(form['appointment_status'] && $check_field('set','appointment_status')) || (!form['appointment_status'] && $check_field('add','appointment_status'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','appointment_status')">{{ form['appointment_status'] }}</text>
						</view>
							</view>
							<view v-if="$check_field('set','appointment_notes') || $check_field('add','appointment_notes') || $check_field('get','appointment_notes')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								预约备注:
							</text>
						</view>
								<!-- 多文本 -->
						<view class="diy_field diy_desc diy_text_row">
							<textarea id="form_appointment_notes" v-model="form['appointment_notes']" v-if="(form['appointment_notes'] && $check_field('set','appointment_notes')) || (!form['appointment_notes'] && $check_field('add','appointment_notes'))" :disabled="disabledObj['appointment_notes_isDisabled']"/>
							<text v-else-if="$check_field('get','appointment_notes')">{{ form['appointment_notes'] }}</text>
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
			url_get_obj:"~/api/appointment_information/get_obj?",
			url_add:"~/api/appointment_information/add?",
			url_set:"~/api/appointment_information/set?",

			// 登录权限
			oauth: {
				"signIn": true,
				"user_group": []
			},

			// 查询条件
			query: {
					"laboratory_number": "",
						"laboratory_name": "",
						"laboratory_status": "",
						"appointment_users": 0,
						"time_of_appointment": "",
						"appointment_duration": "",
						"appointment_status": "",
						"appointment_notes": "",
					"appointment_information_id": 0
			},

			obj: {
					"laboratory_number": this.$get_stamp(), // 实验室编号
						"laboratory_name":  '', // 实验室名称
						"laboratory_status":  '', // 实验室状态
						"appointment_users": 0, // 预约用户
						"time_of_appointment": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
						"appointment_duration":  '', // 预约时长
						"appointment_status":  '', // 预约状态
						"appointment_notes":  '', // 预约备注
					"appointment_information_id": 0,

			},

			// 表单字段
			form: {
					"laboratory_number": this.$get_stamp(), // 实验室编号
						"laboratory_name":  '', // 实验室名称
						"laboratory_status":  '', // 实验室状态
						"appointment_users": 0, // 预约用户
						"time_of_appointment": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
						"appointment_duration":  '', // 预约时长
						"appointment_status":  '', // 预约状态
						"appointment_notes":  '', // 预约备注
					"appointment_information_id": 0,
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
									list_appointment_status: [],
				
			field:"appointment_information_id",
			table_key:"appointment_information",

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
				json.result.list.map((o) => this.list_user_appointment_users.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
				async get_user_session_appointment_users(){
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
							_this.form["appointment_users"] = user_id
							_this.disabledObj['appointment_users' + '_isDisabled'] = true
							for (var i=0;i<arr.length;i++){
                if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                  for (var j = 0; j < arrForm.length; j++) {
                    if (arr[i] === arrForm[j]) {
                      if (arr[i] !== "appointment_users") {
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
		 * 获取预约状态列表
		 */
		async get_list_appointment_status() {
					['预约成功','预约失败'].map((o) => this.list_appointment_status.push({value:o,text:o}));
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
						url: _self.$fullUrl('/api/appointment_information/upload?'),
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'appointment_information': 'test'
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
												if (this.form["time_of_appointment"] && JSON.stringify(this.form["time_of_appointment"]).indexOf("-")===-1) {
				this.form["time_of_appointment"] = this.$toTime(parseInt(this.form["time_of_appointment"]), "yyyy-MM-dd hh:mm:ss")
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
													this.get_user_session_appointment_users();
				this.get_list_user_appointment_users();
										this.get_list_appointment_status();
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

