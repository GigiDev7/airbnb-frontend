import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FooterContent: React.FC<{ hideContent: () => void }> = ({
  hideContent,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:justify-between w-full relative pt-8">
      <AiOutlineClose
        onClick={hideContent}
        className="absolute top-0 cursor-pointer text-lg"
      />
      <div>
        <h2 className="font-semibold">Support</h2>
        <div className="flex lg:flex-col gap-6 text-gray-500 mt-3">
          <a className="hover:text-gray-800" href="#">
            Help Center
          </a>
          <a className="hover:text-gray-800" href="#">
            Cancellation options
          </a>
          <a className="hover:text-gray-800" href="#">
            COVID-19 Response
          </a>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Community</h2>
        <div className="flex lg:flex-col gap-6 text-gray-500 mt-3">
          <a className="hover:text-gray-800" href="#">
            Airbnb.org: disaster relief housing
          </a>
          <a className="hover:text-gray-800" href="#">
            Combating discrimination
          </a>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Hosting</h2>
        <div className="flex lg:flex-col gap-6 text-gray-500 mt-3">
          <a className="hover:text-gray-800" href="#">
            Airbnb your home
          </a>
          <a className="hover:text-gray-800" href="#">
            Explore hosting resources
          </a>
          <a className="hover:text-gray-800" href="#">
            How to host responsibly
          </a>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Airbnb</h2>
        <div className="flex lg:flex-col gap-6 text-gray-500 mt-3">
          <a className="hover:text-gray-800" href="#">
            Newsroom
          </a>
          <a className="hover:text-gray-800" href="#">
            Careers
          </a>
          <a className="hover:text-gray-800" href="#">
            Investors
          </a>
          <a className="hover:text-gray-800" href="#">
            Gift cards
          </a>
          <a className="hover:text-gray-800" href="#">
            Learn about new features
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
