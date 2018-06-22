module.exports = {
  proxyList: {
    '/users':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/users': '/users'
        }
    },
    '/student/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/student/': '/student/'
        }
    },
    '/area/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/area/': '/area/'
        }
    },
    '/teacher_course/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/teacher_course/': '/teacher_course/'
        }
    },
      '/course_approve/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/course_approve/': '/course_approve/'
        }
    },
      '/trade_detail/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/trade_detail/': '/trade_detail/'
        }
    },
    '/course_category/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/course_category/': '/course_category/'
        }
    },
    '/course_rank/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/course_rank/': '/course_rank/'
        }
    },
    '/classs/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/classs/': '/classs/'
        }
    },
     '/course/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/course/': '/course/'
        }
    },
     '/attendance/':{
        target: 'http://127.0.0.1:8088/v1',
        pathRewrite: {
          '^/attendance/': '/attendance/'
        }
    },
     '/orderes':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/orderes': '/orderes'
        }
    },
     '/canteens':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/canteen': '/canteen'
        }
    },
     '/dishes':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/dishes': '/dishes'
        }
    },
     '/comments':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/comments': '/comments'
        }
    },
    '/replies':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/replies': '/replies'
        }
    },
    '/counts':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/counts': '/counts'
        }
    },
    '/categroys':{
        target: 'http://106.14.167.106/web/index.php',
        pathRewrite: {
          '^/categroys': '/categroys'
        }
    }

  }
}