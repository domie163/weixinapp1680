<template>
	<view class="diy_edit page_purchase_order" id="purchase_order_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
						<view v-if="$check_field('set','consumable_number') || $check_field('add','consumable_number') || $check_field('get','consumable_number')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								耗材编号:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_consumable_number" v-model="form['consumable_number']" placeholder="请输入耗材编号" v-if="(form['consumable_number'] && $check_field('set','consumable_number')) || (!form['consumable_number'] && $check_field('add','consumable_number'))" :disabled="disabledObj['consumable_number_isDisabled']" />
							<text v-else-if="$check_field('get','consumable_number')">{{ form['consumable_number'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','consumable_name') || $check_field('add','consumable_name') || $check_field('get','consumable_name')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								耗材名称:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_consumable_name" v-model="form['consumable_name']" placeholder="请输入耗材名称" v-if="(form['consumable_name'] && $check_field('set','consumable_name')) || (!form['consumable_name'] && $check_field('add','consumable_name'))" :disabled="disabledObj['consumable_name_isDisabled']" />
							<text v-else-if="$check_field('get','consumable_name')">{{ form['consumable_name'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','item_specifications') || $check_field('add','item_specifications') || $check_field('get','item_specifications')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								物品规格:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_item_specifications" v-model="form['item_specifications']" placeholder="请输入物品规格" v-if="(form['item_specifications'] && $check_field('set','item_specifications')) || (!form['item_specifications'] && $check_field('add','item_specifications'))" :disabled="disabledObj['item_specifications_isDisabled']" />
							<text v-else-if="$check_field('get','item_specifications')">{{ form['item_specifications'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','consumable_price') || $check_field('add','consumable_price') || $check_field('get','consumable_price')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								耗材价格:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_consumable_price" v-model="form['consumable_price']" placeholder="请输入耗材价格" v-if="(form['consumable_price'] && $check_field('set','consumable_price')) || (!form['consumable_price'] && $check_field('add','consumable_price'))" :disabled="disabledObj['consumable_price_isDisabled']" />
							<text v-else-if="$check_field('get','consumable_price')">{{ form['consumable_price'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','purchasing_users') || $check_field('add','purchasing_users') || $check_field('get','purchasing_users')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买用户:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_purchasing_users"
									v-model="form['purchasing_users']"
									:localdata="list_user_purchasing_users"
									:clear="!disabledObj['purchasing_users_isDisabled']"
									:disabled="disabledObj['purchasing_users_isDisabled']"
									v-if="(form['purchasing_users'] && $check_field('set','purchasing_users')) || (!form['purchasing_users'] && $check_field('add','purchasing_users'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','purchasing_users')">{{ form['purchasing_users'] }}</text>
						</view>
					</view>
							<view v-if="$check_field('set','purchase_time') || $check_field('add','purchase_time') || $check_field('get','purchase_time')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买时间:
							</text>
						</view>
								<!-- 日期 -->
						<view class="diy_field diy_date">
							<uni-datetime-picker :disabled="disabledObj['purchase_time_isDisabled']" type="date" id="form_purchase_time" v-model="form['purchase_time']" placeholder="请输入购买时间" v-if="(form['purchase_time'] && $check_field('set','purchase_time')) || (!form['purchase_time'] && $check_field('add','purchase_time'))" />
							<text v-else-if="$check_field('get','purchase_time')">{{ form['purchase_time'] }}</text>
						</view>
							</view>
							<view v-if="$check_field('set','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('get','purchase_quantity')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买数量:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_purchase_quantity" v-model="form['purchase_quantity']" placeholder="请输入购买数量" v-if="(form['purchase_quantity'] && $check_field('set','purchase_quantity')) || (!form['purchase_quantity'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
							<text v-else-if="$check_field('get','purchase_quantity')">{{ form['purchase_quantity'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','purchase_status') || $check_field('add','purchase_status') || $check_field('get','purchase_status')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买状态:
							</text>
						</view>
								<!-- 选项 -->
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_purchase_status"
									v-model="form['purchase_status']"
									:localdata="list_purchase_status"
									v-if="(form['purchase_status'] && $check_field('set','purchase_status')) || (!form['purchase_status'] && $check_field('add','purchase_status'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','purchase_status')">{{ form['purchase_status'] }}</text>
						</view>
							</view>
							<view v-if="$check_field('set','total_price') || $check_field('add','total_price') || $check_field('get','total_price')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								合计总价:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_total_price" v-model="form['total_price']" placeholder="请输入合计总价" v-if="(form['total_price'] && $check_field('set','total_price')) || (!form['total_price'] && $check_field('add','total_price'))" @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']" />
							<text v-else-if="$check_field('get','total_price')">{{ form['total_price'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','purchase_notes') || $check_field('add','purchase_notes') || $check_field('get','purchase_notes')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买备注:
							</text>
						</view>
								<!-- 多文本 -->
						<view class="diy_field diy_desc diy_text_row">
							<textarea id="form_purchase_notes" v-model="form['purchase_notes']" v-if="(form['purchase_notes'] && $check_field('set','purchase_notes')) || (!form['purchase_notes'] && $check_field('add','purchase_notes'))" :disabled="disabledObj['purchase_notes_isDisabled']"/>
							<text v-else-if="$check_field('get','purchase_notes')">{{ form['purchase_notes'] }}</text>
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
			url_get_obj:"~/api/purchase_order/get_obj?",
			url_add:"~/api/purchase_order/add?",
			url_set:"~/api/purchase_order/set?",

			// 登录权限
			oauth: {
				"signIn": true,
				"user_group": []
			},

			// 查询条件
			query: {
					"consumable_number": "",
						"consumable_name": "",
						"item_specifications": "",
						"consumable_price": 0,
						"purchasing_users": 0,
						"purchase_time": "",
						"purchase_quantity": 0,
						"purchase_status": "",
						"total_price": "",
						"purchase_notes": "",
					"purchase_order_id": 0
			},

			obj: {
					"consumable_number":  '', // 耗材编号
						"consumable_name":  '', // 耗材名称
						"item_specifications":  '', // 物品规格
						"consumable_price":  0 , // 耗材价格
						"purchasing_users": 0, // 购买用户
						"purchase_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
						"purchase_quantity":  0 , // 购买数量
						"purchase_status":  '', // 购买状态
						"total_price":  '', // 合计总价
						"purchase_notes":  '', // 购买备注
					"purchase_order_id": 0,

			},

			// 表单字段
			form: {
					"consumable_number":  '', // 耗材编号
						"consumable_name":  '', // 耗材名称
						"item_specifications":  '', // 物品规格
						"consumable_price":  0 , // 耗材价格
						"purchasing_users": 0, // 购买用户
						"purchase_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
						"purchase_quantity":  0 , // 购买数量
						"purchase_status":  '', // 购买状态
						"total_price":  '', // 合计总价
						"purchase_notes":  '', // 购买备注
					"purchase_order_id": 0,
			},
			disabledObj:{
					"consumable_number_isDisabled": false,
						"consumable_name_isDisabled": false,
						"item_specifications_isDisabled": false,
								"purchasing_users_isDisabled": false,
						"purchase_time_isDisabled": false,
								"purchase_status_isDisabled": false,
						"total_price_isDisabled": false,
						"purchase_notes_isDisabled": false,
				},

													// 用户列表
			list_user_purchasing_users: [],
									list_purchase_status: [],
						
			field:"purchase_order_id",
			table_key:"purchase_order",

		}
	},
	methods: {
			
	
				
	
				
	
				
	
					/**
		 * 获取注册用户用户列表
		 */
		async get_list_user_purchasing_users() {
			// if(this.user_group !== "管理员" && this.form["purchasing_users"] === 0) {
			//     this.form["purchasing_users"] = this.user.user_id;
			// }
			var json = await this.$get("~/api/user/get_list?user_group=注册用户");
			if(json.result && json.result.list){
				json.result.list.map((o) => this.list_user_purchasing_users.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
				async get_user_session_purchasing_users(){
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
							_this.form["purchasing_users"] = user_id
							_this.disabledObj['purchasing_users' + '_isDisabled'] = true
							for (var i=0;i<arr.length;i++){
                if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                  for (var j = 0; j < arrForm.length; j++) {
                    if (arr[i] === arrForm[j]) {
                      if (arr[i] !== "purchasing_users") {
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
		 * 获取购买状态列表
		 */
		async get_list_purchase_status() {
					['购买成功','购买失败'].map((o) => this.list_purchase_status.push({value:o,text:o}));
						},
			
	
				
	
								set_total_price(){
			this.form.total_price = parseFloat(this.form.consumable_price) * parseFloat(this.form.purchase_quantity)
			  let r = /^\+?[1-9][0-9]*$/; // 正整数
			  if(!r.test(this.form.total_price) ){
				this.form.total_price = this.form.total_price.toFixed(2);
			  }
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
						url: _self.$fullUrl('/api/purchase_order/upload?'),
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'purchase_order': 'test'
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
															if (this.form["purchase_time"] && JSON.stringify(this.form["purchase_time"]).indexOf("-")===-1) {
				this.form["purchase_time"] = this.$toTime(parseInt(this.form["purchase_time"]), "yyyy-MM-dd")
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
																this.get_user_session_purchasing_users();
				this.get_list_user_purchasing_users();
										this.get_list_purchase_status();
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

