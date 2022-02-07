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
}

const couleur = ['y','y','y','b','b','b','w','w','w','g','g','g','y','y','b','b','w','w','g','g','y','y','y','b','b','b','w','w','w','g','g','g','r','r','r','r','r','r','r','r','o','o','o','o','o','o','o','o']
const R = [34,36,39,5,15,25,42,44,47,29,18,9]
const L = [45,43,40,23,14,3,37,35,32,11,19,31]
const F = [2,13,22,40,41,42,26,16,6,39,38,37]
const B = [0,12,20,45,46,47,28,17,8,34,33,32]
const fW = [6,7,8,16,17,26,27,28];
const fY = [0,1,2,12,13,20,21,22];
const fB = [3,4,5,15,25,24,23,14];
const fG = [9,18,29,30,31,19,11,10];
const centerCouleur =   ['y', 'b', "w", "g", 'r', 'o'];
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
    let sylo = [];
    if(move === "U"){
      for(let i = 0 ; i < 12 ; i++){
        if(i+3 < 12){
          if(i < 3){
            sylo.push(this.cases[i]);
          }
          this.cases[i] = this.cases[i+3];
        }
        else if (i < 12){
          this.cases[i] = sylo[i-9];
        }
        this.cases[i].x = giveX(i);
        this.cases[i].y = giveY(i);
      }
      sylo.push(this.cases[39]);
      sylo.push(this.cases[36]);
      this.cases[39] = this.cases[34];
      this.cases[36] = this.cases[33];
      this.cases[34] = this.cases[32];
      this.cases[33] = this.cases[35];
      this.cases[32] = this.cases[37];
      this.cases[35] = this.cases[38];
      this.cases[37] = sylo[3];
      this.cases[38] = sylo[4];
      for(let i = 32 ; i < 40 ; i++){
        this.cases[i].x = giveX(i);
        this.cases[i].y = giveY(i);
      }
    }
    else if(move === "D"){
      for(let i = 31 ; i > 19 ; i--){
        if(i > 22){
          if(i > 28){
            sylo.push(this.cases[i]);
          }
          this.cases[i] = this.cases[i-3];
        }
        else {
          console.log(sylo, 22-i)
          this.cases[i] = sylo[22-i]
        }
        this.cases[i].x = giveX(i);
        this.cases[i].y = giveY(i);
      }
      sylo.push(this.cases[47]);
      sylo.push(this.cases[44]);
      this.cases[47] = this.cases[42];
      this.cases[42] = this.cases[40];
      this.cases[40] = this.cases[45];
      this.cases[44] = this.cases[41];
      this.cases[41] = this.cases[43];
      this.cases[43] = this.cases[46];
      this.cases[46] = sylo[4]
      this.cases[45] = sylo[3]

      for(let i = 40 ; i < 48 ; i++){
        this.cases[i].x = giveX(i);
        this.cases[i].y = giveY(i);
      }
    }
    else if(move === "R"){
      let sylo = [];
      for(let i = 0 ; i < 12 ; i++){
        if(i+3 < 12){
          if(i < 3){
            sylo.push(this.cases[R[i]]);
          }
        this.cases[R[i]] = this.cases[R[i+3]];
        }
        else {
          this.cases[R[i]] = sylo[i-9];
        }
        this.cases[R[i]].x = giveX(R[i]);
        this.cases[R[i]].y = giveY(R[i]);
      }
      sylo.push(this.cases[6]);
      sylo.push(this.cases[7]);
      this.cases[6] = this.cases[26];
      this.cases[7] = this.cases[16];
      this.cases[16] = this.cases[27];
      this.cases[27] = this.cases[17];
      this.cases[26] = this.cases[28];
      this.cases[28] = this.cases[8];
      this.cases[8] = sylo[3];
      this.cases[17] = sylo[4];
      for(let i = 0 ; i < 8 ; i++){
        console.log(fW[i],i)
        this.cases[fW[i]].x = giveX(fW[i]);
        this.cases[fW[i]].y = giveY(fW[i]);
      }
    }
    else if(move === "L"){
      let sylo = [];
      for(let i = 0 ; i < 12 ; i++){
        if(i+3 < 12){
          if(i < 3){
            sylo.push(this.cases[L[i]]);
          }
        this.cases[L[i]] = this.cases[L[i+3]];
        }
        else {
          this.cases[L[i]] = sylo[i-9];
        }
        this.cases[L[i]].x = giveX(L[i]);
        this.cases[L[i]].y = giveY(L[i]);
      }
      sylo.push(this.cases[2]);
      sylo.push(this.cases[1]);
      this.cases[2] = this.cases[0];
      this.cases[0] = this.cases[20];
      this.cases[20] = this.cases[22];
      this.cases[22] = sylo[3];
      this.cases[1] = this.cases[12];
      this.cases[12] = this.cases[21];
      this.cases[21] = this.cases[13];
      this.cases[13] = sylo[4];
      for(let i = 0 ; i < 8 ; i++){
        this.cases[fY[i]].x = giveX(fY[i]);
        this.cases[fY[i]].y = giveY(fY[i]);
      }
    }
    else if(move === "F"){ 
      let sylo = [];
      for(let i = 0 ; i < 12 ; i++){
        if(i+3 < 12){
          if(i < 3){
            sylo.push(this.cases[F[i]]);
          }
        this.cases[F[i]] = this.cases[F[i+3]];
        }
        else {
          this.cases[F[i]] = sylo[i-9];
        }
        this.cases[F[i]].x = giveX(F[i]);
        this.cases[F[i]].y = giveY(F[i]);
      }
      sylo.push(this.cases[fB[7]])
      sylo.push(this.cases[fB[6]])
      for(let i = 7 ; i >= 0 ; i--){
        if(i === 1){
          this.cases[fB[i]] = sylo[3]
        }
        else if(i===0){
          this.cases[fB[i]] = sylo[4]
        }
        else{
          this.cases[fB[i]] = this.cases[fB[i - 2]];
        }
        this.cases[fB[i]].x = giveX(fB[i])
        this.cases[fB[i]].y = giveY([fB[i]])
      }
    }
    else if(move === "B"){ // a finir
      let sylo = [];
      for(let i = 0 ; i < 12 ; i++){
        if(i+3 < 12){
          if(i < 3){
            sylo.push(this.cases[B[i]]);
          }
        this.cases[B[i]] = this.cases[B[i+3]];
        }
        else {
          this.cases[B[i]] = sylo[i-9];
        }
        this.cases[B[i]].x = giveX(B[i]);
        this.cases[B[i]].y = giveY(B[i]);
      }
      sylo.push(this.cases[fG[7]])
      sylo.push(this.cases[fG[6]])
      for(let i = 7 ; i >= 0 ; i--){
        if(i === 1){
          this.cases[fG[i]] = sylo[3]
        }
        else if(i===0){
          this.cases[fG[i]] = sylo[4]
        }
        else{
          this.cases[fG[i]] = this.cases[fG[i - 2]];
        }
        this.cases[fG[i]].x = giveX(fG[i])
        this.cases[fG[i]].y = giveY([fG[i]])
      }
    }
    else if(move==="U*"){
      for(let i = 0 ; i < 3 ; i++){
        this.move("U")
      }
    }
    else if(move==="D*"){
      for(let i = 0 ; i < 3 ; i++){
        this.move("D")
      }
    }
    else if(move==="R*"){
      for(let i = 0 ; i < 3 ; i++){
        this.move("R")
      }
    }
    else if(move==="L*"){
      for(let i = 0 ; i < 3 ; i++){
        this.move("L")
      }
    }
    else if(move==="F*"){
      for(let i = 0 ; i < 3 ; i++){
        this.move("F")
      }
    }
    else if(move==="B*"){
      for(let i = 0 ; i < 3 ; i++){
        this.move("B")
      }
    }
  }
}

let buttons = {
  
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


