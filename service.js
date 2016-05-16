"use strict";
/**
 *
 * 2015.10.31 07:53
 * 实验使用node5创建http请求
 *
 **/
var fs = require('fs');
var os = require('os');
var url = require('url');
var http = require('http');
var zlib = require("zlib");
var path = require('path');
var cluster = require('cluster');
var httpserver, port = 80,
	reqs = 0,
	pids = {};
const mimemap = {
	"css": "text/css",
	"gif": "image/gif",
	"html": "text/html;charset=utf-8",
	"ico": "image/x-icon",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"js": "application/x-javascript;charset=utf-8",
	"json": "application/json;charset=utf-8",
	"pdf": "application/pdf",
	"png": "image/png",
	"svg": "image/svg+xml",
	"swf": "application/x-shockwave-flash",
	"tiff": "image/tiff",
	"txt": "text/plain",
	"wav": "audio/x-wav",
	"mp3": "audio/mpeg ",
	"mp4": "video/mp4",
	"ogg": "application/ogg",
	"m4a": "audio/x-m4a",
	"mp4": "video/mp4",
	"wma": "audio/x-ms-wma",
	"wmv": "video/x-ms-wmv",
	"xml": "text/xml",
	"flv": "flv-application/octet-stream",
	"appcache": "text/cache-manifest",
	"manifest": "text/cache-manifest"
};
const titles = [new Buffer("请求参数不全!"), new Buffer("请求文件不存在!"), new Buffer("文件损坏!")];
const iszip = /^(htm|html|js|css)$/ig;
const rulemap = {
	"static.hd.baofeng.com": /\_(.[\d_]+?)\./ig
};
const defmap = {
	"/": "/index.html"
}
const routing = {
	"/index": function(request, response) {
		let buf, body = url.parse(request.url, true),
			query = body.query;
		if (query["log"] == "pid") {
			let json = {
				worker: cluster.worker.id,
				pid: process.pid,
				pids: pids
			}
			buf = new Buffer(JSON.stringify(json));
		} else {
			buf = new Buffer("对不起不存在此人!");
		}
		response.writeHead(200, {
			'Content-Length': buf.length,
			'Content-Type': 'text/plain;charset=utf-8'
		});
		response.write(buf);
		response.end();
	}
}
const islog = true;

function getip() {
	let list, hostname = os.hostname(),
		network = os.networkInterfaces();
	for (let key in network) {
		list = network[key];
		for (let i = 0, len = list.length; i < len; i++) {
			if (list[i].family == "IPv4") {
				return list[i].address;
			}
		}
	}
	return "127.0.0.1";
}

function rulefile(url, host) {
	if (url.indexOf(".js") != -1 || url.indexOf(".css") != -1) {
		return url.replace(rulemap[host], ".");
	}
	return url;
}

function httpsuccess(filepath, request, response) {
	fs.stat(filepath, function(err, stats) {
		let head, zlibs, encoding, extname, contenttype;
		if (err) {
			httpfail(titles[2], response);
			return;
		}
		extname = path.extname(filepath).slice(1);
		contenttype = mimemap[extname] || "text/plain;charset=utf-8";
		encoding = request.headers['accept-encoding'] || "";
		islog && process.send({
			type: 'pids',
			data: process.pid
		});
		if (extname.match(iszip) && encoding) {
			if (encoding.match(/\bgzip\b/)) {
				zlibs = zlib.createGzip();
				head = {
					'content-encoding': 'gzip',
					'Content-Type': contenttype
				};
			} else if (encoding.match(/\bdeflate\b/)) {
				zlibs = zlib.createDeflate();
				head = {
					'content-encoding': 'deflate',
					'Content-Type': contenttype
				};
			}
		} else {
			response.writeHead(200, {
				'Content-Length': stats.size,
				'Content-Type': contenttype
			});
			fs.createReadStream(filepath).pipe(response);
			return;
		}
		response.writeHead(200, head);
		fs.createReadStream(filepath).pipe(zlibs).pipe(response);
	});
}

function httpfail(body, request, response) {
	response.writeHead(200, {
		'Content-Length': body.length,
		'Content-Type': 'text/plain;charset=utf-8'
	});
	response.write(body);
	response.end();
}
httpserver = http.createServer(function(request, response) {
	let host, body = url.parse(request.url, true),
		query = body.query,
		pathname = body.pathname;
	response.setHeader("Server", "Nxiao/V5");
	if (pathname in routing) {
		routing[pathname](request, response);
	} else {
		host = request.headers.host;
		if (host in rulemap) {
			pathname = rulefile(pathname, host);
		}
		if (pathname.slice(-1) === "/") {
			pathname = defmap["/"];
		}
		pathname = __dirname + pathname;
		fs.exists(pathname, function(exists) {
			if (exists) {
				httpsuccess(pathname, request, response);
				return;
			}
			httpfail(titles[1], request, response);
		});
	}
})
if (cluster.isMaster) {
	function messagenotice(msg) {
		switch (msg.type) {
			case 'count':
				reqs += 1;
				Object.keys(cluster.workers).forEach(function(id) {
					cluster.workers[id].send({
						type: 'sum',
						data: reqs
					});
				});
				break;
			case 'pids':
				let pid = msg.data;
				if (pid in pids) {
					pids[pid] += 1;
				} else {
					pids[pid] = 1;
				}
				Object.keys(cluster.workers).forEach(function(id) {
					cluster.workers[id].send({
						type: 'pids',
						data: pids
					});
				});
				break;
			default:
		}
	}
	let cpus = os.cpus().length;
	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}
	cluster.on('exit', function(worker, code, signal) {
		console.log('[master] ' + 'exit worker' + worker.id + ' died');
	});
	Object.keys(cluster.workers).forEach(function(id) {
		cluster.workers[id].on('message', messagenotice);
	});
} else {
	function main(argv) {
		if (argv.length == 1) {
			port = argv[0];
		}
		httpserver.on('error', function(error) {
			if (error.code == 'EADDRINUSE') {
				console.log('服务端口被占用');
			}
		});
		console.log(getip(), '--', process.pid);
		httpserver.listen(port);
	}
	/**
	 * 退出输出日志
	 **/
	process.on('exit', function(error) {
		console.log("服务器退出");
	});
	/**
	 * 监听异常退出输出日志
	 **/
	process.on('uncaughtException', function(error) {
		console.log(error.toString());
	});
	process.on('message', function(msg) {
		switch (msg.type) {
			case 'sum':
				reqs = msg.data;
				break;
			case 'pids':
				pids = msg.data;
				break;
			default:
		}
	});
	main(process.argv.slice(2));
}