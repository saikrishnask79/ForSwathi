/* =============================================
   INSTAGRAM CLONE — JAVASCRIPT
   instagram.js
   ============================================= */

/* ---- PAGE NAVIGATION ---- */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const el = document.getElementById('bn-' + id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

function openChat() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  document.getElementById('chat').classList.add('active');
  document.getElementById('bn-messages').classList.add('active');
  setTimeout(() => {
    const cb = document.getElementById('chat-body');
    cb.scrollTop = cb.scrollHeight;
  }, 100);
}

/* ---- LIKE / HEART ---- */
function toggleLike(btn) {
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    btn.querySelector('svg').setAttribute('fill', 'var(--ig-red)');
    btn.querySelector('svg').setAttribute('stroke', 'var(--ig-red)');
  } else {
    btn.querySelector('svg').setAttribute('fill', 'none');
    btn.querySelector('svg').setAttribute('stroke', 'currentColor');
  }
}

function heartTap(el) {
  const h = el.querySelector('.heart-overlay');
  h.classList.remove('show');
  void h.offsetWidth; // force reflow
  h.classList.add('show');
  setTimeout(() => h.classList.remove('show'), 600);
}

/* ---- CHAT / MESSAGING ---- */
function sendMsg() {
  const inp = document.getElementById('chat-input');
  const val = inp.value.trim();
  if (!val) return;

  const cb = document.getElementById('chat-body');

  // Add user bubble
  const b = document.createElement('div');
  b.className = 'bubble me';
  b.textContent = val;
  const t = document.createElement('div');
  t.className = 'bubble-time right';
  t.textContent = 'Just now';
  cb.appendChild(b);
  cb.appendChild(t);
  inp.value = '';
  cb.scrollTop = cb.scrollHeight;

  // Show typing indicator then auto-reply
  setTimeout(() => {
    const typing = document.getElementById('typing-bubble');
    const typingT = document.getElementById('typing-time');
    typing.style.display = 'flex';
    typingT.style.display = 'block';
    cb.scrollTop = cb.scrollHeight;

    setTimeout(() => {
      typing.style.display = 'none';
      typingT.style.display = 'none';
      const replies = [
        '🙄', '...', 'omg dev', 'you are SO silly',
        '...okay that was a little cute ngl 🥺', 'still mad tho 😤', '🐸 ur such a frog'
      ];
      const rep = replies[Math.floor(Math.random() * replies.length)];
      const rb = document.createElement('div');
      rb.className = 'bubble them';
      rb.textContent = rep;
      const rt = document.createElement('div');
      rt.className = 'bubble-time';
      rt.textContent = 'Just now';
      cb.appendChild(rb);
      cb.appendChild(rt);
      cb.scrollTop = cb.scrollHeight;
    }, 2000);
  }, 1000);
}

function handleKey(e) {
  if (e.key === 'Enter') sendMsg();
}

/* ---- SORRY MODAL ---- */
function showSorry() {
  document.getElementById('sorry-modal').classList.add('show');
}

function closeSorry(e) {
  if (e.target === document.getElementById('sorry-modal')) {
    document.getElementById('sorry-modal').classList.remove('show');
  }
}

/* ---- STORY VIEWER ---- */
const storyData = {
  priya: { img: 'images/profiles/swathi_j18.png', slides: ['images/swathij_18_story/vk.png'], name: 'swathij_18', time: '2h ago' },
  ananya: { img: 'images/profiles/Durgaa.png', bg: 'linear-gradient(135deg,#667eea,#764ba2)', text: 'Weekend vibes 🌅 @swathij_18 come outtt', name: 'Durgaa', time: '4h ago' },
  meera: { img: 'images/profiles/Nayab 😉.png', bg: 'linear-gradient(135deg,#43e97b,#38f9d7)', text: 'Sunday funday ☀️', name: 'Nayab 😉', time: '6h ago' },
  riya: { img: 'images/profiles/urstrulymahesh.png', bg: 'linear-gradient(135deg,#fa709a,#fee140)', text: 'Coffee mornings ☕ best part of the day', name: 'urstrulymahesh', time: '1d ago' },
  kavya: { img: 'images/profiles/Virat Kohli.png', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', text: 'Art n soul 🎨 creating something for my bestie', name: 'virat.kohli', time: '2d ago' },
  you: { img: 'images/profiles/___sai_krishna___.png', bg: 'linear-gradient(135deg,#434343,#000000)', text: 'Add to your story...', name: '___sai_krishna___', time: 'Now' },
};

let storyTimeout;
let slideInterval;

function openStory(id) {
  clearTimeout(storyTimeout);
  clearInterval(slideInterval);

  const d = storyData[id] || storyData.priya;
  const avImg = document.getElementById('sv-av-img');
  if (avImg) avImg.src = d.img;
  document.getElementById('sv-name').textContent = d.name;
  document.getElementById('sv-ts').textContent = d.time;

  const bg = document.getElementById('sv-bg');
  const txt = document.getElementById('sv-text');

  if (d.slides) {
    let current = 0;
    const show = () => {
      bg.style.background = `#000 url("${d.slides[current]}") center/contain no-repeat`;
      txt.textContent = '';
      document.getElementById('p1').className = current >= 0 ? 'prog-fill active' : 'prog-fill';
      document.getElementById('p2').className = current >= 1 ? 'prog-fill active' : 'prog-fill';
      document.getElementById('p3').className = 'prog-fill';
      current++;
      if (current >= d.slides.length) {
        clearInterval(slideInterval);
        storyTimeout = setTimeout(closeStory, 3000);
      }
    };
    show(); // Show first image immediately
    document.getElementById('story-viewer').classList.add('show');
    slideInterval = setInterval(show, 3000);
  } else {
    bg.style.background = d.bg;
    txt.textContent = d.text;
    document.getElementById('p1').className = 'prog-fill active';
    document.getElementById('p2').className = 'prog-fill';
    document.getElementById('p3').className = 'prog-fill';
    document.getElementById('story-viewer').classList.add('show');
    storyTimeout = setTimeout(closeStory, 5000);
  }
}

function closeStory() {
  clearTimeout(storyTimeout);
  clearInterval(slideInterval);
  document.getElementById('story-viewer').classList.remove('show');
}
