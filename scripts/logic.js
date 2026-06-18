// import {MapaMinado} from "./mapa.js";

const level = {
  facil: 0.1,
  medio: 0.2,
  dificil: 0.35,
};

const mode = {
  iniciante: 6,
  intermediario: 8,
  especialista: 10,
};

class Jogo extends MapaMinado {
  constructor(tamanho, dificuldade) {
    super(mode[tamanho], level[dificuldade]);
    this.vitoria = false;
    this.derrota = false;
    this.partidaAtiva = true;
    this.jogadasFeitas = [];
    this.totalPosicaoLivres = Math.pow(this.tamanhoMatriz, 2) - this.calcQtdMinas();
    this.posicaoReveladas = [];
    this.mapa = Jogo.Mapa(mode[tamanho], level[dificuldade]);
    this.mapaJogadas = [];
  }

  init() {
    this.mapaPlayerInit(); 
    // this.imprimirStatus();
  }

  mapaPlayerInit() {
    for (let linMatriz = 0; linMatriz < this.tamanhoMatriz; linMatriz++) {
      this.mapaJogadas[linMatriz] = [];

      for (let colMatriz = 0; colMatriz < this.tamanhoMatriz; colMatriz++) {
        this.mapaJogadas[linMatriz][colMatriz] = "#";
      }
    }
  }

  jogada(linha, coluna) {
    if(this.posicaoReveladas.length == (Math.pow(this.tamanhoMatriz, 2) - this.qtdMinas) || !this.partidaAtiva){
      return;
    }

    if(this.mapa[linha][coluna] === undefined){
      console.log("Posição invalida", this.mapa[linha][coluna]);
      return;
    }

    if(this.jogadasFeitas.some(jogada => jogada[0]== linha && jogada[1]== coluna)){
      console.log("Posição já foi jogada", this.mapa[linha][coluna]);
      return;
    }
  
    this.jogadasFeitas.push([linha, coluna]);
    this.revelarPosicoes(linha, coluna);
    this.verificarPartida();
    // this.imprimirStatus();
  }

  revelarPosicoes(linha, coluna) {
    this.posicaoReveladas.push([linha, coluna]);
    
    if(this.mapa[linha][coluna] == 9 || this.mapa[linha][coluna] != 0){
      return;
    }
    
    this.revelarPosicoesVisinhas(linha, coluna);
  }

  revelarPosicoesVisinhas(linha, coluna){
    let posiEnvolta = this.posicoesEnvolta(linha, coluna);
     
    for (const posicao of posiEnvolta) {
      let [x, y] = posicao;

      if(!this.posicaoReveladas.some(item => item[0]== x && item[1] == y)){
        
        if((x >= 0 && x <= this.tamanhoMatriz - 1) && (y >= 0 && y <=  this.tamanhoMatriz - 1)){
          
          if((this.mapa[x][y] < 9) && (this.mapa[x][y] > 0)){
            this.posicaoReveladas.push([x, y]);
          }

          if(this.mapa[x][y] == 0){
            this.revelarPosicoes(x, y);
          }
        }
      }
    }
  }

  updateMapaJogadas(){
    this.posicaoReveladas.forEach(element => {
      this.mapaJogadas[element[0]][element[1]]= this.mapa[element[0]][element[1]];
    });
  }

  perdeu() {
    this.derrota = true;
    this.partidaAtiva = false;
    console.log("Perdeu");
  }

  venceu() {
    this.vitoria= true;
    this.partidaAtiva = false;
    console.log("Venceu");
  }

  verificarPartida(){
    if(!this.jogadasFeitas.find(item => this.mapa[item[0]][item[1]] == 9)){
      if(this.posicaoReveladas.length == (Math.pow(this.tamanhoMatriz, 2) - this.qtdMinas)){
          this.venceu();
      }else{
        console.log("Envie uma posição");
      }
    }else{
      this.perdeu();
    }
  }
  
  imprimirStatus() {
    var lista = [];

    for (let index = 0; index < this.mapaJogadas.length; index++) {
      lista.push(index);
    }
    
    console.log("---------Seu Mapa -----------------");
    console.log("   ", lista.join(", "));

    this.updateMapaJogadas();

    this.mapaJogadas.forEach((element, index) => {
      console.log(index, "|", element.join("  "), "|");
    });

    this.verificarPartida();
  }
}