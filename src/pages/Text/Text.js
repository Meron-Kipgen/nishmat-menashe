import React from "react";
import { Link } from "react-router-dom";

export default function Text() {
  return (
    <div>
      <h1>Torah</h1>
      <Link to='../Text/torah/Bereshit'>Bereshit</Link>
      <button>shemot</button>
      <button>vayikra</button>
      <button>bamidbar</button>
      <button>devrim</button>
   <h1>Megilot</h1>
      <button>Esther</button>
      <h1>Halakha</h1>
      <button>daily</button>
   
      <h1>Divrei Torah</h1>
      <button>Torah</button>
      <button>Musar</button>
      <button>General</button>
      <button>Kabbalah</button>
    </div>
  );
}
