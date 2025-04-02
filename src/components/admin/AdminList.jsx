import React from "react";
import UserList from "./UserList";

const AdminList = ({ admins }) => {
  return (
    <div>
      <h3>Admins</h3>
      {admins.length ? <UserList users={admins} isRemovable={false} /> : <p>No Admins Found!</p>}
    </div>
  );
};

export default AdminList;