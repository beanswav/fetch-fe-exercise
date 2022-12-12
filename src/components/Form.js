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
        console.log(value);
        setOccupation(value);
        break;
      case "location":
        console.log(value);
        setLocation(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      fullname.trim().length === 0 ||
      email.trim().length === 0 ||
      occupation === "" ||
      location === "" ||
      occupation === "Select occupation" ||
      location === "Select state"
    ) {
      alert("Please fill out all fields");
      return;
    }
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status >= 200 && res.status < 300) {
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
    <div className="form">
      <div className="form-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="username">
              Full Name:
            </label>
            <input
              className="form-input"
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="occupation">
              Occupation:
            </label>
            <select
              className="form-input"
              id="occupation"
              name="occupation"
              onChange={handleChange}
              defaultValue={occupation[0]}
            >
              <option value={null}>Select occupation</option>
              {mapJobs.map((job, idx) => (
                <option key={idx} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" htmlFor="location">
              State:
            </label>
            <select
              className="form-input"
              id="location"
              name="location"
              onChange={handleChange}
              defaultValue={states[0]}
            >
              <option value={null}>Select state</option>
              {states.map((state, idx) => (
                <option key={idx} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={(e) => handleSubmit(e)} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
