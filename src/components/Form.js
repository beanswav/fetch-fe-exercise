import React, { useState } from "react";

export default function Form() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");

  // This function will be called when the form is submitted
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate form data and submit it to your server
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Full Name:</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        value={username}
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
      <input
        type="text"
        id="occupation"
        name="occupation"
        value={occupation}
        onChange={handleChange}
      />
      <label htmlFor="occupation">Occupation:</label>
      <input
        type="text"
        id="occupation"
        name="occupation"
        value={occupation}
        onChange={handleChange}
      />
    </form>
  );
}
