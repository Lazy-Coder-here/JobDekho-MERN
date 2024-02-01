import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const UpdateJobs = () => {
  const {
    _id,
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
  } = useLoaderData();

  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data);
    fetch(`http://localhost:3000/update-job/${_id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job Updated Successfully!");
        }
        reset();
      });
  };

  const options = [
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Express", label: "Express" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
    { value: "C", label: "C" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* form */}

      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder="Ex: Web Developer"
                defaultValue={jobTitle}
                {...register("jobTitle", { required: true, maxLength: 50 })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                defaultValue={companyName}
                {...register("companyName", { required: true, maxLength: 50 })}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="Ex: $20k"
                defaultValue={minPrice}
                {...register("minPrice", { required: true, maxLength: 10 })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="Ex: $100k"
                defaultValue={maxPrice}
                {...register("maxPrice", { required: true, maxLength: 10 })}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register("salaryType")}
                className="create-job-input"
                defaultValue={salaryType}
              >
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: Bangalore"
                defaultValue={jobLocation}
                {...register("jobLocation", { maxLength: 20 })}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                defaultValue={postingDate}
                {...register("postingDate", { maxLength: 20 })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
                defaultValue={experienceLevel}
              >
                <option value="">Choose your experience</option>
                <option value="Any experience">Any experience</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo url here"
                defaultValue={companyLogo}
                {...register("companyLogo", { maxLength: 20 })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
                defaultValue={employmentType}
              >
                <option value="">Choose employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description")}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-400"
              rows={6}
              placeholder="Enter your description here"
              defaultValue={description}
            />
          </div>

          {/* last row */}
          <div>
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              placeholder="your email"
              defaultValue={postedBy}
              {...register("postedBy", { maxLength: 20 })}
              className="create-job-input"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJobs;
