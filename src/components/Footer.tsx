import React from "react";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { useToggleWindow } from "../hooks/useWindow";
import FooterContent from "./FooterContent";

const Footer: React.FC = () => {
  const {
    isWindowShown: isFooterContentShown,
    hideWindow,
    showWindow,
  } = useToggleWindow();

  return (
    <footer className="flex justify-between items-center py-4 bg-white border-t-[1px] sticky bottom-0">
      {!isFooterContentShown ? (
        <>
          <div className="flex gap-4">
            <p>© 2023 Airbnb, Inc.</p>
            <a className="hover:border-b-[1px]" href="#">
              Terms
            </a>
            <a className="hover:border-b-[1px]" href="#">
              Privacy
            </a>
          </div>

          <div className="flex  gap-4">
            <button className="flex items-center hover:border-b-[1px]">
              <TbWorld className="mr-2" /> English(US)
            </button>
            <button
              onClick={showWindow}
              className="flex items-center hover:border-b-[1px]"
            >
              Support & resources <IoIosArrowUp className="ml-2" />
            </button>
          </div>
        </>
      ) : (
        <FooterContent hideContent={hideWindow} />
      )}
    </footer>
  );
};

export default Footer;
