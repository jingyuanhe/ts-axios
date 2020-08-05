const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const app =new express();
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler,{
    publicPath: '/__build__',
    stats: {
        colors: true,
        chunks: false
    }
}))
app.use(WebpackHotMiddleware(compiler));
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const router = express.Router();
router.get('/simple/get',function(req,res){
    res.json({
        msg:'hello world'
    })
})
app.use(router);
const port = process.env.port || 8080;
module.exports = app.listen(port,()=>{
    console.log(`server listening on http://localhost:${port}`)
})