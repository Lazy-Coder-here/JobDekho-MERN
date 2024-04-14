import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { TfiBag } from "react-icons/tfi";
import { GrLocation } from "react-icons/gr";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import BaseURL from "../Config/config";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [skills, setSkills] = useState([]);
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`${BaseURL}/all-jobs/${id}`);
      setJob(data);
      setSkills(data.skills);
    }
    getData();
  }, []);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 space-y-8">
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <Link to="/" className="text-blue underline px-0 py-2">
        Back to Jobs
      </Link>
      <div className="px-6 pr-80">
        <div className="flex flex-row justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl text-blue font-semibold ">
                {job.jobTitle}
              </h1>
              <h3 className="font-bold text-md">{job.companyName}</h3>
            </div>
            <div className="space-x-6 flex flex-row">
              <h3 className="flex flex-row space-x-1 items-center opacity-80">
                {" "}
                <TfiBag /> <p>{job.employmentType}</p>{" "}
              </h3>
              <h3 className="flex flex-row space-x-1 items-center opacity-80">
                {" "}
                <GrLocation /> <p>{job.jobLocation}</p>{" "}
              </h3>
              <h3 className="flex flex-row space-x-1 items-center opacity-80">
                {" "}
                <MdOutlineDateRange /> <p> Posted on {job.postingDate}</p>{" "}
              </h3>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="flex flex-row items-center space-x-4">
                <p>Salary :</p>{" "}
                <div className="flex flex-row items-center">
                  <FaIndianRupeeSign /> <p>{job.minPrice}K</p>
                  <p className="px-1">-</p>
                  <FaIndianRupeeSign /> <p>{job.maxPrice}K</p>
                </div>
              </h2>
              <h2 className="flex flex-row items-center space-x-4">
                <p>Required Experience Level :</p> <p>{job.experienceLevel}</p>
              </h2>
            </div>
          </div>
          <div className="space-y-10 items-center">
            <img
              src={job.companyLogo}
              className="w-20 h-20 rounded-full shadow-sm mb-6"
            />
            <button
              className="bg-blue px-8 py-2 mt-4 mr-20  text-white rounded"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="mt-4 text-lg pb-2 font-semibold">Job Description :</h2>
          <p
            dangerouslySetInnerHTML={{ __html: job.description }}
            className="px-4"
          ></p>
          <div className="space-y-4">
            <h2 className="mt-4 text-lg font-semibold">Required Skills:</h2>
            <ul className="ml-4 space-x-4 flex flex-row items-center">
              {skills.map(({ label, value }) => (
                <li
                  key={value}
                  className="bg-gray-200 rounded-xl shadow-md border-solid-black p-2"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
