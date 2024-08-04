import React from 'react';
import { usePosts } from './usePosts'; // Adjust the path if necessary
import VideoPost from './VideoPost';
import AudioPost from './AudioPost';
import ArticlePost from './ArticlePost';
import QnAPost from './QnAPost';

const Feed = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>
      {posts.map(post => {
        switch (post.type) {
          case 'video':
            return <VideoPost key={post.$id} post={post} />;
          case 'audio':
            return <AudioPost key={post.$id} post={post} />;
          case 'article':
            return <ArticlePost key={post.$id} post={post} />;
          case 'QnA':
            return <QnAPost key={post.$id} post={post} />;
          default:
            return null;
        }
      })}
  
    </div>
  );
};

export default Feed;
