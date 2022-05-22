/* Version Checking */
// When editing please update the below version and the version file, make sure they are the same.
console.warn("Extra Vanilla is being discontinued");
window.extravanilla_version = "public version tracker 0.2.6";
window.extravanilla_versionTrackerURL = "https://raw.githubusercontent.com/Steve0Greatness/ExtraVanilla.js/main/download/version";
fetch(window.extravanilla_versionTrackerURL)
	.then(res => res.text())
	.then(res => {
		if (res != window.extravanilla_version) {
			console.warn(`The current version of Extra Vanilla is "${res}", you're using "${window.extravanilla_version}". Unless you don't want new features, please update to ${res} from https://extravanilla.netlify.app/download/.`);
		}
	});

/** Locial booleans programmed in JavaScript
 * @see https://github.com/Steve0Greatness/ExtraVanilla.js/wiki/Logic
 * @return {boolean}
 */
Logic = {
	/** Locial XOR programmed in JavaScript
	 * @param {boolean} boola
	 * @param {boolean} boolb
	 * @return {boolean}
	 */
	xor: (boola, boolb) => (boola || boolb) && !(boola && boolb),
	/** Locial NOR programmed in JavaScript
	 * @param {boolean} boola
	 * @param {boolean} boolb
	 * @return {boolean}
	 */
	nor: (boola, boolb) => !(boola || boolb),
	/** Locial XNOR programmed in JavaScript
	 * @param {boolean} boola
	 * @param {boolean} boolb
	 * @return {boolean}
	 */
	xnor: (boola, boolb) => (boola && boolb) || (!boola && !boolb),
	/** Locial NAND programmed in JavaScript
	 * @param {boolean} boola
	 * @param {boolean} boolb
	 * @return {boolean}
	 */
	nand: (boola, boolb) => ((boola || boolb) && !(boola && boolb)) || !(boola && boolb)
}

/**
 * Nil class
 */
class Nil {
	constructor(define) {
		let type = undefined;
		if (typeof define == "number") type = NaN;
		else if (typeof define != "undefined") type = null;
		this.value = type;
	}
	/** Null
	 * @returns {null}
	 */
	static get null() {
		return null;
	}
	/** Undefined
	 * @returns {undefined}
	 */
	static get undefined() {
		return undefined;
	}
	/** Not a Number
	 * @returns {number}
	 */
	static get NaN() {
		return NaN;
	}
}

/**
 * Generate an array of numbers from `start` to `end`
 * @param {number} start
 * @param {number} end
 * @param {number} jump increment
 * @example
 * ArrayRange(5, 15, 5) // [ 5, 10, 15 ]
 * @returns {number[]} Returns an array from the start value to the end value
 */
function ArrayRange(start, end, jump = 1) {
	let range = [],
		inc = (end > start) ? Math.abs(jump): (Math.abs(jump) * -1),
		i = start,
		check = (i, a) => i <= a;
	if (end < start)
		check = (i, a) => i >= a;
	for (i = start; check(i, end); i += inc) 
		range.push(i);
	return range;
}

/**
 * Forces the number to be negitive--the reverse of `Math.abs`
 * @param {number} number
 * @example
 * ```
 * Math.negative(3) // -3
 * Math.negative(-3) // -3
 * ```
 * @returns {number}
 */
Math.negative = number => Math.abs(number) * -1;

/**
 * If the number is negitive, it turns it to a positive; if it's positive, it turns to negitive.
 * @param {number} number
 * @example
 * ```
 * Math.negative(3) // -3
 * Math.negative(-3) // 3
 * ``` 
 * @returns {number}
 */
Math.reverse = number => number * -1;


/**
 * 
 * @param {any} anything 
 * @param {boolean} differFloatAndInt 
 * @param {boolean} differNegAndPos
 * @example
 * Typeof([4, 6, .7, "a"], false, false) // array
 * @returns {string}
 */
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

/**
 * Creates and instantly puts it into the document at the specified parent
 * @param {string} child_tagname 
 * @param {element} parent
 * @param {(object|Array)} attributes 
 * @example
 * document.addElement("a", document.body, [ { name: "href", value: "/path" }, { name: "text", value: "Link" } ])
 */
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

/**
 * For interacting in cookies in all sorts of ways
 */
