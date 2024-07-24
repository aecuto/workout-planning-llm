"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { Wizard, useWizard } from "react-use-wizard";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";

export default function Planning() {
  const { push } = useRouter();
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const [goals, setGoals] = useState<string[]>([]);

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 content-center">
              <Wizard>
                <Step1 setGoals={setGoals} values={values} goals={goals} />
                <Step2 goals={goals} />
                <Step3 values={values} form={form} />
              </Wizard>
            </div>
          </form>
        )}
      />

      <div className="border-t-4 border-gray-500 mt-2" />
      <button
        className="bg-red-500 w-full rounded p-2  mt-2"
        onClick={() => push("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

const Step1 = ({ setGoals, values, goals }: any) => {
  const { handleStep, previousStep, nextStep, activeStep, stepCount } =
    useWizard();

  const getGoals = async () => {
    setGoals([]);
    const plan = `Plan Name: ${values.plan_name || "_"}, `;
    const dob = `Date of birth: ${values.dob || "_"}, `;
    const height = `Height: ${values.height || "_"}cm, `;
    const weight = `Weight: ${values.weight || "_"}kg.`;
    const answer =
      "Generate workout goals, please answer me in format [goal1, goal2] only title, without no., without summary";

    const content = plan + dob + height + weight + answer;

    if (content.includes("_")) return;

    return axios.post("/api/llm/goals", { content }).then((res) => {
      const content = res.data.content.trim();
      setGoals(content.replace(/\[|\]/g, "").split(","));
    });
  };

  handleStep(() => {
    getGoals();
  });

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
      <button onClick={() => nextStep()} type="button">
        Next ⏭
      </button>
    </>
  );
};

const Step2 = ({ goals }: { goals: string[] }) => {
  const { previousStep, nextStep, activeStep, stepCount } = useWizard();

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
                  input.value === goal ? "bg-sky-500" : "bg-sky-700"
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
      <button onClick={() => nextStep()} type="button">
        Next ⏭
      </button>
      <button onClick={() => previousStep()} type="button">
        Previous ⏮️
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

    const content = `Generate weekly planning for ${values.goal} workout from monday to sunday`;

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
      <pre className="text-balance max-w-screen-md">{completion}</pre>

      <button type="submit" className="bg-sky-500 rounded p-2">
        Submit
      </button>
      <button
        onClick={() => getWeeklyPlanning()}
        type="button"
        className="bg-blue-500 rounded p-2"
      >
        Generate
      </button>
      <button onClick={() => previousStep()} type="button">
        Previous ⏮️
      </button>
    </>
  );
};
