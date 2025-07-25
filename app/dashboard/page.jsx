import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function page() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <p>Create and Start your AI Mockup Interview</p>
        </div>
        <div>
          <AddNewInterview />
        </div>
      </div>
      <InterviewList />
    </>
  );
}

export default page;
