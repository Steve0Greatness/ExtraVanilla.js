/* Version Checking */
// When editeding please update the below version and the version file, make sure they are the same.
window.extravanilla_version = "public version tracker 0.2.4.1";
window.extravanilla_versionTrackerURL = "https://raw.githubusercontent.com/Steve0Greatness/ExtraVanilla.js/main/download/version";
fetch(window.extravanilla_versionTrackerURL)
	.then(res => res.text())
	.then(res => {
		if (res != window.extravanilla_version) console.warn(`The current version of Extra Vanilla is "${res}", you're using "${window.extravanilla_version}". Unless you don't want new features, please update to ${res} from https://extravanilla.netlify.app/download/.`);
	});

Logic = {
	xor: (boola, boolb) => (boola || boolb) && !(boola && boolb),
	nor: (boola, boolb) => !(boola || boolb),
	xnor: (boola, boolb) => (boola && boolb) || (!boola && !boolb),
	nand: (boola, boolb) => ((boola || boolb) && !(boola && boolb)) || !(boola && boolb)
}

class Nil {
	constructor(define) {
		let type = undefined;
		if (typeof define == "number") type = NaN;
		else if (typeof define != "undefined") type = null;
		this.value = type;
	}
	static null() {
		return null;
	}
	static undefined() {
		return undefined;
	}
	static NaN() {
		return NaN;
	}
}

function ArrayRange(start, end, jump = 1) {
	let range = [],
	change = Math.abs(jump);
	if (end > start) {
		for (let i = start; i <= end; i += change) {
			range.push(i);
		}
		return range;
	}
	for (let i = start; i >= end; i -= change) {
		range.push(i);
	}
	return range;
}

Math.negative = number => Math.abs(number) * -1;

Math.reverse = number => number * -1;

function Typeof(anything, differFloatAndInt = false, differNegAndPos = false) {
	let returned = typeof anything,
		is = (type) => typeof anything == type;;
	if (is("object") && Array.isArray(anything))
		returned = "array"; //is it an array
	if (anything === null || anything === undefined || (is("number") && isNaN(anything)))
		returned = "nil"; // is null, undefined or NaN? Then it's "nil"
	if (is("number") && (differFloatAndInt || differNegAndPos)) 
		returned = [
			(anything.isNegative() && differNegAndPos) ? "-": "",
			differFloatAndInt ? (anything.isFloat() ? "float": "integer") : "number"
		].join("");
	return returned;
}

document.addElement = (child_tagname, parent, attributes = []) => {
	let element = document.createElement(child_tagname);
	for (let a = 0; a <= attributes.length; a++) {
		let at = attributes[a];
		if (at.name == "style") {
			for (let s = 0; s <= at.value.length; s++) {
				let st = at.value[s];
				element.style[st.name] = st.value;
			}
			break;
		}
		if (at.name == "html"|"text") {
			if (at.name == "html") {
				element.innerHTML = at.value;
				break;
			}
			element.innerText = at.value;
			break;
		}
		if (at.name == "class") {
			if (typeof at.value == "string") {
				element.className = at.value;
				break;
			}
			element.className = at.value.join(" ");
		}
		element.setAttribute(at.name.toString(), at.value.toString());
	}
	parent.appendChild(element);
}

JSON.keys = Object.keys;
JSON.values = Object.values;

Cookie = {
	getItem: (val) => {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].split("=");
			if (cookie[0].trim() === val) return decodeURIComponent(cookie[1]);
		}
	},
	getAll: () => document.cookie ? `{\"${document.cookie.replace(/=/g, "\":\"").replace(/; /g, "\",\"")}${document.cookie[document.cookie.length] === ";" ? "": "\""}}`: {},
	setItem: (name, val, delDate = false) => {
		let max = "";
		if (delDate) max = "expires:" + new Date(delDate[0], delDate[1], delDate[3]).toUTCString() + ";";
		document.cookie = name + "=" + encodeURIComponent(val) + ";SameSite=Lax;" + max;
	},
	hasItem: (name) => {
		let cookies = document.cookie.split(";");
		let ret = false;
		for (let i = 0; i < cookies.length; i++) {
			let cook = cookies[i].split("=")[0];
			if (cook.trim() === name) ret = true;
		}
		return ret;
	},
	removeItem: (name) => {
		document.cookie = name + "=;expires=0;";
	}
}

