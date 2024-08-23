"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePicker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import axios from "axios";

const Page = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2018, 0, 1),
    to: addDays(new Date(2024, 0, 1), 20),
  });
  const [openaiKey, setOpenaiKey] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(!(openaiKey.length > 30) && !isOfflineMode);
  }, [openaiKey, isOfflineMode]);

  const formatDateAsYearMonthDate = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const fetchPDF = async () => {
    try {
      const pyurl = isOfflineMode
        ? "/api/admin/generate_feedback"
        : "/api/admin/openaiFeedback";
      const fromDate = parseInt(formatDateAsYearMonthDate(date?.from), 10);
      const toDate = parseInt(formatDateAsYearMonthDate(date?.to), 10);
      const response = await axios.post(
        pyurl,
        { from: fromDate, to: toDate, key: openaiKey },
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
      const filename = `feedback_${fromDate}-${toDate}.pdf`;
      link.setAttribute("download", filename);
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
        <div className="flex items-center space-x-2">
          <Switch
            id="Offline-mode"
            // checked={isOfflineMode}
            onChange={() => setIsOfflineMode(!isOfflineMode)}
          />
          <Label htmlFor="Offline-mode">Offline Mode</Label>
        </div>
        {!isOfflineMode && (
          <div className="grid w-full mb-3 max-w-sm items-center gap-1.5">
            <Label className="text-slate-900" htmlFor="openai">
              Enter the OpenAPI Key to Generate Report
            </Label>
            <Input
              type="password"
              id="openai"
              placeholder="Enter OpenAPI Key"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
            />
          </div>
        )}
        <div className="sm:flex justify-center sm:bg-slate-900 rounded-md items-center">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button
            className="sm:mt-0 mt-2"
            onClick={fetchPDF}
            disabled={isButtonDisabled}
          >
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
