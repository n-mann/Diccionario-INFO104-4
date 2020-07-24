import { useState } from "react";
import data from "../hispadic1207.json";

const Respuesta = () => {
  return <div>respuesta</div>;
};

const Main = () => {
  const [texto, setTexto] = useState("hola");
  return (
    <div>
      <input
        placeholder="Ingrese su busqueda"
        value={texto}
        onChange={(e) => {}}
      />

      {JSON.stringify(data)}
      <button>Buscar</button>

      <Respuesta />
    </div>
  );
};

export default Main;
