		
<template id="temp-tab01">




<el-row type="flex" align="middle" style="height:230px">
<el-col style="height:200px;">
<el-row type="flex" justify="center">

    <el-col class="tab01_wrap" style="width:580px;height:200px;" >
        <el-form status-icon label-width="100px" ref="form01" :model="form01" :rules="rule01" id="stepTab01">
            <el-form-item label="邮箱" prop="emailAdress" >
                <el-input type="text" id="userEmail" placeholder="请输入绑定邮箱" style="width:300px;" v-model="form01.emailAdress"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="checkWord">
                <el-input type="text" id="emailCheck" placeholder="请输入邮箱验证码" style="width:184px;" v-model="form01.checkWord"></el-input>
                <el-button id="getCheck"  >获取验证码</el-button>
            </el-form-item>
        </el-form>
    </el-col>

</el-row>
</el-col>
</el-row>

</template>



<script>
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, DatePicker, Row, Col, Upload } from 'element-ui'
// import * as config from '../../api/config'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
export default {
    data(){
        
        return {
            form01:{
                emailAdress:null,
                checkWord:null
            },
            rule01:{
                emailAdress:[
                    { required:true, message:'请输入绑定邮箱', trigger:'blur' }
                ],
                checkWord:[
                    { required:true, message:'请输入验证码', trigger:'blur'},
                    { type: 'number', message: '请输入数字', trigger: 'blur,change' }
                ],
            }
        }
    },


}
</script>


<style>
    


</style>




