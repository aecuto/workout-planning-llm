"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Form, Field } from "react-final-form";
import { setCookie } from "cookies-next";

export default function SignIn() {
  const { push } = useRouter();

  const onSubmit = async (values: any) => {
    axios.post("/api/auth/sign-in", values).then((res) => {
      if (res.status === 200) {
        push("/planning");
        setCookie("user", res.data._id);
      }
    });
  };

  return (
    <div>
      <p className="text-3xl text-bold mb-3">Sign In</p>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="email"
                  className="text-black p-2"
                />
              </div>

              <div>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="password"
                  className="text-black  p-2"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting || pristine}
                  className="bg-blue-500 hover:bg-blue-700 rounded-full p-2 cursor-pointer"
                >
                  Submit
                </button>

                <button
                  className="bg-green-500 hover:bg-green-700 rounded-full p-2 cursor-pointer"
                  onClick={() => push("/register")}
                  type="button"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}
