"use client";
import { useEffect, useState } from "react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { nanoid } from "nanoid";
import { db } from "../../../utils/db";
import { useUser } from "@clerk/nextjs";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Ghost, Loader2 } from "lucide-react";
import { AceThat } from "../../..//utils/schema";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  const { user } = useUser();

  const count = process.env.NEXT_PUBLIC_COUNT;
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobDesc, jobPosition, experience);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobPosition,
          jobDesc,
          experience,
          count,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        const final = data.questions;
        // .replace("```json", "").replace("```", "");
        console.log(final, "FINAL");
        setJsonResponse(final);
        const resp = await db
          .insert(AceThat)
          .values({
            mockId: nanoid(),
            jsMockResp: JSON.stringify(final),
            jobDesc: jobDesc,
            jobPosition: jobPosition,
            jobExperience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: AceThat.mockId });
        console.log("Questions from Gemini!", final);
        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }

        // You can now use this (setQuestions state, or show somewhere in UI)
      } else {
        console.error("Error retrieving from Gemini.");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="py-[2em] px-[5em] bg-gray-200 rounded-xl hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        + Add New
      </button>
      <Dialog open={openDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="p-10 min-w-[40em]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className="font-bold text-black text-[27px]">
                Tell us more about Job you are interviewing
              </div>
              <form onSubmit={onSubmit}>
                Add details about job position, your skills and years of
                experience
                <div className="flex flex-col gap-3 my-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="position">Job Position/ Role name</label>
                    <Input
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="bg-gray-200"
                      placeholder="Ex. Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="position">
                      Job Description/ Tech Stack in short
                    </label>
                    <Textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      required
                      className="bg-gray-200"
                      placeholder="Ex. Short job description such as NodeJS, ReactJS, Express, MySQL, etc"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="position">No of experience years</label>
                    <Input
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                      className="bg-gray-200"
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-5">
                  <Button
                    type="button"
                    className="cursor-pointer"
                    variant={Ghost}
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        {" "}
                        <Loader2 className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewInterview;
