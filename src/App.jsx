import { Suspense } from "react";
import "./App.css";
import Users from "./components/Users";

const userPromise = fetch("http://localhost:4000/users").then((res) =>
  res.json()
);

function App() {
  return (
    <>
      <h1 className="font-bold">Phone Client</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Users userPromise={userPromise} />
      </Suspense>
    </>
  );
}

export default App;
