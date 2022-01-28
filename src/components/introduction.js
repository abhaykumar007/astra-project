import React from "react";
function Introduction(props) {
  const kid = props.kid;
  return (
    <div>
      <div className="inside-container">
        <img src={kid} alt="dog" />

        <div>
          <h4>Saurabh Mantri</h4>
          <h5 style={{ color: "gray" }}>Class 4A</h5>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
