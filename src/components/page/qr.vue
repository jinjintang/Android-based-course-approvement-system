<template>
  <div class="con">
   
     
      
    
        <div >
          <el-tabs type="border-card">
            <el-tab-pane label="扫码签到">

              <el-select v-model="listVaule" placeholder="请选择" @change="select">
                <el-option label="请选择课程" value="请选择课程"></el-option>
                <el-option v-for="item in list" :key="item.Id" :label="item.CLASSNAME" :value="item.Id">
                </el-option>
              </el-select>
              <div class="qr_img" v-show="showqr">
                <svg id="svg" width="300" height="300">
                  <g id="qrcode" ref="qrcode" />
                </svg>
              </div>
             <!--  <el-button type="primary" @click="zoom(1.1)">放大</el-button>
              <el-button type="primary" @click="zoom(0.9)">缩小</el-button> -->
            </el-tab-pane>
            <el-tab-pane label="出勤记录">
              <el-button type="primary" @click="queryRecord">查询</el-button>
              <div style="margin-top:10px">
                <el-table :data="recordArr" height="200" border style="width: 100%">
                  <el-table-column prop="USERNAME" label="姓名" width="80">
                  </el-table-column>
                 
                  <el-table-column prop="SAOCODETIME" label="考勤时间" width="230">
                  </el-table-column>
                
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
     
  
 
  </div>
</template>

<script>
import QRCode from '../common/js/qrcode'
import * as A from "../../../static/lib/ajax.js"

export default {
  data() {
    return {
      name: '',
      tid: '',
      classid: '',
      list: [],
      listVaule: '请选择课程',
      qrURL: `http://mzl0101.com`,
      qrcode:"",
      showqr:true,
      scale: 1,
  
      value: '',
      recordArr: []
    }
  },
  

  methods: {
    classinfo() {
    
      var scope=this;
      A.ajax({
            url:'http://127.0.0.1:8088/v1/classs/?'+'query=TEACHERID:'+scope.tid+',CLASSSSTATE:0',
            type:'GET',
          
            success:function(e){
            console.log(e);
            e.forEach(function(item){

             scope.list.push(item);

            })
                              
          } 
      }) 
  

    },

    // 创建二维码图片
    createQr(did) {
      this.showqr=true
      this.qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 100,
        height: 100,
        useSVG: true
      })
    
    
      this.qrcode.makeCode('CLASSID=' + did + '&time=' + new Date())
    },
    // 放大或者缩小
    zoom(num) {
      var svg = document.getElementById('svg')
      this.scale = this.scale * num
      if (this.scale < 0.5 || this.scale > 1.1) {
        return
      } else {
        svg.setAttribute('transform', 'scale(' + this.scale + ')')
      }
    },
    // 考勤记录查询
    queryRecord() {
     
       var scope=this;
      A.ajax({
            url:'http://127.0.0.1:8088/v1/attendance/?'+'query=CLASSID:'+this.listVaule,
            type:'GET',
          
            success:function(e){
            console.log(e);
            e.forEach(function(item){
              item.SAOCODETIME=item.SAOCODETIME.replace('T',' ')
 item.SAOCODETIME=item.SAOCODETIME.slice(0,item.SAOCODETIME.indexOf('+'))
             scope.recordArr.push(item);

            })
                              
          } 
      }) 

    
    },
    // select
    select() {


      const did = this.listVaule
      if (did!="请选择课程") this.createQr(did)
        else this.showqr=false
      
      
    },
 
  },
  mounted() {
  },
  created() {
    
    this.tid = localStorage.getItem('token')
    this.classinfo() ;
  },
  components: {
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
.con{
  margin-bottom :20px
}
.teacher_con{
  width :960px;
  margin :0 auto;
  padding :40px 0px;
}
.select,.qr_img {
  margin-top: 20px;
}
#svg{
  margin-left :20px
  margin-bottom : 20px
}
</style>
