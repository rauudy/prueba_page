//import { func } from "./folder/hola.js";
import * as Parser from '../peggy/grammar.js';

const analizar = document.getElementById('btn_analizar') as HTMLButtonElement; 
const editor = document.getElementById('inputCode') as HTMLTextAreaElement;
const outputDiv = document.getElementById('outputCode') as HTMLDivElement;
const nuevo = document.getElementById('btn_nuevo') as HTMLButtonElement;

analizar.addEventListener('click', () => { 
  try {
    const input = editor.value; // Obtén el valor del editor
    const output = Parser.parse(input); // Intenta analizar el input con PEG.js
    console.log(output); // Muestra el resultado en la consola

    outputDiv.innerHTML = "Cadena válida"; // Muestra un mensaje si no hay errores
  } catch (error) {
    if (error instanceof Error) {
      // Extraer información específica del error de PEG.js
      const details = (error as any).location; // PEG.js incluye `location` en los errores
      const found = (error as any).found; // Token encontrado
      const expected = (error as any).expected; // Tokens esperados

      let errorMessage = `Error al analizar el input:\n`;
      errorMessage += `Mensaje: ${error.message}\n`;

      if (details) {
        const { start, end } = details;
        errorMessage += `Posición: Línea ${start.line}, Columna ${start.column}\n`;
        errorMessage += `Rango: Caracteres ${start.offset} - ${end.offset}\n`;
      }

      if (found !== undefined) {
        errorMessage += `Token encontrado: "${found}"\n`;
      }

      if (expected && expected.length > 0) {
        const expectedTokens = expected.map((e: any) => `"${e.text || e.description}"`).join(", ");
        errorMessage += `Tokens esperados: ${expectedTokens}\n`;
      }

      console.error("Error detallado:", error.message, details); // Muestra información en la consola
      outputDiv.innerHTML = errorMessage; // Muestra la información detallada en el div

    } else {
      console.error("Error desconocido:", error); // En caso de que no sea una instancia de Error
      outputDiv.innerHTML = `Error desconocido`;
    }
  }

});

nuevo.addEventListener('click', () => {
  editor.value = "";
  outputDiv.innerHTML = "";
});