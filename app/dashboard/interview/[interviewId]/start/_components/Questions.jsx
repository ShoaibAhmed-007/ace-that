import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function Questions({ mockInterviewQues, activeQuest }) {
  console.log("Ques", mockInterviewQues);
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support Text to Speech!");
    }
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      {/* List of questions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQues &&
          mockInterviewQues.length > 0 &&
          mockInterviewQues.map((ques, index) => (
            <div
              key={index}
              className={`${
                activeQuest == index ? "bg-[#FF9202] text-gray-50" : ""
              } px-5 py-2 bg-gray-200 rounded-full text-center cursor-pointer text-xs`}
            >
              Question #{index + 1}
            </div>
          ))}
      </div>

      {/* Currently selected question */}
      <h2 className="my-5 text-lg">
        {mockInterviewQues &&
        mockInterviewQues.length > 0 &&
        mockInterviewQues[activeQuest]?.question
          ? mockInterviewQues[activeQuest].question
          : "No question selected"}
      </h2>

      {/* Text to Speech button */}
      <Volume2
        className="cursor-pointer"
        onClick={() => {
          if (
            mockInterviewQues &&
            mockInterviewQues.length > 0 &&
            mockInterviewQues[activeQuest]?.question
          ) {
            textToSpeech(mockInterviewQues[activeQuest].question);
          }
        }}
      />

      {/* Note section */}
      <div className="border rounded-lg p-5 bg-orange-200 my-10">
        <h2 className="flex gap-2 items-center text-orange-500">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <h2 className="text-orange-500 text-sm my-2">
          {process.env.NEXT_PUBLIC_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default Questions;
