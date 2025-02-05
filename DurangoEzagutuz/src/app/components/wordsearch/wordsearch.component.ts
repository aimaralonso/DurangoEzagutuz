import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.scss'],
})
export class WordsearchComponent implements OnInit {
  grid: string[][] = [];
  words: string[] = ['ARRAUTZAK', 'GURINA', 'FRUTA', 'IRINA', 'AZUKREA', 'ARTOALEA'];
  gridSize = 10;
  selectedLetters: { row: number; col: number }[] = [];
  foundWords: string[] = [];
  currentSelection: string = '';
  foundLetters: { row: number; col: number }[] = [];
  wordsCount: number = 0;

  ngOnInit() {
    this.generateGrid();
    this.placeWords();
  }

  generateGrid() {
    this.grid = Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill(''));
  }

  placeWords() {
    this.words.forEach(word => {
      let placed = false;
      while (!placed) {
        let row = Math.floor(Math.random() * this.gridSize);
        let col = Math.floor(Math.random() * this.gridSize);
        let direction = Math.random() > 0.5 ? 'H' : 'V';

        if (this.canPlaceWord(word, row, col, direction)) {
          this.insertWord(word, row, col, direction);
          placed = true;
        }
      }
    });

    this.fillEmptySpaces();
  }

  canPlaceWord(word: string, row: number, col: number, direction: string): boolean {
    if (direction === 'H' && col + word.length > this.gridSize) return false;
    if (direction === 'V' && row + word.length > this.gridSize) return false;

    for (let i = 0; i < word.length; i++) {
      let r = direction === 'H' ? row : row + i;
      let c = direction === 'H' ? col + i : col;
      if (this.grid[r][c] !== '') return false;
    }

    return true;
  }

  insertWord(word: string, row: number, col: number, direction: string) {
    for (let i = 0; i < word.length; i++) {
      let r = direction === 'H' ? row : row + i;
      let c = direction === 'H' ? col + i : col;
      this.grid[r][c] = word[i];
    }
  }

  fillEmptySpaces() {
    const letters = 'ABDEFGHIJKLMNOPRSTUXZ';
    this.grid.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === '') {
          this.grid[rIdx][cIdx] = letters.charAt(Math.floor(Math.random() * letters.length));
        }
      });
    });
  }

  onLetterClick(row: number, col: number) {
    const letter = this.grid[row][col];

    if (this.selectedLetters.some(sel => sel.row === row && sel.col === col)) {
      return;
    }
  
    this.selectedLetters.push({ row, col });
    this.currentSelection += letter;

    if (this.words.includes(this.currentSelection)) {
      this.foundWords.push(this.currentSelection);
      
      this.foundLetters.push(...this.selectedLetters);
  
      this.selectedLetters = [];
      this.currentSelection = '';
      
      this.wordsCount++;
      
      if (this.wordsCount === this.words.length) {
        alert('¡Felicidades, has encontrado todas las palabras!');
      }
    }
  }

  resetSelection() {
    this.selectedLetters = [];
    this.currentSelection = '';
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedLetters.some(sel => sel.row === row && sel.col === col);
  }
  
  isFound(row: number, col: number): boolean {
    return this.foundLetters.some(sel => sel.row === row && sel.col === col);
  }
}
