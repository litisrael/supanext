"use client";

import { useState, useEffect } from "react";

export const CardDatesRange = () => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para la carga

  const fetchDatesRange = async () => {
    try {
      const response = await fetch("/api/querys/fetchDataRangeDates");
      const data = await response.json();
      console.log("Datos recibidos:", data);
      setDate(data);
    } catch (error) {
      console.error("Error al obtener las fechas:", error);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  useEffect(() => {
    fetchDatesRange();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {date ? (
        <pre>{JSON.stringify(date, null, 2)}</pre> // Mostrar los datos en formato legible
      ) : (
        <div>No se encontraron datos</div>
      )}
    </div>
  );
};
