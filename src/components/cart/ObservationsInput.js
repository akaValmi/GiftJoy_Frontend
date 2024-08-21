import { useState, useEffect } from "react";

export default function ObservationsInput({ itemId }) {
  const [observation, setObservation] = useState("");

  useEffect(() => {
    const savedObservation = localStorage.getItem(`observation-${itemId}`);
    if (savedObservation) {
      setObservation(savedObservation);
    }
  }, [itemId]);

  const handleObservationChange = (e) => {
    setObservation(e.target.value);
    localStorage.setItem(`observation-${itemId}`, e.target.value);
  };

  return (
    <textarea
      className="border p-2 w-full mt-2"
      placeholder="Añade tus observaciones..."
      value={observation}
      onChange={handleObservationChange}
    />
  );
}
