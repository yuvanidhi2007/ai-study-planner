from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/focus")
def focus():
    return render_template("focus.html")

@app.route("/dag")
def dag():
    return render_template("dag.html")

@app.route("/planner")
def planner():
    return render_template("planner.html")

@app.route("/analytics")
def analytics():
    return render_template("analytics.html")


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0", port=port)
