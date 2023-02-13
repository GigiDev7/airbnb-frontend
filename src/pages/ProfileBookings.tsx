import axios from "axios";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import {
  defer,
  redirect,
  Await,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { BASE_URL } from "../config";
import { catchError } from "../utils/httpErrorHelper";

const ProfileBookings = () => {
  const data: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("active");

  return (
    <Suspense fallback={<p className="flex justify-center">Loading...</p>}>
      <Await resolve={data.bookings}>
        {(bookings) => (
          <div className="w-full">
            {!bookings.isError && bookings.length > 0 && (
              <div className="w-full flex flex-col">
                <Link
                  to={active ? "" : "?active=true"}
                  className="mb-12 mx-auto bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600"
                >
                  {active ? "Show all bookings" : "Show active bookings"}
                </Link>
                {bookings.map((booking: any, index: number) => (
                  <p key={index}>booking</p>
                ))}
              </div>
            )}
            {bookings.isError && <p>{bookings.message}</p>}
            {!bookings.isError && !bookings.length && (
              <p>You don't have any bookings</p>
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

async function getBookings(token: string, active: string | null) {
  let url = `${BASE_URL}/bookings`;
  if (active) url += "?active=true";
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export function loader({ request }: { request: any }) {
  const url = new URL(request.url);
  const active = url.searchParams.get("active");
  const token = localStorage.getItem("token");
  if (token) {
    return defer({
      bookings: getBookings(token, active),
    });
  }

  return redirect("/");
}

export default ProfileBookings;
