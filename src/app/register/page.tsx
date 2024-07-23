"use client";

import { FORM_ERROR } from "final-form";
import { useRouter } from "next/navigation";
import { Form, Field } from "react-final-form";

export default function Register() {
  const { push } = useRouter();
  const onSubmit = async (values: any) => {
    return fetch("/api/auth/register", {
      body: JSON.stringify(values),
      method: "POST",
    }).then((res) => {
      if (res.status === 200) {
        push("/");
      }
      return { [FORM_ERROR]: "email exists!" };
    });
  };

  return (
    <div>
      <p className="text-3xl text-bold mb-3">Register</p>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, submitError }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="email"
                  class="text-black p-2"
                />
              </div>

              <div>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="password"
                  class="text-black  p-2"
                />
              </div>
              {submitError && <div className="text-red-500">{submitError}</div>}
              <div>
                <button
                  type="submit"
                  disabled={submitting || pristine}
                  className="bg-sky-500 hover:bg-sky-700 rounded-full p-2 cursor-pointer"
                >
                  Submit
                </button>

                <button
                  className="bg-green-500 hover:bg-green-700 rounded-full p-2 cursor-pointer"
                  onClick={() => push("/")}
                >
                  Sign-In
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}
