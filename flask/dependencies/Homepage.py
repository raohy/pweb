

from flask import Blueprint,send_file
from flask import request


homepage=Blueprint("homepage",__name__,url_prefix="/home")

# @bp.route("/homepage", methods=['get'])
# def homepage():
#     file_path = 'example.md'
#     return send_file(file_path, as_attachment=True)
#
#
# @bp.route("/about", methods=['get'])
# def about():
#     return jsonify({'status': 'ok', 'info': 'test'})
#
#
#
# @bp.route("/contact", methods=['get'])
# def contact():
#     return jsonify({'status': 'ok', 'info': 'test'})
#

@homepage.route("/<type>", methods=['get'])
def contact(type):
    path='home/'
    print(path+type+'.md')
    return send_file(path+type+'.md', mimetype='text/markdown')