import CardGrid from "./CardGrid.js";
import CardPlayer from "./CardPlayer.js";
import Grid from "./Grid.js";
import { AddButtonRestart } from "./ButtonRestart.js";
export default class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene');
    }

    preload() {
        this.load.image('armor', 'assets/armor.png');
        this.load.image('card', 'assets/card.png');
        this.load.image('dead', 'assets/dead.png');
        this.load.image('deathknight', 'assets/deathknight.png');
        this.load.image('firedrake', 'assets/firedrake.png');
        this.load.image('dragon', 'assets/dragon.png');
        this.load.image('healingpotion', 'assets/healingpotion.png');
        this.load.image('kobold', 'assets/kobold.png');
        this.load.image('ogre', 'assets/ogre.png');
        this.load.image('paladin', 'assets/paladin.png');
        this.load.image('playercard', 'assets/playercard.png');
        this.load.image('restartbutton', 'assets/restartbutton.png');
        this.load.image('shield', 'assets/shield.png');
        this.load.image('troll', 'assets/troll.png');
        this.load.bitmapFont('pressstart', 'assets/pressstart.png', 'assets/pressstart.fnt');
        
        
    }

    create() {

        this.grid = new Grid({
            scene: this,
            columns: 3,
            rows: 3
        });
        

        this.player = new CardPlayer({
            scene: this,
            x: this.game.config.width / 2,
            y: this.game.config.height- 200,
            name: 'Paladin',
            card: 'playercard',
            image: 'paladin',
            health: 16,
            depth: 1,
            ondragend: (pointer, gameObject) => {
                this.player.x = this.player.originalX;
                this.player.y = this.player.originalY;
                if (this.highlighted) {
                    this.highlighted.selected = true;
                    this.player.originalX = this.player.x = this.highlighted.x;
                    switch (this.highlighted.cardtype) {
                        case 'attack':
                            this.player.attack(this.highlighted.value);
                            this.highlighted.dead = true;
                            this.highlighted.deadAnimation();
                            break;
                        case 'heal':
                            this.player.health = Math.min(this.player.health + this.highlighted.value, this.player.maxHealth)
                            break;
                        case 'armor':
                            console.log(this.highlighted.value);
                            this.player.armor = this.highlighted.value;
                            break;
                    }
                    if(this.player.dead){
                        AddButtonRestart(this);
                    }else {
                        this.grid.fadeFrontRow();
                    }
                    
                }
            }
        });
    }

        update(time, delta){
            this.grid.cards[0].highlighted = false;
            this.grid.cards[1].highlighted = false;
            this.grid.cards[2].highlighted = false;
            this.highlighted = null;
            let xDiff = Math.abs(this.player.x - this.player.originalX);
            let columnwidth = this.game.config.width / this.grid.columns;
            if(this.player.y < 700 && xDiff < columnwidth * 1.4) {
                if(this.player.x < columnwidth){
                    this.grid.cards[0].highlighted = true;
                    this.highlighted = this.grid.cards[0];
                }
                else if(this.player.x > columnwidth * 2){
                    this.grid.cards[2].highlighted = true;
                    this.highlighted = this.grid.cards[2];
                } else {
                    this.grid.cards[1].highlighted = true;
                    this.highlighted = this.grid.cards[1];
                }
            }
        }
    }
    


