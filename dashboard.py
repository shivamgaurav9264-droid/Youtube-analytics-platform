import streamlit as st
import pandas as pd

# Page title
st.title("📊 YouTube Analytics Dashboard")

# Load dataset
df = pd.read_csv("youtube.csv")

# Top 10 Most Viewed Videos
st.header("Top 10 Most Viewed Videos")
top_videos = df.sort_values(by='views', ascending=False).head(10)
st.bar_chart(top_videos.set_index('title')['views'])

# Top 10 Channels
st.header("Top 10 Channels")
top_channels = df.groupby('channel_title')['views'].sum().sort_values(ascending=False).head(10)
st.bar_chart(top_channels)

# Most Popular Categories
st.header("Most Popular Categories")
top_categories = df['category_id'].value_counts().head(10)
st.bar_chart(top_categories)