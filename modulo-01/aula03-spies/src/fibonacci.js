class Fibonacci {

  //funcao recurssiva o return sempre para, 
  // o yield retorna mas nao guarda nada na memoria
  // *  called iterator, yield called generator
  * execute(input, current = 0, next = 1) {
    // processou todas as sequencias
    // e para!
    if (input === 0) {
      return
    }
    // retorna o valor!
    yield current

    // o * delega a função mas não retorna valor!
    yield * this.execute(input -1, next, current + next)
  }
}

module.exports = Fibonacci