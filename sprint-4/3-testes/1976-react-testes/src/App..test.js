import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { calcularNovoSaldo } from './App';

describe('Componente principal', () => {
  describe('Quando abrir o App', () => {
    it('exibir nome do banco', () => {
      render(<App />);
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });
  
    it('exibir o saldo', () => {
      render(<App />);
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });
  
    it('exibir o botão de efetuar operação', () => {
      render(<App />);
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });
  });

  describe('Quando realizar uma transação', () => {
    it('que é um saque,o valor vai diminuir', () => {
      const valores = {
        transacao: 'saque',
        valor: 50,
      };
      
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });

    it('que é um saque, a transação deve ser realizada', () => {
      render(<App />);

      const saldo = screen.getByText('R$ 1000');
      const transacao = screen.getByLabelText('Saque');
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      // simulando o click na aplicacao
      fireEvent.click(transacao, {
        target: {
          value: 'saque',
        },
      });

      fireEvent.change(valor, {
        target: {
          value: 10,
        },
      });

      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe('R$ 990');
    });
  });
});

