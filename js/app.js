
// Création du background
var t = new Trianglify({

  // y_gradient: ['#FFFFFF'].concat(Trianglify.colorbrewer.Greys[9]).concat(['#000000', '#000000']),
  // x_gradient: ['#FFFFFF', '#000000'],

  // y_gradient: ['#FFFFFF', '#FFFFFF'].concat(Trianglify.colorbrewer.Greys[9]).concat(['#000000', '#000000']),
  // x_gradient: ['#FFFFFF', '#ff3d2e'],
  // y_gradient: ['#FFFFFF', '#ff3d2e'],


  x_gradient: ['#FFFFFF', '#FFFFFF'].concat(Trianglify.colorbrewer.Greys[9].slice(0,4)),
  y_gradient: Trianglify.colorbrewer.Greys[9].slice(0,4),


  // x_gradient: Trianglify.colorbrewer.YlOrRd[9],


  // y_gradient: Trianglify.colorbrewer.YlOrRd[9],


  // x_gradient: Trianglify.colorbrewer.Greys[9].concat(['#000000', '#000000']),
  // y_gradient: Trianglify.colorbrewer.Greys[9],



  // x_gradient: Trianglify.colorbrewer.Greys[9].concat(['#FFFFFF', '#000000','#000000']),

  // x_gradient: Trianglify.colorbrewer.Greys[9].concat(['#000000', '#000000', '#000000', '#000000']),

  // x_gradient: ['#FFFFFF'].concat(Trianglify.colorbrewer.Greys[9]).concat(['#000000', '#000000']),

  // x_gradient: ["#961E00", "#FF0000", "#EEEEEE"],
  // x_gradient: ["#000000"],
  // x_gradient: ["#FFFFFF", "#FFFFFF"],
  // y_gradient: ["#FFFFFF", "#000000","#000000"],
  // y_gradient: Trianglify.colorbrewer.Greys[9],
  noiseIntensity: 0.2, 
  cellsize: 150,
  cellpading: 60
});
var pattern = t.generate(document.body.clientWidth, document.body.clientHeight);
document.body.setAttribute('style', 'background-image: ' + pattern.dataUrl) + '; opacity: 0.5;';


