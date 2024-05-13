import React from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  return (
    <div>
      <ReactConfetti
        className="pointer-events-none z-[100]"
        numberOfPieces={500}
        recycle={false}
      />
    </div>
  );
};

export default Confetti;
