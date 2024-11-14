const canvas = document.getElementById('eegCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;

// Generate and display random EEG signal data
function generateEEGSignal() {
  const data = [];
  for (let i = 0; i < canvas.width; i++) {
    data.push(Math.sin(i * 0.1) * Math.random() * 50);
  }
  return data;
}

// Visualize EEG data on canvas
function drawEEGSignal(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);

  data.forEach((value, index) => {
    ctx.lineTo(index, canvas.height / 2 + value);
  });

  ctx.strokeStyle = '#61dafb';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Classify signal into mental state categories
function classifyEEGSignal(data) {
  const avg = data.reduce((sum, value) => sum + value, 0) / data.length;

  let classification = 'Neutral';
  if (avg > 10) {
    classification = 'Alert';
  } else if (avg < -10) {
    classification = 'Calm';
  }

  document.getElementById('classification-output').innerText = `Mental State: ${classification}`;
}

// Update EEG signal display
function updateEEGDisplay() {
  const data = generateEEGSignal();
  drawEEGSignal(data);
  classifyEEGSignal(data);
}

// Refresh display every second
setInterval(updateEEGDisplay, 1000);
