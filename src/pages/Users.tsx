import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../types";
import Card from "../components/card";
import Pagination from "../components/pagination";
import Alert from "../components/alert";
import { Check, CircleAlert } from "../icons/Icons";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertAction, setAlertAction] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [orignalUsers, setOrignalUsers] = useState<User[]>([]);
  const numberOfUsersPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    const fetchUsers = async (): Promise<void> => {
      const response = await axios.get<{
        data: User[];
        total_pages: number;
        per_page: number;
      }>(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setOrignalUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    };
    fetchUsers();
  }, [navigate, page]);

  const handleDelete = (id: number) => {
    setAlertAction("delete");
    setAlertVisible(true);
    setShowAlert(true);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    setShowAlert(false);
  };

  const handleUpdate = (id: number, updatedUser: User) => {
    setAlertAction("update");
    setAlertVisible(true);
    setShowAlert(true);
    updatedUser.avatar = users.find((user) => user.id === id)?.avatar || "";
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setUsers(orignalUsers);
      setTotalPages(Math.ceil(orignalUsers.length / numberOfUsersPerPage));
    } else {
      setUsers(
        orignalUsers.filter((user) =>
          user.first_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTotalPages(
        Math.ceil(
          orignalUsers.filter((user) =>
            user.first_name.toLowerCase().includes(e.target.value.toLowerCase())
          ).length / numberOfUsersPerPage
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-screen dark:bg-gray-900">
      <div className="container mx-auto p-6">
        <div className="flex flex-col mb-4 dark:text-white">
          <h1 className="mx-6 mb-4 text-5xl font-bold">Users</h1>
          <div className="flex flex-col justify-between md:flex-row items-center">
            <h2 className="mx-6 mb-4 pt-2 text-xl text-gray-400 border-t dark:border-gray-200">
              List of all the user, at one place {":)"}, but multiple pages D:
            </h2>
            <div className="flex items-center justify-between md:justify-end w-full ml-12 mr-4 gap-5">
              <div className="relative mb-4 w-full max-w-96">
                <input
                  id="search"
                  type="text"
                  placeholder=""
                  value={search}
                  onChange={handleSearch}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-accent-400 peer"
                />
                <label
                  htmlFor="search"
                  className="absolute bg-white text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-focus:bg-accent-400 peer-focus:text-white peer-hover:text-accent-400 rounded-xl top-2 z-10 origin-[0] bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:bg-accent-400 dark:peer-focus:text-white dark:peer-hover:text-accent-400 dark:peer-placeholder-shown:scale-100 dark:peer-placeholder-shown:-translate-y-1/2 dark:peer-placeholder-shown:top-1/2 dark:peer-focus:top-2 dark:peer-focus:scale-75 dark:peer-focus:-translate-y-4"
                >
                  Search
                </label>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="mr-6 mb-4 py-3 w-24 text-sm md:text-base md:w-36 md:p-2 bg-primary-500 text-white rounded-xl shadow-md hover:bg-primary-600 focus:outline-none"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 md:mx-5">
          {users.map((user) => (
            <Card
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 mx-5 items-center">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={page === 1 ? "cursor-not-allowed" : ""}
          >
            Previous
          </button>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={page === totalPages ? "cursor-not-allowed" : ""}
          >
            Next
          </button>
        </div>
      </div>
      <div
        className={`fixed bottom-0 right-0 w-96 flex items-center bg-white border rounded-lg shadow-lg ${
          alertVisible ? "animate-slide-in" : "animate-slide-out"
        }`}
      >
        {showAlert && (
          <Alert
            text={`User ${alertAction}d successfully!`}
            logo={
              alertAction === "delete" ? (
                <CircleAlert className="w-6 h-6 text-accent-400" />
              ) : (
                <Check className="w-6 h-6 text-primary-400" />
              )
            }
            onClose={handleAlertClose}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
