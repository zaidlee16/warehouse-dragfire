import { Button, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../utils/SupaClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Login Failed!");
      } else if (data) {
        window.location.href = "/";
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <div>
      <section className=" flex h-screen justify-center items-center flex-col">
        <div className=" card ">
          <form
            className=" flex flex-col gap-3 p-3 border rounded-lg border-black"
            onSubmit={handleSubmit}
          >
            <h2 className=" text-2xl text-center ">Login Page</h2>

            <label htmlFor="email">
              Email{" "}
              <input
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full rounded-md "
              />
            </label>

            <label htmlFor="password">
              Password{" "}
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" w-full rounded-md "
              />
            </label>

            <Button color="primary" type="submit">
              Login
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
