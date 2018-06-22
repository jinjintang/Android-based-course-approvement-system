<template><div>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="课程名称">
    <p v-text="form.COURSENAME" ></p>
  </el-form-item>
  <el-form-item label="课程封面">
  <img :src="form.COURSECOVER"style="width:300px"/>
   
  </el-form-item>
<el-form-item label="课程价格">
    <p v-text="form.COURSEPRICE"></p>
  </el-form-item>
  <el-form-item label="开课人数">
    <p v-text="form.OPENNUMBER"></p>
  </el-form-item>
  <el-form-item label="课程区域">
    <p v-text="form.AREANAME"></p>
  </el-form-item>
  <el-form-item label="课程等级">
    <p v-text="form.RANKNAME"></p>
  </el-form-item>
  <el-form-item label="上课时间">
    <p v-text="form.COURSEABSTRACT"></p>
  </el-form-item>

  <el-form-item label="课程备注">
    <p v-text="form.COURSEREMARK"></p>
  </el-form-item>

  
  <el-form-item label="课程内容">
    <p v-html="form.COURSECONTENT"></p>
  </el-form-item>
   <el-form-item label="进度">
      <el-steps :space="200" :active= "len" finish-status="success">
  <el-step v-for="item in name"
                          :title="areanames[Number(item.APAREAID)]"
                          :process-status="wait"
                           ></el-step>
 
</el-steps>
  </el-form-item>

 <el-form-item>
    <el-button type="primary" @click="onSubmit">返回</el-button>
   
  </el-form-item>

</el-form></div></template>
<script>
import * as A from "../../../static/lib/ajax.js"
  export default {
    data() {
      return {
        form :{},
        len:0,
        name:{},
        areanames:{},
      }

    },
    mounted(){
 var scope=this;
     let index = this.$route.query.id;
       console.log(index);
       A.ajax({

           
            url:scope.$urlbase+'/area/',
            type:'GET',
          
            success:function(e){
            console.log(e);
            e.forEach(i=>{
              scope.areanames[i.Id]=i.AREANAME;

            })
            console.log(scope.areanames)
             


           }

            
        
      }) 
          A.ajax({

           
            url:scope.$urlbase+'/course/'+index,
            type:'GET',
          
            success:function(e){
            console.log(e);
            e.COURSECOVER=scope.$imgbase+e.COURSECOVER
             scope.form=e;

            
        scope.$notify({
          title: '成功',
          message: '课程获取成功',
          type: 'success'
             });                          
          } 
      })      
        A.ajax({

           
            url:scope.$urlbase+'/course_approve/?query=COURSEID:'+index,
            type:'GET',
          
            success:function(e){
            console.log(e);
            if(e[e.length-1].STATE==1)scope.len=e.length
              else scope.len=e.length-1
        
             scope.name=e;

            
                                 
          } 
      })  
     
      

    },
    methods: {
      onSubmit() {
        history.go(-1);
        console.log('submit!');
      }
    }
  }
</script>