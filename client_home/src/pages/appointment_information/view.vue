<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','laboratory_number') || ($check_field('add','laboratory_number') || $check_field('set','laboratory_number'))" label="实验室编号" name="laboratory_number">
                            <uni-easyinput type="text" v-model="form['laboratory_number']" v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','laboratory_number')) || (!form['appointment_information_id'] && $check_field('add','laboratory_number'))"  :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','laboratory_number')">
                  {{ form['laboratory_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','laboratory_name') || ($check_field('add','laboratory_name') || $check_field('set','laboratory_name'))" label="实验室名称" name="laboratory_name">
                            <uni-easyinput type="text" v-model="form['laboratory_name']" v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','laboratory_name')) || (!form['appointment_information_id'] && $check_field('add','laboratory_name'))" :disabled="disabledObj['laboratory_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','laboratory_name')">
                  {{ form['laboratory_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','laboratory_status') || ($check_field('add','laboratory_status') || $check_field('set','laboratory_status'))" label="实验室状态" name="laboratory_status">
                            <uni-easyinput type="text" v-model="form['laboratory_status']" v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','laboratory_status')) || (!form['appointment_information_id'] && $check_field('add','laboratory_status'))" :disabled="disabledObj['laboratory_status_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','laboratory_status')">
                  {{ form['laboratory_status'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','appointment_users') || ($check_field('add','appointment_users') || $check_field('set','appointment_users'))" label="预约用户" name="appointment_users">
                    <uni-data-select
                  id="form_appointment_users"
                  v-model="form['appointment_users']"
                  :localdata="list_user_appointment_users"
                  :clear="!disabledObj['appointment_users_isDisabled']"
                  :disabled="disabledObj['appointment_users_isDisabled']"
                  v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_users')) || (!form['appointment_information_id'] && $check_field('add','appointment_users'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['appointment_users']"
                  :localdata="list_user_appointment_users"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','appointment_users')" id="appointment_users"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','time_of_appointment') || ($check_field('add','time_of_appointment') || $check_field('set','time_of_appointment'))" label="预约时间" name="time_of_appointment">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','time_of_appointment')) || (!form['appointment_information_id'] && $check_field('add','time_of_appointment'))" @change="changeLog($event,'time_of_appointment')" v-model="form['time_of_appointment']" type="datetime" :disabled="disabledObj['time_of_appointment_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','time_of_appointment')">
                  {{ form['time_of_appointment'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','appointment_duration') || ($check_field('add','appointment_duration') || $check_field('set','appointment_duration'))" label="预约时长" name="appointment_duration">
                            <uni-easyinput type="text" v-model="form['appointment_duration']" v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_duration')) || (!form['appointment_information_id'] && $check_field('add','appointment_duration'))" :disabled="disabledObj['appointment_duration_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','appointment_duration')">
                  {{ form['appointment_duration'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','appointment_status') || ($check_field('add','appointment_status') || $check_field('set','appointment_status'))" label="预约状态" name="appointment_status">
                    <uni-data-select
                  v-model="form.appointment_status"
                  :localdata="list_appointment_status"
                  :clear="!disabledObj['appointment_status_isDisabled']"
                  :disabled="disabledObj['appointment_status_isDisabled']"
                  v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_status')) || (!form['appointment_information_id'] && $check_field('add','appointment_status'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','appointment_status')">
                  {{ form['appointment_status'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','appointment_notes') || ($check_field('add','appointment_notes') || $check_field('set','appointment_notes'))" label="预约备注" name="appointment_notes">
                    <uni-easyinput type="textarea" v-model="form['appointment_notes']" v-if="user_group === '管理员' || (form['appointment_information_id'] && $check_field('set','appointment_notes')) || (!form['appointment_information_id'] && $check_field('add','appointment_notes'))" :disabled="disabledObj['appointment_notes_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','appointment_notes')">
                  {{ form['appointment_notes'] }}
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
      field: "appointment_information_id",
      url_add: "~/api/appointment_information/add?",
      url_set: "~/api/appointment_information/set?",
      url_get_obj: "~/api/appointment_information/get_obj?",
      url_upload: "~/api/appointment_information/upload?",

      query: {
        "appointment_information_id": 0,
      },

      form: {
            "laboratory_number": this.$get_stamp(), // 实验室编号
                    "laboratory_name":  '', // 实验室名称
                    "laboratory_status":  '', // 实验室状态
                    "appointment_users": 0, // 预约用户
                    "time_of_appointment": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "appointment_duration":  '', // 预约时长
                    "appointment_status":  '', // 预约状态
                    "appointment_notes":  '', // 预约备注
                                "appointment_information_id": 0, // ID
                
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
                        // 用户组
            group_user_appointment_users: "",
                                                                                  // 预约状态选项列表
          list_appointment_status: [],
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
            url: _self.$fullUrl('/api/appointment_information/upload?'),
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
            url: _self.$fullUrl('/api/appointment_information/upload?'),
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
                                          if (this.form["time_of_appointment"] && JSON.stringify(this.form["time_of_appointment"]).indexOf("-")===-1) {
        this.form["time_of_appointment"] = this.$toTime(parseInt(this.form["time_of_appointment"]), "yyyy-MM-dd hh:mm:ss")
      }
                                      uni.db.del("form");
      return param;
    },
        
            
            
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
            /**
     * 获取注册用户用户组
     */
    async get_group_user_appointment_users() {
      this.form["appointment_users"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_appointment_users = json.result.obj;
        this.get_user_session_appointment_users(this.form['appointment_users'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_appointment_users(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_appointment_users.source_table+"/get_obj?"
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
                  if (arr[i] !== "appointment_users") {
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
     * 获取预约状态列表
     */
    async get_list_appointment_status() {
          ['预约成功','预约失败'].map((o) => this.list_appointment_status.push({value:o,text:o}));
            },
        
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                          if (this.form["time_of_appointment"] && JSON.stringify(this.form["time_of_appointment"]).indexOf("-")===-1) {
        this.form["time_of_appointment"] = this.$toTime(parseInt(this.form["time_of_appointment"]), "yyyy-MM-dd hh:mm:ss")
      }
                                    },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/appointment_information/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/appointment_information/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/appointment_information/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/appointment_information/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/appointment_information/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                                    this.get_list_user_appointment_users();
            this.get_group_user_appointment_users();
                                    this.get_list_appointment_status();
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
