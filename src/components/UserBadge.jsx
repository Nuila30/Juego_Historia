function UserBadge({ user }) {
    const username =
      user?.user_metadata?.username && user.user_metadata.username !== "null"
        ? user.user_metadata.username
        : user?.email;
  
    const avatarUrl = user?.user_metadata?.avatar_url;
    const avatarLetter = username?.charAt(0)?.toUpperCase() || "U";
  
    return (
      <div className="user-pill">
        {avatarUrl ? (
          <img className="user-avatar-img" src={avatarUrl} alt={username} />
        ) : (
          <span className="user-avatar">{avatarLetter}</span>
        )}
  
        <div>
          <small>Jugador</small>
          <span>{username}</span>
        </div>
      </div>
    );
  }
  
  export default UserBadge;