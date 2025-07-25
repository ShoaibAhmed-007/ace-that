import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

function InterviewItemCard({ interview }) {
  return (
    <div className="border rounded-lg p-3 shadow-sm">
      <h2 className="font-bold text-[#FF9202]">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400 ">
        Created At: {interview?.createdAt}{" "}
      </h2>
      <div className="flex justify-between mt-2 gap-2 px-2">
        <Link
          className="w-full"
          href={"/dashboard/interview/" + interview?.mockId + "/feedback"}
        >
          <Button className="cursor-pointer w-full" size="sm" variant="outline">
            Feedback
          </Button>
        </Link>
        <Link
          className="w-full"
          href={"/dashboard/interview/" + interview?.mockId}
        >
          <Button className="cursor-pointer w-full" size="sm">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewItemCard;
