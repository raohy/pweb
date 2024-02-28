


from flask import Blueprint,jsonify
import os
import fnmatch
from flask import request

PostDetail=Blueprint("post_detail",__name__,url_prefix="/list")

# 靠路径解析archive列表
#传出去的路径不带 ./post前缀， 不带.md后缀

@PostDetail.route("/category", methods=['GET'])
def category():
    root_path='./post'
    folders=[]
    dir_count=len(os.listdir(root_path))
    file_count = 0
    for item in os.listdir(root_path):
        item_path=os.path.join(root_path,item)
        if os.path.isdir(item_path):
            temp_count=0
            for root, dirs, file in os.walk(item_path):
                temp_count += len(fnmatch.filter(file, '*.md'))
                file_count += temp_count
                file_list=[]
                for file_ex in file:
                    with open(os.path.join(item_path,file_ex), 'r', encoding='utf-8') as file_example:
                        lines = file_example.readlines()  # Read all lines into a list
                        posted = lines[2].split(':')[1].strip()  # Get the second line (index 1) and strip whitespace
                    file_list.append({'title': file_ex,'posted_time':posted})
                folders.append({'title': item, 'type': 'dir', 'path': item_path, 'files_n': temp_count, 'files': file_list})
        # elif item.endswith(".md"):
        #     files.append({'title': item[:-3], 'type': 'file', 'path':  item_path[:-3]})
    return jsonify({'status': '200', 'folders': folders,'dir_count':dir_count,'file_count':file_count })

@PostDetail.route("/categoryo", methods=['GET'])
def categoryo():
    path = request.args.get('path', None)
    root_path=os.path.join('./post',path)
    folders=[]
    files=[]
    for item in os.listdir(root_path):
        item_path=os.path.join(root_path,item)
        if os.path.isdir(item_path):
            dir_count = 0
            file_count = 0
            for root, dirs, file in os.walk(item_path):
                dir_count += len(dirs)
                file_count += len(fnmatch.filter(file, '*.md'))
            folders.append({'title': item, 'type': 'dir', 'path': item_path,'folders_n':dir_count,'files_n':file_count})
        elif item.endswith(".md"):
            files.append({'title': item[:-3], 'type': 'file', 'path':  item_path[:-3]})
    return jsonify({'status': '200', 'folders': folders, 'files': files})

@PostDetail.route("/categoryf", methods=['GET'])
def categoryf():
    path = request.args.get('path', None)
    root_path='./post/'
    folders=[]
    files=[]

    # recursive
    def file_dps(path):
        for item in os.listdir(path):
            item_path=os.path.join(path,item)
            if os.path.isdir(path):
                children=[]
                for child in os.listdir(item_path):
                    file_dps(os.path.join(item_path,child))
                    children.append(child)
                folders.append({'title': item, 'type': 'dir', 'path': item_path, 'children': children})
            elif item.endswith(".md"):
                files.append({'title': item[:-3], 'type': 'file', 'path':  path+'/'+item[:-3],'children':None})

    file_dps(root_path)

    return jsonify({'status': '200', 'folers': folders,'files':files})

@PostDetail.route("/archive", methods=['get'])
def archive():
    #解析时间---寻找最近的文档，这个再做吧。。。。
    root_path = './post'
    items = dict()
    for item in os.listdir(root_path):
        item_path = os.path.join(root_path, item)
        if os.path.isdir(item_path):
            for root, dirs, files in os.walk(item_path):
                for file in files:
                    if file.endswith(".md"):
                        # temp=file.split('-')
                        title = file.split('.')[0]
                        file_path = os.path.join(item_path,file)

                        # Open the file and read the second line
                        with open(file_path, 'r', encoding='utf-8') as file_example:
                            lines = file_example.readlines()  # Read all lines into a list
                            posted = lines[2].split(':')[1].strip()  # Get the second line (index 1) and strip whitespace
                            updated = lines[3].split(':')[1].strip()
                            year = posted.split('-')[0]
                        if year in items:
                            items[year].append({'title': title, 'path': os.path.join(item_path,file), 'posted_time': posted,'updated_time':updated})
                        else:
                            items[year]=[{'title': title, 'path': os.path.join(item_path,file), 'posted_time': posted,'updated_time':updated}]
    for year in items:
        items[year].sort(key=lambda x: x["posted_time"], reverse=True)
    return items
    return jsonify({'status': '200', 'items': items})

# 搜索post

@PostDetail.route("/search", methods=['get'])
def search():
    return jsonify({'status': 'ok', 'info': 'test'})