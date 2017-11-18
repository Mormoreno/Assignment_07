var mic;
var risoluzione=[500,500];
var sogliaBongo=0.08;
var timerBongo=0;
var intervalloPrimaDiRisuonare=0.25;
var canSuonare=true;
var ondeSonore=[];
var angoloBacchetta=-20;
var bacchettaRitorna=false;
var smoothVolume=0;
var bum=0;

var suonoBongo;
var spriteBongo;
var spriteOndaSonora;
var spriteBacchetta;
var spriteFuoco;

function preload()
{
    spriteBongo=loadImage("./assets/Bongo.png");
    spriteOndaSonora=loadImage("./assets/OndaSonora.png");
    suonoBongo=loadSound("./assets/Bongo.wav");
    spriteBacchetta=loadImage("./assets/Bacchetta.png");
    spriteFuoco=loadImage("./assets/Fuoco.png");
}

function setup()
{
    createCanvas(risoluzione[0],risoluzione[1]);
    mic=new p5.AudioIn();
    mic.start();
    angleMode(DEGREES);
    textFont("Cabin Sketch");
}

function draw()
{
    background(86,11,22);
    var volume=mic.getLevel();
    
    if(bum<7)
        {
    fill(255,(7-bum)*25.5);
    textAlign(CENTER);
    textSize(50);
    text("Say 'BUM' to hit",250,100);
        }
    //console.log(volume);
    
    if(canSuonare && volume>sogliaBongo)
        {
            suona();
            
        }
    if(!canSuonare)
        {
            timerBongo+=1/frameRate();
            if(timerBongo>intervalloPrimaDiRisuonare)
                {
                    canSuonare=true;
                    
                }
        }
    
    if(smoothVolume>0)
    smoothVolume-=(1/frameRate())*.25;
    
    //Fuoco
    push();
    imageMode(CENTER);
    image(spriteFuoco,width/2+10*sin(frameCount*5),750-100*smoothVolume,width*1.3,height);
    pop();
    
    //Bongo
    push();
    imageMode(CENTER);
    image(spriteBongo,width/2,400,width*.75,height*.75);
    pop();
    
    
    //ONDE sonore
    for(var i=0;i<ondeSonore.length;i++)
    {
        ondeSonore[i].display();
    }
    
    //Bacchetta
    push();
    imageMode(CORNER);
    translate(80,180);
    rotate(angoloBacchetta);
    image(spriteBacchetta,0,0,170,50);
    pop();
    
    if(bacchettaRitorna)
        {
            if(angoloBacchetta>=-20)
                {
                    angoloBacchetta-=1/frameRate()*100;
                }
            else
                bacchettaRitorna=false;
        }
    
    
   
   
}

function suona()
{
    console.log("BOM");
    canSuonare=false;
    timerBongo=0;
    suonoBongo.play();
    var onda=new OndaSonora();
    ondeSonore.push(onda);
    angoloBacchetta=10;
    bacchettaRitorna=true;
    smoothVolume+=.5;
    bum++;
    if(smoothVolume>3.9)
        smoothVolume=3.9;
}

function OndaSonora()
{
    
    this.lifeTime=0;
    
    this.display=function ()
    {
        this.lifeTime+=1/frameRate();
        
        push();
        imageMode(CENTER);
        translate(width/2,height/2);
        scale(this.lifeTime);
        
        image(spriteOndaSonora,0,0,width,height);
        pop();
    }
}







