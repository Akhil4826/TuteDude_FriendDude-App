import styles from './Friends.module.css'

// IMPORT INTERFACES
import UserInterface from '../interfaces/UserInterface'

// IMPORT COMPONENTS
import GetFriendLinkById from './GetFriendLinkById'

interface Props {
  userFriends: UserInterface[] | []
  unfriend: (friendId: string) => void
}

function Friends({ userFriends, unfriend }: Props) {
  return (
    <div className={styles.friends}>
      {userFriends.length > 0 ? (
        <h2>
          {userFriends.length.toString()} Friend
          {userFriends.length > 1 && 's'}
        </h2>
      ) : (
        <h2>You have No Friends</h2>
      )}

      {userFriends.length > 0 &&
        userFriends.map((friend) => (
          <div className={styles.friend} key={friend._id}>
            <GetFriendLinkById
              id={friend._id}
              friendProfilePictureUrl={friend?.profilePictureUrl as string}
            />
            <button
              className={styles.unfriendButton}
              onClick={() => unfriend(friend._id)}
            >
              Unfriend
            </button>
          </div>
        ))}
    </div>
  )
}

export default Friends
