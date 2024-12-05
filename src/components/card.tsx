import React, { useState } from "react";
import axios from "axios";
import User from "../types";
import { Loading, Warning } from "../icons/Icons";
import Alert from "./alert";

interface CardProps {
  user: User;
  onDelete: (id: number) => void; // Callback to update parent state after deletion
  onUpdate: (id: number, updatedUser: User) => void; // Callback to update parent state after edit
}

export default function Card({ user, onDelete, onUpdate }: CardProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertAction, setAlertAction] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    setLoading(true);
    setAlertAction("update");
    try {
      const response = await axios.put<User>(
        `https://reqres.in/api/users/${user.id}`,
        formData
      );
      onUpdate(user.id, response.data);
      setIsEditing(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to update user.");
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    setShowAlert(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setAlertAction("delete");
    try {
      await axios.delete(`https://reqres.in/api/users/${user.id}`);
      onDelete(user.id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to delete user.");
      setShowAlert(true);
    }
  };

  return (
    <div className="w-full border border-gray-200 bg-white rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 p-1">
        <div className="relative flex flex-col w-full justify-center items-center rounded-xl">
          <div className="w-full h-32 rounded-xl from-primary-500 to-secondary-500 bg-gradient-to-r opacity-60 z-0"></div>
          <img
            className="w-24 h-24 my-3 rounded-full border-4 border-white -mt-10 z-0 dark:border-gray-800 dark:bg-gray-700"
            src={user.avatar}
            alt="avatar"
          />
        </div>
        {isEditing ? (
          <div className="w-full p-4 flex flex-col items-center dark:text-white">
            <div className="relative mb-8 w-full max-w-96">
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border-1 border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-accent-400 peer"
              />
              <label
                htmlFor="first_name"
                className="absolute text-sm bg-white left-2 text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-focus:bg-accent-400 peer-focus:text-white peer-hover:text-accent-400 rounded-xl top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 dark:bg-gray-800"
              >
                First Name
              </label>
            </div>

            <div className="relative mb-8 w-full max-w-96">
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border-1 border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-accent-400 peer"
              />
              <label
                htmlFor="last_name"
                className="absolute text-sm bg-white left-2 text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-focus:bg-accent-400 peer-focus:text-white peer-hover:text-accent-400 rounded-xl top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 dark:bg-gray-800"
              >
                Last Name
              </label>
            </div>

            <div className="relative mb-8 w-full max-w-96">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border-1 border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-accent-400 peer"
              />
              <label
                htmlFor="email"
                className="absolute text-sm bg-white left-2 text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-focus:bg-accent-400 peer-focus:text-white peer-hover:text-accent-400 rounded-xl top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 dark:bg-gray-800"
              >
                Email
              </label>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                onClick={handleEdit}
                className="inline-flex bg-primary-500 hover:bg-primary-700 text-white items-center px-4 py-2 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-200"
              >
                {loading ? <Loading className="animate-spin" /> : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 ms-2 border-accent-200 bg-transparent focus:ring-4 focus:ring-accent-200 text-sm hover:text-accent-500 hover:bg-gray-200 font-medium text-gray-900 focus:outline-none rounded-lg border hover:text-blue-700 focus:z-10 dark:text-gray-300 dark:border-gray-600 dark:hover:text-accent-400 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h5 className="mb-1 text-xl font-semibold dark:text-white">
              {user.first_name} {user.last_name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
            <div className="flex mt-4 md:mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex bg-primary-500 hover:bg-primary-700 text-white items-center px-4 py-2 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-200"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-4 ms-2 border-accent-200 bg-transparent focus:ring-4 focus:ring-accent-200 text-sm hover:text-accent-500 hover:bg-gray-200 font-medium text-gray-900 focus:outline-none rounded-lg border hover:text-blue-700 focus:z-10 dark:text-gray-300 dark:border-gray-600 dark:hover:text-accent-400 dark:hover:bg-gray-700"
              >
                {loading ? <Loading className="animate-spin" /> : "Delete"}
              </button>
            </div>
          </>
        )}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      <div
        className={`fixed bottom-0 right-0 w-96 flex items-center bg-white border rounded-lg shadow-lg ${
          alertVisible ? "animate-slide-in" : "animate-slide-out"
        }`}
      >
        {showAlert && (
          <Alert
            text={`Error ${alertAction}ing user!`}
            logo={<Warning className="w-6 h-6 text-red-500" />}
            onClose={handleAlertClose}
          />
        )}
      </div>
    </div>
  );
}
