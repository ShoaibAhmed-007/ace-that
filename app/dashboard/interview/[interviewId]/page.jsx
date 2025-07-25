"use client";
import { AceThat } from "../../../../utils/schema";
import { db } from "../../../../utils/db";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Ghost, Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState("");
  const [enableCam, setCam] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(AceThat)
      .where(eq(AceThat.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <>
      <div className="flex items-center gap-5  flex-col my-10">
        <h1 className="text-3xl font-bold">Let's Get Started</h1>
        <div className="flex justify-between w-full mt-5">
          <div className=" flex justify-center flex-col gap-5 w-[50%]">
            <div className="border rounded-lg p-10 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">Job Role/Job Position: </h2>
                <div className="text-xl">{interviewData.jobPosition}</div>
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">Job Description: </h2>
                <div className="text-xl">{interviewData.jobDesc}</div>
              </div>
              <div className="flex  items-center gap-3">
                <h2 className="text-xl font-bold">Experience: </h2>
                <div className="text-xl">
                  {interviewData.jobExperience} years
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex font-bold items-center text-yellow-500">
                <Lightbulb />
                Information
              </h2>
              <h2 className="mt-3 text-yellow-500">
                {process.env.NEXT_PUBLIC_INFO}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[45%]">
            {enableCam ? (
              <Webcam
                mirrored={true}
                onUserMedia={() => {
                  setCam(true);
                }}
                onUserMediaError={() => {
                  setCam(false);
                }}
                className="h-72 my-7"
              />
            ) : (
              <>
                <WebcamIcon className="h-72 w-full bg-gray-200 my-7 p-20 rounded-lg border" />
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => setCam(true)}
                >
                  Enable Web Camera and Microphone
                </Button>
              </>
            )}
          </div>
        </div>
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="py-6 px-20 text-2xl cursor-pointer hover:scale-105">
            Start
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Interview;
