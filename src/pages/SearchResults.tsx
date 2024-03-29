import React, { useEffect, Suspense } from "react";
import ResultCard from "../components/ResultCard";
import { MdFilterListAlt } from "react-icons/md";
import { useToggleWindow } from "../hooks/useWindow";
import FilterModal from "../components/FilterModal";
import axios from "axios";
import { BASE_URL } from "../config";
import { catchError } from "../utils/httpErrorHelper";
import { defer, useLoaderData, Await } from "react-router-dom";
import { IProperty } from "../interfaces";
import { calculateGuestsFromParams } from "../utils/queryParamsHelper";

const SearchResults: React.FC = () => {
  const filterWindow = useToggleWindow();
  const data: any = useLoaderData();

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
    <Suspense
      fallback={<p className="text-center mt-28 font-medum">Loading...</p>}
    >
      <Await resolve={data.properties}>
        {(properties) => (
          <div className="flex mt-16 flex-col">
            {filterWindow.isWindowShown && (
              <FilterModal hideModal={filterWindow.hideWindow} />
            )}
            <div
              onClick={filterWindow.showWindow}
              className="mt-12 border-[1px] rounded-md p-2 cursor-pointer w-fit self-end fixed top-30 z-40 bg-white"
            >
              <button className="flex items-center text-md">
                <MdFilterListAlt className="mr-1" /> Filters
              </button>
            </div>
            {!properties.isError && properties.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-12 mt-24 lg:gap-20 pb-12">
                {properties.map((item: IProperty) => (
                  <ResultCard key={item._id} property={item} />
                ))}
              </div>
            )}
            {!properties.isError && !properties.length && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-12 mt-24 lg:gap-20 pb-12">
                <p>Properties not found</p>
              </div>
            )}
            {properties.isError && (
              <div className="mt-16">
                <p>{properties.message}</p>
              </div>
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

async function getProperties(url: string) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export function loader({ request }: { request: any }) {
  const index = request.url.indexOf("?");
  const searchParams = calculateGuestsFromParams(request.url.slice(index));

  const url = `${BASE_URL}/property?${searchParams}`;

  return defer({
    properties: getProperties(url),
  });
}

export default SearchResults;
