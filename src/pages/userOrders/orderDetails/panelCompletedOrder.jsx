// import React, { useState } from "react";
// import { Confirm, Label, Message } from "semantic-ui-react";
// import OrdersDetails from "./orderDetails";

// const PanelCompletedOrders = (orders) => {
//   const [open, setOpen] = useState(false);

//   const handleConfirm = () => {
//     console.log("handle confirm");
//   };

//   orders.map((order) => {
//     return {
//       key: order.id,
//       title: {
//         content: (
//           <Label
//             color="blue"
//             content={`${order.orderItem.car.carModel} returned on ${new Date(
//               order.orderItem.dateReturn.seconds * 1000
//             ).toDateString()}`}
//           />
//         ),
//       },
//       content: {
//         content: (
//           <div>
//             <Message
//               info
//               header={`Order reference - ${order.id}`}
//               content={() => (
//                 <OrdersDetails
//                   {...order.orderItem}
//                   handleConfirm={handleConfirm}
//                 />
//               )}
//             />
//           </div>
//         ),
//       },
//     };
//   });
// };

// export default PanelCompletedOrders;
