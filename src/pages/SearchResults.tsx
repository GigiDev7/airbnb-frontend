import React, { useEffect } from "react";
import ResultCard from "../components/ResultCard";

const SearchResults: React.FC = () => {
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
    <div className="flex flex-wrap justify-center w-full gap-12 mt-12 lg:gap-7 pb-12">
      <ResultCard />
    </div>
  );
};

export default SearchResults;
