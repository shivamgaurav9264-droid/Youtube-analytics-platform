import streamlit as st
import pandas as pd
import plotly.express as px
import joblib

# Page Config 
st.set_page_config(page_title="YouTube Analytics Platform", layout="wide")

#  Load Data 
df = pd.read_csv("youtube.csv")
model = joblib.load("youtube_views_model.pkl")

# Convert date safely
df['publish_date'] = pd.to_datetime(df['publish_date'], errors='coerce')
df['month'] = df['publish_date'].dt.month

#  Sidebar 
st.sidebar.title("Navigation")

page = st.sidebar.selectbox(
    "Select Page",
    ["Dashboard", "Prediction", "Insights"]
)

# Dashboard 
if page == "Dashboard":

    st.title("📊 YouTube Analytics Platform")

    # KPI Cards
    col1, col2, col3, col4 = st.columns(4)

    col1.metric("Total Videos", f"{len(df):,}")
    col2.metric("Total Views", f"{df['views'].sum():,}")
    col3.metric("Total Likes", f"{df['likes'].sum():,}")
    col4.metric("Total Comments", f"{df['comment_count'].sum():,}")

    st.divider()

    # Monthly Trend
    st.subheader("📈 Monthly Views Trend")

    monthly_views = df.groupby('month')['views'].sum()

    st.line_chart(monthly_views)

    st.divider()

    # Top Channels
    st.subheader("🔥 Top 10 Channels")

    top_channels = (
        df.groupby('channel_title')['views']
        .sum()
        .sort_values(ascending=False)
        .head(10)
    )

    fig1 = px.bar(
        x=top_channels.values,
        y=top_channels.index,
        orientation='h',
        title="Top Channels by Views"
    )

    st.plotly_chart(fig1, use_container_width=True)

    # SEARCH VIDEO SECTION
    st.divider()

    st.subheader(" Search Video")

    video_name = st.text_input("Enter Video Title")

    if video_name:
        result = df[df['title'].str.contains(video_name, case=False, na=False)]

        st.write(f"Found {len(result)} videos")

        st.dataframe(
            result[['title', 'channel_title', 'views', 'likes', 'comment_count']]
        )

    #  ADD CATEGORY FILTER HERE
    st.divider()

    st.subheader(" Category Filter")

    category = st.selectbox(
        "Select Category",
        sorted(df['category_id'].unique())
    )

    filtered_df = df[df['category_id'] == category]

    st.write(f"Total Videos in Category {category}: {len(filtered_df)}")

    st.dataframe(
        filtered_df[
            ['title', 'channel_title', 'views', 'likes', 'comment_count']
        ].head(20)
    )
    st.divider()

    # Download Dataset
    st.subheader(" Download Dataset")

    csv = df.to_csv(index=False)

    st.download_button(
        label="Download YouTube Dataset",
        data=csv,
        file_name="youtube_data.csv",
        mime="text/csv"
    )
    st.divider()

    st.subheader(" Views vs Likes")

    fig2 = px.scatter(
        df.sample(1000),
        x="views",
        y="likes",
        hover_data=["title"],
        title="Views vs Likes Relationship"
    )

    st.plotly_chart(fig2, use_container_width=True)
    st.divider()

    st.subheader(" Top 10 Engaging Videos")

    df['engagement_rate'] = (
        df['likes'] + df['comment_count']
    ) / df['views']

    top_engagement = (
        df.sort_values(
            by='engagement_rate',
            ascending=False
        )
        .head(10)
    )

    st.dataframe(
        top_engagement[
            [
                'title',
                'channel_title',
                'views',
                'likes',
                'comment_count',
                'engagement_rate'
            ]
        ]
    )
    st.divider()

    st.subheader(" Distribution of Video Views")

    fig3 = px.histogram(
        df,
        x="views",
        nbins=50,
        title="Distribution of Views"
    )

    st.plotly_chart(fig3, use_container_width=True)
    
    st.divider()

    st.subheader(" Category Distribution")

    category_counts = (
        df['category_id']
        .value_counts()
        .head(10)
        .reset_index()
    )

    category_counts.columns = ['category_id', 'count']

    fig4 = px.pie(
        category_counts,
        names='category_id',
        values='count',
        title='Top 10 Categories'
    )

    st.plotly_chart(fig4, use_container_width=True)
    
    st.divider()

    st.subheader(" Upload Day Analysis")

    day_counts = (
        df['published_day_of_week']
        .value_counts()
        .reset_index()
    )

    day_counts.columns = ['Day', 'Videos']

    fig5 = px.bar(
        day_counts,
        x='Day',
        y='Videos',
        title='Videos Uploaded by Day of Week'
    )

    st.plotly_chart(fig5, use_container_width=True)
    
    st.divider()

    st.subheader(" Best Upload Time Analysis")

    # Extract hour if not already present
    df['hour'] = pd.to_datetime(df['publish_date']).dt.hour

    hour_counts = (
        df['hour']
        .value_counts()
        .sort_index()
        .reset_index()
    )

    hour_counts.columns = ['Hour', 'Videos']

    fig6 = px.line(
        hour_counts,
        x='Hour',
        y='Videos',
        markers=True,
        title='Video Upload Frequency by Hour'
    )

    st.plotly_chart(fig6, use_container_width=True)
    
    st.divider()

    st.subheader("Top Countries")

    country_counts = (
        df['publish_country']
        .value_counts()
        .head(10)
        .reset_index()
    )

    country_counts.columns = ['Country', 'Videos']

    fig7 = px.bar(
        country_counts,
        x='Country',
        y='Videos',
        color='Videos',
        title='Top 10 Countries by Number of Videos'
    )

    st.plotly_chart(fig7, use_container_width=True)
    
    st.divider()

    st.subheader(" Correlation Heatmap")

    corr = df[['views', 'likes', 'comment_count']].corr()

    fig8 = px.imshow(
        corr,
        text_auto=True,
        color_continuous_scale='RdBu_r',
        title='Correlation Heatmap'
    )

    st.plotly_chart(fig8, use_container_width=True)
    
    st.divider()

    st.subheader(" Channel Analysis")

    selected_channel = st.selectbox(
        "Select a Channel",
        sorted(df['channel_title'].unique())
    )

    channel_df = df[df['channel_title'] == selected_channel]

    st.write(f"Total Videos: {len(channel_df)}")
    st.write(f"Total Views: {channel_df['views'].sum():,}")
    st.write(f"Total Likes: {channel_df['likes'].sum():,}")

    top_channel_videos = (
        channel_df.sort_values(by='views', ascending=False)
        .head(10)
    )

    fig9 = px.bar(
        top_channel_videos,
        x='views',
        y='title',
        orientation='h',
        title=f'Top Videos of {selected_channel}'
    )

    st.plotly_chart(fig9, use_container_width=True)
    
    st.divider()

    st.subheader(" Top 10 Videos by Views")

    top_videos = (
        df.sort_values(by='views', ascending=False)
        .head(10)
    )

    fig10 = px.bar(
        top_videos,
        x='views',
        y='title',
        orientation='h',
        color='views'
    )

    st.plotly_chart(fig10, use_container_width=True)
