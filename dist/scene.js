//
// consider a custom vector memory manager and
// switch over to typed arrays
// get color / get texture approach
// *** this will allow for generative texturing
// unify lights with objects 
// portals / monitors
// lens (maybe with control points)
// proper camera support...
//

Scene = function() {
	this.lights = [];
	this.solids = [];
	this.objects = [];
}

Color = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

Ray = function(origin, direction) {
	this.origin = origin;
	this.direction = direction.unit();
}

Sphere = function(center, radius) {
	this.center = center;
	this.radius = radius;
}

PointLight = function(origin, brightness) {
	this.origin = origin;
	this.brightness = brightness;
	this.radius = 15 * brightness;
}

PointLight.prototype.isLight = function() {
	return true;
}

PointLight.prototype.intersect = function(ray) {
	var co = ray.origin.sub(this.origin);
	var ldotco = ray.direction.dot(co);
	var disc = ldotco * ldotco - co.square() + this.radius * this.radius;
	
	if (disc < 0.0) {
		return 0.0;
	}
	
	disc = Math.sqrt(disc);
	
	var dist1 = -ldotco - disc;
	var dist2 = -ldotco + disc;
	
	if (dist1 > 0.0001 && dist2 > 0.0001) {
		if (dist1 < dist2) {
			return dist1;
		} else {
			return dist2;
		}
	}
	
	if (dist1 > 0.0001) {
		return dist1;
	}
	
	if (dist2 > 0.0001) {
		return dist2;
	}
	
	return 0.0;
}

Plane = function(origin, spanner1, spanner2) {
	this.origin = origin;
	this.spanner1 = spanner1;
	this.spanner2 = spanner2.sub(spanner2.project(spanner1));
	this.normal = spanner1.cross(spanner2).unit();
}

Plane.prototype.intersect = function(ray) {	
	var ldotn = ray.direction.dot(this.normal);
	
	if (ldotn == 0.0) {
		return 0.0;
	}
	
	var dist = this.origin.sub(ray.origin).dot(this.normal) / ldotn;
	
	if (dist > 0.0001) {
		// computes the projected point on the plane
		var point = ray.direction.mul(dist).add(ray.origin).sub(this.origin);
	
		var u = point.dot(this.spanner1) / this.spanner1.square();
		var v = point.dot(this.spanner2) / this.spanner2.square();
	
		if (u >= 0.0 && u <= 1.0 && v >= 0.0 && v <= 1.0) {
			return dist;
		} else {
			return 0.0;
		}
	}
	
	return 0.0;	
}

Plane.prototype.computeNormal = function(point) {
	return this.normal;
}

Plane.prototype.isLight = function() {
	return false;
}

Sphere.prototype.isLight = function() {
	return false;
}

Sphere.prototype.intersect = function(ray) {
	var co = ray.origin.sub(this.center);
	var ldotco = ray.direction.dot(co);
	var disc = ldotco * ldotco - co.square() + this.radius * this.radius;
	
	if (disc < 0.0) {
		return 0.0;
	}
	
	disc = Math.sqrt(disc);
	
	var dist1 = -ldotco - disc;
	var dist2 = -ldotco + disc;
	
	if (dist1 > 0.0001 && dist2 > 0.0001) {
		if (dist1 < dist2) {
			return dist1;
		} else {
			return dist2;
		}
	}
	
	if (dist1 > 0.0001) {
		return dist1;
	}
	
	if (dist2 > 0.0001) {
		return dist2;
	}
	
	return 0.0;
}

Sphere.prototype.computeNormal = function(point) {
	return point.sub(this.center).unit();
}

Scene.prototype.addObject = function(object) {
	if (object.isLight()) {
		this.lights.push(object);
	} else {
		this.solids.push(object);
	}
	
	this.objects.push(object);
}

Scene.prototype.trace = function trace(ray, depth) {
	var color = new Color(0, 0, 0);
	
	if (depth >= 10) {
		return color;
	}
	
	// finds the minimum distance intersection
	var minDist = Infinity;
	var minObj = null;
	
	for (var i = 0; i < this.objects.length; i++) {
		dist = this.objects[i].intersect(ray);
		if (dist != 0 && dist < minDist) {
			minObj = this.objects[i];
			minDist = dist;
		}
	}
	
	if (minObj == null) {
		return color;
	}
	
	if (minObj.isLight()) {
		return new Color(255, 255, 255);
	}
	
	// compute the intersection point
	var point = ray.direction.mul(minDist).add(ray.origin);
	var normal = minObj.computeNormal(point);
	
	// compute diffuse color
	if (minObj.diffuse > 0.0) {
		var diffuseColor = new Color(0.0, 0.0, 0.0);
	
		// check for lighting obstructions
		for (var j = 0; j < this.lights.length; j++) {
			var light = this.lights[j];
			var shadowRay = new Ray(point, light.origin.sub(point));
			var inShadow = false;

			for (var i = 0; i < this.solids.length; i++) {
				if (this.solids[i].intersect(shadowRay) != 0) {
					inShadow = true;
					break;
				}
			}
		
			// compute diffuse lighting
			if (!inShadow) {
				var lambert = shadowRay.direction.dot(normal);
	
				if (lambert <= 0) {
					continue;
				}
	
				var brightness = lambert * light.brightness;
			
				diffuseColor.r += brightness * minObj.color.r;
				diffuseColor.g += brightness * minObj.color.g;
				diffuseColor.b += brightness * minObj.color.b;
			}
		}
		
		color.r += diffuseColor.r * minObj.diffuse;
		color.g += diffuseColor.g * minObj.diffuse;
		color.b += diffuseColor.b * minObj.diffuse;
	}
	
	// compute reflection color
	if (minObj.reflect > 0.0) {
		var reflectedDirection = ray.direction.sub(ray.direction.project(normal).mul(2.0));
		var reflectedRay = new Ray(point.add(reflectedDirection.mul(0.001)), reflectedDirection);
		var reflectedColor = this.trace(reflectedRay, depth + 1);
		color.r += minObj.reflect * reflectedColor.r;
		color.g += minObj.reflect * reflectedColor.g;
		color.b += minObj.reflect * reflectedColor.b;
	}
	
	return color;
}