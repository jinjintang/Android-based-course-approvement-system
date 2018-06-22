<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>课程</el-breadcrumb-item>
                <el-breadcrumb-item>编辑课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程名称">
                    <el-input v-model="form.COURSENAME"></el-input>
                </el-form-item>
              <el-form-item label="课程图片">
                  <img :src="this.$imgbase+form.COURSECOVER" style="width:500px" v-if="form.COURSECOVER!=''"/>
                   <label for="upload22" ><p class="upload-style">点击上传</p></label>
                  <input type="file" id="upload22" hidden="true" v-on:change="uploadFile($event)" >
                   <el-progress :percentage="progress" v-show="is_progress_show" ></el-progress>
                   <div slot="tip" class="el-upload__tip"></div>
              </el-form-item>
               <el-form-item label="课程价格">
                    <el-input v-model="form.COURSEPRICE"  type="number" ></el-input>
                </el-form-item>
               <el-form-item label="课程等级">
                     <el-select v-model="form.RANKNAME" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.RANKNAME"
                          :label="item.RANKNAME"
                          :value="item.RANKNAME">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开班人数">
                    <el-input v-model="form.OPENNUMBER"></el-input>
                </el-form-item>
                <el-form-item label="开班时间">
                    <el-input v-model="form.COURSEABSTRACT"></el-input>
                </el-form-item>
                 <el-form-item label="所属分类">
                     <el-select v-model="form.CATEGORYNAME" placeholder="请选择">
                        <el-option
                          v-for="item in cates"
                          :key="item.CATEGORYNAME"
                          :label="item.CATEGORYNAME"
                          :value="item.CATEGORYNAME">
                        </el-option>
                    </el-select>
                </el-form-item>   
                <el-form-item label="课程备注">
                    <el-input type="textarea" v-model="form.COURSEREMARK"></el-input>
                </el-form-item>                 
                <el-form-item label="课程内容" class="spciece">
                   <!--  <el-input type="textarea" v-model="form.introduciton "></el-input> -->
                   <quill-editor v-model="form.COURSECONTENT"></quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(1)">提交</el-button>
                    
                    <el-button @click="onSubmit(0)">保存</el-button>
                    <el-button @click="close">清空</el-button>

                </el-form-item>
            </el-form>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item>课程列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="0">草稿</el-menu-item>
  <el-menu-item index="1">待审批</el-menu-item>
 
  <el-menu-item index="2" >分部已审批</el-menu-item> 
  <el-menu-item index="3" >总部已审批</el-menu-item>
  <el-menu-item index="4">未通过</a></el-menu-item>
</el-menu>
<div class="line">
  


