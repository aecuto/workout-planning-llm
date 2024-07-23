"use client";

export default function Planning() {
  const onSubmit = async () => {
    return fetch("/api/llm/goals", {
      body: JSON.stringify({ message: "test" }),
      method: "POST",
    }).then(console.log);
  };

  const onSubmit2 = async () => {
    return fetch("/api/llm/planning", {
      body: JSON.stringify({ message: "test" }),
      method: "POST",
    }).then(console.log);
  };

  return <div onClick={() => onSubmit2()}>Planning</div>;
}
