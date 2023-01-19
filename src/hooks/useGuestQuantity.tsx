import { useState } from "react";

export const useGuestQuantity = (adults: number = 0) => {
  const [guestQuantity, setGuestQuantity] = useState({
    Adults: { placeholder: "Ages 13 or above", quantity: adults },
    Children: { placeholder: "Ages 2-12", quantity: 0 },
    Infants: { placeholder: "Under 2", quantity: 0 },
    Pets: { placeholder: "", quantity: 0 },
  });

  const increaseQuantity = (field: keyof typeof guestQuantity) => {
    setGuestQuantity((prev) => {
      return {
        ...prev,
        [field]: { ...prev[field], quantity: prev[field].quantity + 1 },
      };
    });
  };

  const decreaseQuantity = (field: keyof typeof guestQuantity) => {
    setGuestQuantity((prev) => {
      if (prev[field].quantity == 0) {
        return { ...prev };
      }

      return {
        ...prev,
        [field]: { ...prev[field], quantity: prev[field].quantity - 1 },
      };
    });
  };

  const sumOfQuantities = () => {
    let text = "";
    const sum =
      guestQuantity.Adults.quantity +
      guestQuantity.Children.quantity +
      guestQuantity.Infants.quantity;
    if (sum === 0) text = "Add guests";
    if (sum === 1) text = "1 guest";
    if (sum > 1) text = `${sum} guests`;

    if (guestQuantity.Pets.quantity === 1) text = `${text}, 1 pet`;
    if (guestQuantity.Pets.quantity > 1)
      text = `${text} ${guestQuantity.Pets.quantity} pets`;

    return text;
  };

  return { guestQuantity, decreaseQuantity, increaseQuantity, sumOfQuantities };
};
