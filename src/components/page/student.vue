<template>
    <div>
        
       
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 学生</el-breadcrumb-item>
                <el-breadcrumb-item>学生列表</el-breadcrumb-item>
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
      
          <p> {{ scope.row.USERNAME }}</p>
      
      </template>
    </el-table-column>
     <el-table-column
      label="学生头像"

     >
      <template scope="scope">
      
        <img :src="scope.row.PHOTOPATH" class="images">
      
      </template>
    </el-table-column>
    <el-table-column
      label="联系电话"
     >
      <template scope="scope">
      
          <p>{{ scope.row.PHONENUMBER }}</p>
      
      </template>
    </el-table-column>
    <el-table-column
      label="地区"
     >
      <template scope="scope">
      
          <p>{{ scope.row.AREANAME }}</p>
      
      </template>
    </el-table-column>
     <el-table-column
      label="微信"
     >
      <template scope="scope">
      
          <p>{{ scope.row.WEIXIN }}</p>
      
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
    
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
     A.ajax({
            url:scope.$urlbase+'/student/',
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