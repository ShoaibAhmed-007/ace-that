"use client";
import React, { useEffect, useState } from "react";
import { AceThat } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
// Lazy-load components to avoid server-side rendering
import dynamic from "next/dynamic";

import { Button } from "../../../../../components/ui/button";
import Link from "next/link";

// Lazy-load components (this prevents them from accessing `navigator` on the server side)
const Questions = dynamic(() => import("./_components/Questions"), {
  ssr: false,
});
const RecordAnswer = dynamic(() => import("./_components/RecordAnswer"), {
  ssr: false,
});

// Main Component
function StartInterview({ params }) {
  const [activeQues, setActiveQues] = useState(0);
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQues, setMockQues] = useState([]);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(AceThat)
        .where(eq(AceThat.mockId, params.interviewId));

      if (result.length > 0) {
        console.log(
          result[0].jsMockResp.replace("```json", "").replace("```", ""),
          "Raw"
        );

        const jsonMockResp = JSON.parse(
          result[0].jsMockResp.replace("```json", "").replace("```", "")
        );

        setMockQues(jsonMockResp);
        console.log(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex gap-10">
        <div className="w-1/2">
          {/* Loading fallback can be implemented in dynamic if needed*/}
          <Questions
            mockInterviewQues={mockInterviewQues}
            activeQuest={activeQues}
          />
        </div>
        <div className="w-1/2">
          <RecordAnswer
            mockInterviewQues={mockInterviewQues}
            activeQuest={activeQues}
            interviewData={interviewData}
          />
        </div>
      </div>

      <div className="flex justify-end gap-6">
        {activeQues > 0 && (
          <Button
            className="cursor-pointer"
            onClick={() => setActiveQues(activeQues - 1)}
          >
            Previous Question
          </Button>
        )}

        {activeQues < mockInterviewQues.length - 1 && (
          <Button
            className="cursor-pointer"
            onClick={() => setActiveQues(activeQues + 1)}
          >
            Next Question
          </Button>
        )}

        {activeQues == mockInterviewQues.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button className="cursor-pointer">End Interview</Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default StartInterview;
