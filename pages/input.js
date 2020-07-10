import { useState } from "react";

const Input = () => {
  // Usando useState se puede manejar datos asociados al componente
  // Como en este caso, los datos del input
  const [value, setValue] = useState("");

  return (
    <div>
      <p>Input</p>
      <input
        value={value}
        onChange={({ target: { value } }) => {
          setValue(value);
        }}
      />
      <button
        disabled={value.length === 0}
        onClick={async () => {
          const response = await fetch("/api/hello", {
            method: "POST",
            body: value,
          });

          // Abre una alerta en la ventana del navegador mostrando
          // lo que la API respondio
          window.alert(`Response: ${await response.text()}`);

          setValue("");
        }}
      >
        Send input to API
      </button>
    </div>
  );
};

export default Input;
