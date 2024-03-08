


from flask import Flask, render_template
from dependencies.Homepage import homepage
from dependencies.Post import post
from dependencies.Postdetail import PostDetail
from flask_cors import CORS

from logging.config import dictConfig

dictConfig({
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {  # 日志输出样式
            "default": {
                "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": "DEBUG",
                "formatter": "default",
            },
            "log_file": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "INFO",
                "formatter": "default",
                "filename": "./logs/flask.log",  # 指定log文件目录
                "maxBytes": 20*1024*1024,   # 文件最大20M
                "backupCount": 10,          # 最多10个文件
                "encoding": "utf8",
            },

        },
        "root": {
            "level": "DEBUG",  # # handler中的level会覆盖掉这里的level
            "handlers": ["console", "log_file"],
        },
    }
)

app = Flask(__name__, static_folder='dist',template_folder='dist',  static_url_path="/")
CORS(app, supports_credentials=True)


app.register_blueprint(homepage)
app.register_blueprint(post)
app.register_blueprint(PostDetail)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
