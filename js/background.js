(function() {
  var width, height, canvas, ctx;
  var points = [];

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function init() {
    canvas = document.getElementById('demo-canvas');
    resizeCanvas();
    ctx = canvas.getContext('2d');

    points = []; // limpa pontos antigos

    // criar pontos em grid
    for (var x = 0; x < width; x += width / 20) {
      for (var y = 0; y < height; y += height / 20) {
        var px = x + Math.random() * width / 20;
        var py = y + Math.random() * height / 20;
        var p = { x: px, y: py, originX: px, originY: py };
        points.push(p);
      }
    }

    // ligar pontos vizinhos
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (p1 != p2) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // animação
    for (var i in points) {
      animate(points[i]);
    }

    requestAnimationFrame(draw);
  }

  function animate(point) {
    var toX = point.originX + (Math.random() * 50 - 25);
    var toY = point.originY + (Math.random() * 50 - 25);
    var duration = 2000 + Math.random() * 2000;

    var startX = point.x;
    var startY = point.y;
    var startTime = Date.now();

    function step() {
      var progress = Math.min((Date.now() - startTime) / duration, 1);
      point.x = startX + (toX - startX) * progress;
      point.y = startY + (toY - startY) * progress;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        animate(point);
      }
    }
    step();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (var i in points) {
      var p = points[i];
      for (var j in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[j].x, p.closest[j].y);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  // inicializa
  init();

  // redimensiona junto com a janela
  window.addEventListener('resize', init);
})();
