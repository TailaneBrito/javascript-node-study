true + 2 // 3 
true - 2 // -1 
'21' + true // '21true'
'21' - true // 20
9999999999999999 //16 noves = 10000000000000000
0.1 + 0.2 === 0.3 //false
3 > 2 //true
2 > 1 //true
3 > 2 > 1 // false
'21' - - 1 // 22
'1' == 1 // true - converte o valor 
'1' === 1 // false - compara o valor 
3 > 2 >= 1 // true 
"B" + "a" + + "a" + "a" //'BaNaNa'

//wtfjs.com


// ---------

String(123) // explicita chama a funcao
123 + '' // implicita soma com a string 

//test com assertion
console.assert(String(123) === '123')
console.assert(123 + '' === '123', 'implicit conversion to string')

const r = 'hello' || 1 // o ou (||) sempre vai retornar o primeiro argumento se os dois forem true
console.assert('hello' || 123 === 'hello', "|| returns the first element")
console.assert('hello' && 123 === 123, "&& returns the last element")

// ---------
const item = {
    name: 'Tailane',
    age: 28,
    //string: 1 se nao for primitivo, chama o valueOf
    toString(){
        return `Name: ${this.name}, Age: ${this.age}`
    },
    // number: 1 se nao for primitivo, chama o toString
    valueOf(){
        return { hey: 'dude' }
        // return 7
    },
    // symbol tem prioridade
    [Symbol.toPrimitive](coercionType){
        // console.log('trying to convert to', coercionType)

        const types = {
            string: JSON.stringify(this),
            number: '0007'
        }

        return types[coercionType] || types.string
    }
}

// console.log('item', item + 0)
// console.log('item', ''.concat(item))
// console.log('toString', String(item))
//vai retornar NaN pois o toString retornou a string
// console.log('valueOf', Number(item))

// depois de adicionar o toPrimitive
// console.log('String', String(item))
// console.log('Number', Number(item))
// // chama a conversao default
// console.log('Date', new Date(item))

console.assert(item + 0 === '{"name":"Tailane","age":28}0')
// console.log('!!item is true?', !!item)
console.assert(!!item)

// console.log('string.concat', 'Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"Tailane","age":28}')

// console.log('implicit + explicit coercion (using ==) ', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name: 'joao', age: 20}
// console.log('New Object', item2)
console.assert(item2.name === 'joao' && item2.age === 20)
