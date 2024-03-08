

from flask import Blueprint,send_file
from flask import request

post=Blueprint("post",__name__,url_prefix="/post")
# 发送的文件名称 不加 文件名和/post前缀
@post.route("/<path:name>", methods=['get'])
def send_post(name):
    path='./post/'
    name.replace( '/', '\\');
    print(path+name)
    return send_file(path+name, mimetype='text/markdown')