Cookie = {
	/**
	 * Gets a cookie
	 * @param {string} val 
	 * @example
	 * Cookie.getItem("username")
	 * @returns {any}
	 */
	getItem: val => {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].split("=");
			if (cookie[0].trim() === val) return decodeURIComponent(cookie[1]);
		}
	},
	/**
	 * Returns an object of all cookie
	 * @example
	 * Cookie.getAll()
	 * @returns {object}
	 */
	getAll: () => document.cookie ? `{\"${document.cookie.replace(/=/g, "\":\"").replace(/; /g, "\",\"")}${document.cookie[document.cookie.length] === ";" ? "": "\""}}`: {},
	/**
	 * 
	 * @param {string} name 
	 * @param {any} val 
	 * @param {number[]} delDate 
	 * @example
	 * Cookie.setItem("username", "J. Doe", [ 1, 15, 1999 ])
	 */
	setItem: (name, val, delDate = false) => {
		let max = "";
		if (delDate) max = "expires:" + new Date(delDate[0], delDate[1], delDate[3]).toUTCString() + ";";
		document.cookie = name + "=" + encodeURIComponent(val) + ";SameSite=Lax;" + max;
	},
	/**
	 * Checks if a cookie exists
	 * @param {string} name 
	 * @example
	 * ```
	 * Cookie.hasItem("username") // true
	 * Cookie.hasItem("password") // false
	 * ```
	 * @returns {boolean}
	 */
	hasItem: name => {
		let cookies = document.cookie.split(";");
		let ret = false;
		for (let i = 0; i < cookies.length; i++) {
			let cook = cookies[i].split("=")[0];
			if (cook.trim() === name) ret = true;
		}
		return ret;
	},
	/**
	 * Deletes a cookie
	 * @param {string} name 
	 * @example
	 * Cookie.removeItem("username")
	 */
	removeItem: name => {
		document.cookie = name + "=;expires=0;";
	}
}

/**
 * takes in a number and checks if it's even
 * @param {boolean} checkOdd 
 * @example
 * (5).isEven() // false
 * @returns {boolean}
 */
Number.prototype.isEven = function(checkOdd = false) {
	return !checkOdd ? this % 2 == 0 : this % 2 != 0;
}

/**
 * Gets the last element of an array
 * @example
 * ["a", "foo", 5, "bar", 76, 0.6].last() // 0.6
 * @returns {any}
 */
Array.prototype.last = function() {
	return this.slice(-1)[0];
}

// Parsed.Location.search is addapted from Wolfgang Kuehn and chickens on StackOverflow. stackoverflow.com/a/8649003
escapestuff = s => s.replace(/'/g, "''").replace(/\\/g, "\\\\");
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

/**
 * Checks if a number is a decimal
 * @example
 * (57.77).isFloat() // true
 * @returns {boolean}
 */
Number.prototype.isFloat = function() {
	return Math.ceil(this) != this;
}

/**
 * Checks if a number is a negative number
 * @example
 * (-4).isNegative() // true
 * @returns {boolean}
 */
Number.prototype.isNegative = function() {
	return Math.abs(this) != this;
}

/**
 * Gets the middle element(s) of an array
 * @example
 * [5, 66, 44, 6, 55].median() // 55
 * @returns {any}
 */
Array.prototype.median = function() {
	if (this.length == 0) return undefined;
	let sort = [].concat(this).sort(),
		a = (this.length / 2),
		halfway = a - 1;
	if (Math.ceil(a) != a) {
		if (Typeof(sort[Math.floor(halfway)]) == "number" && Typeof(sort[Math.ceil(halfway)]) == "number")
			return (sort[Math.ceil(halfway)] + sort[Math.floor(halfway)]) / 2; 
		return sort[Math.ceil(halfway)] + sort[Math.floor(halfway)];
	}
	return sort[halfway];
}

/**
 * Gets the average of the array of numbers
 * @param {number[]} array 
 * @example
 * Math.mean([5, 10, 15]) // 10
 * @returns {number}
 */
Math.mean = array => {
	let full = 0;
	for (let i of array) 
		full += i;
	return full / array.length;
}

/**
 * Gets the range fromt the first element to the last
 * @param {number[]} array
 * @example
 * Math.range([55, 42, 234]) // 192
 * @returns {number}
 */
Math.range = array => {
	let arr = [].concat(array);
	arr.sort((a, b) => {
		if (a > b) 
			return 1;
		else if (a < b) 
			return -1;
		else 
			return 0;
	});
	let end = arr.pop();
	return end - array[0];
}

// Array.prototype.mode is adapted from an answer by Sacho on StackExchange. codereview.stackexchange.com/a/68342
/**
 * Gets the most common element value in an array
 * @example
 * [5, 6, 7, "foo", 7, "foo", "foo"].mode() // "foo"
 * @returns {any}
 */
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
	/**
	 * Least Common Multiplier of 2 numbers
	 * @param {number} a 
	 * @param {number} b 
	 * @example
	 * Commons.lcm(5, 6) // 30
	 * @returns {number}
	 */
	lcm: (a, b) => {
		let hcf;
		for (let i = 1; i <= a && i <= b; i++) {
			if (a % i == 0 && b % i == 0) hcf = i;
		};
		let lcm = (a * b) / hcf;
		return lcm;
	},
	/**
	 * Greatest Common Factor of 2 numbers
	 * @param {number} a 
	 * @param {number} b 
	 * @example
	 * Commons.lcm(9, 6) // 3
	 * @returns {number}
	 */
	gcf: (a, b) => {
		if (a === 0) return b;
		while (b != 0) {
			if (a > b) a -= b;
			else b -= a;
		}
		return a;
	}
}

