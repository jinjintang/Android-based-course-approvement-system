
<template>


               <div>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="0">待审批</el-menu-item>
 
  <el-menu-item index="1" disabled>已通过</el-menu-item>
  <el-menu-item index="2"><a target="_blank">未通过</a></el-menu-item>
</el-menu>
<div class="line">
	


</div>


        
       
       
<el-table
    :data="options"
    border
    style="width: 100%">
  
    <el-table-column
      label="课程名称"
     >
      <template scope="scope">
      
          <p> {{ scope.row.COURSE_NAME }}</p>
      
      </template>
    </el-table-column>

     <el-table-column
      label="成班人数"
     >
      <template scope="scope">
      
          <p> {{ scope.row.OPEN_NUMBER }}</p>
      
      </template>
    </el-table-column>
    <el-table-column
      label="上课时间"
     >
      <template scope="scope">
      
          <p> {{ scope.row.COURSE_ABSTRACT }}</p>
      
      </template>
    </el-table-column> 
    <el-table-column
      label="地区"
     >
      <template scope="scope">
      
          <p> {{ scope.row.AREA_NAME }}</p>
      
      </template>
    </el-table-column>
     
   
     <el-table-column label="课程详情">
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
                form: {
                    COURSEID: '',
                    cid:'',
                    price:'',
                    introduciton: '',
                    categroy_id:'',
                    avatar:''
                },
          choice:"1",
                alldata:[],
        tableData: [],
          options: [],
          cates:[],
          progress:0,
    is_progress_show:false,
    activeIndex:"1",
     count:0,
        pages:0
            }
        },
        methods: { page(val){
  val=val-1;
       this.pages = val
       this.init(this.choice,val)

       }, 

   
     
         handleDetails(index,row){
          var scope=this;
          if(scope.choice=="0"){
          this.$router.push({path:"/approvedetail",query:{Cid:row.COURSE_ID,Aid:row.ID}})
         }
     else  this.$router.push({path:"/coursedetail",query:{id:row.COURSE_ID}})
       },
         handleSelect(key,keyPath){

    
 var scope=this;
scope.choice=key;    
     this.init(key,0);
  
      
      },
init(key,val){  
  var scope=this;
  
  scope.options=[] ; 
      A.ajax({
            url:scope.$urlbase+'/course/approve/'+localStorage.getItem('area')+'/'+key,
            type:'GET',
          
            success:function(e){
              if(e!=null)
           scope.count=e.length;
         else scope.count=0;
           e=e.slice(val*5,val*5+5);
               scope.options=e;
          
           
                           
          } 
        })}
         
        },
        mounted(){
       var scope=this;
    this.init(scope.activeIndex,0);
  
      
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