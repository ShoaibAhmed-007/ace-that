"use client";

import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";

import React, { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);
      console.log("Feedback List.", result);
      let rate = 0;
      result.map((res) => {
        rate += Number(res.rating);
      });
      setRating(rate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10">
      {feedbackList.length > 0 ? (
        <>
          <h2 className="text-3xl font-semibold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-semibold text-2xl">
            Here is your Interview Feedback
          </h2>
          <h2 className="text-[#FF9202] text-lg my-3">
            Your overall Interview Rating:{" "}
            <strong>
              {(overallRating / feedbackList.length).toFixed(1)}/5
            </strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find interview questions with correct answer, your answer and
            feedback below for improvement
          </h2>

          <div className="my-10 flex flex-col gap-5">
            {feedbackList.map((feedback, index) => (
              <Collapsible
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                key={index}
              >
                <CollapsibleTrigger className="cursor-pointer font-semibold text-gray-900">
                  {feedback.question}
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-2 mt-2">
                  {/* Your Answer */}
                  <p
                    className={`${
                      feedback.rating < 3
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    } p-2 rounded-md font-semibold`}
                  >
                    Your Answer: {feedback.userAns}
                  </p>

                  {/* Correct Answer */}
                  <p className="bg-green-100 text-green-700 p-2 rounded-md font-semibold">
                    Correct Answer: {feedback.correctAnswer}
                  </p>

                  {/* Improvement Feedback */}
                  <p className="bg-yellow-100 text-yellow-900 p-2 rounded-md">
                    Improvement Feedback: {feedback.feedback}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <Button
            className="cursor-pointer"
            onClick={() => router.replace("/dashboard")}
          >
            Go Home
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold">No Feedback Available</h2>
          <p className="text-gray-500">
            Currently there’s no feedback for this interview.
          </p>

          <Button
            className="cursor-pointer"
            onClick={() => router.replace("/dashboard")}
          >
            Go Home
          </Button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
