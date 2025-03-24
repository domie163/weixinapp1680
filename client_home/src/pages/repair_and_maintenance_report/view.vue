<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','equipment_coding') || ($check_field('add','equipment_coding') || $check_field('set','equipment_coding'))" label="设备编码" name="equipment_coding">
                            <uni-easyinput type="text" v-model="form['equipment_coding']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','equipment_coding')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','equipment_coding'))"  :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','equipment_coding')">
                  {{ form['equipment_coding'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','device_name') || ($check_field('add','device_name') || $check_field('set','device_name'))" label="设备名称" name="device_name">
                            <uni-easyinput type="text" v-model="form['device_name']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','device_name')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','device_name'))" :disabled="disabledObj['device_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','device_name')">
                  {{ form['device_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','storage_location') || ($check_field('add','storage_location') || $check_field('set','storage_location'))" label="存放位置" name="storage_location">
                            <uni-easyinput type="text" v-model="form['storage_location']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','storage_location')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','storage_location'))" :disabled="disabledObj['storage_location_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','storage_location')">
                  {{ form['storage_location'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','inspection_type') || ($check_field('add','inspection_type') || $check_field('set','inspection_type'))" label="检查类型" name="inspection_type">
                    <uni-data-select
                  v-model="form.inspection_type"
                  :localdata="list_inspection_type"
                  :clear="!disabledObj['inspection_type_isDisabled']"
                  :disabled="disabledObj['inspection_type_isDisabled']"
                  v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','inspection_type')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','inspection_type'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','inspection_type')">
                  {{ form['inspection_type'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','encounter_problems') || ($check_field('add','encounter_problems') || $check_field('set','encounter_problems'))" label="遇见问题" name="encounter_problems">
                            <uni-easyinput type="text" v-model="form['encounter_problems']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','encounter_problems')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','encounter_problems'))" :disabled="disabledObj['encounter_problems_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','encounter_problems')">
                  {{ form['encounter_problems'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','inspection_time') || ($check_field('add','inspection_time') || $check_field('set','inspection_time'))" label="检查时间" name="inspection_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','inspection_time')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','inspection_time'))" v-model="form['inspection_time']" type="date" :disabled="disabledObj['inspection_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','inspection_time')">
                  {{ form['inspection_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','inspectors') || ($check_field('add','inspectors') || $check_field('set','inspectors'))" label="检查人员" name="inspectors">
                            <uni-easyinput type="text" v-model="form['inspectors']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','inspectors')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','inspectors'))" :disabled="disabledObj['inspectors_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','inspectors')">
                  {{ form['inspectors'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','repair_details') || ($check_field('add','repair_details') || $check_field('set','repair_details'))" label="修理详情" name="repair_details">
                    <uni-easyinput type="textarea" v-model="form['repair_details']" v-if="user_group === '管理员' || (form['repair_and_maintenance_report_id'] && $check_field('set','repair_details')) || (!form['repair_and_maintenance_report_id'] && $check_field('add','repair_details'))" :disabled="disabledObj['repair_details_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','repair_details')">
                  {{ form['repair_details'] }}
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
      field: "repair_and_maintenance_report_id",
      url_add: "~/api/repair_and_maintenance_report/add?",
      url_set: "~/api/repair_and_maintenance_report/set?",
      url_get_obj: "~/api/repair_and_maintenance_report/get_obj?",
      url_upload: "~/api/repair_and_maintenance_report/upload?",

      query: {
        "repair_and_maintenance_report_id": 0,
      },

      form: {
            "equipment_coding": this.$get_stamp(), // 设备编码
                    "device_name":  '', // 设备名称
                    "storage_location":  '', // 存放位置
                    "inspection_type":  '', // 检查类型
                    "encounter_problems":  '', // 遇见问题
                    "inspection_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
                    "inspectors":  '', // 检查人员
                    "repair_details":  '', // 修理详情
                                "repair_and_maintenance_report_id": 0, // ID
                
              },
          disabledObj:{
                        "equipment_coding_isDisabled": false,
                                "device_name_isDisabled": false,
                                "storage_location_isDisabled": false,
                                "inspection_type_isDisabled": false,
                                "encounter_problems_isDisabled": false,
                                "inspection_time_isDisabled": false,
                                "inspectors_isDisabled": false,
                                "repair_details_isDisabled": false,
                                  },
                                                                                  // 检查类型选项列表
          list_inspection_type: [],
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
            url: _self.$fullUrl('/api/repair_and_maintenance_report/upload?'),
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
            url: _self.$fullUrl('/api/repair_and_maintenance_report/upload?'),
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
                                                      if (this.form["inspection_time"] && JSON.stringify(this.form["inspection_time"]).indexOf("-")===-1) {
        this.form["inspection_time"] = this.$toTime(parseInt(this.form["inspection_time"]), "yyyy-MM-dd")
      }
                          uni.db.del("form");
      return param;
    },
        
            
            
            /**
     * 获取检查类型列表
     */
    async get_list_inspection_type() {
          ['维修','检修'].map((o) => this.list_inspection_type.push({value:o,text:o}));
            },
        
            
            
            
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                      if (this.form["inspection_time"] && JSON.stringify(this.form["inspection_time"]).indexOf("-")===-1) {
        this.form["inspection_time"] = this.$toTime(parseInt(this.form["inspection_time"]),"yyyy-MM-dd")
      }
                        },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/repair_and_maintenance_report/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/repair_and_maintenance_report/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/repair_and_maintenance_report/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/repair_and_maintenance_report/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/repair_and_maintenance_report/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                                this.get_list_inspection_type();
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
