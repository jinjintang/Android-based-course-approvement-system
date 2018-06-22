<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 区域</el-breadcrumb-item>
                <el-breadcrumb-item>添加区域</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="区域名称">
                    <el-input v-model="form.AREANAME"></el-input>
                </el-form-item>
               <el-form-item label="所属上级">
                     <el-select v-model="form.PARENTID" placeholder="请选择">
                        <el-option
                          v-for="item in tableData2"
                          :key="item.Id"
                          :label="item.AREANAME"
                          :value="item.Id">
                        </el-option>
                         </el-select >
               </el-form-item >
                         
                <el-form-item label= "备注">
                    <el-input v-model="form.AREAREMARK"></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="onclose">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 区域</el-breadcrumb-item>
                <el-breadcrumb-item>区域列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          <el-table
    :data="tableData"
    border
    style="width: 100%">
  
    <el-table-column
      label="区域名称"
      >
      <template scope="scope">
       
          <p> {{ scope.row.AREANAME}}</p>
       
       
      </template>
    </el-table-column>
    <el-table-column
      label="上级区域"
     >
      <template scope="scope">
       
          <p> {{ scope.row.PARENTNAME }}</p>
       
       
      </template>
    </el-table-column>
     <el-table-column
      label="备注"
     >
      <template scope="scope">
       
          <p> {{ scope.row.AREAREMARK }}</p>
       
       
      </template>
    </el-table-column>
         
  

    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
     <el-dialog title="修改区域" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="区域名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                 <el-form-item label="所属上级">
                     <el-select v-model="form.parent" placeholder="请选择">
                        <el-option
                          v-for="item in tableData2"
                          :key="item.Id"
                          :label="item.AREANAME"
                          :value="item">
                        </el-option>
                         </el-select >
               </el-form-item >
            
        
              <el-form-item>
                    <el-button type="primary" @click="onput">提交</el-button>
                    <el-button @click="onclose">取消</el-button>
                </el-form-item>
            </el-form>
  
</el-dialog>
<el-pagination
  background
  layout="prev, pager, next"
  :total="count" v-on:current-change="page" page-size=5>
</el-pagination>
    </div>
</template>

<script>
import * as A from "../../../static/lib/ajax.js"

    export default {
        data: function(){
            return {
                form: {
                    Id:0,
                    AREANAME:'',
                    AREAREMARK:'',
                    PARENTID: '' , 
                    PARENTNAME:''  ,   
                },
                edit:0,
        tableData: [],
        tableData2: [],
        dialogFormVisible:false,
        id:0,
        index:0,
        count:100,
        pages:0

            }
        },




        methods: {
page(val){
  val=val-1;
       this.pages = val
       this.init(val)

       },




     
    onSubmit() {
        var scope=this;
        if (scope.form.AREANAME) {

          let selectItem =  this.tableData2.filter(item =>item.Id == scope.form.PARENTID)
              scope.form.PARENTNAME = selectItem[0].AREANAME
              if(scope.edit==0){
                 A.ajax({
            url:scope.$urlbase+'area/',
            type:'POST',
            data:{
                AREAREMARK:scope.form.AREAREMARK,
                AREACODE: '',
                AREALEVEL: 0,
                AREANAME:scope.form.AREANAME,
                
                AREASTATE: 0,
                Id: 0,
  
                PARENTID: scope.form.PARENTID,
                PARENTNAME:scope.form.PARENTNAME,
          
            },
            fn:function(e){
           
              scope.$message.success('提交成功！');
              scope.init()
              scope.form.AREANAME='';     
              scope.edit=1; 
              scope.form.PARENTID='';              
              scope.form.AREAREMARK=''; 
              scope.init(0) 
          }
      })  }
                 else{
 A.ajax({
            url:scope.$urlbase+'area/'+scope.form.Id,
            type:'put',
            data:{
                AREAREMARK:scope.form.AREAREMARK,
                AREACODE: '',
                AREALEVEL: 0,
                AREANAME:scope.form.AREANAME,
                
                AREASTATE: 0,
                Id: scope.form.Id,
  
                PARENTID: scope.form.PARENTID,
                PARENTNAME:scope.form.PARENTNAME,
          
            },
            fn:function(e){
           
              scope.$message.success('提交成功！');
              
               scope.form.AREANAME='';     
              scope.form.AREAREMARK='';
              scope.form.PARENTID=''; 
              scope.init(0);                 
          } 
      }) 





                 }
     }
     else{
       scope.$notify({
          title: '警告',
          message: '信息填写不能为空',
          type: 'warning'
             });   
            return false;

     }
               
            },
     
       onclose(){
              this.form.AREANAME='',
            this.form= {
                
                    AREANAME:'',
                    AREAREMARK:'',
                    parent: ''       
                }
           
          },

        handleEdit(index, row) {
          this.edit=1;
          this.form.Id=row.Id;
         this.form.AREANAME=row.AREANAME;
         this.form.PARENTID=row.PARENTID;
         this.form.PARENTNAME=row.PARENTNAME;
         this.form.AREAREMARK=row.AREAREMARK;
                },
       handleDelete(index, row) {
             var realIndex=index
       
            var scope=this;
                 A.ajax({
            url:scope.$urlbase+'area/'+row.Id,
            type:'delete',
           
            fn:function(e){
          scope.init(scope.pages)

          } 
      })  
          
          
          },
          init(val){
var scope=this;
     A.ajax({
            url:scope.$urlbase+'area/',
            type:'GET',
          
            success:function(e){
            
       e=e.filter(item=>item!=null)
             scope.tableData2 = e;
             var p=e.filter(item=>item.Id==localStorage.getItem('area'))
             localStorage.setItem('parent',p[0].PARENTID)

            scope.tableData=scope.tableData2.slice(val*5,val*5+5)
            console.log(scope.tableData2)
        scope.$notify({
          title: '成功',
          message: '区域获取成功',
          type: 'success'
             });                          
          } 
      })  
A.ajax({
            url:scope.$urlbase+'/area/num/',
            type:'GET',
          
            success:function(e){
            
           

             scope.count= Number(e[0].NUM);

            //})
                                 
          } 
      })  

          }
        },
        mounted(){
     this.init(0); 

        },
    }
</script>