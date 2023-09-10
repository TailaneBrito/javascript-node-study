'use strict'

const { watch, promises: { readFile} } = require('fs')

class File {
    watch(event, filename){
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename){
        console.log((await readFile(filename)).toString())
    }
}

// watch(__filename, async(event, filename) => {
//     console.log((await readFile(filename)).toString())
// })
const file = new File()

//dessa forma ele ignora o 'this' da class File
// e pega o 'this' do watch
// watch(__filename, file.watch)

// alternativa para nao herdar, usa a arrow function
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explicito qual o contexto que a funcao vai ter
// o bind retorna uma nova funcao com o 'this' que se mantem de file, ignorando o watch 
// watch(__filename, file.watch.bind(file)) 

file.watch.call({ showContent: () => console.log('call: hey sinon')}, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon')}, [null, __filename])