/**
 * Randomized the array
 * @param {number} randomizes 
 * @example
 * [7, 7, "foo", "bar"].randomize // ["foo", 7, 7, "bar"]
 */
Array.prototype.randomize = function(randomizes = 10) {
	for (let _ = 0; _ <= randomizes; _++) {
		this.sort(() => {
			let random = Math.round(Math.random() * 2);
			if (random == 0)
				return -1;
			else if (random == 1)
				return 1;
			else
				return 0;
		})
	}
}

/**
 * Object to string
 * @example
 * { "foo": "bar" } // "{ \"foo\": \"bar\" }"
 * @returns {string}
 */
Object.prototype.toString = function() {
	return JSON.stringify(this)
}


class Fraction {
	/**
	 * Creates a fraction
	 * @param {number} num 
	 * @param {number} den 
	 * @example
	 * new Fraction(5, 20) // { num: 5, den: 20 }
	 */
	constructor(num, den) {
		this.num = num;
		this.den = den;
	}

	/**
	 * Returns the number to a fraction
	 * @param {number} number 
	 * @example
	 * Fraction.toFraction(5) // { num: 5, den: 1 }
	 * @returns {Fraction}
	 */
	static toFraction(number) {
		return new this(number, 1);
	}

	/**
	 * Divides 2 fractions
	 * @param {number} first 
	 * @param {number} second 
	 * @example
	 * ```
	 * let fraction_a = new Fraction(7, 15)
	 * let fraction_b = new Fraction(5, 6)
	 * Fraction.divide(fraction_a, fraction_b) // { num: 14, den: 25 }
	 * ```
	 * @returns {Fraction}
	 */
	static divide(first, second) {
		return new this(first.num * second.den, first.den * second.num);
		// numerator: first.num * second.den,
		// denominator: first.den * second.num
	}

	get reciprocal() {
		return new Fraction(this.den, this.num);
	}

	/**
	 * Multiplies 2 fractions
	 * @param {number} first 
	 * @param {number} second 
	 * @example
	 * ```
	 * let fraction_a = new Fraction(7, 15)
	 * let fraction_b = new Fraction(5, 6)
	 * Fraction.multiply(fraction_a, fraction_b) // { num: 3, den: 28 }
	 * ```
	 * @returns {Fraction}
	 */
	static multiply(first, second) {
		return new this(first.num * second.num, first.den * second.den);
		// numerator: first.num * second.num,
		// denominator: first.den * second.den
	}

	/**
	 * Adds 2 fractions
	 * @param {number} first 
	 * @param {number} second 
	 * @returns {Fraction}
	 * @example
	 * ```
	 * let fraction_a = new Fraction(7, 15)
	 * let fraction_b = new Fraction(5, 6)
	 * Fraction.add(fraction_a, fraction_b) // { num: 37, den: 56 }
	 * ```
	 */
	static add(frac1, frac2) {
		let lcm = Commons.lcm(frac1.den, frac2.den);
		return new this((frac1.num * (lcm / frac1.den)) + (frac2.num * (lcm / frac2.den)), lcm)
		// numerator: (frac1.num * (lcm / frac1.den)) + (frac2.num * (lcm / frac2.den))
		// denominator: lcm
	}

	/**
	 * Subtracts 2 fractions
	 * @param {number} first 
	 * @param {number} second 
	 * @example
	 * ```
	 * let fraction_a = new Fraction(7, 15)
	 * let fraction_b = new Fraction(5, 6)
	 * Fraction.divide(fraction_a, fraction_b) // { num: 42, den: 75 }
	 * ```
	 * @returns {Fraction}
	 */
	static subtract(frac1, frac2) {
		let lcm = Commons.lcm(frac1.den, frac2.den);
		return new this((frac1.num * (lcm / frac1.den)) - (frac2.num * (lcm / frac2.den)), lcm);
		// numerator: (frac1.num * (lcm / frac1.den)) - (frac2.num * (lcm / frac2.den))
		// denominator: lcm
	}

