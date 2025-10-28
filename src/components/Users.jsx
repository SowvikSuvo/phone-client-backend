import React, { use, useState } from "react";

const Users = ({ userPromise }) => {
  const initialUser = use(userPromise);
  const [users, setUsers] = useState(initialUser);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name?.value;
    const email = e.target.email?.value;
    const image = e.target.image?.value;
    const price = parseFloat(e.target.price?.value);
    const newUser = { name, email, image, price };

    // send to data to the server
    fetch("http://localhost:4000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data after post", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        e.target.reset();
      });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Form */}
      <form onSubmit={handleAddUser} className="space-y-3 mb-8 w-full max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Phone Name"
          className="w-100 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-100 p-2 border rounded"
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Photo URL[](https://...)"
          className="w-100 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-100 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-100 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </form>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 bg-white shadow-sm text-center w-100 mx-auto"
          >
            <h3 className="font-bold text-black text-xl">{user.name}</h3>
            <p className="text-lg font-medium text-gray-900">
              Email: {user.email}
            </p>

            <img
              src={user.image}
              alt={user.name}
              className="w-32 h-32 object-cover rounded-xl mx-auto my-3"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />

            <p className="font-semibold text-green-600">Price: ${user.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
