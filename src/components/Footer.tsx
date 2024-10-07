import Image from "next/image";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

export default function Footer() {
  return (
    <footer className=" w-full px-[80px] py-[10px]">
      <div className="w-full">
        <div className="w-full flex justify-between items-center gap-[60px] my-[60px]">
          <div className="footer-logo">
            <Image
              src="/images/logo-webp.webp"
              alt=""
              width={275}
              height={275}
            />
          </div>
          <div className="w-[35%] flex justify-between items-start gap-[24px]">
            <ul className="flex flex-col items-start gap-[18px]">
              <h5 className="text-2xl font-medium mb-2">Support</h5>
              <li className="">
                <a className="text-xm" href="#">
                  Contact Us
                </a>
              </li>
              <li className="">
                <a className="text-xm" href="#">
                  Policy
                </a>
              </li>
            </ul>
            <ul className="flex flex-col items-start gap-[18px]">
              <h5 className="text-2xl font-medium mb-2">About Us</h5>
              <li className="">
                <a className="text-xm" href="#">
                  Robopet.ai
                </a>
              </li>
              <li className="">
                <a className="text-xm" href="#">
                  Living.ai
                </a>
              </li>
              <li className="">
                <a className="text-xm" href="#">
                  Energizelab.com
                </a>
              </li>
            </ul>
            <ul className="flex flex-col items-start gap-[18px]">
              <h5 className="text-2xl font-medium mb-2">Follow Us</h5>
              <li className="">
                <a className="text-xm" href="#">
                  Facebook
                </a>
              </li>
              <li className="">
                <a className="text-xm" href="#">
                  Twitter
                </a>
              </li>
              <li className="">
                <a className="text-xm" href="#">
                  Youtubbe
                </a>
              </li>
              <li className="">
                <a className="text-xm" href="#">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="w-[25%] flex flex-col items-start gap-[18px]">
            <h5 className="text-2xl mb-2">Newsletter</h5>
            <p className="text-xm">
              Subscribe to our newsletter to keep up to date on our marketing,
              website, design services, and tips.
            </p>
            <form className="footer-right-form">
              <input
                className="bg-transparent w-[270px] border rounded-md p-2 mr-3 focus:outline-none"
                type="email"
                name="newsletter"
                placeholder="Enter your email"
              />
              <button className="bg-gray-700 hover:bg-gray-800 font-semibold transition-all duration-200 rounded-md py-[10px] px-8">
                Submit
              </button>
            </form>
            <p className="text-xm">
              We hate spam as much as you do. We will never, ever send you such
              emails.
            </p>
          </div>
        </div>
        <div className="py-10 flex justify-between items-center border-t-[1px] border-stone-600">
          <p className="footer-bottom-info">
            © 2023 Robot AI. All Rights Reserved. Terms & Conditions. Privacy
            Policy.
          </p>
          <ul className="flex justify-center items-center gap-6">
            <li>
              <a href="#">
                <FacebookIcon sx={{ fontSize: 35 }} />
              </a>
            </li>
            <li>
              <a href="#">
                <InstagramIcon sx={{ fontSize: 28 }} />
              </a>
            </li>
            <li>
              <a href="#">
                <XIcon sx={{ fontSize: 28 }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
