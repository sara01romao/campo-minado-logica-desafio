function gameStorage(mode="iniciante", level="facil"){
  localStorage.setItem("game", JSON.stringify({mode: mode, level: level}));
}
gameStorage();

function getGameStorage(){
  let configStorage = localStorage.getItem("game");
  let config = JSON.parse(configStorage);

  return [config.mode, config.level];;
}

let [tamanho, dificuldade] = getGameStorage()

let game = new Jogo(tamanho, dificuldade);
game.init();

let pontuacao = new Pontuacao();
pontuacao.setPontuacaoStorage();

function adicionaMapa(){
  let containerMapa = $("<div>", {class:"posicaoLista", style:""});

  for(let linhaButton = 0; linhaButton < game.tamanhoMatriz; linhaButton++){
    let linhaMapa = $("<div>", {class:"linhaMapa", style:""});
    for(let colunaButton = 0; colunaButton < game.tamanhoMatriz; colunaButton++){

      let posicaoItem = $("<div>", {class:"posicaoItem", isOpening: false,  "data-linha": linhaButton,"data-coluna": colunaButton })
      $(linhaMapa).append(posicaoItem);
    }
    $(containerMapa).append(linhaMapa);
  }
  $("#mapaArea").append(containerMapa);
};
adicionaMapa();

function updateMapa(){
  game.posicaoReveladas.forEach(posicao =>{
    let valorPosicao = game.mapa[posicao[0]][posicao[1]];

    if(valorPosicao >= 4 && valorPosicao <= 8){
       $(".posicaoItem[data-linha='" + posicao[0] +"'][data-coluna='" + posicao[1] +"']").addClass("purple");
    }
     
    switch (valorPosicao) {
      case 9 : valorPosicao = "<i class='fa-solid fa-bomb'></i>";  break;
      case 3 : $(".posicaoItem[data-linha='" + posicao[0] +"'][data-coluna='" + posicao[1] +"']").addClass("red"); break;
      case 2 : $(".posicaoItem[data-linha='" + posicao[0] +"'][data-coluna='" + posicao[1] +"']").addClass("green"); break;
      case 0 : valorPosicao = "";    break;
    }
    
    $(".posicaoItem[data-linha='" + posicao[0] +"'][data-coluna='" + posicao[1] +"']").html(valorPosicao);
    $(".posicaoItem[data-linha='" + posicao[0] +"'][data-coluna='" + posicao[1] +"']").attr('isopening', "true");
  })
}

function finalizarPardida(){
  
  if(game.derrota){
    pontuacao.getPontuacaoStorage("derrota");
     $(".title-resultado.perdeu").addClass("active");
  }else{
    pontuacao.getPontuacaoStorage("vitoria");
    $(".title-resultado.venceu").addClass("active");
  }

  $(".vitorias-contador").text(pontuacao.vitoria);
  $(".derrotas-contador").text(pontuacao.derrota);
}

function abrirConfiguracoes(){
 $.get("./modais/config-modal.html", function(data){
    Swal.fire({
      title: `<h3 class="title-config-modal"><i class="fa-solid fa-gear"></i> Configuração</h3>`,
      html:data,
      showClass:{popup:"modal-config"},
      confirmButtonText: "Salvar",
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      
      preConfirm: function () {
        let level = $('input[name="level"]:checked').val();
        let mode = $('input[name="mode"]:checked').val();

        if (!level || !mode) {
          Swal.showValidationMessage("Selecione level e mode!");
          return false;
        }

        return { level, mode };
      }
    }).then(function (result) {
      if (result.isConfirmed) {
        gameStorage( result.value.mode, result.value.level);
        reiniciarJogo()
      }
    });

   }).then(()=>{
      let [mode, level] = getGameStorage();
      $('[name=mode]').prop('checked',false);
      $('[name="mode"][value="' + mode + '"]').prop('checked', true);
      $('[name=level]').prop('checked',false);
      $('[name="level"][value="' + level + '"]').prop('checked', true);
   });
}

function reiniciarJogo(){
  $("#mapaArea").empty();
  $(".title-resultado.perdeu").removeClass("active");
  $(".title-resultado.venceu").removeClass("active");
  let [tamanho, dificuldade] = getGameStorage()

  game = new Jogo(tamanho, dificuldade);
  game.init();
  adicionaMapa();
}

$(document).on("click", ".posicaoItem", function(ev){
     if(!game.partidaAtiva){return}
  
    let linha=  parseInt($(this).attr("data-linha"));
    let coluna=  parseInt($(this).attr("data-coluna"));

    game.jogada(linha, coluna);
  
    updateMapa();

    if(!game.partidaAtiva && game.derrota || game.vitoria){
      finalizarPardida();
     return;
    }
});

$("#configBtn").click(function(){
  abrirConfiguracoes("game");
});

$("#reiniciarBtn").click(function(){
  reiniciarJogo()
});