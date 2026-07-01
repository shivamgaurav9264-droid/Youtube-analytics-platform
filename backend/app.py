from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

df = pd.read_csv("youtube.csv")
model = joblib.load("youtube_views_model.pkl")


@app.route("/")
def home():
    return jsonify({"message": "Backend Running"})


# ---------------- Dashboard ----------------

@app.route("/dashboard")
def dashboard():
    return jsonify({
        "total_videos": int(len(df)),
        "total_views": int(df["views"].sum()),
        "total_likes": int(df["likes"].sum()),
        "total_comments": int(df["comment_count"].sum())
    })


# ---------------- Search ----------------

@app.route("/search")
def search():

    title = request.args.get("title", "")

    result = df[
        df["title"].str.contains(title, case=False, na=False)
    ][
        ["title", "channel_title", "views", "likes", "comment_count"]
    ].head(20)

    return jsonify(result.to_dict(orient="records"))


# ---------------- Prediction ----------------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    input_df = pd.DataFrame({
        "likes": [data["likes"]],
        "comment_count": [data["comment_count"]]
    })

    prediction = model.predict(input_df)

    return jsonify({
        "predicted_views": int(prediction[0])
    })


# ---------------- Analytics ----------------

@app.route("/analytics")
def analytics():

    top_channels = (
        df.groupby("channel_title")["views"]
        .sum()
        .sort_values(ascending=False)
        .head(10)
    )

    top_videos = (
        df.sort_values("views", ascending=False)
        .head(10)
    )

    return jsonify({

        "top_channels": {
            "labels": top_channels.index.tolist(),
            "values": top_channels.values.tolist()
        },

        "top_videos": {
            "labels": top_videos["title"].tolist(),
            "values": top_videos["views"].tolist()
        }

    })


# ---------------- Insights ----------------

@app.route("/insights")
def insights():

    corr = df[["views", "likes", "comment_count"]].corr()

    return jsonify({

        "correlation": corr.round(2).to_dict(),

        "average_views": int(df["views"].mean()),

        "average_likes": int(df["likes"].mean()),

        "average_comments": int(df["comment_count"].mean())

    })

@app.route("/monthly_views")
def monthly_views():

    df["publish_date"] = pd.to_datetime(df["publish_date"], errors="coerce")

    monthly = (
        df.groupby(df["publish_date"].dt.month)["views"]
        .sum()
        .reset_index()
    )

    month_names = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    return jsonify([
        {
            "month": month_names[int(row["publish_date"]) - 1],
            "views": int(row["views"])
        }
        for _, row in monthly.iterrows()
    ])
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)