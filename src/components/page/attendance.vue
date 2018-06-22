<template>
  <div 
  
    <el-button type="primary" @click="qd">课堂签到</el-button>
    
  </div>
</template>

<script>
import { GetQueryString } from '../common/js/getUrlParam'
import * as A from "../../../static/lib/ajax.js"
export default {
  data() {
    return {
      CLASSID: '',
      USERID: '',
      USERNAME:'',
    }
  },
  mounted() {
    
    localStorage.setItem('token', '18020112020001')
    this.USERID= localStorage.getItem('token')
    this.USERNAME localStorage.getItem('name')

  },
  methods: {
    qd() {
      
      var date = new Date()
      let qstarttime = GetQueryString('time')
   
      if (qstarttime != null && qstarttime.toString().length > 1) {

       var d1=new Date(qstarttime)    
       var t=parseInt((date-d1)/1000/60)
       if(t>130){this.$message.error('签到失败')}
       else{
     var scope=this;
      A.ajax({
            url:'http://127.0.0.1:8088/v1/attendance/?'+'query=USERID:'+scope.USERID+',CLASSSSTATE:0',
            type:'GET',
          
            success:function(e){
            console.log(e);
            e.forEach(function(item){

             scope.list.push(item);

            })
                              
          } 
      }) 




      }


     }
       else{
       this.$message.error('签到失败')

        }
    
    },
  },
  components: {

  }
}
</script>


<style>

.student_con{
  width :960px;
  height :220px;
  margin :0 auto;
  padding :20px 0px;
}
</style>
