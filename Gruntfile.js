var plugins = require("./plugin/plugins");
module.exports = function (grunt) {
    var zipjs,compileJsConfig,config;    
    config = {
        pkg: grunt.file.readJSON('package.json'),
        rely:['./flash','./fish','./skywar','./sound'],
        path: {script:"script/"},
        uglify: {// 压缩合并 JS 文件
            options: {
                report:'min',
                expand: true,
                mangle: true,
                preserveComments: 'false',
                beautify: {
                    ascii_only: true//中文ascii化,防止中文乱码
                },
                banner: '/** \n' +//生成注释
                        ' * -------------------------------------------------------------\n' +
                        ' * Copyright (c) 2014 baofeng, All rights reserved. \n' +
                        ' * http://www.baofeng.com/ \n' +
                        ' *  \n' +
                        ' * @version: <%= pkg.version%> \n' +
                        ' * @author: <%= pkg.author%> \n' +
                        ' * @description: <%= pkg.description%> \n' +
                        ' * @date: <%=grunt.template.today("yyyy-mm-dd  HH:MM:ss")%>\n' +
                        ' * ------------------------------------------------------------- \n' +
                        ' */ \n\n'
            }
        }
    };
    zipjs = {//压缩配置
        index : {
            namespace : "fish",
            rely:"./fish",
            minname : config.path.script+'fish.min.js'
        },
        skywar : {
            namespace : "skywar",
            rely:"./skywar",
            minname : config.path.script+'skywar.min.js'
        },
        sound : {
            namespace : "playsound",
            rely:"./sound",
            minname : config.path.script+'sound.min.js'
        }      
    };
    compileJsConfig = function (config) {
        var json,data;
        plugins.deps(config.rely);
        for(var key in zipjs){
            data = zipjs[key];
            data.dstname = plugins.init(data.namespace,data.rely);
        }        
        for (var key in zipjs) {//需要压缩的代码
            json = {}
            json[zipjs[key].minname] = zipjs[key].dstname;
            config.uglify[key] = {files:json};
            console.log(json);
        }
        return config;
    };    
    grunt.initConfig(compileJsConfig(config));
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.task.registerTask('deps','',function(){
        plugins.deps(config.rely);
    }); 
    grunt.task.registerTask('min','',function(){
        for(var key in zipjs){
            plugins.min(zipjs[key].minname);
        }  
    });     
    grunt.registerTask('build', ['uglify','min']);
};
