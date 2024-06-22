
// quizas separar primmero hacer obj con revisar que no alla comas dentro del campo y luego 
// hacer que cada 
export function csvToJs(csv) {
  let lines = csv.split(/\r?\n/);
  // console.log(lines);
    // Detectar si el CSV está separado por comas o tabulaciones en la primera línea
    const delimiter = lines[0].includes("\t") ? "\t" : ",";
  // console.log("delimiter",delimiter);
 

  const result = [];
  // console.log("result",result);
  const headers = lines[0]
    .split(delimiter)
    .map((column) => column.replaceAll("-", "_"));


    // console.log("la ultima linea", lines[3]);
    // console.log("que es " ,typeof  lines[3]);
    // console.log("es mas de 0 ? " ,lines[3].trim().length > 0);
    


  function removeTrailingEmptyLines(lines, index) {
    if (index < 0) return;

    if (!hasPrintableCharacters(lines[index])) {
      lines.pop();
      removeTrailingEmptyLines(lines, index - 1);
    }
  }

  // Función para verificar si una línea tiene caracteres imprimibles
  function hasPrintableCharacters(line) {
    return line.trim().length > 0;
  }

  // Llamada inicial a la función recursiva desde el último renglón
  removeTrailingEmptyLines(lines, lines.length - 1);

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const field = lines[i].split(delimiter);
    
  
    // se usa el currentIndex por si dentro de algun campo hay comas

    let currentIndex = 0;
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
    
    

      if (field[currentIndex] && field[currentIndex].startsWith('"')) {
        // Campo de texto que comienza con comillas dobles
        let combinedValue = field[currentIndex].slice(1);

        // Buscar el siguiente campo que termine con comillas dobles
        while (
          (!field[currentIndex].endsWith('"') ||
            combinedValue.endsWith('""')) &&
          currentIndex < field.length - 1
        ) {
          currentIndex++;
          combinedValue += `,${field[currentIndex]}`;
        }

        // Eliminar comillas dobles adicionales y reemplazar comillas dobles escapadas
        obj[header] = combinedValue.replace(/""/g, '"').replace(/\\"/g, '"');
      } else {
        // Campo normal sin comillas dobles
      
    obj[header] = field[currentIndex] === "" ? null : field[currentIndex];

      }

      currentIndex++;
    }
    // console.log(obj);
    result.push(obj);
  }

  return result;
}
