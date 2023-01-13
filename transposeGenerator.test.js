const { transposeGenerator, transposeTraditionally } = require('./transposeGenerator')

describe('transposeGenerator', () => {
    it('handles a rectangular array containing one element', () => {
        const array = [[6, 5, 4]]

        const expected = '6,5,4'
        const actual = [...transposeGenerator(array)].toString()

        expect(actual).toEqual(expected)
    })

    it('handles a rectangular array containing two elements', () => {
        const array = [[1, 2, 3], [6, 5, 4]]

        const expected = '1,6,2,5,3,4'
        const actual = [...transposeGenerator(array)].toString()

        expect(actual).toEqual(expected)
    })

    it('handles a rectangular array containing three elements', () => {
        const array = [[1, 4, 7, 10], [2, 5, 8, 11], [3, 6, 9, 12]]

        const expected = '1,2,3,4,5,6,7,8,9,10,11,12'
        const actual = [...transposeGenerator(array)].toString()

        expect(actual).toEqual(expected)
    })

    it('has an iterator.next() function that works as expected', () => {
        const array = [[1, 2, 3], [6, 5, 4]]
        const iterator = transposeGenerator(array)

        // we then call .next() until iterator is done: true
        const actual1 = iterator.next()
        expect(actual1).toEqual({
            done: false,
            value: 1, // ['1,6,2,5,3,4'][0]
        })
        const actual2 = iterator.next()

        expect(actual2).toEqual({
            done: false,
            value: 6, // ['1,6,2,5,3,4'][1]
        })

        const actual3 = iterator.next()
        expect(actual3).toEqual({
            done: false,
            value: 2, // ['1,6,2,5,3,4'][2]
        })

        const actual4 = iterator.next()
        expect(actual4).toEqual({
            done: false,
            value: 5, // ['1,6,2,5,3,4'][3]
        })

        const actual5 = iterator.next()
        expect(actual5).toEqual({
            done: false,
            value: 3 // ['1,6,2,5,3,4'][4]
        })

        const actual6 = iterator.next()
        expect(actual6).toEqual({
            done: false,
            value: 4 // ['1,6,2,5,3,4'][5]
        })

        const actual7 = iterator.next()
        expect(actual7).toEqual({
            done: true,
            value: undefined // ['1,6,2,5,3,4'][6]
        })
    })

    it('performs faster than a non-generator version would with large data sets', () => {
        let array = []
        for (let i = 0; i <= 15000000; i++) {
            array.push([Math.random(), Math.random(), Math.random()])
        }
        // Check the console.log() for each function's performance metrics
        const startGeneratorTime = new Date().getTime()
        for (const item of transposeGenerator(array)) {
            // do stuff
        }
        const endGeneratorTime = new Date().getTime()

        const startNonGeneratorTime = new Date().getTime()
        for (const item of transposeTraditionally(array)) {
            // do stuff
        }
        const endNonGeneratorTime = new Date().getTime()

        const generatorExecutionTime = endGeneratorTime - startGeneratorTime
        const traditionalExecutionTime = endNonGeneratorTime - startNonGeneratorTime

        console.log(`Generator function execution time: ${generatorExecutionTime} ms`)
        console.log(`Non-generator function execution time: ${traditionalExecutionTime} ms`)

        expect(generatorExecutionTime).toBeLessThan(traditionalExecutionTime)
    })
})
