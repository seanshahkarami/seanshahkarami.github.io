Vector = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector.prototype.add = function(other) {
	return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
}

Vector.prototype.sub = function(other) {
	return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
}

Vector.prototype.mul = function(scalar) {
	return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
}

Vector.prototype.iadd = function(other) {
	this.x += other.x;
	this.y += other.y;
	this.z += other.z;
}

Vector.prototype.isub = function(other) {
	this.x -= other.x;
	this.y -= other.y;
	this.z -= other.z;
}

Vector.prototype.imul = function(scalar) {
	this.x *= scalar;
	this.y *= scalar;
	this.z *= scalar;
}

Vector.prototype.dot = function(other) {
	return this.x * other.x + this.y * other.y + this.z * other.z;
}

Vector.prototype.square = function() {
	return this.x * this.x + this.y * this.y + this.z * this.z;
}

Vector.prototype.cross = function(other) {
	return new Vector(this.y * other.z - this.z * other.y,
	                  this.z * other.x - this.x * other.z,
				 	  this.x * other.y - this.y * other.x);
}

Vector.prototype.norm = function() {
	return Math.sqrt(this.square());
}

Vector.prototype.unit = function() {
	return this.mul(1 / this.norm());
}

Vector.prototype.project = function(other) {
	return other.mul(this.dot(other) / other.square());
}
