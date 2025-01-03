import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
 

const UserProfile = () => {
    const user = JSON.parse(sessionStorage.getItem("user")); 
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "maintain weight",
    calories_per_day: "",
    profile_picture: null,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Učitavanje profila
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profiles", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.data.length > 0) {
          setProfile(response.data[0]); // Pretpostavka: jedan profil po korisniku
          setFormData({
            age: response.data[0].age,
            weight: response.data[0].weight,
            height: response.data[0].height,
            goal: response.data[0].goal,
            calories_per_day: response.data[0].calories_per_day,
            profile_picture: null,
          });
        }
      } catch (err) {
        setError("Greška prilikom učitavanja profila.");
      }
    };

    fetchProfile();
  }, [user.token]);

  // Rukovanje unosom u formi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  // Podnošenje forme
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      if (profile) {
        // Ažuriranje profila
        await axios.post(
          `http://127.0.0.1:8000/api/profiles/${profile.id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccessMessage("Profil uspešno ažuriran.");
      } else {
        // Kreiranje novog profila
        await axios.post("http://127.0.0.1:8000/api/profiles", form, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccessMessage("Profil uspešno kreiran.");
      }
    } catch (err) {
      setError(err.response?.data?.errors || "Došlo je do greške.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h1>{profile ? "Ažuriraj svoj profil" : "Kreiraj svoj profil"}</h1>
      {error && <p className="error-message">{JSON.stringify(error)}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Godine:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Težina (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Visina (cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Cilj:
          <select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            required
          >
            <option value="lose weight">Smršati</option>
            <option value="maintain weight">Održavati težinu</option>
            <option value="gain weight">Dobiti težinu</option>
          </select>
        </label>
        <label>
          Kalorije po danu:
          <input
            type="number"
            name="calories_per_day"
            value={formData.calories_per_day}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Slika profila:
          <input type="file" name="profile_picture" onChange={handleFileChange} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Čuvanje..." : profile ? "Ažuriraj" : "Kreiraj"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
