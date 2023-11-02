import React from "react";
import { signOut } from "next-auth/react";

type NavProps = {
  userImage?: string | null | undefined;
};
export const Nav = ({ userImage }: NavProps) => {
  return (
    <nav className="nav">
      <button onClick={() => signOut()}>
        Logout
        {userImage && (
          <figure>
            <img src={userImage} alt="user image" />
          </figure>
        )}
      </button>
    </nav>
  );
};
