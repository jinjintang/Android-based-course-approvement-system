<template>
    <div>
        
       
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 报名</el-breadcrumb-item>
                <el-breadcrumb-item>报名列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<el-table
    :data="cates"
    border
    style="width: 100%">
  

     <el-table-column
      label="课程名称"
     >
      <template slot-scope="scope">
      
          <p> {{ scope.row.COURSE_NAME }}</p>
      
      </template>
    </el-table-column> 
    <el-table-column
      label="上课时间"
     >
      <template slot-scope="scope">
      
          <p> {{ scope.row.COURSE_ABSTRACT }}</p>
      
      </template>
    </el-table-column>
   
     <el-table-column
      label="待开班人数"
     >
      <template slot-scope="scope">
      
          <p> {{ scope.row.NUM }}</p>
      
      </template>
    </el-table-column>  
    <el-table-column
      label="总报名人数"
     >
      <template slot-scope="scope">
      
          <p> {{ scope.row.NUM2 }}</p>
      
      </template>
    </el-table-column> 
    <el-table-column
      label="开班人数"
     >
      <template slot-scope="scope">
      
          <p> {{ scope.row.OPENNUMBER}}</p>
      
      </template>
    </el-table-column>   
   
     
  
   
    
   
     <el-table-column label="报名详情">
      <template slot-scope="scope">
        <el-button
          size="small"
          @click="handleDetails(scope.$index, scope.row)">详情</el-button>
       
      </template>
    </el-table-column>
    <el-table-column label="发送消息">
      <template slot-scope="scope">
       
            <el-button type="success" plain @click="check_num2(scope.row)">发送消息</el-button>
       
      </template>
    </el-table-column>
     <el-table-column label="成班">
      <template slot-scope="scope">
       
            <el-button type="success" plain @click="check_num(scope.row)">成班</el-button>
       
      </template>
    </el-table-column>
     <el-table-column
      label="通知"
     >
      <template slot-scope="scope">
      
          <p v-if="scope.row.MESSAGE==null"> 无</p> 
          <p v-else> {{scope.row.MESSAGE}}</p>
      
      </template>
    </el-table-column>


  </el-table>
<el-dialog title="添加班级" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="班级名称">
                    <el-input v-model="form.CLASSNAME"></el-input>
                </el-form-item>
                <el-form-item label="上课地点">
                    <el-input v-model="form.CLASSADDRESS"></el-input>
                </el-form-item>
                
                 <el-form-item label="开课时间">
                    <el-input v-model="form.CLASSTIME"></el-input>
                </el-form-item>
                 <el-form-item label="课程次数">
                    <el-input v-model="form.CLASSCISHU"></el-input>
                </el-form-item>
                  <el-form-item label="班长">
                     <el-select v-model="form.CLASSMONITOR" placeholder="请选择">
                        <el-option
                          v-for="item in students"
                          :key="item.USER_NAME"
                          :label="item.USER_NAME"
                          :value="item.USER_NAME">
                        </el-option>
                    </el-select>
                </el-form-item>
             <el-form-item label="老师">
                     <el-select v-model="form.TEACHERID" placeholder="请选择">
                        <el-option
                          v-for="item in teachs"
                          :key="item.TEACHERID"
                          :label="item.TEACHERNAME"
                          :value="item.TEACHERID">
                        </el-option>
                    </el-select>
                </el-form-item>
            
        
              <el-form-item>
                    <el-button type="primary" @click="onput(form)">提交</el-button>
                    <el-button @click="onclose(form)">取消</el-button>
                </el-form-item>
            </el-form>
  
