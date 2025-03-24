<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','equipment_coding') || ($check_field('add','equipment_coding') || $check_field('set','equipment_coding'))" label="设备编码" name="equipment_coding">
                            <uni-easyinput type="text" v-model="form['equipment_coding']" v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','equipment_coding')) || (!form['equipment_return_id'] && $check_field('add','equipment_coding'))" :disabled="disabledObj['equipment_coding_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','equipment_coding')">
                  {{ form['equipment_coding'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','device_name') || ($check_field('add','device_name') || $check_field('set','device_name'))" label="设备名称" name="device_name">
                            <uni-easyinput type="text" v-model="form['device_name']" v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','device_name')) || (!form['equipment_return_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','device_name')">
                  {{ form['device_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','storage_location') || ($check_field('add','storage_location') || $check_field('set','storage_location'))" label="存放位置" name="storage_location">
                            <uni-easyinput type="text" v-model="form['storage_location']" v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','storage_location')) || (!form['equipment_return_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','storage_location')">
                  {{ form['storage_location'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','return_to_user') || ($check_field('add','return_to_user') || $check_field('set','return_to_user'))" label="归还用户" name="return_to_user">
                    <uni-data-select
                  id="form_return_to_user"
                  v-model="form['return_to_user']"
                  :localdata="list_user_return_to_user"
                  :clear="!disabledObj['return_to_user_isDisabled']"
                  :disabled="disabledObj['return_to_user_isDisabled']"
                  v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_to_user')) || (!form['equipment_return_id'] && $check_field('add','return_to_user'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['return_to_user']"
                  :localdata="list_user_return_to_user"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','return_to_user')" id="return_to_user"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','return_time') || ($check_field('add','return_time') || $check_field('set','return_time'))" label="归还时间" name="return_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_time')) || (!form['equipment_return_id'] && $check_field('add','return_time'))" @change="changeLog($event,'return_time')" v-model="form['return_time']" type="datetime" :disabled="disabledObj['return_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','return_time')">
                  {{ form['return_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','return_quantity') || ($check_field('add','return_quantity') || $check_field('set','return_quantity'))" label="归还数量" name="return_quantity">
                            <uni-easyinput type="text" v-model="form['return_quantity']" v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_quantity')) || (!form['equipment_return_id'] && $check_field('add','return_quantity'))" :disabled="disabledObj['return_quantity_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','return_quantity')">
                  {{ form['return_quantity'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','return_status') || ($check_field('add','return_status') || $check_field('set','return_status'))" label="归还状态" name="return_status">
                    <uni-data-select
                  v-model="form.return_status"
                  :localdata="list_return_status"
                  :clear="!disabledObj['return_status_isDisabled']"
                  :disabled="disabledObj['return_status_isDisabled']"
                  v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_status')) || (!form['equipment_return_id'] && $check_field('add','return_status'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','return_status')">
                  {{ form['return_status'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','return_remarks') || ($check_field('add','return_remarks') || $check_field('set','return_remarks'))" label="归还备注" name="return_remarks">
                    <uni-easyinput type="textarea" v-model="form['return_remarks']" v-if="user_group === '管理员' || (form['equipment_return_id'] && $check_field('set','return_remarks')) || (!form['equipment_return_id'] && $check_field('add','return_remarks'))" :disabled="disabledObj['return_remarks_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','return_remarks')">
                  {{ form['return_remarks'] }}
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
      field: "equipment_return_id",
      url_add: "~/api/equipment_return/add?",
      url_set: "~/api/equipment_return/set?",
      url_get_obj: "~/api/equipment_return/get_obj?",
      url_upload: "~/api/equipment_return/upload?",

      query: {
        "equipment_return_id": 0,
      },

      form: {
            "equipment_coding":  '', // 设备编码
                    "device_name":  '', // 设备名称
                    "storage_location":  '', // 存放位置
                    "return_to_user": 0, // 归还用户
                    "return_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "return_quantity":  0 , // 归还数量
                    "return_status":  '', // 归还状态
                    "return_remarks":  '', // 归还备注
                                "equipment_return_id": 0, // ID
                
              },
          disabledObj:{
                        "equipment_coding_isDisabled": false,
                                "device_name_isDisabled": false,
                                "storage_location_isDisabled": false,
                                "return_to_user_isDisabled": false,
                                "return_time_isDisabled": false,
                                                    "return_status_isDisabled": false,
                                "return_remarks_isDisabled": false,
                                  },
                                                                                            // 用户列表
            list_user_return_to_user: [],
                        // 用户组
            group_user_return_to_user: "",
                                                                                  // 归还状态选项列表
          list_return_status: [],
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
            url: _self.$fullUrl('/api/equipment_return/upload?'),
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
            url: _self.$fullUrl('/api/equipment_return/upload?'),
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
                                          if (this.form["return_time"] && JSON.stringify(this.form["return_time"]).indexOf("-")===-1) {
        this.form["return_time"] = this.$toTime(parseInt(this.form["return_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                      uni.db.del("form");
      return param;
    },
        
            
            
                /**
     * 获取注册用户用户列表
     */
    async get_list_user_return_to_user() {
      // if(this.user_group !== "管理员" && this.form["return_to_user"] === 0) {
      //     this.form["return_to_user"] = this.user.user_id;
      // }
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_return_to_user.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
            /**
     * 获取注册用户用户组
     */
    async get_group_user_return_to_user() {
      this.form["return_to_user"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_return_to_user = json.result.obj;
        this.get_user_session_return_to_user(this.form['return_to_user'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_return_to_user(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_return_to_user.source_table+"/get_obj?"
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
                  if (arr[i] !== "return_to_user") {
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
     * 获取归还状态列表
     */
    async get_list_return_status() {
          ['归还成功','归还失败'].map((o) => this.list_return_status.push({value:o,text:o}));
            },
        
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                          if (this.form["return_time"] && JSON.stringify(this.form["return_time"]).indexOf("-")===-1) {
        this.form["return_time"] = this.$toTime(parseInt(this.form["return_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                    },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/equipment_return/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/equipment_return/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/equipment_return/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/equipment_return/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/equipment_return/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                                    this.get_list_user_return_to_user();
            this.get_group_user_return_to_user();
                                    this.get_list_return_status();
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
