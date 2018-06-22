<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                 <el-radio v-model="radio" label="1">管理员</el-radio>
  <el-radio v-model="radio" label="2">教师</el-radio>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
             
            </el-form>
        </div>
    </div>
</template>

<script>
import * as A from "../../../static/lib/ajax.js"
    export default {
        data: function(){
            return {
                radio:"1",
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {

                         A.ajax({
            url:self.$urlbase+'suser/'+self.ruleForm.username,
            type:'GET',
          
            success:function(e){
       
           if(e=="null"){
             self.$message.warning("用户名不存在")
           }
           else{
if(e.PASSWORD!=self.ruleForm.password) self.$message.warning("密码错误")
else{
                        localStorage.setItem('token',e.Id);
                        localStorage.setItem('name',e.NAME);
                        localStorage.setItem('area',e.AREAID);
                         localStorage.setItem('areaname',e.AREANAME);


                        if(self.radio=="1")self.$router.push('/area');
                        else self.$router.push('/teacher')
                        console.log(self.$router)}
           }

           
                               
          } 
      }) 

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>