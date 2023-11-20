import Link from "next/link";
import React from "react";
import "../../configureAmplify";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import RyzLogo from "../../src/assets/navbar/ryzLogo.fa97d579.svg";
// import "./styles.css"

const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    authListener();
  }, []);

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedUser(true);
        case "signOut":
          return setSignedUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedUser(true);
    } catch (err) {}
  }

  return (
    <nav className="hamnav flex justify-between items-center py-3">
      <Link href={"/"}>
        <div>
          <img width="130px" src={RyzLogo.src} alt="ryzLogo" />
        </div>
      </Link>
      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {/* Replace with your hamburger icon */}
          <span>Menu</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`flex flex-col md:flex-row space-x-0 md:space-x-4 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        {[
          ["Home", "/"],
          ["Create Post", "/create-post"],
          // ["Profile", "/profile"],
        ].map(([title, url], index) => (
          <Link href={url} key={index}>
            <a className="rounded-lg px-3 py-2 text-white text-xl font-medium hover:bg-slate-100 hover:text-slate-900">
              {title}
            </a>
          </Link>
        ))}

        {/* Conditional Rendering based on signedUser */}
        {signedUser && (
          <Link href="/my-posts">
            <a className="rounded-lg px-3 py-2 text-white text-xl font-medium hover:bg-slate-100 hover:text-slate-900">
              My Post
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
