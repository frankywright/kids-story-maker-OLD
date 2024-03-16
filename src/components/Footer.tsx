import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex flex-col sm:flex-row justify-between p-4 max-w-7xl mx-auto">
        <h2>KidsStoryMaker</h2>
        <p>
          All rights reserved by{" "}
          <Link
            className="underline"
            target="_blank"
            href="https://www.frankywright.com"
          >
            Frankywright
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
