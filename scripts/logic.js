import { MapaGenerate} from "./mapa.js";

const level = {
    facil: 0.1,
    medio: 0.2,
    dificil: 0.35
  };

const mode = {
  iniciante: 6,
  intermediario: 8,
  especialista: 12
};


class LogicStatus extends MapaGenerate{
  constructor(tamanho, dificuldade){
    super();
    this.vitorias = 0;
    this.derotas = 0;
    this.statusGame = true;
    this.jogadasFeitas = [[0,0], [0,1]];
    this.mapa = LogicStatus.Mapa(mode.tamanho, level.dificuldade);
    this.mapaJogadas = []
  }

  init(){
    console.log("teste")  
    this.mapaPlayerInit();
    this.imprimirStatus();
  }

  jogada(linha, coluna){
    if(this.mapa[linha][coluna] == 9){
      this.pedeu();
    }
    console.log("item", this.mapa[0][0])
   
    // this.imprimir()
    
  }

  pedeu(){
    this.derotas++;
    this.statusGame = false;
    console.log("Perdeu");
  }

  venceu(){
    this.vitorias++;
    this.statusGame = false;
    console.log("Vender");
  }

  mapaPlayerInit(){
     for (let linMatriz = 0; linMatriz < this.tamanhoMatriz; linMatriz++) {
      this.mapaJogadas[linMatriz] = [];

      for (let colMatriz = 0; colMatriz < this.tamanhoMatriz; colMatriz++) {
        this.mapaJogadas[linMatriz][colMatriz] = "#";
      }
    }
  }

  revelaPosicao(linha, coluna){
    //mapa jogadas recebe valor da posição do mapa campo

    

  }

  mapaJogadas(){

  }

  imprimirStatus(){
    var lista = [];

    for(let index = 0; index < this.mapaJogadas.length; index ++){
      lista.push(index);
    }
    
    console.log("   ", lista.join(', '))
    
    this.mapaJogadas.forEach((element, index) => {
      console.log( index, "|",element.join('  '), "|");
    });

  }

}

let game = new LogicStatus()
game.init()

///enquando statusGame for true enviviar uma nova posição

// while(game.statusGame){
//   game.jogada(0,0)
// }

console.log(game.statusGame, game.mapaJogadas)

