/**
 * 通用工具方法
 * @type {{calLength2: (x1: number, y1: number, x2: number, y2: number) => number; randomColor: (op: number) => string; lerpAngle: (a: number, b: number, t: number) => number; lerpDistance: (aim: number, cur: number, ratio: number) => number; inOboundary: (arrX: number, arrY: number, l: number, r: number, t: number, b: number) => boolean; rgbColor: (r: number, g: number, b: number) => string; rgbNum: (r: number, g: number, b: number) => string; rnd: (m: number) => number; rateRandom: (m: number, n: number) => number; distance: (x1: number, y1: number, x2: number, y2: number, l) => boolean; AABBbox: (object1: number, w1: number, h1: number, object2: number, w2: number, h2: number, overlap: number) => boolean; dis2: (x: number, y: number, x0: number, y0: number) => number; rndi2: (m: number, n: number) => number}}
 */
const CF = {
    calLength2: calLength2,
    randomColor: randomColor,
    lerpAngle: lerpAngle,
    lerpDistance: lerpDistance,
    inOboundary: inOboundary,
    rgbColor: rgbColor,
    rgbNum: rgbNum,
    rnd: rnd,
    rateRandom: rateRandom,
    distance: distance,
    // AABBbox: AABBbox,
    dis2: dis2,
    rndi2: rndi2
}

export default CF ;

function calLength2(x1: number, y1: number, x2: number, y2: number) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}


function randomColor(op: number) {
	let col = [0, 1, 2];
	col[0] = Math.floor(Math.random() * 100 + 155);
	col[1] = Math.floor(Math.random() * 100 + 155);
	col[2] = Math.floor(Math.random() * 100 + 155);
	const num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgba(" + col[0] + "," + col[1] + "," + col[2] + "," + op + ')';
}


function lerpAngle(a: number, b: number, t: number) {
	let d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

function lerpDistance(aim: number, cur: number, ratio: number) {
	const delta = cur - aim;
	return aim + delta * ratio;
}

function inOboundary(arrX: number, arrY: number, l: number, r: number, t: number, b: number) { //在l r t b范围内的检测
	return arrX > l && arrX < r && arrY > t && arrY < b;
}

function rgbColor(r: number, g: number, b: number) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r: number, g: number, b: number) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b;
}

function rnd(m: number) {
	const n = m || 1;
	return Math.random() * n;
}

function rateRandom(m: number, n: number) {
	let sum = 0;
	for (let i = 1; i < (n - m); i++) {
		sum += i;

	}

	let ran = Math.random() * sum;

	for (let i = 1; i < (n - m); i++) {
		ran -= i;
		if (ran < 0) {
			return i - 1 + m;
		}
	}
}

function distance(x1: number, y1: number, x2: number, y2: number, l: number) {
	const x = Math.abs(x1 - x2);
	const y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}

// function AABBbox(object1: number, w1: number, h1: number, object2: number, w2: number, h2: number, overlap: number) {
// 	A1 = object1.x + overlap;
// 	B1 = object1.x + w1 - overlap;
// 	C1 = object1.y + overlap;
// 	D1 = object1.y + h1 - overlap;
//
// 	A2 = object2.x + overlap;
// 	B2 = object2.x + w2 - overlap;
// 	C2 = object2.y + overlap;
// 	D2 = object2.y + h2 - overlap;
//
// 	if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
// 	else return true;
// }


function dis2(x: number, y: number, x0: number, y0: number) {
	const dx = x - x0;
	const dy = y - y0;
	return dx * dx + dy * dy;
}

function rndi2(m: number, n: number) {
	const a = Math.random() * (n - m) + m;
	return Math.floor(a);
}

