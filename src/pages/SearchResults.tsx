import React, { useEffect } from "react";
import ResultCard from "../components/ResultCard";
import { MdFilterListAlt } from "react-icons/md";
import { useToggleWindow } from "../hooks/useWindow";
import FilterModal from "../components/FilterModal";
import axios from "axios";
import { BASE_URL } from "../config";

const SearchResults: React.FC = () => {
  const filterWindow = useToggleWindow();

  useEffect(() => {
    const handler = () => {
      const maxHeight = document.body.offsetHeight - window.innerHeight;
      if (maxHeight - window.scrollY < 300) {
        console.log("scroll works!");
        document.removeEventListener("scroll", handler);
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div className="flex mt-16 flex-col">
      {filterWindow.isWindowShown && (
        <FilterModal hideModal={filterWindow.hideWindow} />
      )}
      <div
        onClick={filterWindow.showWindow}
        className="mt-8 border-[1px] rounded-md p-2 cursor-pointer w-fit self-end fixed top-30 z-50 bg-white"
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

export async function loader({ request }: { request: any }) {
  const index = request.url.indexOf("?");
  const searchParams = new URLSearchParams(request.url.slice(index));
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const pets = searchParams.get("pets");
  let guests = 0;
  if (adults) guests += +adults;
  if (children) guests += +children;
  if (infants) guests += +infants;
  searchParams.delete("adults");
  searchParams.delete("children");
  searchParams.delete("infants");
  searchParams.delete("pets");
  searchParams.append("guests", guests.toString());

  const url = `${BASE_URL}/property?${searchParams.toString()}`;
  const { data } = await axios.get(url);
  console.log(data);

  return true;
}

export default SearchResults;
