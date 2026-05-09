import React from "react";
import { AnimatedBackground } from "./components/AnimatedBackground/AnimatedBackground";

function App() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Fundo animado */}
      <AnimatedBackground />

      {/* Conteúdo do site */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1>Bem-vindo ao meu site!</h1>
        <p>Esse é o meu portfólio com animação de traços passando na tela.</p>
      </div>
    </div>
  );
}

export default App;


