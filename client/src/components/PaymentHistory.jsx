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
import { Button } from "./ui/button";
import useUserStore from "@/stores/auth";
import toast from "react-hot-toast";

export default function PaymentHistory() {
  const [orders, setOrders] = useState([]);
  const user = useUserStore((state) => state.user);

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

  const handleClick = async (invoice, date, price, method, status) => {
    try {
      const response = await api.post("/email/sentone", {
        userEmail: user.email,
        invoice,
        date,
        price,
        method,
        status,
      });
      toast.success("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

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
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Get Mail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) =>
            order.courses.map((course, index) => (
              <TableRow key={`${order.invoice}-${index}`}>
                {index === 0 && (
                  <>
                    <TableCell
                      rowSpan={order.courses.length}
                      className="font-medium"
                    >
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell rowSpan={order.courses.length}>
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
                    <TableCell rowSpan={order.courses.length}>
                      {order.paymentMethod}
                    </TableCell>
                    <TableCell rowSpan={order.courses.length}>
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </TableCell>
                    <TableCell rowSpan={order.courses.length}>
                      ${order.totalPrice}
                    </TableCell>
                    <TableCell
                      rowSpan={order.courses.length}
                      className="text-right p-2"
                    >
                      <Button
                        className="bg-orange-500 h-7 hover:bg-green-500"
                        onClick={() =>
                          handleClick(
                            order.orderNumber,
                            new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }),
                            order.totalPrice,
                            order.paymentMethod,
                            order.paymentStatus
                          )
                        }
                      >
                        Email
                      </Button>
                    </TableCell>
                  </>
                )}
                {index !== 0 && <TableCell>{course.title}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
