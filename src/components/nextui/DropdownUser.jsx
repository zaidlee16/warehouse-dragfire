import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../auth/AuthProvider";
import { supabase } from "../../utils/SupaClient";
import { Link } from "react-router-dom";

export default function DropdownUser() {
  const { username, email, user, role } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout Failed!");
    } else {
      alert("Logout Success!");
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user && role === "admin" ? (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?img=6",
              }}
              className="transition-transform"
              description={email}
              name={username}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link to={"/login"}>
          <Button color="default">Login</Button>
        </Link>
      )}
    </div>
  );
}
