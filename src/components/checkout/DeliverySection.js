import React, { useState, useEffect } from "react";
import { Label, Select, Input } from "./FormComponents";
import { getStates, getCitiesByState } from "../../services/checkout"; // Ajusta la ruta según tu estructura

const DeliverySection = ({
  departamento,
  ciudad,
  direccion,
  telefono,
  handleChangeDepartamento,
  handleChangeCiudad,
  handleChangeDireccion,
  handleChangeTelefono,
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateData = await getStates();
        setStates(stateData);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (departamento) {
        try {
          const cityData = await getCitiesByState(departamento);
          setCities(cityData);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]); //reseteo
      }
    };

    fetchCities();
  }, [departamento]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Entrega</h2>
      <div className="mb-4">
        <Label htmlFor="departamento">Departamento</Label>
        <Select
          id="departamento"
          value={departamento}
          onChange={handleChangeDepartamento}
          options={[
            { value: "", label: "Seleccione un Departamento" },
            ...states.map((state) => ({
              value: state.DepartamentoID,
              label: state.Nombre,
            })),
          ]}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="ciudad">Ciudad</Label>
        <Select
          id="ciudad"
          value={ciudad}
          onChange={handleChangeCiudad}
          options={[
            { value: "", label: "Seleccione una Ciudad" },
            ...cities.map((city) => ({
              value: city.CiudadID,
              label: city.Nombre,
            })),
          ]}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          type="text"
          id="direccion"
          value={direccion}
          onChange={handleChangeDireccion}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input
          type="text"
          id="telefono"
          value={telefono}
          onChange={handleChangeTelefono}
        />
      </div>
    </div>
  );
};

export default DeliverySection;
