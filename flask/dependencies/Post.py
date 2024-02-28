

from flask import Blueprint,send_file
from flask import request

post=Blueprint("post",__name__,url_prefix="/post")
# 发送的文件名称 不加 文件名和/post前缀
@post.route("/<name>", methods=['get'])
def send_post(name):
    path='./post/'
    name=name.replace('%^','/')
    print(path+name+'.md')
    return send_file(path+name+'.md', mimetype='text/markdown')