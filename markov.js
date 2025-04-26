/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null; // <--- important change
      if (!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }
    this.chains = chains;
  }
  


  /** return random text from chains */

  makeText(numWords = 100) {
    let output = [];
    
    // Start with a random word
    let word = Object.keys(this.chains)[Math.floor(Math.random() * Object.keys(this.chains).length)];
    
    while (output.length < numWords && word !== undefined) {
      output.push(word);
      let nextWords = this.chains[word];
      let randomIndex = Math.floor(Math.random() * nextWords.length);
      let nextWord = nextWords[randomIndex];
  
      if (nextWord === null) {
        break;
      }
  
      word = nextWord;
    }
  
    return output.join(" ");
  }
  
}

module.exports = { MarkovMachine };