</div>


        
       
       
<el-table
    :data="tableData"
    border
    style="width: 100%">
  
    <el-table-column
      label="课程名称"
     >
      <template scope="scope">
      
          <p> {{ scope.row.COURSENAME }}</p>
      
      </template>
    </el-table-column>

     <el-table-column
      label="成班人数"
     >
      <template scope="scope">
      
          <p> {{ scope.row.OPENNUMBER }}</p>
      
      </template>
    </el-table-column>
    <el-table-column
      label="上课时间"
     >
      <template scope="scope">
      
          <p> {{ scope.row.COURSEABSTRACT }}</p>
      
      </template>
    </el-table-column>
     
   
     <el-table-column label="课程详情">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleDetails(scope.$index, scope.row)" v-if="activeIndex!=0">详情</el-button> <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)" v-if="activeIndex==0">编辑</el-button>
          <el-button
          size="small"
          @click="handleDelete(scope.$index, scope.row)" v-if="activeIndex==0">删除</el-button>
       
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
              imgurl:'',
                form: {

                  COURSENAME:'',
     COURSECOVER:'',
COURSEABSTRACT:'',

COURSEPRICE:0,
COURSECONTENT:'',
COURSEREMARK:'',
OPENNUMBER:10,

STATE:0,
RELEASEUSERID:localStorage.getItem('token'),
RELEASENAME:'',
RELEASEOPENID:'',


AREAID:localStorage.getItem('area'),
AREANAME:localStorage.getItem('areaname'),
CATEGORYID:'',
CATEGORYNAME:'',
RANKID:'',
RANKNAME:'',
FCHECKUSERID:'',
FCHECKUSERNAME:'',
FCHECKOPENID:'',
ZCHECKUSERNAME:'',
ZCHECKOPENID:'',






                },
                price:'',
                num:'',
        tableData: [],
        alldata:[],
          options: [],
          cates:[],
          progress:0,
          activeIndex:"1",
    is_progress_show:false,
     count:0,
        pages:0


            }
        },
        methods: { 
          page(val){
            var scope=this;
  val=val-1;
       this.pages = val
   this.tableData=this.alldata.slice(val*5,val*5+5);
//this.init(this.activeIndex,val)
console.log("dfda");
       },



          uploadFile(e){
          var scope=this;  
      scope.is_progress_show=true;
          var ele= e.target || e.srcElement;
          var file=ele.files[0];
               scope.progress=0;
          var formData=new FormData();

              formData.append('avatar',file);
              
              A.upFile({
                url:scope.$urlbase+"/course/upload/",
                    data:formData,
                    uploadState:function(e){
                      scope.progress=Math.floor((e.loaded/e.total)*100);
                           
                    },
                    success:function(e){
                            console.log(e);
                            e=e.replace('"','');               
                            e=e.replace('"','');               
                      scope.form. COURSECOVER=e;
                      scope.is_progress_show=false;     
                      scope.progress=0;
                      scope.$notify({
          title: '成功',
          message: '图片上传成功',
          type: 'success'
             });      
                    }

              })
        },  
     
    onSubmit(s) {
        var scope=this;
          if (scope.form.COURSENAME==='') {
               scope.$notify({
            title: '警告',
            message: '课程名称不能为空',
            type: 'warning'
             });    
             return false;
             }      
             var token=localStorage.getItem('token')
             scope.form.STATE=s;
            console.log(scope.price)
             scope.form.COURSEPRICE=parseFloat(scope.form.COURSEPRICE)
               scope.form.OPENNUMBER=parseInt(scope.form.OPENNUMBER);
               
               console.log(scope.form.OPENNUMBER)
               scope.form.RELEASEUSERID=token;
                scope.form.AREAID=localStorage.getItem('area');
              
                if(scope.form.hasOwnProperty("Id") ){
           A.ajax({

            url:scope.$urlbase+'/course/'+scope.form.Id,

            type:'put',
          
            data:scope.form,
            fn:function(e){
            console.log(e);
            scope.$message.success('提交成功！');
            //scope.tableData.unshift(e);
                 if(s==1){
               A.ajax({

            url:scope.$urlbase+'/course_approve/',

            type:'post',
          
            data:{COURSEID:scope.form.Id+'',APAREAID:localStorage.getItem('parent')},
            fn:function(e){
            console.log(e);
            scope.$message.success('提交成功！');}})
   




            }                 
          } 
      })  }
           else{
                A.ajax({

            url:scope.$urlbase+'/course/',

            type:'post',
          
            data:scope.form,
            fn:function(e){
            console.log(e);
            scope.$message.success('提交成功！');
            //scope.tableData.unshift(e);
            if(s==1){
               A.ajax({

            url:scope.$urlbase+'/course_approve/',

            type:'post',
          
            data:{COURSEID:e.Id+'',APAREAID:localStorage.getItem('parent')},
            fn:function(e){
            console.log(e);
            scope.$message.success('提交成功！');}})
   




            }
                                 
          } 
      })

           }
 this.init(scope.activeIndex,0)
               
            },
        close(){
          var scope=this;
     scope.form={ COURSENAME:'',
     COURSECOVER:'',
COURSEABSTRACT:'',

COURSEPRICE:0,
COURSECONTENT:'',
COURSEREMARK:'',
OPENNUMBER:10,

STATE:0,
RELEASEUSERID:'1b1cc3ea-fda4-47ed-b722-b9c3633ecd56',
RELEASENAME:'',
RELEASEOPENID:'',


AREAID:'',
AREANAME:'',
CATEGORYID:'',
CATEGORYNAME:'',
RANKID:'',
RANKNAME:'',
FCHECKUSERID:'',
FCHECKUSERNAME:'',
FCHECKOPENID:'',
ZCHECKUSERNAME:'',
ZCHECKOPENID:'',}


        },
          handleDetails(index,row){
            console.log("ddddddddd",row)
           this.$router.push({path:"/coursedetail",query:{id:row.Id}})
         },

        handleEdit(index, row) {
          var scope=this;
                 A.ajax({
     
            url:scope.$urlbase+'course/'+row.Id,
            type:'GET',
          
            success:function(e){
            
             scope.form=e;
    
      
          }
        
      }) 
                },
       handleDelete(index, row) {
             index++;
             var realIndex=index
       
            var scope=this;
                 A.ajax({
            url:scope.$urlbase+'/course/'+row.Id,
            type:'delete',
           
            fn:function(e){
           console.log("1111")
            scope.tableData.splice(realIndex,1);

          } 
      })  
          
          
          },
   
   handleSelect(key, keyPath) {
   var scope=this;
   scope.activeIndex=key;
   console.log("select");
 scope.init(key,0);
 
  //console.log(scope.tableData);
  // ……
  // 这时改为 switch 语句更好
},

        
    init(key,val){
      var scope=this;
  
       scope.tableData=[];
       var token= localStorage.getItem('token')
       A.ajax({
     
            url:scope.$urlbase+'/course/userid/'+token+'/'+key,
            type:'GET',
          
            success:function(e){
                 if(e){scope.count=e.length
                 scope.alldata=e;
                 var e1=e.slice(val*5,val*5+5)

                 console.log(e1)
             scope.tableData=e1;
          }
          
                              
          } 
      }) 
    }

        },
        mounted(){
          
       var scope=this;
       A.ajax({

           
            url:scope.$urlbase+'/course_category/',
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

           
            url:scope.$urlbase+'/course_rank/',
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
    this.init(scope.activeIndex,0)
       
    
      },
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