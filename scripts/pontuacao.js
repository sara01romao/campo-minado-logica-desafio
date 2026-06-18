class Pontuacao{
  constructor(){
    this.vitoria = 0;
    this.derrota = 0;
  }

  setPontuacaoStorage(){
    localStorage.setItem("pontuacaoInfo", JSON.stringify({vitoria: this.vitoria, derrota:this.derrota}));
  }

  getPontuacaoStorage(tipoPonto){
    let pontuacaoStorage = localStorage.getItem("pontuacaoInfo");
    let pontuacao = JSON.parse(pontuacaoStorage);

    if(tipoPonto == "derrota"){
      this.derrota = pontuacao.derrota + 1;
    }else{
      this.vitoria = pontuacao.vitoria + 1;
    }

    this.setPontuacaoStorage();
  }

  setDerrota(){
    this.getPontuacaoStorage("derrota")
    return this.derrota ++;
  }

  setVitoria(){
    this.getPontuacaoStorage("vitoria")
    return this.vitoria ++;
  }
}