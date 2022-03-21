Logic = {
	xor: (boola, boolb) => {
		return (boola || boolb) && !(boola && boolb);
	},
	nor: (boola, boolb) => {
		return !(boola || boolb);
	},
	xnor: (boola, boolb) => {
		return (boola && boolb) || (!boola && !boolb);
	},
	nand: (boola, boolb) => {
		return ((boola || boolb) && !(boola && boolb)) || !(boola && boolb);
	}
}

Nil = [ undefined, null, NaN ];

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

Math.negative = (number) => {
	return Math.abs(number) * -1;
}

Math.reverse = (number) => {
	return number * -1;
}

Typeof = (anything) => {
	if (typeof anything == "object" && Array.isArray(anything)) return "array";
	if (anything === null || anything === undefined || anything === NaN) return "nil";
	return typeof anything;
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

JSON.keys = (object) => {
	return Object.keys(object);
}

Cookie = {
	getItem: (val) => {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cook = cookies[i].split("=");
			if (cook[0].trim() === val) {
				return decodeURIComponent(cook[1]);
			}
		}
	},
	getAll: () => {
		let cookies = document.cookie.split(";"),
		final = {};
		if (document.cookie) {
			for (let i = 0; i < cookies.length; i++) {
				let cookie = cookies[i].split("=");
				final[cookie[0]] = cookie[1]
			}
		}
		return final;
	},
	set: (nam, val, delDate = false) => {
		let max = "";
		if (delDate) max = "expires:" + new Date(delDate[0], delDate[1], delDate[3]).toUTCString() + ";";
		document.cookie = nam + "=" + encodeURIComponent(val) + ";SameSite=Lax;" + max;
	},
	has: (nam) => {
		let cookies = document.cookie.split(";");
		let ret = false;
		for (let i = 0; i < cookies.length; i++) {
			let cook = cookies[i].split("=")[0];
			if (cook.trim() === nam) {
				ret = true;
			}
		}
		return ret;
	},
	delete: (name) => {
		document.cookie = name + "=;expires=0;";
	}
}

Number.prototype.isEven = function(checkEven = true) {
	if (!checkEven) return this % 2 != 0;
	return this % 2 == 0;
}

Array.prototype.last = function() {
	let last = this.slice(-1)[0];
	return last;
}

// Parsed.Location.search is from Wolfgang Kuehn and chickens on StackOverflow. stackoverflow.com/a/8649003
var SearchThing___1awesome = location.search.substring(1);
Parsed = {
	Location: {
		path: location.pathname.split("/"),
		host: location.hostname.split("."),
		tld: location.hostname.split(".").pop(),
		search: {}
	},
	Meta: {
		title: (document.querySelector("meta[name=\"title\"]") ?? {content:document.title}).content,
		description: (document.querySelector("meta[name=\"description\"]") ?? {content:""}).content,
		keywords: (document.querySelector("meta[name=\"keywords\"]") ?? {content: ""}).content.split(","),
		author: (document.querySelector("meta[name=\"author\"]") ?? {content:""}).content,
		charset: (document.querySelector("meta[charset]") ?? {getAttribute:()=>""}).getAttribute("charset"),
		refresh: Number((document.querySelector("meta[http-equiv=\"refresh\"]") ?? {content:NaN}).content),
		viewport: (document.querySelector("meta[name=\"viewport\"]") ?? {content:""}).content
	}
}
if (location.search != "") Parsed.Location.search = JSON.parse('{"' + decodeURI(SearchThing___1awesome).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
delete SearchThing___1awesome;
for (let keyword of Parsed.Meta.keywords) if (keyword.charAt(0) === " ") keyword.shift();
if (Parsed.Meta.keywords.length == 1 && Parsed.Meta.keywords[0] == "") Parsed.Meta.keywords = []

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

Math.mean = (array) => {
	let full = 0;
	for (let i = 0; i < array.length; i++) {
		full += array[i];
	}
	return full / array.length;
}

Math.range = (array) => {
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

// Array.prototype.mode is taken from an answer by Sacho on StackExchange's Code Review. codereview.stackexchange.com/a/68342
Array.prototype.mode = function() {
	if (this.length == 1) return null;
	let numMapping = {},
 		greatestFreq = 0,
		mode;
	this.forEach((number) => {
		numMapping[number] = (numMapping[number] || 0) + 1;
		if (greatestFreq < numMapping[number]) {
			greatestFreq = numMapping[number];
			mode = number;
		}
	});
	if (typeof mode == "number") return +mode;
	return mode;
}

// lcm addapted from rb.gy/81tp11
// gcf addapted from Amani on StackOverflow. stackoverflow.com/a/17445307
Commons = {
	lcm: (num1, num2) => {
		let hcf;
		for (let i = 1; i <= num1 && i <= num2; i++) {
			if( num1 % i == 0 && num2 % i == 0) {
				hcf = i;
			};
		};
		let lcm = (num1 * num2) / hcf;
		return lcm;
	},
	gcf: (a, b) => {
		if (a == 0) return b;
		while (b != 0) {
			if (a > b) a = a - b;
			else b = b - a;
		}
		return a;
	}
}

Array.prototype.randomize = function(randomizes = 10) {
	for (let _ = 0; _ <= randomizes; _++) {
		this.sort((a, b) => {
			let random = Math.round(Math.random() * 2);
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

Time = {
	generateSeconds: (secs) => {
		return secs * 1000;
	},
	generateMinutes: (mins) => {
		return mins * 60 * 1000;
	},
	generateHours: (hours) => {
		return hours * 60 * 60 * 1000;
	},
	generateDays: (days) => {
		return days * 24 * 60 * 60 * 1000;
	},
	generateYears: (years) => {
		let leap = 0
		if (Math.floor(years / 4) != 0) leap += Math.floor(years / 4);
		return (years * 365 * 24 * 60 * 60 * 1000) + (leap * 24 * 60 * 60 * 1000);
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
		if (this.den <= this.num) return "improper";
		return "proper";
	}
	toString() {
		return `${this.num}/${this.den}`;
	}
	toNumber(allowFloats = true) {
		let returning = this.num / this.den;
		return returning;
	}
}

async function Notify(body, title = false, icon = false, link = false, vib = false, time = Time.generateSeconds(10)) {
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

Typeof.number = (anything) => {
	if (typeof anthing == "number") {
		if (anything.isFloat()) return "float";
		return "interger";
	}
	return Typeof(anything);
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
		binary: binary => {
			return parseInt(binary, 2);
		},
		base64: base64 => {
			let returned = atob(base64);
			if (parseInt(returned) != NaN) return parseInt(returned);
			return returned;
		},
		hexadecimal: hex => parseInt(hex, 16)
	}
}

Math.Random = (min = 0, max = 5, forceint = true) => {
	let delta = max - min,
		random = min + Math.random() * delta;
	if (forceint) random = Math.floor(random);
	return random;
}