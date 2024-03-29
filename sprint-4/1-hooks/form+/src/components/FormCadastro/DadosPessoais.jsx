import React, { useState, useContext } from 'react';
import { Button, TextField, Switch, FormControlLabel } from '@material-ui/core';
import ValidacoesCadastro from '../../contexts/ValidacoesCadastro';
import useErrors from '../../hooks/useErrors';

export default function DadosPessoais({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [promocoes, setPromocoes] = useState(true);
  const [novidades, setNovidades] = useState(true);

  const validations = useContext(ValidacoesCadastro);
  const [errors, validateFields, isValid] = useErrors(validations);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (isValid()) {
        onSubmit({nome, sobrenome, cpf, novidades, promocoes});
      }
    }}>
      <TextField
        value={nome}
        onChange={e => setNome(e.target.value)}
        onBlur={validateFields}
        error={!errors.nome.valido}
        name="nome"
        helperText={errors.nome.texto}
        id="nome" 
        label="Nome" 
        variant="outlined" 
        fullWidth
        margin="normal"
        required
      />

      <TextField 
        value={sobrenome}
        onChange={e => setSobrenome(e.target.value)}
        id="sobrenome" 
        label="Sobrenome" 
        variant="outlined" 
        fullWidth
        margin="normal"
      />

      <TextField
        value={cpf}
        onBlur={validateFields}
        name="cpf"
        error={!errors.cpf.valido}
        helperText={errors.cpf.texto}
        onChange={e => setCpf(e.target.value)}
        id="cpf" 
        label="CPF" 
        variant="outlined" 
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        label="Promoções"
        control={
          <Switch
            checked={promocoes}
            onChange={e => setPromocoes(e.target.checked)}
            name="promocoes"
            color="primary"
          />
        }
      />

      <FormControlLabel 
        label="Novidades"
        control={
          <Switch
            checked={novidades}
            onChange={e => setNovidades(e.target.checked)}
            name="novidades"
            color="primary"
          />
        }
      />

      <Button type="submit" variant="contained" color="primary">
        Próximo
      </Button>
    </form>
  );
};