#  Prediction 


elif page == "Prediction":

    st.title(" YouTube Views Prediction")

    likes = st.number_input("Likes", min_value=0)
    comments = st.number_input("Comments", min_value=0)

    if st.button("Predict Views"):

        input_data = pd.DataFrame({
            "likes": [likes],
            "comment_count": [comments]
        })

        prediction = model.predict(input_data)

        st.success(f" Estimated Views: {int(prediction[0]):,}")

    st.divider()

    # Channel Search 
    st.subheader(" Search Channel")

    channel = st.selectbox(
        "Select Channel",
        sorted(df['channel_title'].unique())
    )

    channel_data = df[df['channel_title'] == channel]

    st.dataframe(channel_data[['title', 'views', 'likes']].head(10))

    st.divider()

    # Download 
    csv = df.to_csv(index=False)

    st.download_button(
        label="📥 Download Dataset",
        data=csv,
        file_name="youtube_data.csv",
        mime="text/csv"
    )

#  Insights 
elif page == "Insights":

    st.title(" Insights")

    st.subheader("Correlation between Views, Likes and Comments")

    corr = df[['views', 'likes', 'comment_count']].corr()

    fig3 = px.imshow(
        corr,
        text_auto=True,
        title="Correlation Heatmap"
    )

    st.plotly_chart(fig3, use_container_width=True)

