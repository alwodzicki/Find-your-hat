const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
 //assign isplaying
let isPlaying = true;


class Field {
  constructor(field){
    this.field = field;
    this.y = 0;
    this.x = 0;
  }
  print(){
    for(let i=0; i<this.field.length; i++){
      console.log(this.field[i].join(''));
    }
  }

//play again prompt
  playAgain(){
    let replay = prompt('Play again? Y/N');
    if (replay.toUpperCase() === 'Y'){
      this.playGame();
    }else {
      process.exit(1);
      }
    }
//game function to run on start
  playGame(){
    isPlaying = true;
    this.y = 0; //reset x for new game
    this.x = 0; // reset y for new game
  //print directions
  console.log('Press D for down, L for left, R for right, U for up')
  //print field
  //need to generate new field
    this.print();
  //ask for user input if game is not won
    while(isPlaying){
      let playerMove = prompt('Which way?');
       //case statements for player input
      switch(playerMove.toLowerCase()){
        case 'exit':
          process.exit(1);
        case 'd':
          this.y += 1;
          this.checkPlace();
          break;
        case 'l':
          this.x -= 1;
          this.checkPlace();
          break;
        case 'r':
         this.x +=1
         this.checkPlace();
          break;
        case 'u':
          this.y -=1;
          this.checkPlace();
          break;
        default:
          console.log('Error. Please enter a valid direction');
          break;
      }
    }

  }
  //check placement of character - return end game scenario if hole or out of bounds
  checkPlace(){
    try {
      let placement = this.field[this.y][this.x];
    } catch(error){
      console.log('Out of bounds. You lose');
      this.playAgain();
    }
    if( this.y < 0 || this.x < 0){
      console.log('Out of bounds. You lose');
      this.playAgain();
    } else{
      let placement = this.field[this.y][this.x];

      switch(placement){
        case hat:
          console.log('Congratulations! You found your hat and won!');
          isPlaying = false;
          this.playAgain();
          break;
        case hole:
          console.log('You fell into a hole and lost.');
          isPlaying = false;
          this.playAgain();
          break;
        case pathCharacter:
          console.log("You can't go back. You lose.");
          isPlaying = false;
          this.playAgain();
          break;
        default:
          this.field[this.y][this.x] = pathCharacter;
          this.print();
          break;
      }
    }
  }

}

const myField = new Field([
  ['*', '░', '░', '░', '░'],
  ['░', 'O', '░', 'O', '░' ],
  ['░', '^', '░', '░', '░'],
]);

myField.playGame();
