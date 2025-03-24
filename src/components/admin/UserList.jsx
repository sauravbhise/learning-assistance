import UserListItem from "./UserListItem";

const UserList = ({ users, onRemoveUser, isRemovable }) => {
	return (
		<ul>
			{users.map((user) => (
				<UserListItem key={user.id} user={user} onRemoveUser={onRemoveUser} isRemovable={isRemovable} />
			))}
		</ul>
	);
};

export default UserList;

