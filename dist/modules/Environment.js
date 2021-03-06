"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Floor = require("./Floor.js").Floor;

var Environment = exports.Environment = function Environment(game, floorWidth, floorHeight, finPosZ) {
    _classCallCheck(this, Environment);

    // soil floor
    var soilSize = { width: floorHeight * 20, height: floorHeight * 20 };
    var soilPivotCenter = { x: 0, y: 0, z: 0 };
    var soil = new Floor(game.scene, "gras.jpg", soilSize, soilPivotCenter, -0.01, 1, { x: soilSize.width / 5, y: soilSize.height / 5 });
    soil.addPlaneToScene();

    // track floor
    var trackSize = { width: floorWidth, height: floorHeight };
    var trackPivotCenter = { x: trackSize.width / 2, y: trackSize.height / 2 - 3, z: 0 };
    var track = new Floor(game.scene, "floor_comic.jpg", trackSize, trackPivotCenter, 0, 1, { x: trackSize.width / 5, y: trackSize.height / 5 });
    track.addPlaneToScene();

    // add start and finish-lines
    var opacity = 0.7,
        linePivotCenter,
        lineSize = { width: floorWidth, height: 0.3 };
    // start: front snale
    linePivotCenter = { x: lineSize.width / 2, y: lineSize.height / 2 - 3, z: 0 };
    var startCaptionFront = new Floor(game.scene, "", lineSize, linePivotCenter, 0.01, opacity, { x: lineSize.width / 5, y: lineSize.height / 5 });
    startCaptionFront.addPlaneToScene();
    // start: behind snail
    linePivotCenter = { x: lineSize.width / 2, y: lineSize.height / 2 + 1, z: 0 };
    var startCaptionBehind = new Floor(game.scene, "", lineSize, linePivotCenter, 0.01, opacity, { x: lineSize.width / 5, y: lineSize.height / 5 });
    startCaptionBehind.addPlaneToScene();

    // finish
    linePivotCenter = { x: lineSize.width / 2, y: finPosZ, z: 0 };
    var finishLine = new Floor(game.scene, "", lineSize, linePivotCenter, 0.01, opacity, { x: lineSize.width / 5, y: lineSize.height / 5 });
    finishLine.addPlaneToScene();

    // line behind finisharea
    var finishAreaDeepth = 4;
    linePivotCenter = { x: lineSize.width / 2, y: finPosZ + finishAreaDeepth, z: 0 };
    var finishLine = new Floor(game.scene, "", lineSize, linePivotCenter, 0.01, opacity, { x: lineSize.width / 5, y: lineSize.height / 5 });
    finishLine.addPlaneToScene();

    var trackAmount = 4,
        trackWidth = floorWidth / trackAmount,
        fontheight = 0.01,
        fontsize = 1;

    // create 1-4 start-caption
    for (var i = 0; i < trackAmount; i++) {
        game.createCaption(i + 1, fontheight, fontsize, { x: trackWidth * i + trackWidth / 2, y: 0, z: 1 }, { x: -Math.PI / 2, y: 0, z: 0 }, 16777215, 0.9, "trackCaption" + i, true, { receiveShadow: true, castShadow: false });
    }
};