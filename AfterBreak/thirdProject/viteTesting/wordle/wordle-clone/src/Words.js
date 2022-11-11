import wordBank from "./wordBank.txt"

// 6 attempts at 5 letter word
export const boardDefault = [
    ["", "", "", "", "",], 
    ["", "", "", "", "",],
    ["", "", "", "", "",],
    ["", "", "", "", "",],
    ["", "", "", "", "",],
    ["", "", "", "", "",],
]

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
    .then ((response) => response.text())
    .then((result) => {
        const wordArray = result.split('\n')
        todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)]
        wordSet = new Set(wordArray)
    })

    return { wordSet, todaysWord }
}