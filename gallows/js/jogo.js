function criaJogo(sprite) {
  let palavraSecreta = '';
  let lacunas = [];
  let etapa = 1;

  function ganhou() {
    return lacunas.length 
      ? !lacunas.some(function(lacuna) {
        return lacuna == '';
      })
      : false;
  };

  function perdeu() {
    return sprite.isFinished();
  }

  function ganhouOuPerdeu() {
    return ganhou() || perdeu ();
  }

  function reinicia() {
    etapa = 1;
    lacunas = [];
    palavraSecreta = '';
    sprite.reset()
  }

  function processaChute(chute) {
    if(!chute.trim()){
      throw new Error('Chute inválido')
    }
    let exp = new RegExp(chute, 'gi');
    let resultado;
    let acertou = false;

    while(resultado = exp.exec(palavraSecreta)) {
      acertou = lacunas[resultado.index] = chute;
    };

    if(!acertou) {
      return sprite.nextFrame();
    }
  }

  function criaLacunas() {
    for(let i = 0; i < palavraSecreta.length; i++){
      lacunas.push('');
    }
  }

  function proximaEtapa() {
    etapa = 2
  }

  function setPalavraSecreta(palavra){
    if(!palavra.trim()){
      throw new Error('Palavra Secreta inválida')
    }
    palavraSecreta = palavra;
    criaLacunas()
    proximaEtapa()
  }

  function getLacunas() {
    return lacunas;
  }

  function getEtapa() {
    return etapa;
  }

  return {
    setPalavraSecreta, 
    getLacunas,
    getEtapa,
    processaChute,
    ganhou,
    perdeu,
    ganhouOuPerdeu, 
    reinicia,
  }
}