


from flask import Flask, render_template
from dependencies.Homepage import homepage
from dependencies.Post import post
from dependencies.Postdetail import PostDetail
from flask_cors import CORS


app = Flask(__name__, static_folder='dist', template_folder='dist', static_url_path="/")
CORS(app, supports_credentials=True)


app.register_blueprint(homepage)
app.register_blueprint(post)
app.register_blueprint(PostDetail)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
