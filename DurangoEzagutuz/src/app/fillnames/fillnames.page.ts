import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule,  AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fillnames',
  templateUrl: './fillnames.page.html',
  styleUrls: ['./fillnames.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})

export class FillnamesPage {
  words: (string | null)[] = ['ARMARIARA', 'BEGIRATOKIA', 'ARKUA', 'BUPULAK'];
  assignedWords: { [key: number]: string } = {};
  correctAnswers: { [key: number]: string } = {
    0: 'ARMARIARA',
    1: 'BEGIRATOKIA',
    2: 'BUPULAK',
    3: 'ARKUA'
  };
  message: string = '';
  dropZones = [
    { top: '17%', left: '35%' }, // Armariara
    { top: '45%', left: '20%' }, // Begiratokia
    { top: '30%', left: '70%' }, // Bupulak
    { top: '65%', left: '35%' } // Arkua
  ];
  
  selectedWord: string | null = null;
  selectedWordIndex: number | null = null;

  constructor(private router: Router, private alertController: AlertController) {}

  selectWord(index: number) {
    const currentElement = document.getElementById(`word-${index}`);
    
    // Si la palabra ya está seleccionada, deseleccionarla
    if (this.selectedWordIndex === index) {
      if (currentElement) {
        currentElement.classList.remove('active');
      }
      this.selectedWord = null;
      this.selectedWordIndex = null;
    } else {
      // Deseleccionar la palabra previamente seleccionada, si existe
      if (this.selectedWordIndex !== null) {
        const prevElement = document.getElementById(`word-${this.selectedWordIndex}`);
        if (prevElement) {
          prevElement.classList.remove('active');
        }
      }
      // Seleccionar la nueva palabra
      this.selectedWord = this.words[index];
      this.selectedWordIndex = index;
      if (currentElement) {
        currentElement.classList.add('active');
      }
    }
  }
  
  assignWordToZone(index: number) {
    // Si la zona ya tiene una palabra asignada y el usuario hace clic en ella, desasignar la palabra
    if (this.assignedWords[index]) {
      const wordToReturn = this.assignedWords[index];
      const emptyIndex = this.words.findIndex(word => word === null);
      if (emptyIndex !== -1) {
        this.words[emptyIndex] = wordToReturn;
      } else {
        this.words.push(wordToReturn);
      }
      delete this.assignedWords[index];
    } else if (this.selectedWord && this.selectedWordIndex !== null) {
      // Si no hay palabra asignada y hay una palabra seleccionada, asignarla
      this.assignedWords[index] = this.selectedWord;
      this.words[this.selectedWordIndex] = null;
      this.selectedWord = null;
      this.selectedWordIndex = null;
    }
  }
  
  

  checkAnswers() {
    let allCorrect = true;
    for (const key in this.correctAnswers) {
      if (this.assignedWords[key] !== this.correctAnswers[key]) {
        allCorrect = false;
        break;
      }
    }
    this.message = allCorrect ? "Ariketa ondo egin duzu!" : "Zerbait gaizki egin duzu...";
  }

  async navigateToNewPage() {
    const alert = await this.alertController.create({
      header: 'Konfirmatu',
      message: 'Seguru puzzlea amaitu duzula?',
      buttons: [
        {
          text: 'EZ',
          role: 'cancel' // Cierra el alert sin acción adicional
        },
        {
          text: 'BAI',
          handler: () => { // Navega a la nueva página
            this.router.navigate(['/congrats']);
          }
        }
      ]
    });
    await alert.present();
  }

}