	/**
	 * Parses a string into a fraction
	 * @param {string} string
	 * @example
	 * Fraction.parse("5/6") // { num: 5, dec: 6 }
	 * @returns {Fraction}
	 */
	static parse(string) {
		return new this(parseInt(string.split("/")[0]), parseInt(string.split("/")[1]));
	}

	/**
	 * Checks if it's a proper or improper fraction
	 * @example
	 * ```
	 * let fraction_a = new Fraction(5, 6)
	 * let fraction_b = new Fraction(7, 1)
	 * fraction_a.type // proper
	 * fraction_b.type // improper
	 * ```
	 * @return {string}
	 */
	get type() {
		return this.den <= this.num ? "improper": "proper";
	}

	/**
	 * Returns a number to a string
	 * @example
	 * ```
	 * let fraction_a = new Fraction(1, 2)
	 * fraction_a.toString() // "1/2"
	 * ```
	 * @returns {string}
	 */
	toString() {
		return `${this.num}/${this.den}`;
	}

	/**
	 * Makes a boolean into a string
	 * @param {boolean} allowFloats
	 * @example
	 * ```
	 * let fraction_a = new Fraction(1, 2)
	 * fraction_a.toNumber(false) // 2
	 * ```
	 * @returns {number}
	 */
	toNumber(allowFloats = true) {
		let returning = this.num / this.den;
		return allowFloats ? returning: Math.round(returning);
	}
}

/**
 * Creates a notification
 * @param {string} body 
 * @param {string} title 
 * @param {string} icon path to icon
 * @param {string} link 
 * @param {boolean} vib 
 * @param {number} time 
 * @example
 * Notify("Hello, World!")
 */
async function Notify(body, title, icon, link, vib, time = 10000) {
	//browser support
	if (!("Notification" in window)) return;

	let p = await Notification.requestPermission();
	if (p != "granted") return;

	let options = {
		body: body,
		icon: icon,
		vibrate: vib
	}
	if (!icon) delete options.icon;
	if (!title) title = document.title;

	//sending
	let notify = new Notification(title, options);
	setTimeout(() => notify.close(), time);

	if (!link) return;
	notify.addEventListener("click", () => { window.open(link, "_blank") });
}

/**
 * Gets a random element of an array
 * @returns {any}
 */
Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

Code = {
	encode: {
		/**
		 * turns a number to binary
		 * @param {number} thing 
		 * @returns {string}
		 */
		binary: thing => {
			if (typeof thing != "number") {
				console.error("TypeError: Expected a number, got a " + typeof thing)
				return "0";
			}
			return thing.toString(2);
		},

		/**
		 * turns a anything to base64
		 * @param {any} thing 
		 * @returns {string}
		 */
		base64: thing => btoa(thing),

		/**
		 * turns a number to hex
		 * @param {number} thing 
		 * @returns {string}
		 */
		hexadecimal: thing => {
			if (typeof thing != "number") {
				console.error("TypeError: Expected a number, got a " + typeof thing)
				return 0;
			}
			return thing.toString(16);
		}
	},
	decode: {
		/**
		 * turns binary to a number
		 * @param {string} thing 
		 * @returns {number}
		 */
		binary: binary => parseInt(binary, 2),

		/**
		 * turns base64 to a anything
		 * @param {string} thing 
		 * @returns {any}
		 */
		base64: base64 => {
			let returned = atob(base64);
			if (!isNaN(parseInt(returned))) return parseInt(returned);
			return returned;
		},

		/**
		 * turns hex to a number
		 * @param {string} thing 
		 * @returns {number}
		 */
		hexadecimal: hex => parseInt(hex, 16)
	}
}

/**
 * what Math.random() should be
 * @param {number} min 
 * @param {number} max 
 * @param {boolean} forceint 
 * @returns {number}
 */
Math.Random = (min = 0, max = 5, forceint = true) => {
	let rand = min + Math.random() * (max - min);
	return forceint ? Math.floor(rand) : rand;
}

/**
 * Returns the keys of the object
 * @returns {string[]}
 */
Object.prototype.keys = function() {
	return Object.keys(this);
}

/**
 * Returns the values of the object
 * @returns {string[]}
 */
Object.prototype.values = function() {
	return Object.values(this);
}

/**
 * Checks if the keys are the keys in the keys array
 * @param {object} object 
 * @param {string[]} keys 
 * @returns {boolean}
 */
Object.keysare = (object, keys) => Object.keys(object).sort().join() === keys.sort().join();
JSON.keysare = Object.keysare;

/**
 * Checks if the keys are the keys in the keys array
 * @param {string[]} keys 
 * @returns {boolean}
 */
Object.prototype.keysare = function(keys) {
	return Object.keys(this).sort().join() === keys.sort().join();
}