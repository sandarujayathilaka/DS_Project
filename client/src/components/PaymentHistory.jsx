import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/api/build-client";

export default function PaymentHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/order/userorders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Table>
        <TableHeader className="bg-zinc-200">
          <TableRow>
            <TableHead>Invoice No</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.invoice}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              {order.courses.map((course) => (
                <TableCell key={course.courseId}>{course.title}</TableCell>
              ))}
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    order.paymentStatus === "paid"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">${order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
