import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const PlanetDropdown = ({planets}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  

    const items = planets.map(planet => ({
        label: planet.name,
        value: planet.name,
        key: planet.id,
    }));

  return (
    <View style={{ flex: 1, marginBottom: 50}}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(selectedvalue) => {   //Cuando seleccionas una opción en el dropdown, setValue
                                        // se ejecuta automáticamente con el valor de la opción seleccionada.
            setValue(selectedvalue);
          }}
        placeholder="Seleccionar Planeta"
      />
    </View>
  );
};

export default PlanetDropdown;