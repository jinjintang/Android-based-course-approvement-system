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
      
          <p> {{ scope.row.USER_NAME }}</p>
      
      </template>
    </el-table-column>
     
    <el-table-column
      label="联系电话"
     >
      <template scope="scope">
      
          <p>{{ scope.row.USER_PHONE }}</p>
      
      </template>
    </el-table-column>
    <el-table-column
      label="地区"
     >
      <template scope="scope">
      
          <p>{{ scope.row.AREA_NAME }}</p>
      
      </template>
    </el-table-column> 
  
    
    <el-table-column label="操作">
      <template scope="scope">
    
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-if="scope.$index<num&&scope.row.freeze==0">移入下一班</el-button>
          <el-button
          size="small"
          type="danger"
          @click="handleDelete2(scope.$index, scope.row)" v-else-if="scope.$index<num&&scope.row.freeze==1">加入本班</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-button type="primary" @click="onSubmit">返回</el-button>
   
    </div>

    
 
</template>

<script>
import * as A from "../../../static/lib/ajax.js"

    export default {
        data: function(){
            return {
                form: {
                    
                    
                },
                ins:0,
                num:8,
        tableData: [],
          options: [],
          cates:[],
          progress:0,
    is_progress_show:true
            }
        },
        methods: {
          onSubmit(){history.go(-1)},
   
       handleDelete(index, row) {
        var scope=this;
        
           A.ajax({

            url:scope.$urlbase+'/trade_detail/freeze/'+row.DETAIL_ID,
            type:'PUT',

  })
        row.freeze=1;
this.mounted()
           A.ajax({
            url:scope.$urlbase+'/trade_detail/registerdetail/'+scope.ins,
            type:'GET',
          
            success:function(e){
            console.log(e);
            

             scope.tableData=e;

        scope.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success'
             });                          
          } 
      })  
    

          
          },  
           handleDelete2(index, row) {
        var scope=this;
        
           A.ajax({

            url:scope.$urlbase+'/trade_detail/unfreeze/'+row.DETAIL_ID,
            type:'PUT',

  })
        row.freeze=0;
this.mounted()
           A.ajax({
            url:scope.$urlbase+'/trade_detail/registerdetail/'+scope.ins,
            type:'GET',
          
            success:function(e){
            console.log(e);
            

             scope.tableData=e;

        scope.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success'
             });                          
          } 
      })  
    

          
          },
      

        },
        mounted(){
           console.log(index);
      var scope=this;
     let index = this.$route.query.id;
     scope.ins=index;
       console.log(index);
       scope.num=this.$route.query.num;
       console.log(scope.num);
     A.ajax({
            url:scope.$urlbase+'/trade_detail/registerdetail/'+index,
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