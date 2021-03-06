import { Model } from './Model.js';
import { Snail } from './Snail.js';

export class Models {
    /**
     * constructor
     * e.g.: new Models()
     *
     * @param options {Object}
     * @param config {Object}
     */
    constructor(options, config) {
        this.modelsToLoad = 5;
        this.snailModels = [];
        this.playerSnails = options.playerSnails;
        this.sceneModels = [];
        this.scene = options.scene;
        this.config = config;

        this.loadSnailModels();
        this.loadFlagModel();
    }
    /**
     * Models.loadSnailModels
     * e.g.: Models.loadSnailModels();
     */
    loadSnailModels() {
        new Snail(this.snailModels, 'snailmodelGreen', this.config, this.loadComplete.bind(this));
        new Snail(this.snailModels, 'snailmodelBlue', this.config, this.loadComplete.bind(this));
        new Snail(this.snailModels, 'snailmodelRed', this.config, this.loadComplete.bind(this));
        new Snail(this.snailModels, 'snailmodelYellow', this.config, this.loadComplete.bind(this));
    }
    /**
     * Models.loadFlagModel
     * e.g.: Models.loadFlagModel();
     */
    loadFlagModel() {
        var scale = {x: 0.1, y: 0.1, z: 0.1};
        var position = { x:5, y:0, z:-(this.config.finPosZ - 0.5)};

        new Model(this.sceneModels, 'flag', {scale: scale, position: position}, (function(object){
            this.scene.add(object.model);
            this.loadComplete();
        }).bind(this));
    }
    /**
     * Models.setPlayerSnails
     * e.g.: Models.setPlayerSnails();
     */
    setPlayerSnails(playerCount){
        for(var i=0; i < playerCount; i++){
            this.setSingleSnail(i);
        }
    }
    /**
     * Models.setSingleSnail
     * e.g.: Models.setSingleSnail();
     */
    setSingleSnail(playerNumber){
        this.snailModels[playerNumber].model.position.x = this.config.trackWidth / 2 + this.config.trackWidth * playerNumber;
        this.playerSnails.snails.push(this.snailModels[playerNumber]);
        this.scene.add(this.snailModels[playerNumber].model);
    }
    /**
     * Models.loadComplete
     * e.g.: Models.loadComplete();
     */
    loadComplete(){
        this.modelsToLoad--;
        if(this.modelsToLoad <= 0){
            document.getElementById("loadingBar").style.display = "none";
            $("#startgame").removeAttr("disabled").removeClass('btn-disabled');
        }
    }
}