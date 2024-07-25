"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Field, Form } from "react-final-form";
import { Wizard, useWizard } from "react-use-wizard";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import SignOut from "@/app/(after-auth)/Sign-out";

export default function Planning() {
  const { push } = useRouter();
  const onSubmit = (values: any) => {
    axios
      .post(
        "/api/plan",
        {
          name: values.plan_name,
          content: values.planning,
        },
        { headers: { Authorization: `${getCookie("user")}` } }
      )
      .then(() => {
        push("/dashboard");
      });
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 content-center">
              <Wizard>
                <Step1 />
                <Step2 values={values} />
                <Step3 values={values} form={form} />
              </Wizard>
            </div>
          </form>
        )}
      />

      <button
        className="bg-red-500 w-full rounded p-2  mt-[100px]"
        onClick={() => push("/dashboard")}
      >
        Go to Dashboard
      </button>
      <SignOut />
    </div>
  );
}

const Step1 = () => {
  const { nextStep, activeStep, stepCount } = useWizard();

  return (
    <>
      <div>
        <p>
          Personal Information ({activeStep + 1}/{stepCount})
        </p>
      </div>

      <div>
        <Field
          name="plan_name"
          component="input"
          type="text"
          placeholder="plan name"
          className="text-black p-2"
        />
      </div>
      <div>
        <Field
          name="dob"
          component="input"
          type="text"
          placeholder="date of birth (yyyy-mm-dd)"
          className="text-black p-2"
        />
      </div>
      <div>
        <Field
          name="height"
          component="input"
          type="number"
          placeholder="Height (cm)"
          className="text-black p-2"
        />
      </div>
      <div>
        <Field
          name="weight"
          component="input"
          type="number"
          placeholder="Weight (kg)"
          className="text-black p-2"
        />
      </div>
      <div>
        <Field
          name="weekly_activities"
          component="input"
          type="text"
          placeholder="Weekly activities"
          className="text-black p-2"
        />
      </div>
      <button
        onClick={() => nextStep()}
        type="button"
        className="bg-orange-500 hover:bg-orange-300"
      >
        Next
      </button>
    </>
  );
};

const Step2 = ({ values }: any) => {
  const { previousStep, nextStep, activeStep, stepCount } = useWizard();
  const [goals, setGoals] = useState<string[]>([]);

  const getGoals = async () => {
    setGoals([]);
    const plan = `Plan Name: ${values.plan_name || "_"}. `;
    const dob = `Date of birth: ${values.dob || "_"}. `;
    const height = `Height: ${values.height || "_"}cm. `;
    const weight = `Weight: ${values.weight || "_"}kg. `;
    const activity = `Weekly activities: ${values.weekly_activities}. `;

    let content = plan + dob + height + weight;

    if (values.weekly_activities) {
      content = content + activity;
    } else {
      content = content;
    }

    if (content.includes("_")) return;

    return axios.post("/api/llm/goals", { content }).then((res) => {
      setGoals(JSON.parse(res.data.content));
    });
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <>
      <p>
        Workout goal ({activeStep + 1}/{stepCount})
      </p>
      <div>
        <div className="animate-bounce text-xl  text-green-500">
          {!goals?.length ? "Generate goals from ai...." : null}
        </div>
        {goals?.map((goal) => (
          <Field name="goal" key={goal}>
            {({ input, meta }) => (
              <div
                className={`${
                  input.value === goal ? "bg-blue-500" : "bg-blue-700"
                } p-2 rounded mb-2 cursor-pointer`}
                onClick={() => {
                  input.onChange(goal);
                }}
              >
                {goal}
              </div>
            )}
          </Field>
        ))}
      </div>
      <button
        onClick={() => nextStep()}
        type="button"
        className="bg-orange-500 hover:bg-orange-300"
      >
        Next
      </button>
      <button
        onClick={() => previousStep()}
        type="button"
        className="bg-teal-500 hover:bg-teal-300"
      >
        Previous
      </button>
    </>
  );
};

const Step3 = ({ values, form }: any) => {
  const { previousStep, activeStep, stepCount } = useWizard();

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/llm/planning",
  });

  const getWeeklyPlanning = () => {
    if (!values.goal) return;

    const content = `Generate weekly planning for ${values.goal} from monday to sunday with short text`;

    complete(content);
  };

  useEffect(() => {
    getWeeklyPlanning();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      form.change("planning", completion);
    }
  }, [isLoading]);

  return (
    <>
      <p>
        Weekly Planning ({activeStep + 1}/{stepCount})
      </p>
      <pre className="text-balance max-w-screen-md border border-2 p-3">
        {completion || "Loading..."}
      </pre>

      <button type="submit" className="bg-blue-500 rounded p-2">
        Submit
      </button>
      <button
        onClick={() => getWeeklyPlanning()}
        type="button"
        className="bg-purple-500 rounded p-2"
      >
        Generate
      </button>
      <button
        onClick={() => previousStep()}
        type="button"
        className="bg-teal-500 hover:bg-teal-300"
      >
        Previous
      </button>
    </>
  );
};