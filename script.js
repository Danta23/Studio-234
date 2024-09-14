let Lightmode = localStorage.getItem('Lightmode');
const themeButton = document.querySelector('.Nav-Item:last-child');
const icon = document.querySelector('.Nav-Item:last-child i');
const highlightStyleLink = document.getElementById('highlight-style');

const Enable_Lightmode = () => {
  document.body.classList.remove('Dark');
  document.body.classList.add('Light');
  if (highlightStyleLink) {
    highlightStyleLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github.min.css';
  }
  localStorage.setItem('Lightmode', 'Active');
}

const Disable_Lightmode = () => {
  document.body.classList.remove('Light');
  document.body.classList.add('Dark');
  if (highlightStyleLink) {
    highlightStyleLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark-dimmed.min.css';
  }
  localStorage.setItem('Lightmode', null);
}

if (Lightmode === "Active") {
  icon.classList.remove('bx-sun');
  Enable_Lightmode();
  icon.classList.add('bxs-moon');
}

themeButton.addEventListener('click', () => {
  Lightmode = localStorage.getItem('Lightmode');
  if (icon.classList.contains('bx-sun') || Lightmode !== "Active") {
    icon.classList.remove('bx-sun');
    Enable_Lightmode();
    icon.classList.add('bxs-moon');
  } else {
    icon.classList.remove('bxs-moon');
    Disable_Lightmode();
    icon.classList.add('bx-sun');
  }
});

function filterSelection(category) {
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  const buttons = document.querySelectorAll('.category-button');
  buttons.forEach(button => {
    button.classList.toggle('active', button.getAttribute('onclick').includes(category));
  });
}

const copyButton = document.querySelector('.copy-button');
const codeBlocks = document.querySelectorAll('pre code');

copyButton.addEventListener('click', () => {
    let codeToCopy = '';
    codeBlocks.forEach((block) => {
        codeToCopy += block.innerText + '\n';
    });

    navigator.clipboard.writeText(codeToCopy)
        .then(() => {
            alert('Code copied to clipboard!');
        })
        .catch((error) => {
            console.error('Error copying code:', error);
        });
});

const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const volumeUpButton = document.getElementById('volume-up');
const volumeDownButton = document.getElementById('volume-down');
const progressBar = document.querySelector('.progress');
const timeDisplay = document.getElementById('timeDisplay');

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
});

volumeUpButton.addEventListener('click', () => {
    audioPlayer.volume += 0.1;
});

volumeDownButton.addEventListener('click', () => {
    audioPlayer.volume -= 0.1;
});

audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    const currentTime = audioPlayer.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(audioPlayer.duration / 60);
    const totalSeconds = Math.floor(audioPlayer.duration % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    progressBar.style.width = `${progressPercent}%`;
});