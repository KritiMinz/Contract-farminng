import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">
        All Users
      </h2>

      {users.map(user => (
        <div
          key={user._id}
          className="bg-white p-4 mb-3 rounded shadow"
        >
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;