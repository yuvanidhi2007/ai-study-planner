from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/dag")
def dag():
    return render_template("dag.html")

@app.route("/focus")
def focus():
    return render_template("focus.html")

if __name__ == "__main__":
    app.run(debug=True)
