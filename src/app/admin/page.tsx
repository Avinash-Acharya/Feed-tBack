"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePicker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import React, { useEffect } from "react";
// import Link from "next/link";
import axios from "axios";

const Page = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2018, 0, 1),
    to: addDays(new Date(2024, 0, 1), 20),
  });

  const formatDateAsYearMonthDate = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const fetchPDF = async () => {
    try {
      const fromDate = parseInt(formatDateAsYearMonthDate(date?.from), 10);
      const toDate = parseInt(formatDateAsYearMonthDate(date?.to), 10);
      const response = await axios.post(
        "api/admin/generate_feedback",
        { from: fromDate, to: toDate },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "feedback.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
    // console.log("From Date:", fromDate); // For debugging
    // console.log("To Date:", toDate);
  };

  useEffect(() => {
    console.log("Date Range: ", date);
  }, [date]);
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-fuchsia-600 to-pink-600 flex-col items-center justify-around sm:p-24">
      <h1 className="text-4xl sm:text-5xl font-bold shadow-2xl text-white">
        {"{"} <span className="underline underline-offset-2">Company Name</span>{" "}
        {"}"}
      </h1>
      <div>
        <div className="sm:flex justify-center sm:bg-slate-900 rounded-md items-center">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button className="sm:mt-0 mt-2" onClick={fetchPDF}>
            Generate Report
          </Button>
        </div>
        {/* <Button variant="secondary" className="mt-2">
          <Link href="/admin/viewReport">View Live Report</Link>
        </Button> */}
        <p className="text-slate-800 pt-1 text-sm">
          Download will start after clicking on{" "}
          <span className="text-stone-900 font-bold">Generate Report</span>,
          <br /> wait for a minute.
        </p>
      </div>
    </div>
  );
};

export default Page;
