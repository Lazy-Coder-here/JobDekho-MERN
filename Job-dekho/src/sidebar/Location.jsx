import React from "react";
import InputField from "../components/InputField";
const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value="London"
          title="London"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Brussels"
          title="Brussels"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="San Francisco"
          title="San Francisco"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Seattle"
          title="Seattle"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Bangalore"
          title="Bangalore"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Hyderabad"
          title="Hyderabad"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
