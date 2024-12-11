import { useState, useEffect } from "react";
import axios from "axios";

const DailyLogForm = () => {
  const [formData, setFormData] = useState({
    mood: "",
    anxiety: "",
    sleep: "",
    sleepQuality: "",
    activity: "",
    social: "",
    stress: "",
    symptoms: "",
  });

  const token = JSON.parse(localStorage.getItem("token"));

  const userId = token ? token.id : null;
  console.log(userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You need to be logged in to submit your log.");
      return;
    }

    const logData = {
      moodRating: formData.mood,
      anxietyLevel: formData.anxiety,
      sleepHours: formData.sleep,
      sleepQuality: formData.sleepQuality,
      physicalActivity: formData.activity,
      socialInteraction: formData.social,
      stressLevel: formData.stress,
      depressionSymptoms: formData.symptoms,
      userId: userId,
    };

    try {
      // Make the POST request to save the log data
      const response = await axios.post("http://localhost:5000/api/log", logData);
      console.log("Data submitted successfully: ", response.data);
      alert("Your log has been submitted!");
      setFormData({
        mood: "",
        anxiety: "",
        sleep: "",
        sleepQuality: "",
        activity: "",
        social: "",
        stress: "",
        symptoms: "",
      });
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("There was an error submitting your log. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Daily Mental Health Log</h1>
      <form onSubmit={handleSubmit} className="log-form">
      <div className="form-group">
          <label htmlFor="anxiety">Mood  (1-5)</label>
          <input
            type="number"
            name="mood"
            min="1"
            max="5"
            value={formData.mood}
            onChange={handleChange}
            className="input-number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="anxiety">Anxiety Levels (1-10)</label>
          <input
            type="number"
            name="anxiety"
            min="1"
            max="10"
            value={formData.anxiety}
            onChange={handleChange}
            className="input-number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sleep">Hours of Sleep</label>
          <input
            type="number"
            name="sleep"
            min="0"
            max="24"
            value={formData.sleep}
            onChange={handleChange}
            className="input-number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sleepQuality">Sleep Quality:</label>
          <select
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
            className="input-text"
          >
            <option value="">Select</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="activity">Physical Activity</label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="E.g., Walking, Yoga"
            className="input-text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="social">Social Interactions</label>
          <input
            type="text"
            name="social"
            value={formData.social}
            onChange={handleChange}
            placeholder="E.g., 1 hour with friends"
            className="input-text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stress">Stress Levels (1-10)</label>
          <input
            type="number"
            name="stress"
            min="1"
            max="10"
            value={formData.stress}
            onChange={handleChange}
            className="input-number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Symptoms of Depression/Anxiety</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Describe any symptoms (optional)"
            className="input-textarea"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DailyLogForm;

