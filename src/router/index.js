import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                
                               
                {
                    path: '/coursedetail',
                    component: resolve => require(['../components/page/coursedetail.vue'], resolve)   // vue-schart组件
                },    
              
                
                
                {
                    path: '/approvedetail',
                    component: resolve => require(['../components/page/approvedetail.vue'], resolve)   // vue-schart组件
                },   {
                    path: '/classdetail',
                    component: resolve => require(['../components/page/classdetail.vue'], resolve)   // vue-schart组件
                },                 
                {
                    path: '/editdetail',
                    component: resolve => require(['../components/page/editdetail.vue'], resolve)   // vue-schart组件
                },
              
                {
                    path: '/course',
                    component: resolve => require(['../components/page/course.vue'], resolve)    // 菜单列表组件
                },{
                    path: '/register',
                    component: resolve => require(['../components/page/register.vue'], resolve)    // 菜单列表组件
                },{
                    path: '/classes',
                    component: resolve => require(['../components/page/classes.vue'], resolve)    // 菜单列表组件
                },{
                    path: '/area',
                    component: resolve => require(['../components/page/area.vue'], resolve)    // 菜单列表组件
                },{
                    path: '/approve',
                    component: resolve => require(['../components/page/approve.vue'], resolve)    // 菜单列表组件
                },
                
               
               
              
                {
                    path: '/registerdetail',
                    component: resolve => require(['../components/page/registerdetail.vue'], resolve)    // 订单列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {

            path: '/teacher',
            component: resolve => require(['../components/common/Teacher.vue'], resolve),
            children:[{
            path: '/teacher',
            component: resolve => require(['../components/page/qr.vue'], resolve) }
            ]  // vue-schart组件
        }, 
    ]
})
