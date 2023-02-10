import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalLayout: React.FC<{
  children: React.ReactNode;
  closeModal: () => void;
}> = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div className="bg-[rgba(0,0,0,0.3)] fixed top-0 bottom-0 left-0 right-0 z-50"></div>
      <div className=" fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/4 bg-white rounded-xl flex flex-col  px-6 overflow-y-hidden">
        <AiOutlineClose
          onClick={closeModal}
          className="absolute left-5 top-5 cursor-pointer text-xl"
        />
        <div className="overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default ModalLayout;
