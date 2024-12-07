import { navLinks } from "@/lib/data";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 md:px-10 px-3">
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-y-10 items-center justify-between">
        {/* Left Side */}
        <div className="flex flex-col justify-between gap-y-20">
          <div className="sm:max-w-xs w-full">
            <Logo />
            <p className="text-white mt-3">
              MockDesk is a platform that helps you to conduct inteviews online
            </p>
            <p className="text-white mt-2">
              © 2021 MockDesk. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              href="https://www.linkedin.com/company/supercompofficial/"
              target="_blank"
            >
              <Linkedin className="social-icon" />
            </Link>
            <Link
              href="https://www.instagram.com/supercomp.bukc?igsh=MXFzNGllbG1veW56MA=="
              target="_blank"
            >
              <Instagram className="social-icon" />
            </Link>
            <Link
              href="https://www.facebook.com/share/DRaruq8qgH4uZ3oH/"
              target="_blank"
            >
              <Facebook className="social-icon" />
            </Link>
          </div>
        </div>
        {/* Right Side */}
        <div className="grid gap-x-20 gap-y-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <div>
            <p className="text-white font-bold text-lg">Links</p>
            <ul className="footer-list">
              {navLinks.map((item, idx) => (
                <Link href={item.path} key={idx}>
                  <li className="footer-list-item">{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
