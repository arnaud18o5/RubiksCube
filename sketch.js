function setup(){
  console.log(window.innerWidth, window.innerHeight)
  createCanvas(window.innerWidth, window.innerHeight);
  cube.init();
  console.log(cube)

}
  let d = 14;
let size = window.innerWidth/d;

function draw(){
  while (size > window.innerHeight/11){
    d++;
    size = window.innerWidth/d;
  }
console.log(size)
  background(180);
  cube.display();
  text(melange, 900, 200)
}

const couleur = ['y','y','y','b','b','b','w','w','w','g','g','g','y','y','b','b','w','w','g','g','y','y','y','b','b','b','w','w','w','g','g','g','r','r','r','r','r','r','r','r','o','o','o','o','o','o','o','o']
const U = [0,1,2,3,4,5,6,7,8,9,10,11]
const D = [31,30,29,28,27,26,25,24,23,22,21,20];
const R = [34,36,39,5,15,25,42,44,47,29,18,9]
const L = [45,43,40,23,14,3,37,35,32,11,19,31]
const F = [2,13,22,40,41,42,26,16,6,39,38,37]
const B = [0,12,20,45,46,47,28,17,8,34,33,32]
const fW = [6,7,8,16,17,26,27,28];
const fY = [0,1,2,12,13,20,21,22];
const fB = [3,4,5,15,25,24,23,14];
const fG = [9,18,29,30,31,19,11,10];
const fO = [40,41,42,44,47,46,45,44];
const fR = [32,33,34,36,39,38,37,35];

const moves = ["U", "D", "R", "L", "F", "B","U*", "D*", "R*", "L*", "F*", "B*"]
const centerCouleur =   ['y', 'b', "w", "g", 'r', 'o'];

let melange = "";
let cube = {
  cases : [],
  centres : [],

  init : function(){
    for(let i = 0 ; i < 6 ; i++){
      this.centres.push({
        c : centerCouleur[i],
        x : giveCenterX(i),
        y : giveCenterY(i),
        p : i+1
      })
    }
    for(let i = 0; i < 48; i++){
      this.cases.push({
        c : couleur[i],
        p : i+1,
        x : giveX(i),
        y : giveY(i)
      })

    }
  },

  display : function(){
    for(let i = 0 ; i < 6 ; i++){
      if(this.centres[i].c === 'y'){
        fill(255,255,0);
      }
      else if (this.centres[i].c === 'b'){
        fill(0,0,255);
      }
      else if(this.centres[i].c === 'w'){
        fill(255);
      }
      else if(this.centres[i].c === 'g'){
        fill(0,255,0);
      }
      else if(this.centres[i].c === 'r'){
        fill(255,0,0);
      }
      else if(this.centres[i].c === 'o'){
        fill(255,128,0);
      }
      rect(this.centres[i].x * size + size/2, this.centres[i].y * size + size*3,size,size);
    }
    for(let i = 0 ; i < 48 ; i++){
      if(this.cases[i].c === 'y'){
        fill(255,255,0);
      }
      else if (this.cases[i].c === 'b'){
        fill(0,0,255);
      }
      else if(this.cases[i].c === 'w'){
        fill(255);
      }
      else if(this.cases[i].c === 'g'){
        fill(0,255,0);
      }
      else if(this.cases[i].c === 'r'){
        fill(255,0,0);
      }
      else if(this.cases[i].c === 'o'){
        fill(255,128,0);
      }
      rect(this.cases[i].x*size + size/2, this.cases[i].y*size +size*3, size, size );
      fill(0)
      textAlign(CENTER)
      text(this.cases[i].p, this.cases[i].x*size +size /2+size/2, this.cases[i].y*size +size/1.5+size*3)
    }
  },

  move : function(move){
    let m = [];
    let f = [];
    if(move === "U" || move === "U*"){
      m = U;
      f = fR;
    }
    else if(move === "D" || move === "D*"){
      m = D;
      f = fO;
    }
    else if(move === "R" || move === "R*"){
      m = R;
      f = fW;
    }
    else if(move === "L" || move === "L*"){
      m = L;
      f = fY;
    }
    else if(move === "F" || move === "F*"){
      m = F;
      f = fB;
    }
    else if(move === "B" || move === "B*"){
      m = B;
      f = fG;
    }
    if(move.length == 2){
      for(let i = 0 ; i < 3 ; i++){
        this.finalMove(m,f)
      }
    }
    else if(move.length === 1){
      this.finalMove(m,f);
    }
  },

  finalMove : function(move, face){
    let sylo = [];
    for(let i = 0 ; i < 12 ; i++){
      if(i+3 < 12){
        if(i < 3){
          sylo.push(this.cases[move[i]]);
        }
      this.cases[move[i]] = this.cases[move[i+3]];
      }
      else {
        this.cases[move[i]] = sylo[i-9];
      }
      this.cases[move[i]].x = giveX(move[i]);
      this.cases[move[i]].y = giveY(move[i]);
    }
    sylo.push(this.cases[face[7]])
    sylo.push(this.cases[face[6]])
    for(let i = 7 ; i >= 0 ; i--){
      if(i === 1){
        this.cases[face[i]] = sylo[3]
      }
      else if(i===0){
        this.cases[face[i]] = sylo[4]
      }
      else{
        this.cases[face[i]] = this.cases[face[i - 2]];
      }
      this.cases[face[i]].x = giveX(face[i])
      this.cases[face[i]].y = giveY([face[i]])
    }
  },

  mix : function(){
    melange = "";
    for(let i = 0 ; i < 10 ; i++){
      let s = moves[getRandomInt(12)];
      this.move(s)
      melange += s + "  "
    }
    console.log(melange)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function giveCenterX(cNumber){
  let x = 0;
  if(cNumber < 4){
    x = cNumber * 3 + 2;
  }
  else if (cNumber === 4){
    x = 5;
  }
  else if (cNumber === 5){
    x = 5;
  }
  return x;
}

function giveCenterY(cNumber){
  let y = 0;
  if(cNumber < 4){
    y = 2;
  }
  else if (cNumber === 4){
    y = -1;
  }
  else if (cNumber === 5){
    y = 5;
  }
  return y;
}

function giveX(cNumber){
  if(cNumber < 32){
    if(cNumber < 12){
      ret = cNumber +1;
    }
    else if (cNumber > 19 && cNumber < 32){
      ret = cNumber - 19;
    }
    else if (cNumber < 20){
      ret = Math.round(-17.119+1.5238*cNumber)
    }
  }
  else if (cNumber < 40){
    if(cNumber < 35){
      ret = cNumber - 28;
    }
    else if (cNumber < 37){
      ret = - 66 + 2 * cNumber;
    }
    else {
      ret = cNumber - 33;
    }
  }
  else {
    if(cNumber < 43){
      ret = cNumber - 36;
    }
    else if (cNumber < 45){
      ret = - 82 + 2 * cNumber;
    }
    else {
      ret = cNumber - 41;
    }
  }
  return ret;
}

function giveY(cNumber){
  let y = 0
  if(cNumber < 12){
    y = 1;
  }
  else if (cNumber < 20){
    y = 2;
  }
  else if (cNumber < 32){
    y=3;
  }
  else if (cNumber < 35){
    y = -2;
  }
  else if (cNumber < 37){
    y = -1;
  }
  else if (cNumber < 40){
    y = 0;
  }
  else if (cNumber < 43){
    y = 4;
  }
  else if (cNumber < 45){
    y = 5;
  }
  else if (cNumber < 48){
    y = 6;
  }
  return y;
}


