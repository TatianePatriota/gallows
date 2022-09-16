function criaController(jogo) {
  const $entrada = $(".entrada");
  const $lacunas = $(".lacunas");

  function exibeLacunas() {
    $lacunas.empty();
    jogo.getLacunas().forEach(function (lacuna) {
      $("<li>").addClass("lacuna").text(lacuna).appendTo($lacunas);
    });
  }

  function mudaPlaceHolder(texto) {
    $entrada.attr("placeholder", texto);
  }

  function guardaPalavraSecreta() {
    try {
      jogo.setPalavraSecreta($entrada.val().trim());
      $entrada.val("");
      mudaPlaceHolder("Chute");
      exibeLacunas();
    } catch (err) {
      alert(err.message);
    }
  }

  function reinicia() {
    jogo.reinicia();
    $lacunas.empty();
    mudaPlaceHolder("palavra secreta");
  }

  function leChute() {
    try {
      jogo.processaChute($entrada.val().trim().substr(0, 1));
      $entrada.val("");
      exibeLacunas();

      if (jogo.ganhouOuPerdeu()) {
        setTimeout(function () {
          if (jogo.ganhou()) {
            alert("Parabéns, você ganhou!");
          } else if (jogo.perdeu()) {
            alert("Que pena, tente de novo");
          }
          reinicia();
        }, 200);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  function inicia() {
    $entrada.keypress(function (event) {
      if (event.which == 13) {
        switch (jogo.getEtapa()) {
          case 1:
            guardaPalavraSecreta();
            break;
          case 2:
            leChute();
        }
      }
    });
  }

  return { inicia };
}
