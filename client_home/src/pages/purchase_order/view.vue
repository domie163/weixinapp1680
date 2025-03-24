<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','consumable_number') || ($check_field('add','consumable_number') || $check_field('set','consumable_number'))" label="耗材编号" name="consumable_number">
                            <uni-easyinput type="text" v-model="form['consumable_number']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','consumable_number')) || (!form['purchase_order_id'] && $check_field('add','consumable_number'))" :disabled="disabledObj['consumable_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','consumable_number')">
                  {{ form['consumable_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','consumable_name') || ($check_field('add','consumable_name') || $check_field('set','consumable_name'))" label="耗材名称" name="consumable_name">
                            <uni-easyinput type="text" v-model="form['consumable_name']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','consumable_name')) || (!form['purchase_order_id'] && $check_field('add','consumable_name'))" :disabled="disabledObj['consumable_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','consumable_name')">
                  {{ form['consumable_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','item_specifications') || ($check_field('add','item_specifications') || $check_field('set','item_specifications'))" label="物品规格" name="item_specifications">
                            <uni-easyinput type="text" v-model="form['item_specifications']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','item_specifications')) || (!form['purchase_order_id'] && $check_field('add','item_specifications'))" :disabled="disabledObj['item_specifications_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','item_specifications')">
                  {{ form['item_specifications'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','consumable_price') || ($check_field('add','consumable_price') || $check_field('set','consumable_price'))" label="耗材价格" name="consumable_price">
                            <uni-easyinput type="text" v-model="form['consumable_price']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','consumable_price')) || (!form['purchase_order_id'] && $check_field('add','consumable_price'))" :disabled="disabledObj['consumable_price_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','consumable_price')">
                  {{ form['consumable_price'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchasing_users') || ($check_field('add','purchasing_users') || $check_field('set','purchasing_users'))" label="购买用户" name="purchasing_users">
                    <uni-data-select
                  id="form_purchasing_users"
                  v-model="form['purchasing_users']"
                  :localdata="list_user_purchasing_users"
                  :clear="!disabledObj['purchasing_users_isDisabled']"
                  :disabled="disabledObj['purchasing_users_isDisabled']"
                  v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchasing_users')) || (!form['purchase_order_id'] && $check_field('add','purchasing_users'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['purchasing_users']"
                  :localdata="list_user_purchasing_users"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','purchasing_users')" id="purchasing_users"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchase_time') || ($check_field('add','purchase_time') || $check_field('set','purchase_time'))" label="购买时间" name="purchase_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_time')) || (!form['purchase_order_id'] && $check_field('add','purchase_time'))" v-model="form['purchase_time']" type="date" :disabled="disabledObj['purchase_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','purchase_time')">
                  {{ form['purchase_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchase_quantity') || ($check_field('add','purchase_quantity') || $check_field('set','purchase_quantity'))" label="购买数量" name="purchase_quantity">
                            <uni-easyinput type="text" v-model="form['purchase_quantity']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_quantity')) || (!form['purchase_order_id'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','purchase_quantity')">
                  {{ form['purchase_quantity'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchase_status') || ($check_field('add','purchase_status') || $check_field('set','purchase_status'))" label="购买状态" name="purchase_status">
                    <uni-data-select
                  v-model="form.purchase_status"
                  :localdata="list_purchase_status"
                  :clear="!disabledObj['purchase_status_isDisabled']"
                  :disabled="disabledObj['purchase_status_isDisabled']"
                  v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_status')) || (!form['purchase_order_id'] && $check_field('add','purchase_status'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','purchase_status')">
                  {{ form['purchase_status'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','total_price') || ($check_field('add','total_price') || $check_field('set','total_price'))" label="合计总价" name="total_price">
                            <uni-easyinput type="text" v-model="form['total_price']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','total_price')) || (!form['purchase_order_id'] && $check_field('add','total_price'))"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','total_price')">
                  {{ form['total_price'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchase_notes') || ($check_field('add','purchase_notes') || $check_field('set','purchase_notes'))" label="购买备注" name="purchase_notes">
                    <uni-easyinput type="textarea" v-model="form['purchase_notes']" v-if="user_group === '管理员' || (form['purchase_order_id'] && $check_field('set','purchase_notes')) || (!form['purchase_order_id'] && $check_field('add','purchase_notes'))" :disabled="disabledObj['purchase_notes_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','purchase_notes')">
                  {{ form['purchase_notes'] }}
                </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button">
              <button size="mini" type="primary" @click="submit()" class="primary_btn">提交</button>
              <button size="mini" @click="cancel()">取消</button>
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
  mixins: [mixin],
  data() {
    return {
      field: "purchase_order_id",
      url_add: "~/api/purchase_order/add?",
      url_set: "~/api/purchase_order/set?",
      url_get_obj: "~/api/purchase_order/get_obj?",
      url_upload: "~/api/purchase_order/upload?",

      query: {
        "purchase_order_id": 0,
      },

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
                                "purchase_order_id": 0, // ID
                
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
                        // 用户组
            group_user_purchasing_users: "",
                                                                                  // 购买状态选项列表
          list_purchase_status: [],
                                                                              }
  },
  methods: {
    changeLog(v,value){
      this.form[value] = v
    },
    /**
     * 上传文件
     * @param {Object} param文件参数
     */
    change_file(key_name){
      var _self = this;
      // 选择图像方法
      uni.chooseFile({
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
              'i_want_to_customize': 'test'
            },
            header: {
              'x-auth-token': _self.$store.state.user.token
            },
            success: function(uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url
              _self.form[key_name] = filename
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
     * 上传图片
     * @param {Object} param文件参数
     */
    change_img(key_name){
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
              'i_want_to_customize': 'test'
            },
            header: {
              'x-auth-token': _self.$store.state.user.token
            },
            success: function(uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url
              _self.form[key_name] = filename
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
            /**
     * 获取注册用户用户组
     */
    async get_group_user_purchasing_users() {
      this.form["purchasing_users"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_purchasing_users = json.result.obj;
        this.get_user_session_purchasing_users(this.form['purchasing_users'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_purchasing_users(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_purchasing_users.source_table+"/get_obj?"
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
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "purchasing_users") {
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
                                
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                      if (this.form["purchase_time"] && JSON.stringify(this.form["purchase_time"]).indexOf("-")===-1) {
        this.form["purchase_time"] = this.$toTime(parseInt(this.form["purchase_time"]),"yyyy-MM-dd")
      }
                                        },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/purchase_order/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/purchase_order/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/purchase_order/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/purchase_order/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/purchase_order/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                                            this.get_list_user_purchasing_users();
            this.get_group_user_purchasing_users();
                                    this.get_list_purchase_status();
                          },
}
</script>

<style scoped>
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

.form_button{
  padding-bottom: 15px;
  display: flex;
}
.form_button button{
  width: 40%;
}
.query_select{
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

.query_option{
  width: 100%;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.form_button {
  padding-bottom: 15px;
  display: flex;
}
.form_button button {
  width: 40%;
}
.query_select {
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
  outline: none;
}

.query_option {
  width: 100%;
}

.btn_add_img {
  color: #d3d3d3;
  text-align: center;
  border: 1px solid #eee;
  height: 5rem;
  width: 5rem;
  position: relative;
}
.btn_add_img text {
  font-size: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/*新样式*/
.uni-forms{
padding-top:1rem;
}
.uni-forms-item {
	padding: 6px 10px;
    background: #f8f6fc;
}
.uni-forms .is-input-border{
	border: 0;
}
.container{
	    -webkit-box-shadow: 0px 0px 0px #888888;
	    box-shadow: 0px 0px 0px #888888;
}
.form_button .primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
</style>
