import axios from "axios";
import React, { Suspense } from "react";
import { defer, redirect, useLoaderData, Await } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import { BASE_URL } from "../config";
import { IProperty } from "../interfaces";
import { catchError } from "../utils/httpErrorHelper";

const ProfileProperties = () => {
  const data: any = useLoaderData();

  return (
    <Suspense fallback={<p className="flex justify-center">Loading...</p>}>
      <Await resolve={data.properties}>
        {(properties) => (
          <div className="w-full">
            {!properties.isError && properties.length > 0 && (
              <div>
                {properties.map((item: IProperty) => (
                  <ResultCard key={item._id} property={item} isEdit={true} />
                ))}
              </div>
            )}
            {!properties.isError && !properties.length && (
              <p>You don't have any properties posted</p>
            )}
            {properties.isError && <p>{properties.message}</p>}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

async function getProperties(ownerId: string, token: string) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/property?ownerId=${ownerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export function loader() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (user && token) {
    const id = JSON.parse(user)._id;

    return defer({
      properties: getProperties(id, token),
    });
  }

  return redirect("/");
}

export default ProfileProperties;
