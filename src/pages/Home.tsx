import React, { useEffect, useState } from "react";
import image1 from "/travel.jpeg";
import image2 from "/eifel.jpg";
import image3 from "/venice.jpg";

const Home: React.FC = () => {
  const [images, setImages] = useState([
    {
      image: image1,
      text: "Escape for a while",
      desc: "Enjoy freedom of monthly stay on Airbnb.com",
    },
    {
      image: image2,
      text: "New year, new adventures",
      desc: "Save 15% or more",
    },
    {
      image: image3,
      text: "Top destinations for 2023",
      desc: "From spiritual seaside towns to hidden gems",
    },
  ]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => {
        if (prev == 2) return (prev = 0);
        return (prev += 1);
      });
    }, 5500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="my-12 flex justify-center items-center">
      <img
        className="relative rounded-xl w-[70%] h-[400px] animate-fade transition-all"
        src={images[activeImage].image}
        alt="image"
      />
      <div className="absolute animate-fade font-extrabold transition-all">
        <h2 className="text-2xl">{images[activeImage].text}</h2>
        <p className="text-xl">{images[activeImage].desc}</p>
      </div>
    </div>
  );
};

export default Home;
