import React, { useEffect, useState } from 'react';
import styles from './FriendRecommendations.module.css';

interface Recommendation {
  _id: string;
  username: string;
  profilePictureUrl?: string;
  mutualFriendsCount: number;
}

function FriendRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Fetch friend recommendations from the backend
    fetch('/api/friend-recommendations', {
      credentials: 'include', // Include cookies for authentication
    })
      .then((response) => response.json())
      .then((data) => setRecommendations(data.recommendations))
      .catch((err) => console.error('Error fetching recommendations:', err));
  }, []);

  return (
    <div className={styles.friendRecommendations}>
      <h3>Friend Recommendations</h3>
      {recommendations.length > 0 ? (
        recommendations.map((rec) => (
          <div className={styles.recommendation} key={rec._id}>
            <img
              src={rec.profilePictureUrl || '/default-profile.png'}
              alt={`${rec.username}'s profile`}
              className={styles.profilePicture}
            />
            <div>
              <p>{rec.username}</p>
              <p>{rec.mutualFriendsCount} mutual friend(s)</p>
              <button
                onClick={() => sendFriendRequest(rec._id)}
                className={styles.addFriendButton}
              >
                Add Friend
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No recommendations available at the moment.</p>
      )}
    </div>
  );

  function sendFriendRequest(friendId: string) {
    fetch(`/api/friend-request/${friendId}`, {
      method: 'POST',
      credentials: 'include', // Include cookies for authentication
    })
      .then((response) => {
        if (response.ok) {
          alert('Friend request sent!');
        }
      })
      .catch((err) => console.error('Error sending friend request:', err));
  }
}

export default FriendRecommendations;
