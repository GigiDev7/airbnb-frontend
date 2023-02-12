import axios from "axios";
import React, { Suspense } from "react";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import { BASE_URL } from "../config";
import { IProperty } from "../interfaces";

const Favourites = () => {
  const data: any = useLoaderData();

  return (
    <Suspense
      fallback={<p className="flex justify-center mt-28">Loading...</p>}
    >
      <Await resolve={data.favourites}>
        {(favourites) => (
          <div className="mt-32">
            {favourites.length ? (
              favourites.map((item: IProperty) => (
                <ResultCard property={item} key={item._id} />
              ))
            ) : (
              <p>You don't have any favourited properties</p>
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

async function getFavourites(token: string) {
  try {
    const { data } = await axios.get(`${BASE_URL}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function loader() {
  const token = localStorage.getItem("token");
  if (token) {
    return defer({
      favourites: getFavourites(token),
    });
  } else {
    return redirect("/");
  }
}

export default Favourites;
