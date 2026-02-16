// Create canvas dynamically
const canvas = document.createElement('canvas');
canvas.width = 100;  // Width ko aur chhota kiya
canvas.height = 200; // Height ko aur kam kiya

canvas.style.display = 'block';
canvas.style.margin = 'auto';
canvas.style.marginTop = '50px';
canvas.style.background = 'transparent';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Candle parameters
const candleWidth = 30;  // Candle ki width aur kam ki
const upperWickTop = canvas.height * 0.15; // 15% upar se, thoda aur neeche
const lowerWickBottom = canvas.height - 5; // 5px neeche se, thoda aur kam
const candleBodyHeight = (lowerWickBottom - upperWickTop) * 0.85; // Body height ko 85% rakha
const candleTop = upperWickTop;
const candleBottom = candleTop + candleBodyHeight;

// Center horizontally
const candleX = (canvas.width - candleWidth) / 2;

// Draw wick (upper + lower)
ctx.strokeStyle = '#2bba00';
ctx.lineWidth = 2;  // Wick ko aur patla kiya
ctx.beginPath();
ctx.moveTo(candleX + candleWidth / 2, upperWickTop); // top of wick
ctx.lineTo(candleX + candleWidth / 2, lowerWickBottom); // bottom of wick
ctx.stroke();

// Draw candle body
ctx.fillStyle = '#2bba00';
ctx.fillRect(candleX, candleTop, candleWidth, candleBottom - candleTop);

// Optional: border around candle body
ctx.strokeStyle = '#2bba00';
ctx.strokeRect(candleX, candleTop, candleWidth, candleBottom - candleTop);

// Draw candle name below
ctx.fillStyle = 'black';
ctx.font = '14px Arial';  // Font size ko thoda aur chhota kiya
ctx.textAlign = 'center';
ctx.fillText('Abnormal', canvas.width / 2, lowerWickBottom + 15); // Text position thoda neeche