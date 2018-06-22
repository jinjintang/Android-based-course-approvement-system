<template>
    <div>
        
       
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 班级</el-breadcrumb-item>
                <el-breadcrumb-item>班级列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="0">上课中</el-menu-item>
 
  <el-menu-item index="1" disabled>已结课</el-menu-item>
  
</el-menu>
<el-table
    :data="tableData"
    border
    style="width: 100%">
  
    <el-table-column
      label="班级名称"
     >
      <template scope="scope">
      
          <p> {{ scope.row.CLASSNAME }}</p>
      
      </template>
    </el-table-column>
    <el-table-column
      label="上课地点"
      >
      <template scope="scope">
      
          <p> {{ scope.row.CLASSADDRESS}}</p>
      
      </template>
    </el-table-column>
     <el-table-column
      label="人数"
     >
      <template scope="scope">
      
          <p> {{ scope.row.CLASSNUMBER }}</p>
      
      </template>
    </el-table-column>
     
    <el-table-column
      label="班长"
     >
      <template scope="scope">
      
          <p>{{ scope.row.CLASSMONITOR}}</p>
      
      </template>
    </el-table-column>
    <el-table-column
      label="老师"
     >
      <template scope="scope">
      
          <p>{{ scope.row.TEACHERNAME }}</p>
      
      </template>
    </el-table-column>
     <el-table-column
      label="开课时间"
     >
      <template scope="scope">
      
          <p>{{ scope.row.CLASSTIME }}</p>
      
      </template>
    </el-table-column> 
   
    <el-table-column
      label="课程次数"
     >
      <template scope="scope">
      
          <p>{{ scope.row.CLASSCISHU }}</p>
      
      </template>
    </el-table-column>
     <el-table-column label="签到详情">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleDetails(scope.$index, scope.row)">详情</el-button>
       
      </template>
    </el-table-column>
    
  </el-table>
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
              areaid:'',
                form: {
                    name: '',
                    cid:'',
                    price:'',
                    introduciton: '',
                    categroy_id:'',
                    avatar:''
                },
        alldata:[],
        tableData: [],
          options: [],
          cates:[],
          progress:0,
    is_progress_show:false,
    activeIndex:"0",
     count:0,
        pages:0
            }
        },
        methods: {
 page(val){
  val=val-1;
       this.pages = val
       this.init(this.activeIndex,val)

       }, 



 handleDetails(index,row){
            console.log("ddddddddd",row)
           this.$router.push({path:"/classdetail",query:{id:row.Id}})
         },
      
          handleSelect(key, keyPath) {
   var scope=this;
    scope.activeIndex=key;
  if (key === "0") {

var obj={};

obj=scope.alldata.filter(item=>item.CLASSSSTATE==0).map(item=>item);
scope.count=obj.length
obj=obj.slice(0,5)
 scope.tableData=obj;
  }    
  if (key === "1") {
   var obj={};

obj=scope.alldata.filter(item=>item.CLASSSSTATE=='1').map(item=>item);
scope.count=obj.length
obj=obj.slice(0,5)
 scope.tableData=obj;
  }
 
  // ……
  // 这时改为 switch 语句更好
},
init(key,val){
  var scope=this;
     A.ajax({           
      url:scope.$urlbase+'/classs/?query=AREAID:'+scope.areaid,
            type:'GET',
          
            success:function(e){
            console.log(e);
            scope.alldata=e;

             var obj={};

obj=scope.alldata.filter(item=>item.CLASSSSTATE==Number(key)).map(item=>item);
scope.count=obj.length
obj=obj.slice(val*5,val*5+5)
 scope.tableData=obj;

        scope.$notify({
          title: '成功',
          message: '班级获取成功',
          type: 'success'
             });                          
          } 
      })  
     
       
      },




        },
        mounted(){
          this.areaid=localStorage.getItem('area');
       this.init(0,0);
    }}
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