export const catchError = (err: any) => {
  const messages = err?.response?.data?.message;
  if (typeof messages === "string") {
    return { isError: true, message: messages };
  }
  if (messages && messages.length) {
    return { isError: true, message: messages[0].msg };
  } else {
    return {
      isError: true,
      message: "Something went wrong, please try again later",
    };
  }
};
