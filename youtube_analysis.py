
from statistics import LinearRegression

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv("youtube.csv")
print(df.columns)

# Remove duplicates
df = df.drop_duplicates()

# Remove rows with missing values
df = df.dropna()

# Convert publish_time to datetime
df['publish_date'] = pd.to_datetime(df['publish_date'])

# Save cleaned data
df.to_csv("cleaned_youtube_data.csv", index=False)

top_videos = df.sort_values(by='views', ascending=False).head(10)
print(top_videos[['title', 'views']])

import matplotlib.pyplot as plt

top_videos['short_title'] = top_videos['title'].str.slice(0, 50)  # Truncate titles to 50 characters

plt.figure(figsize=(12,6))
plt.barh(top_videos['short_title'], top_videos['views'])
plt.xlabel("Views")
plt.ylabel("Video Title")
plt.title("Top 10 Most Viewed Videos")
plt.tight_layout()
plt.show()

top_channels = df.groupby('channel_title')['views'].sum().sort_values(ascending=False).head(10)

plt.figure(figsize=(10,6))
top_channels.plot(kind='bar')
plt.xlabel("Channel")
plt.ylabel("Total Views")
plt.title("Top 10 Channels by Total Views")
plt.xticks(rotation=45)
plt.show()

top_categories = df['category_id'].value_counts().head(10)

plt.figure(figsize=(8,5))
top_categories.plot(kind='bar')
plt.xlabel("Category ID")
plt.ylabel("Number of Videos")
plt.title("Most Popular Categories")
plt.show()

import seaborn as sns

plt.figure(figsize=(8,6))
sns.heatmap(df[['views', 'likes', 'comment_count']].corr(),
            annot=True, cmap='coolwarm')
plt.title("Correlation Heatmap")
plt.show()

df.to_csv("cleaned_youtube.csv", index=False)

# Convert publish_date to datetime
df['publish_date'] = pd.to_datetime(df['publish_date'])

# Extract month
df['month'] = df['publish_date'].dt.month

# Count videos per month
monthly_trends = df['month'].value_counts().sort_index()

df.to_csv("cleaned_youtube.csv", index=False)

# Plot
plt.figure(figsize=(10,6))
monthly_trends.plot(kind='line', marker='o')
plt.xlabel("Month")
plt.ylabel("Number of Videos")
plt.title("Number of Videos Published by Month")
plt.grid(True)
plt.show()

# Engagement ratio
df['engagement_ratio'] = (df['likes'] + df['comment_count']) / df['views']

# Top 10 videos by engagement
top_engagement = df.sort_values(by='engagement_ratio', ascending=False).head(10)

print(top_engagement[['title', 'engagement_ratio']])

df.to_csv("youtube_analysis_final.csv", index=False)

# Convert publish_date to datetime
df['publish_date'] = pd.to_datetime(df['publish_date'])

# Extract date features
df['year'] = df['publish_date'].dt.year
df['month'] = df['publish_date'].dt.month
df['day'] = df['publish_date'].dt.day
df['hour'] = df['publish_date'].dt.hour

# Calculate engagement rate
df['engagement_rate'] = (
    df['likes'] + df['comment_count']
) / df['views']

# Display sample
print(df[['views', 'likes', 'comment_count', 'engagement_rate']].head())

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Features and target
X = df[['likes', 'comment_count']]
y = df['views']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Random Forest Model
model = LinearRegression()


model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluation
print("R² Score:", r2_score(y_test, y_pred))
print("Mean Squared Error:", mean_squared_error(y_test, y_pred))

# Save model
joblib.dump(model, "youtube_views_model.pkl")
print("Model saved successfully!")

# Actual vs Predicted Plot
plt.figure(figsize=(8,6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.xlabel("Actual Views")
plt.ylabel("Predicted Views")
plt.title("Random Forest: Actual vs Predicted Views")
plt.grid(True)
plt.show()