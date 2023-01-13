function* transposeGenerator(twoDimensionalArray) {
    const outerArrayLength = twoDimensionalArray.length
    const innerArrayLength = twoDimensionalArray[0].length

    let outerIndex = 0
    let innerIndex = 0

    while (outerIndex <= outerArrayLength - 1 && innerIndex <= innerArrayLength - 1) {
        yield twoDimensionalArray[outerIndex][innerIndex]
        if (outerIndex < outerArrayLength - 1) {
            outerIndex++
        } else if (outerIndex <= outerArrayLength - 1 && innerIndex <= innerArrayLength - 1) {
            innerIndex++
            outerIndex = 0
        }
    }
}

function transposeTraditionally(twoDimensionalArray) {
    let result = []
    const outerArrayLength = twoDimensionalArray.length
    const innerArrayLength = twoDimensionalArray[0].length

    let outerIndex = 0
    let innerIndex = 0

    while (outerIndex <= outerArrayLength - 1 && innerIndex <= innerArrayLength - 1) {
        result.push(twoDimensionalArray[outerIndex][innerIndex])
        if (outerIndex < outerArrayLength - 1) {
            outerIndex++
        } else if (outerIndex <= outerArrayLength - 1 && innerIndex <= innerArrayLength - 1) {
            innerIndex++
            outerIndex = 0
        }
    }
    return result
}

module.exports = { transposeGenerator, transposeTraditionally }



