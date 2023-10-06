import React from "react";
import { useSelector } from "react-redux";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.users);

  return (
    <>
      {user?.isAdmin ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </>
  );
}

export default DefaultLayout;

