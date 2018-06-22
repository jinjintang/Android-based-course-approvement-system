<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    
                    
                    
                  
                     {
                        icon: 'el-icon-star-on',
                        index: '/area',
                        title: '区域管理'
                    },  
                    
                   
                     {
                        icon: 'el-icon-star-on',
                        index: '/register',
                        title: '报名管理'
                    },
                   
                    
                     {
                        icon: 'el-icon-star-on',
                        index: '/classes',
                        title: '班级管理'
                    },
                    
                   
                    {
                        icon: 'el-icon-upload2',
                        index: '/course',
                        title: '课程编辑'
                    },
                     {
                        icon: 'el-icon-upload2',
                        index: '/approve',
                        title: '课程审批'
                    },
                  
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
