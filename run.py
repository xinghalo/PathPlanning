from flask import Flask
from flask import render_template
from flask import make_response
from flask import request
from flask import jsonify
import json
from planning import astar
from utils import parameter_utils
import numpy

app = Flask(__name__)

@app.route("/demo1")
def hello():
    """
    首页
    :return:
    """
    return render_template('demo1.html')

@app.route("/demo2")
def demo2():
    """
    首页
    :return:
    """
    return render_template('demo2.html')

@app.route("/find/path", methods = ['Post'])
def find_path():
    """
    调取对应的算法查询路径
    :return:
    """
    params = json.loads(request.data.decode("utf-8"))
    print(params)

    type = params['type']
    start = parameter_utils.str2tuple(params['start'])
    goal = parameter_utils.str2tuple(params['goal'])

    result = {"data":[]}

    if type == 'a*':
        result['data'] = astar.astar(numpy.array(params['map']), start, goal)

    return make_response(jsonify(result))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)