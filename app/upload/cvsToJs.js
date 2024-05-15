
// quizas separar primmero hacer obj con revisar que no alla comas dentro del campo y luego 
// hacer que cada 
export function csvToJs(csv) {
  let lines = csv.split(/\r?\n/);
  console.log(lines);
    // Detectar si el CSV está separado por comas o tabulaciones en la primera línea
    const delimiter = lines[0].includes("\t") ? "\t" : ",";
  console.log("delimiter",delimiter);
 

  const result = [];
  console.log("result",result);
  const headers = lines[0]
    .split(",")
    .map((column) => column.replaceAll("-", "_"));

  // headers.push("id", "day", "month");

  

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const field = lines[i].split(",");
    
  
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
