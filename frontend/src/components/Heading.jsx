import React from "react";

const Heading = ({ label }) => {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold">{label}</h2>
    </div>
  );
};

export default Heading;
