import React, { useEffect } from "react";
import ResultCard from "../components/ResultCard";
import { MdFilterListAlt } from "react-icons/md";
import { useToggleWindow } from "../hooks/useWindow";
import FilterModal from "../components/FilterModal";

const SearchResults: React.FC = () => {
  const filterWindow = useToggleWindow();

  useEffect(() => {
    const handler = () => {
      const maxHeight = document.body.offsetHeight - window.innerHeight;
      if (maxHeight - window.scrollY < 300) {
        console.log("works!");
        document.removeEventListener("scroll", handler);
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {filterWindow.isWindowShown && (
        <FilterModal hideModal={filterWindow.hideWindow} />
      )}
      <div
        onClick={filterWindow.showWindow}
        className="mt-6 border-[1px] rounded-md p-2 cursor-pointer w-fit self-end fixed top-30 z-50 bg-white"
      >
        <button className="flex items-center text-md">
          <MdFilterListAlt className="mr-1" /> Filters
        </button>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-start gap-12 mt-24 lg:gap-20 pb-12">
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
    </div>
  );
};

export default SearchResults;