Number.prototype.isEven = function(checkOdd = false) {
	return !checkOdd ? this % 2 == 0 : this % 2 != 0;
}

Array.prototype.last = function() {
	let last = this.slice(-1)[0];
	return last;
}

// Parsed.Location.search is addapted from Wolfgang Kuehn and chickens on StackOverflow. stackoverflow.com/a/8649003
escapestuff = (s) => s.replace(/['"]/g, "''").replace(/\\/g, "\\\\");
Parsed = {
	Location: {
		path: location.pathname.split("/"),
		host: location.hostname.split("."),
		tld: location.hostname.split(".").pop(),
		search: (location.search != "") ? JSON.parse('{"' + escapestuff(decodeURI(location.search.substring(1))).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'): {}
	},
	Meta: {
		title: (document.querySelector("meta[name=\"title\"]") ?? {content:document.title}).content,
		description: (document.querySelector("meta[name=\"description\"]") ?? {content:""}).content,
		keywords: ((document.querySelector("meta[name=\"keywords\"]") ?? {content: ""}).content.split(",").length == 1 && (document.querySelector("meta[name=\"keywords\"]") ?? {content: ""}).content.split(",")[0] == "") ? []: (document.querySelector("meta[name=\"keywords\"]") ?? {content: ""}).content.split(","),
		author: (document.querySelector("meta[name=\"author\"]") ?? {content:""}).content,
		charset: (document.querySelector("meta[charset]") ?? {getAttribute:()=>""}).getAttribute("charset"),
		refresh: Number((document.querySelector("meta[http-equiv=\"refresh\"]") ?? {content:NaN}).content),
		viewport: (document.querySelector("meta[name=\"viewport\"]") ?? {content:""}).content
	}
}
// yes, I am aware the object above is kindof a mess, but that's a problem for me later.
delete escapestuff;
for (let keyword of Parsed.Meta.keywords) if (keyword.charAt(0) === " ") keyword.shift();

Number.prototype.isFloat = function() {
	return Math.ceil(this) != this;
}

Number.prototype.isNegative = function() {
	return Math.abs(this) != this;
}

Array.prototype.median = function() {
	if (this.length == 0) return "none";
	let sort = [].concat(this),
		halfway = (this.length / 2) - 1;
	sort.sort()
	if ((this.length / 2).isFloat()) {
		if (Typeof(sort[Math.floor(halfway)]) == "number" && Typeof(sort[Math.ceil(halfway)]) == "number") return (sort[Math.ceil(halfway)] + sort[Math.floor(halfway)]) / 2; 
		return sort[Math.ceil(halfway)] + sort[Math.floor(halfway)];
	}
	return sort[halfway];
}

Math.mean = array => {
	let full = 0;
	for (let i = 0; i < array.length; i++) {
		full += array[i];
	}
	return full / array.length;
}

Math.range = array => {
	let arr = [].concat(array);
	arr.sort((a, b) => {
		if (a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else {
			return 0;
		}
	});
	let end = arr.pop();
	return end - array[0];
}

// Array.prototype.mode is adapted from an answer by Sacho on StackExchange. codereview.stackexchange.com/a/68342
Array.prototype.mode = function() {
	if (this.length === 1) return this[0];
	let numMapping = {},
 		greatestFreq = 0,
		mode;
	for (let i of this) {
		numMapping[i] = (numMapping[i] || 0) + 1;
		if (!(greatestFreq < numMapping[i])) return;
		greatestFreq = numMapping[i];
		mode = i;
	}
	if (typeof mode == "number") return +mode;
	return mode;
}

// lcm addapted from rb.gy/81tp11
// gcf addapted from Amani on StackOverflow. stackoverflow.com/a/17445307
Commons = {
	lcm: (a, b) => {
		let hcf;
		for (let i = 1; i <= a && i <= b; i++) {
			if (a % i == 0 && b % i == 0) hcf = i;
		};
		let lcm = (a * b) / hcf;
		return lcm;
	},
	gcf: (a, b) => {
		if (a === 0) return b;
		while (b != 0) {
			if (a > b) a -= b;
			else b -= a;
		}
		return a;
	}
}

Array.prototype.randomize = function(randomizes = 10) {
	for (let _ = 0; _ <= randomizes; _++) {
		this.sort((a, b) => {
			let random = Math.floor(Math.random() * 2);
			if (random == 0) {
				return -1;
			} else if (random == 1) {
				return 1;
			} else {
				return 0;
			}
		})
	}
}

Object.prototype.toString = function() {
	return JSON.stringify(this)
}

class Fraction {
	constructor(num, den) {
		this.num = num;
		this.den = den;
	}
	static toFraction(number) {
		return new this(number, 1);
	}
	static divide(first, second) {
		return new this(first.num * second.den, first.den * second.num);
		// numerator: first.num * second.den,
		// denominator: first.den * second.num
	}
	static mutliply(first, second) {
		return new this(first.num * second.num, first.den * second.den);
		// numerator: first.num * second.num,
		// denominator: first.den * second.den
	}
	static add(frac1, frac2) {
		let lcm = Commons.lcm(frac1.den, frac2.den);
		return new this((frac1.num * (lcm / frac1.den)) + (frac2.num * (lcm / frac2.den)), lcm)
		// numerator: (frac1.num * (lcm / frac1.den)) + (frac2.num * (lcm / frac2.den))
		// denominator: lcm
	}
	static subtract(frac1, frac2) {
		let lcm = Commons.lcm(frac1.den, frac2.den);
		return new this((frac1.num * (lcm / frac1.den)) - (frac2.num * (lcm / frac2.den)), lcm);
		// numerator: (frac1.num * (lcm / frac1.den)) - (frac2.num * (lcm / frac2.den))
		// denominator: lcm
	}
	static parse(string) {
		return new this(Number(string.split("/")[0]), Number(string.split("/")[1]));
	}
	get type() {
		return this.den <= this.num ? "improper": "proper";
	}
	toString() {
		return `${this.num}/${this.den}`;
	}
	toNumber(allowFloats = true) {
		let returning = this.num / this.den;
		return allowFloats ? returning: Math.round(returning);
	}
}

async function Notify(body, title = false, icon = false, link = false, vib = false, time = 10000) {
	if (!title) title = document.title;
	let p = await Notification.requestPermission();
	if (p != "granted") return;
	let options = {
		body: body,
		icon: icon,
		vibrate: vib
	}
	if (!icon) delete options.icon;
	let notify = new Notification(title, options);
	setTimeout(() => notify.close(), time);
	if (!link) return;
	notify.addEventListener("click", () => { window.open(link, "_blank") });
}

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

Code = {
	encode: {
		binary: thing => {
			if (typeof thing != "number") {
				console.error("TypeError: Expected a number, got a " + typeof thing)
				return "0";
			}
			return thing.toString(2);
		},
		base64: thing => btoa(thing),
		hexadecimal: thing => {
			if (typeof thing != "number") {
				console.error("TypeError: Expected a number, got a " + typeof thing)
				return 0;
			}
			return thing.toString(16);
		}
	},
	decode: {
		binary: binary => parseInt(binary, 2),
		base64: base64 => {
			let returned = atob(base64);
			if (!isNaN(parseInt(returned))) return parseInt(returned);
			return returned;
		},
		hexadecimal: hex => parseInt(hex, 16)
	}
}

Math.Random = (min = 0, max = 5, forceint = true) => {
	let random = min + Math.random() * (max - min);
	return forceint ? Math.floor(random) : random;
}

Object.prototype.keys = function() {
	return Object.keys(this);
}
Object.prototype.values = function() {
	return Object.values(this);
}

Object.keysare = (object, keys) => Object.keys(object).sort().join() === keys.sort().join();
JSON.keysare = Object.keysare;
Object.prototype.keysare = function(keys) {
	return Object.keysare(this, keys);
}