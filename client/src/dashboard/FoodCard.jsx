// import React from "react";
// import { FaCalendarAlt, FaCartArrowDown, FaHome } from "react-icons/fa";
// import "./FoodCard.css";

// const FoodCard = ({ name, quantity, date, address, tag }) => {
//   return (
//     <div>
//       <div class="card">
//         <p
//           style={{
//             position: "absolute",
//             top: "0.5rem",
//             left: "0.5rem",
//             padding: "0.5rem 1rem",
//             background: "#f5f5f5",
//             color: "#333",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             borderRadius: "0.5rem",
//           }}
//         >
//           {tag ? tag : "food"}
//         </p>
//         <img
//           className="foodcard-img"
//           src={`https://source.unsplash.com/random/?${name}`}
//           alt="Card Image"
//         />
//         <div class="card-content">
//           <h2 className="food-title">{name}</h2>
//           <div className="food-details">
//             <ul className="icons">
//               <li>
//                 <span className="icons-name">
//                   <FaCartArrowDown />
//                 </span>
//                 : {quantity} kg
//               </li>
//               <li>
//                 <span className="icons-name">
//                   <FaCalendarAlt />
//                 </span>
//                 : {date}
//               </li>
//               <li>
//                 <span className="icons-name">
//                   <FaHome />
//                 </span>
//                 : {address}
//               </li>
//             </ul>
//           </div>
//           <button className="food-btn">Check Status</button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;


// import React, { useState } from "react";
// import { FaCalendarAlt, FaCartArrowDown, FaHome } from "react-icons/fa";
// import "./FoodCard.css";

// const FoodCard = ({ name, quantity, date, address, tag }) => {
//   const [status, setStatus] = useState("Pending"); // Default status

//   const handleStatusChange = () => {
//     // Toggle between "Pending" and "Collected"
//     setStatus((prevStatus) => (prevStatus === "Pending" ? "Collected" : "Pending"));
//   };

//   return (
//     <div>
//       <div className="card">
//         <p
//           style={{
//             position: "absolute",
//             top: "0.5rem",
//             left: "0.5rem",
//             padding: "0.5rem 1rem",
//             background: "#f5f5f5",
//             color: "#333",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             borderRadius: "0.5rem",
//           }}
//         >
//           {tag ? tag : "food"}
//         </p>
//         <img
//           className="foodcard-img"
//           src={`https://source.unsplash.com/random/?${name}`}
//           alt="Card Image"
//         />
//         <div className="card-content">
//           <h2 className="food-title">{name}</h2>
//           <div className="food-details">
//             <ul className="icons">
//               <li>
//                 <span className="icons-name">
//                   <FaCartArrowDown />
//                 </span>
//                 : {quantity} kg
//               </li>
//               <li>
//                 <span className="icons-name">
//                   <FaCalendarAlt />
//                 </span>
//                 : {date}
//               </li>
//               <li>
//                 <span className="icons-name">
//                   <FaHome />
//                 </span>
//                 : {address}
//               </li>
//               <li>
//                 <strong>Status:</strong> {status}
//               </li>
//             </ul>
//           </div>
//           <button className="food-btn" onClick={handleStatusChange}>
//             {status === "Pending" ? "Mark as Collected" : "Mark as Pending"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;


// import React, { useState } from "react";
// import { FaCalendarAlt, FaCartArrowDown, FaHome } from "react-icons/fa";
// import "./FoodCard.css";

// const FoodCard = ({ id, name, quantity, date, address, tag, onStatusChange }) => {
//   const [status, setStatus] = useState("Pending");

//   const handleStatusChange = () => {
//     const newStatus = status === "Pending" ? "Collected" : "Pending";
//     setStatus(newStatus);

//     // If status becomes "Collected", notify parent to delete
//     if (newStatus === "Collected") {
//       onStatusChange(id);
//     }
//   };

//   return (
//     <div>
//       <div className="card">
//         <p
//           style={{
//             position: "absolute",
//             top: "0.5rem",
//             left: "0.5rem",
//             padding: "0.5rem 1rem",
//             background: "#f5f5f5",
//             color: "#333",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             borderRadius: "0.5rem",
//           }}
//         >
//           {tag || "food"}
//         </p>
//         <img
//           className="foodcard-img"
//           src={`https://source.unsplash.com/random/?${name}`}
//           alt="Card Image"
//         />
//         <div className="card-content">
//           <h2 className="food-title">{name}</h2>
//           <div className="food-details">
//             <ul className="icons">
//               <li>
//                 <span className="icons-name"><FaCartArrowDown /></span>: {quantity} kg
//               </li>
//               <li>
//                 <span className="icons-name"><FaCalendarAlt /></span>: {date}
//               </li>
//               <li>
//                 <span className="icons-name"><FaHome /></span>: {address}
//               </li>
//               <li>
//                 <strong>Status:</strong> {status}
//               </li>
//             </ul>
//           </div>
//           <button className="food-btn" onClick={handleStatusChange}>
//             {status === "Pending" ? "Mark as Collected" : "Mark as Pending"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;

import React, { useState } from "react";
import { FaCalendarAlt, FaCartArrowDown, FaHome, FaTimes } from "react-icons/fa";
import "./FoodCard.css";

const FoodCard = ({ id, name, quantity, date, address, tag, onStatusChange }) => {
  const [status, setStatus] = useState("Pending");

  const handleStatusChange = () => {
    const newStatus = status === "Pending" ? "Collected" : "Pending";
    setStatus(newStatus);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      onStatusChange(id);
    }
  };

  return (
    <div>
      <div className="card" style={{ position: "relative" }}>
        {/* Tag label */}
        <p className="tag-label">{tag || "food"}</p>

        {/* Delete (X) Button */}
        <button
          className="delete-btn"
          onClick={handleDeleteClick}
          title="Delete"
        >
          <FaTimes />
        </button>

        <img
          className="foodcard-img"
          src={`https://source.unsplash.com/random/?${name}`}
          alt="Card Image"
        />
        <div className="card-content">
          <h2 className="food-title">{name}</h2>
          <div className="food-details">
            <ul className="icons">
              <li>
                <span className="icons-name"><FaCartArrowDown /></span>: {quantity} kg
              </li>
              <li>
                <span className="icons-name"><FaCalendarAlt /></span>: {date}
              </li>
              <li>
                <span className="icons-name"><FaHome /></span>: {address}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
            </ul>
          </div>
          <button className="food-btn" onClick={handleStatusChange}>
            {status === "Pending" ? "Mark as Collected" : "Mark as Pending"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
