<template><div>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="课程名称">
    <p v-text="form.COURSENAME" ></p>
  </el-form-item>
  <el-form-item label="课程封面">
  <img :src="this.$imgbase+form.COURSECOVER" style="width:500px"/>
    
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
  
  <el-form-item>
    <el-button type="primary" @click="pass(1)">通过</el-button>
    <el-button  @click="pass(2)">拒绝</el-button>
  </el-form-item>
</el-form></div></template>
<script>
import * as A from "../../../static/lib/ajax.js"
  export default {
    data() {
      return {
        form :{},
   Aid:0,
   Pid:0,
      }
   
    },
    mounted(){
 var scope=this;
     let index = this.$route.query.Cid;
     scope.Aid=this.$route.query.Aid;
       console.log(index);
       A.ajax({

           
            url:scope.$urlbase+'/course/'+index,
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
     
      

    },
    methods: {
    pass2(index){
      var scope=this
   A.ajax({

           
            url:scope.$urlbase+'/area/'+localStorage.getItem('area'),
            type:'GET',
          
            success:function(e){
            console.log(e);
            
             scope.Pid=e.PARENTID;
if(scope.Pid!=0&&index==1){
  scope.form.STATE=2
  A.ajax({

            url:scope.$urlbase+'/course_approve/',
            type:'POST',
          
            data:{
              COURSEID:scope.form.Id+'',
              APAREAID:scope.Pid+'',
              STATE:0
            },
            fn:function(e){
            console.log(e);
            
            //scope.tableData.unshift(e);
                                 
          } 
      })


}
 else if (index==1)

  scope.form.STATE=3;
else scope.form.STATE=4;

  A.ajax({

            url:scope.$urlbase+'course/'+scope.form.Id,
            type:'PUT',
            
            data:scope.form,
            fn:function(e){
            console.log(e);
           scope.$router.push({path:"/approve/"});
            //scope.tableData.unshift(e);
                                 
          } 
      })}})


    },

      pass(index) {
        var scope=this;
         A.ajax({
            url:scope.$urlbase+'/course_approve/'+scope.Aid,
            type:'put',
            data:{
               STATE:index,
              COURSEID:scope.form.Id+'', 
              APAREAID:localStorage.getItem('area'),
              
            },
           success:function(e){
           if(index==1||index==2){scope.pass2(index);}

scope.$router.push({path:"/approve/"});





      }
}
      )  
 

      }
       
    
  }}
</script>