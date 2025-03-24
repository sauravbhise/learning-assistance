const UserListItem = ({ user, onRemoveUser, isRemovable }) => {
	return (
		<li>
			{user?.email}
			{isRemovable && (
				<button onClick={() => onRemoveUser(user.id)} style={{ marginLeft: "10px" }}>
					Remove
				</button>
			)}
		</li>
	);
};

export default UserListItem;


