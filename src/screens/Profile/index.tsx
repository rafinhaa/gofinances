import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Rafael"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Soncine"
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export default Profile;
