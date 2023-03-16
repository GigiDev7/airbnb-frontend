import axios from "axios";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import {
  defer,
  redirect,
  Await,
  useLoaderData,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { BASE_URL } from "../config";
import { catchError } from "../utils/httpErrorHelper";
import { IBooking } from "../interfaces";

const ProfileBookings = () => {
  const data: any = useLoaderData();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("active");

  return (
    <Suspense fallback={<p className="flex justify-center">Loading...</p>}>
      <Await resolve={data.bookings}>
        {(bookings) => (
          <div className="w-full">
            {!bookings.isError && (
              <Link
                to={active ? "" : "?active=true"}
                className="flex justify-center w-fit mb-8 mx-auto bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600"
              >
                {navigation.state === "loading"
                  ? "Loading..."
                  : active
                  ? "Show all bookings"
                  : "Show active bookings"}
              </Link>
            )}
            {!bookings.isError && bookings.length > 0 && (
              <div className="w-full flex flex-col justify-center mt-12">
                {bookings.map((booking: IBooking) => (
                  <div
                    className="flex bg-green-500 justify-between text-white py-12 rounded-md w-full px-6 mx-auto"
                    key={booking._id}
                  >
                    <div className="flex flex-col items-center">
                      <h2>Dates</h2>
                      <p>
                        {new Date(booking.checkIn).toDateString()} -{" "}
                        {new Date(booking.checkOut).toDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <h2>Number of guests</h2>
                      <p>{booking.guests}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <h2>Price</h2>
                      <p>{booking.totalPrice}$</p>
                    </div>
                    <Link
                      target="_blank"
                      className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md flex items-center"
                      to={`/property/${booking.property._id}`}
                    >
                      See property
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {bookings.isError && <p>{bookings.message}</p>}
            {!bookings.isError && !bookings.length && (
              <p>You don't have any {active && "active"} bookings</p>
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
