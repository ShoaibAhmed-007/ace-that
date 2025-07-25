"use client";
import { db } from "../../../utils/db";
import { AceThat } from "../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(AceThat)
      .where(eq(AceThat.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(AceThat.id));

    console.log(result);
    setInterviewList(result);
  };
  return (
    <div className="my-3">
      <h2 className="font-medium text-xl">Previous Interview List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.length > 0 ? (
          interviewList?.map((interview, idx) => {
            return <InterviewItemCard key={idx} interview={interview} />;
          })
        ) : (
          <p className="text-gray-500 text-sm">No Interviews recorded.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewList;
