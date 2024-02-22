import React from "react";

const User = ({ user, userBookings }) => {
  return (
    <div className="w-[30vw] p-12">
      {!user && (
        <h1 className="text-white font-bold text-2xl">
          Fetching Rooms Data...
        </h1>
      )}

      {user && (
        <>
          <div className="border-b-[2px] border-b-blue-200 p-4">
            <p>Hello, {user.firstname}</p>
            <p>Available Credits: {user.credits}</p>
          </div>
          <h1 className="p-4">Reserved Rooms:</h1>

          {Object.keys(userBookings).length > 0 && (
            <table className="table-auto w-full text-center border border-collapse border-gray-300">
              <thead>
                <tr className="">
                  <th className="px-4 py-2 border">Room Id</th>
                  <th className="px-4 py-2 border">Room Cost</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userBookings).map(([roomId, roomCost]) => (
                  <tr key={roomId}>
                    <td className="border px-4 py-2">{roomId}</td>
                    <td className="border px-4 py-2">{roomCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default User;
