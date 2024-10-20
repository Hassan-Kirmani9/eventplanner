import { useState, useEffect } from 'react';
import { Package } from '../../types/package';

const initialData: Package[] = [
  {
    name: 'hr_user',
    role: 'HR',
  },
  {
    name: 'cto_user',
    role: 'CTO',
  },
  {
    name: 'ceo_user',
    role: 'CEO',
  },
  {
    name: 'finance_user',
    role: 'Finance',
  },
];

const TableThree = () => {
  const [users, setUsers] = useState<Package[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<string>('');

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      console.log('Loaded users from localStorage:', parsedUsers);
      setUsers(parsedUsers); // Only set if users are found in localStorage
    } else {
      console.log('No users found in localStorage, using initialData');
      setUsers(initialData); // If no users are in localStorage, use the initial data
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    console.log('Saving users to localStorage:', users);
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    // Add a new user to the users array
    const newUser = { name: newUserName, role: newUserRole };
    setUsers((prevUsers) => [...prevUsers, newUser]); // Update users state
    console.log(`Adding user: ${newUserName}, Role: ${newUserRole}`);
    
    // Close modal after adding user
    setIsModalOpen(false);
    // Clear input fields
    setNewUserName('');
    setNewUserRole('');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Username
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                    {user.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center ml-4">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.13183 9.95629 6.1037 10.35L5.93495 12.825C5.93495 13.1625 6.2162 13.4157 6.5537 13.4157C6.58183 13.4157 6.58183 13.4157 6.60995 13.4157C6.97558 13.3875 7.2287 13.0782 7.20058 12.7407L7.03183 10.2657C7.0037 9.90004 6.69433 9.64692 6.38495 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* Add User Button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open modal
          className="bg-green-500 text-white p-2 mt-4 ml-10 mb-4 rounded"
        >
          Add User
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Add New User</h2>
              <div className="mt-6 flex gap-4">
                <input
                  type="text"
                  value={newUserName}
                  placeholder="Username"
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  value={newUserRole}
                  placeholder="Role"
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
                <button
                  onClick={addUser}
                  className="bg-blue-500 ml-1 px-3 text-white p-2 rounded"
                >
                  Add 
                </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="mt-4 ml-4 bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableThree;
