<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','equipment_coding') || ($check_field('add','equipment_coding') || $check_field('set','equipment_coding'))" label="设备编码" name="equipment_coding">
                            <uni-easyinput type="text" v-model="form['equipment_coding']" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','equipment_coding')) || (!form['equipment_and_equipment_id'] && $check_field('add','equipment_coding'))"  :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','equipment_coding')">
                  {{ form['equipment_coding'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','device_name') || ($check_field('add','device_name') || $check_field('set','device_name'))" label="设备名称" name="device_name">
                            <uni-easyinput type="text" v-model="form['device_name']" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','device_name')) || (!form['equipment_and_equipment_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','device_name')">
                  {{ form['device_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','storage_location') || ($check_field('add','storage_location') || $check_field('set','storage_location'))" label="存放位置" name="storage_location">
                            <uni-easyinput type="text" v-model="form['storage_location']" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','storage_location')) || (!form['equipment_and_equipment_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','storage_location')">
                  {{ form['storage_location'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','device_status') || ($check_field('add','device_status') || $check_field('set','device_status'))" label="设备状态" name="device_status">
                    <uni-data-select
                  v-model="form.device_status"
                  :localdata="list_device_status"
                  :clear="!disabledObj['device_status_isDisabled']"
                  :disabled="disabledObj['device_status_isDisabled']"
                  v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','device_status')) || (!form['equipment_and_equipment_id'] && $check_field('add','device_status'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','device_status')">
                  {{ form['device_status'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','cover_photo') || ($check_field('add','cover_photo') || $check_field('set','cover_photo'))" label="封面图片" name="cover_photo">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['cover_photo'] && $check_field('set','cover_photo')">
                  <image v-if="disabledObj['cover_photo_isDisabled']" :src="$fullUrl(form['cover_photo'])" />
                  <image v-if="!disabledObj['cover_photo_isDisabled']" :src="$fullUrl(form['cover_photo'])" @click="change_img('cover_photo')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['cover_photo'] && $check_field('add','cover_photo')">
                  <view v-if="disabledObj['cover_photo_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['cover_photo_isDisabled']" class="btn_add_img" @click="change_img('cover_photo')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','cover_photo')">
                  <image :src="$fullUrl(form['cover_photo'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','lending_notice') || ($check_field('add','lending_notice') || $check_field('set','lending_notice'))" label="出借须知" name="lending_notice">
                            <uni-easyinput type="text" v-model="form['lending_notice']" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','lending_notice')) || (!form['equipment_and_equipment_id'] && $check_field('add','lending_notice'))" :disabled="disabledObj['lending_notice_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','lending_notice')">
                  {{ form['lending_notice'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','usage_duration') || ($check_field('add','usage_duration') || $check_field('set','usage_duration'))" label="使用时长" name="usage_duration">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','usage_duration')) || (!form['equipment_and_equipment_id'] && $check_field('add','usage_duration'))" @change="changeLog($event,'usage_duration')" v-model="form['usage_duration']" type="datetime" :disabled="disabledObj['usage_duration_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','usage_duration')">
                  {{ form['usage_duration'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','device_details') || ($check_field('add','device_details') || $check_field('set','device_details'))" label="设备详情" name="device_details">
                            <uni-easyinput type="text" v-model="form['device_details']" v-if="user_group === '管理员' || (form['equipment_and_equipment_id'] && $check_field('set','device_details')) || (!form['equipment_and_equipment_id'] && $check_field('add','device_details'))" :disabled="disabledObj['device_details_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','device_details')">
                  {{ form['device_details'] }}
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
                    "usage_duration": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
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
          list_device_status: [],
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
            url: _self.$fullUrl('/api/equipment_and_equipment/upload?'),
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
            url: _self.$fullUrl('/api/equipment_and_equipment/upload?'),
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
                                                          if (this.form["usage_duration"] && JSON.stringify(this.form["usage_duration"]).indexOf("-")===-1) {
        this.form["usage_duration"] = this.$toTime(parseInt(this.form["usage_duration"]), "yyyy-MM-dd hh:mm:ss")
      }
                      uni.db.del("form");
      return param;
    },
        
            
            
            /**
     * 获取设备状态列表
     */
    async get_list_device_status() {
          ['已出借','空闲中'].map((o) => this.list_device_status.push({value:o,text:o}));
            },
        
            
            
            
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                          if (this.form["usage_duration"] && JSON.stringify(this.form["usage_duration"]).indexOf("-")===-1) {
        this.form["usage_duration"] = this.$toTime(parseInt(this.form["usage_duration"]), "yyyy-MM-dd hh:mm:ss")
      }
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

  },
  created() {
                                this.get_list_device_status();
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
