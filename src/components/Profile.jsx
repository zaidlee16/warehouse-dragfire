import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    avatar_url: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (error) console.error("Error loading profile:", error);
      else setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { error } = await supabase.from("profiles").upsert(profile);

    if (error) alert("Failed to save profile");
    else alert("Profile saved successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
      <div className="flex flex-col gap-4 items-center max-w-lg lg:max-w-2xl mx-auto">
        {/* Avatar Preview */}
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="Avatar Preview"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        {/* Form Fields */}
        <input
          type="text"
          name="full_name"
          value={profile.full_name}
          placeholder="Full Name"
          onChange={handleInputChange}
          className="input-field w-full p-3 border rounded"
        />
        <input
          type="text"
          name="username"
          value={profile.username}
          placeholder="Username"
          onChange={handleInputChange}
          className="input-field w-full p-3 border rounded"
        />
        <input
          type="text"
          name="avatar_url"
          value={profile.avatar_url}
          placeholder="Avatar URL"
          onChange={handleInputChange}
          className="input-field w-full p-3 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={profile.phone}
          placeholder="Phone Number"
          onChange={handleInputChange}
          className="input-field w-full p-3 border rounded"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          placeholder="Email"
          onChange={handleInputChange}
          className="input-field w-full p-3 border rounded"
        />

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-3 rounded mt-6 hover:bg-blue-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
