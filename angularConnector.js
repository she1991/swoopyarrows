function Stepl(context, dimensions) {
  this._context = context;
 	this._edgeLength = [20, 20];
	this._forceQuadrant = [null, null];
  this._x0 = null;
  this._y0 = null;
}

Stepl.prototype = {
  areaStart: function() {
    /*this._line = 0;*/
  },
  areaEnd: function() {
    /*this._line = NaN;*/
  },
  lineStart: function() {
		this._x0 = this._y0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._point = 1;
				//store the x0, y0 values for quadrant calculations
				this._x0 = x;
				this._y0 = y;
        this._context.moveTo(x, y); 
				console.log(this._x0, this._y0);
        break;
      }
      case 1: this._point = 2; // proceed
      default: {
				//Determine quadrant for both points
				var deltaX = x - this._x0;
				var deltaY = y - this._y0;
				//Get the angle the simple segment makes with horizontal axis through P1
				var lineAngle = 360 - (Math.atan2(deltaY, deltaX) * (180/Math.PI));
				console.log(this._edgeLength);
				if(lineAngle <= 45 || lineAngle > 315) {
					//P1 = Q1 and P2 = Q3
					//Draw the respective edges
					this._context.lineTo(this._x0 + this._edgeLength[0], this._y0);
					//Now the middle connector line
					this._context.lineTo(x - this._edgeLength[1], y);
					//Now complete the connector
				}
				else if(lineAngle > 45 && lineAngle <= 135) {
					//P1 = Q2 and P2 = Q4
          //Draw the respective edges
          this._context.lineTo(this._x0, this._y0 - this._edgeLength[0]);
          //Now the middle connector line
        	this._context.lineTo(x, y + this._edgeLength[1]);
          //Now complete the connector
					console.log("Q2");
				}
				else if(lineAngle > 135 && lineAngle <= 225) {
					//P1 = Q3 and P2 = Q1
          //Draw the respective edges
          this._context.lineTo(this._x0 - this._edgeLength[0], this._y0);
          //Now the middle connector line
          this._context.lineTo(x + this._edgeLength[1], y);
          //Now complete the connector
					console.log("Q3");
				}
				else {
					//P1 = Q4 and P2 = Q2
          //Draw the respective edges
					console.log(this._x0, this._y0, x, this._edgeLength);
          this._context.lineTo(this._x0, this._y0 + this._edgeLength[0]);
          //Now the middle connector line
          this._context.lineTo(x, y - this._edgeLength[1]);
          //Now complete the connector
					console.log("Q4");
				}
				//Draw a edge from point 1 to specified edge length
				this._context.lineTo(x, y);
        break;
      }
    }
    this._x = x, this._y = y;
  }
}

angularConnector = function(context) {
  return new Stepl(context);
}

export default (function custom(alpha) {
});
