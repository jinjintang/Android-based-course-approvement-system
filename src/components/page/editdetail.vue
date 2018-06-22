<template> <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程名称">
                    <el-input v-model="form.COURSENAME"></el-input>
                </el-form-item>
                <el-form-item label="课程图片">
                  <label for="upload22" ><p class="upload-style">点击上传</p></label>
                  <input type="file" id="upload22" hidden="true" v-on:change="uploadFile($event)" >
                   <el-progress :percentage="progress" v-show="is_progress_show" ></el-progress>
                   <div slot="tip" class="el-upload__tip"></div>
              </el-form-item>
               <el-form-item label="课程价格">
                    <el-input v-model="form.COURSEPRICE"></el-input>
                </el-form-item>
               <el-form-item label="课程等级">
                     <el-select v-model="form.RANKNAME" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.Id"
                          :label="item.RANKNAME"
                          :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开班人数">
                    <el-input v-model="form.COURSEPRICE"></el-input>
                </el-form-item>
                <el-form-item label="开班时间">
                    <el-input v-model="form.COURSEABSTRACT"></el-input>
                </el-form-item>
                 <el-form-item label="所属分类">
                     <el-select v-model="form.CATEGORYNAME" placeholder="请选择">
                        <el-option
                          v-for="item in cates"
                          :key="item.Id"
                          :label="item.CATEGORYNAME"
                          :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>   
                <el-form-item label="课程备注">
                    <el-input type="textarea" v-model="form.COURSEREMARK "></el-input>
                </el-form-item>                 
                <el-form-item label="课程内容" class="spciece">
                   <!--  <el-input type="textarea" v-model="form.introduciton "></el-input> -->
                   <quill-editor v-model="form.COURSECONTENT"></quill-editor>
                   <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                   
                </el-form-item>
                </el-form-item>
             
        
        
 
</el-form></div></template>
<script>
import * as A from "../../../static/lib/ajax.js"
  export default {
    data() {
      return {
        form :{}
      }
    },
    mounted(){
 var scope=this;
     let index = this.$route.query.id;
       console.log(index);
       A.ajax({

           
            url:'/course/'+index,
            type:'GET',
          
            success:function(e){
            console.log(e);
            
             scope.form=e;

            
        scope.$notify({
          title: '成功',
          message: '课程获取成功',
          type: 'success'
             });                          
          } 
      })  
       A.ajax({

           
            url:'/course_category/',
            type:'GET',
          
            success:function(e){
            console.log(e);
            
             scope.cates=e;

            
        scope.$notify({
          title: '成功',
          message: '课程获取成功',
          type: 'success'
             });                          
          } 
      })    
       A.ajax({

           
            url:'/course_rank/',
            type:'GET',
          
            success:function(e){
            console.log(e);
            
             scope.options=e;

            
        scope.$notify({
          title: '成功',
          message: '课程获取成功',
          type: 'success'
             });                          
          } 
      })  
     
      

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
 .form-box{

  width:500px;

 } 
 .spciece{
  width:1000px;
 }
 .upload-style{
  background:#00d1b2;
    color: #fff;
    width:100%;
    height: 36px;
    cursor: pointer;
    text-align: center;
    line-height: 36px;
 }
.images{
  width:60px;
  height: 60px;
  vertical-align: middle;
}


</style>