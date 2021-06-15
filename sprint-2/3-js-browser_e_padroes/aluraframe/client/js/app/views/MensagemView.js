class MensagemView extends View {
  constructor(elemento) {
    super(elemento);
  }
  
  // template a ser devolvido
  _template(model) {
    return model.texto 
      ? `<p class="alert alert-info">${model.texto}</p>` 
      : '<p></p>';
  }
}