import React, { useState, useEffect } from "react";

export default function Form() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");

  const [mapJobs, setMapjobs] = useState([]);
  const [states, setStates] = useState([]);

  // This function will be called when the form is submitted
  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "fullname":
        setFullname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "occupation":
        setOccupation(value);
        break;
      case "location":
        setLocation(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: validate form data and submit it to your server
    try {
      let res = await fetch(
        "https://frontend-take-home.fetchrewards.com/form",
        {
          method: "POST",
          body: JSON.stringify({
            name: fullname,
            email: email,
            password: password,
            occupation: occupation,
            state: location,
          }),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.states === 200) {
        setFullname("");
        setEmail("");
        setPassword("");
        alert("User created");
      } else {
        alert("Error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((results) => results.json())
      .then((data) => {
        setMapjobs(data.occupations);
        setStates(data.states);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Full Name:</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        value={fullname}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <label htmlFor="occupation">Occupation:</label>
      <select
        id="occupation"
        name="occupation"
        value={occupation}
        onChange={handleChange}
      >
        {mapJobs.map((job, idx) => (
          <option key={idx} value={job}>
            {job}
          </option>
        ))}
      </select>
      <label htmlFor="location">State:</label>
      <select
        id="location"
        name="location"
        value={location}
        onChange={handleChange}
      >
        {states.map((state, idx) => (
          <option key={idx} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <button onClick={(e) => handleSubmit(e)} type="submit">
        Submit
      </button>
    </form>
  );
}
