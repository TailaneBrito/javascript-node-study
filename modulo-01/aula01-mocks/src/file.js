const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf8")
    const validation = this.isValid(content)
    if(!validation.valid) throw new Error(validation.error)

    const result = this.parseCSVToJSON(content)
    return result
  }

  /**
   * 
   * @param {*} csvString 
   * @param {*} options objects received by the method
   * @returns 
   */
  static isValid(csvString, options = DEFAULT_OPTION) {
    // para ver o conteudo do arquivo
    // fs.readFileSync('./mocks/threeItems-valid.csv', 'utf8')

    // [] => destructing redirects each position to a variable
    // [0] = headers
    // [1] = linha 1
    // [2] = linha 2
    // ...variavel = restante do arquivo
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeaderValid = header === options.fields.join(',')
    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    if(
      !fileWithoutHeader.length || 
      fileWithoutHeader.length > options.maxLines
      ) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)
    // remover a primeira linha (header)
    const firstLine = lines.shift()
    const header = firstLine.split(',')

    const users = lines.map(line => {
      const columns = line.split(',')
      const user = {}
      for(const index in columns) {
        user[header[index]] = columns[index].trim()
      }
      return user
    })

    return users
  }
}

module.exports = File