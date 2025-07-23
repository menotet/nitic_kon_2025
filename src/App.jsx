import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

export default function App() {
  return (
    <>
      <Header />

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>

      <Footer />
    </>
  );
}