</el-dialog>
<el-dialog title="编辑消息" :visible.sync="dialogFormVisible2">
            <el-form ref="form2" :model="form2" label-width="80px">
                <el-form-item label="消息内容">
                    <el-input 
                    type="textarea"

                    v-model="form2.MESSAGE"></el-input>
                </el-form-item>
                
                </el-form-item>
            
        
              <el-form-item>
                    <el-button type="primary" @click="onput2(form2)">提交</el-button>
                    <el-button @click="onclose2(form2)">取消</el-button>
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
              areaid:'',
                form: {
                    CLASSADDRESS:'',
  

  CLASSNAME:'',
  CLASSNUMBER: 0,
  CLASSSSTATE: 0,
  CLASSTIME:'',
CLASSCISHU:8,
TEACHERID:'',
CLASSMONITOR:'',
AREAID:'',
                },  
                form2: {
                    MESSAGE:'',
  

 DETAILID:'',
  READ: 0,
 TONGYI: 0,
 USERID:'',

                },
                courseid:'',
                num:0,
                classid:'',
                  tableData: [],
                  students:[],
                  options: [],
                  cates:[],
                  teachs:[],
                  progress:0,
                  dialogFormVisible:false,
                     dialogFormVisible2:false,
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

          handleDetails(index,row){
            console.log("ddddddddd",row)
           this.$router.push({path:"/registerdetail",query:{id:row.COURSE_ID,num:row.OPENNUMBER}})
         },
   
    check_num2(r){
          if(Number(r.NUM)<Number(r.OPENNUMBER)){

            this.$message.warning("待开班人数不足开班人数")
          }
          else{
            this.courseid=r.COURSE_ID,
            this.num=r.OPENNUMBER,
             this.dialogFormVisible2=true;
             this.form.CLASSNUMBER=r.OPENNUMBER;
             var scope=this;

  A.ajax({
            url:scope.$urlbase+'/trade_detail/registerdetail/'+r.COURSE_ID,
            type:'GET',
          
            success:function(e){
            console.log(e);
            

            scope.students=e.slice(0,r.OPENNUMBER);

                                
          } 
      })  
  
          }

         },
          
      check_num(r){
          if(Number(r.NUM)<Number(r.OPENNUMBER)){

            this.$message.warning("待开班人数不足开班人数")
          }
          else{
            this.courseid=r.COURSE_ID,
            this.num=r.OPENNUMBER,
             this.dialogFormVisible=true;
             this.form.CLASSNUMBER=r.OPENNUMBER;
             var scope=this;
 A.ajax({
            url:scope.$urlbase+'/teacher_course/course/'+r.COURSE_ID,
            type:'GET',
          
            success:function(e){
             console.log(e);
           
  if(e!=null)
              scope.teachs=e;
            else scope.teachs.push({TEACHERID:"18",TEACHERNAME:'幻空'})

             
                           
          } 
        })
  A.ajax({
            url:scope.$urlbase+'/trade_detail/registerdetail/'+r.COURSE_ID,
            type:'GET',
          
            success:function(e){
            console.log(e);
            

            scope.students=e.slice(0,r.OPENNUMBER);

                                
          } 
      })  
  
          }

         },
         onclose(form ){
  
     this.form= {
                
                     CLASSADDRESS:'',
  

  CLASSNAME:'',

  CLASSSSTATE: 0,
  CLASSTIME:'',
CLASSCISHU:8,
TEACHERID:'',
CLASSMONITOR:''      
                }
           
        this.dialogFormVisible=false;

         },   
          onclose2(form ){
  
     this.form2= {
                
                     DETAILID:'',
  

  MEASSAGE:'',

  TONGYI: 0,
 READ:0,
    
                }
           
        this.dialogFormVisible2=false;

         },   
          addclass(id){
            var scope=this
        A.ajax({
            url:scope.$urlbase+'/trade_detail/cheng/'+id+'/'+scope.classid,
            type:'put'
            
           })
           




          },
  addtrade(id,userid){
            var scope=this

            scope.form2.DETAILID=id
            scope.form2.USERID=userid
        A.ajax({
            url:scope.$urlbase+'/trade/',
            type:'post',
            data:scope.form2
           })
           




          },



          onput(f) {var scope=this;
            console.log(scope.form.TEACHERID)
           if (scope.form.CLASSNAME&&　scope.form.CLASSADDRESS&&scope.form.CLASSTIME) {
          scope.form.TEACHERID=scope.form.TEACHERID
     scope.form.AREAID=localStorage.getItem('area')
     scope.form.AREANAME=localStorage.getItem('areaname')
     if(scope.teachs!=null)
      scope.form.TEACHERNAME=scope.teachs.filter(item =>item.TEACHERID== scope.form.TEACHERID)[0].TEACHERNAME
     scope.form.CLASSNUMBER=Number(scope.num),
           A.ajax({
            url:scope.$urlbase+'/classs/',
            type:'post',
            
            data:scope.form,
            fn:function(e){
           scope.classid=e;
        
           scope.students.forEach(function(e){  
    scope.addclass(e.DETAIL_ID) 
})  
        scope.init(0)
              scope. dialogFormVisible=false;

          } 
      })     

                           
      }else{

        scope.$notify({
          title: '警告',
          message: '信息填写不能为空',
          type: 'warning'
             });   
            return false;
        
      }
      },  
      onput2(f) {var scope=this;
           if (scope.form2.MESSAGE) {
            A.ajax({
            url:scope.$urlbase+'/course/message/'+scope.courseid,
            type:'put',
            
            data:{MESSAGE:scope.form2.MESSAGE},
            fn:function(e){
             scope.students.forEach(function(e){  
    scope.addtrade(e.DETAIL_ID,e.USER_ID) })
     scope.init(0)
              scope. dialogFormVisible2=false;
           }})

                           
      }else{

        scope.$notify({
          title: '警告',
          message: '信息填写不能为空',
          type: 'warning'
             });   
            return false;
        
      }
      },
      deal(){

 var scope=this;
    
       A.ajax({
            url:scope.$urlbase+'/trade_detail/register/',
            type:'GET',
          
            success:function(e){
             console.log(e);
           
  
              scope.cates=e;

             
                           
          } 
        })

      },
  init(val){
       var scope=this;
    
       A.ajax({
           
            type:'GET',
          
            success:function(e){
            
           e=e.filter(item=>item!=null)
          var e1=e.slice(val*5,val*5+5)
           console.log("ddfag",e1);
                        scope.cates=e1;

             
                           
          } 
        })
         A.ajax({
            url:scope.$urlbase+'/trade_detail/register/num/'+scope.areaid,
            type:'GET',
          
            success:function(e){
             console.log(e);
           
  
              scope.count=e;

             
                           
          } 
        })},
    
        },
        mounted(){
        this.areaid=localStorage.getItem('area');
       // var p=this.$router.param.page
     this.init(0);
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