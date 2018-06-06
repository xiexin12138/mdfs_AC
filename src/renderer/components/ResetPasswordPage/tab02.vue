        <template id="temp-tab02">

			<el-row type="flex" align="middle" style="height:230px">
			<el-col style="height:200px;">
			<el-row type="flex" justify="center">

			    <el-col style="width:580px;height:200px;">

			        <el-form status-icon label-width="100px" ref="form02" :model="form02" :rules="rule02">
			            <el-form-item label="设置新密码" prop="resetPsw">
			                <el-input type="password" id="newPassword" placeholder="请输入6~14位新密码" style="width:300px;" v-model="form02.resetPsw"></el-input>
			            </el-form-item>
			            <el-form-item label="重复新密码" prop="repeatPsw">
			                <el-input type="password" id="rePassword" placeholder="请再次输入同样的密码" style="width:300px;" v-model="form02.repeatPsw"></el-input>
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
            form02:{
                resetPsw:null,
                repeatPsw:null
            },
            rule02:{
                resetPsw:[
                    { required:true, message:'请输入6~14位新密码', trigger:'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur,change' }
                ],
                repeatPsw:[
                    { required:true, message:'两次密码输入需相同', trigger:'blur'},
                    { type: 'number', message: '请输入数字', trigger: 'blur,change' }
                ],
            }
        }
    },


}
</script>
