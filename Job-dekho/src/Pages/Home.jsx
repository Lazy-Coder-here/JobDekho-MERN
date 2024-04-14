import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import axios from "axios";
import BaseURL from "../Config/config";

const Home = () => {
  const [selectedCategory, setCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    async function getJobs() {
      const { data } = await axios.get(`${BaseURL}/all-jobs`);
      setJobs(data);
      setIsLoading(false);
    }
    getJobs();
  }, []);
  

  // handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio Filtering
  const handleChange = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  // button based filtering
  const handleClick = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // function to get the last page
  const lastPage = () => {
    return Math.ceil(filteredItems.length / itemsPerPage);
  };

  // main function
  const filterData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          salaryType,
          experienceLevel,
          postingDate,
          employmentType,
        }) => {
          const selectedJob = selected.toLowerCase();
          return (
            jobLocation.toLowerCase() === selectedJob ||
            parseInt(maxPrice) <= parseInt(selected) ||
            experienceLevel.toLowerCase() === selectedJob ||
            postingDate > selected ||
            salaryType.toLowerCase() === selectedJob ||
            employmentType.toLowerCase() === selectedJob
          );
        }
      );
    }

    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, ind) => <Card key={ind} data={data} />);
  };

  const result = filterData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />;
      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job card */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found!</p>
            </>
          )}

          {/* pagination */}

          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {lastPage()}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === lastPage()}
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* right side */}
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
