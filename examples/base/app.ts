import axios from '../../src/index';
// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: ['foo']
//     }
// })
axios({
    method: 'post',
    url:'/base/post',
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json,text/plain, */*'
    },
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res)
})
axios({
    method: 'post',
    url:'/base/post',
    data:{
        a:1,
        b:2
    },
    responseType:'json'
}).then(res=>{
    console.log(res)
})
const arr = new Int32Array([21,32])
axios({
    method: 'post',
    url: '/base/buffer',
    data: arr
})