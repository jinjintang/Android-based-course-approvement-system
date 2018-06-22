<template>
    <div>
        
       
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 签到</el-breadcrumb-item>
                <el-breadcrumb-item>签到列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<el-table
    :data="tableData"
    border
    style="width: 100%">
  
    <el-table-column
      label="学生名称"
      width="180">
      <template scope="scope">
      
          <p> {{ scope.row.USER_NAME }}</p>
      
      </template>
    </el-table-column>
    
    <el-table-column
      label="签到次数"
     >
      <template scope="scope">
      
          <p>{{ scope.row.NUM }}</p>
      
      </template>
    </el-table-column>
    
    
  </el-table>
 
       
    </div>
</template>

<script>
import * as A from "../../../static/lib/ajax.js"

    export default {
        data: function(){
            return {
                form: {
                    
                    
                },
        tableData: [],
          options: [],
          cates:[],
          progress:0,
    is_progress_show:true
            }
        },
        methods: {
   
    
      

        },
        mounted(){
       var scope=this;
var scope=this;
     let index = this.$route.query.id;
       console.log(index);
     A.ajax({

            url:scope.$urlbase+'/attendance/course/'+index,
            type:'GET',
          
            success:function(e){
            console.log(e);
            

             scope.tableData=e;

        scope.$notify({
          title: '成功',
          message: '学生获取成功',
          type: 'success'
             });                          
          } 
      })  
    
     
      },
    }
</script>
<style>
 .form-box{

  width:300px;

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