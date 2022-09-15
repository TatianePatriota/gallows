function criaJogo(sprite) {
  var palavraSecreta = '';
  var lacunas = [];
  var etapa = 1;

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
    var exp = new RegExp(chute, 'gi');
    var resultado;
    var acertou = false;

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
    setPalavraSecreta: setPalavraSecreta, 
    getLacunas: getLacunas,
    getEtapa: getEtapa,
    processaChute: processaChute,
    ganhou: ganhou,
    perdeu: perdeu,
    ganhouOuPerdeu: ganhouOuPerdeu, 
    reinicia: reinicia
  }
}