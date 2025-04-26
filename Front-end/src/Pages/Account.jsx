import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('authuser');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const fullName = parsedUser.name || '';
      const nameParts = fullName.trim().split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    } else {
      navigate('/sign-in');
    }
  }, [navigate]);

  if (!user)
    return <div className="text-center mt-10 w-full h-screen ">Loading account info...</div>;

  return (
    <section className="mb-[140px]">
      <Container>
        <div className="flex gap-[120px]">
          <div className="mt-[120px] text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-[20px]">
              My Account
            </h3>
            <div className="w-[150px] h-[150px] border-4 border-red-500 rounded-full mb-[15px] mx-auto p-[3px]">
              <img
                className="w-full h-full rounded-full"
                src="/mans.png"
                alt="mans"
              />
            </div>
            <span className="text-[16px] font-semibold text-gray-900">
              {user.name}
            </span>
          </div>

          <div className="w-[870px] bg-white p-6 shadow-md rounded-lg mt-[180px]">
            <h2 className="text-red-500 text-lg font-semibold mb-4">
              Edit Your Profile
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full border p-2 rounded bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full border p-2 rounded bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={user.email || 'Not set'}
                  className="w-full border p-2 rounded bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  value={user.address || 'No address set'}
                  className="w-full border p-2 rounded bg-gray-100"
                  disabled
                />
              </div>
            </div>

            <h3 className="mt-[20px] font-semibold">Password Changes</h3>
            <div className="mt-[20px]">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full border p-2 rounded mb-[14px]"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full border p-2 rounded mb-[14px]"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button className="text-gray-500">Cancel</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Account;
