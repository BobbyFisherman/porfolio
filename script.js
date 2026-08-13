// ============================================================
// Shared behaviour across all pages
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('pre-load');
  document.body.classList.add('loaded');

  initRevealOnScroll();
  initHeroTerminal();
  initResumeTOC();
  initProjectFilters();
});

// ---------- Reveal on scroll ----------
function initRevealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => io.observe(el));
}

// ---------- Interactive hero terminal ----------
function initHeroTerminal(){
  const term = document.getElementById('hero-term');
  if(!term) return;

  const output = term.querySelector('.term-output');
  const input = term.querySelector('#term-input');
  const bootLines = JSON.parse(term.dataset.boot || '[]');

  const commands = {
    help: () => [
      'available commands:',
      '  whoami        show a short bio',
      '  skills        list core skills',
      '  cd projects   go to the projects page',
      '  cat resume    go to the resume page',
      '  contact       show github / linkedin',
      '  clear         clear the screen'
    ],
    whoami: () => [
      'software engineer focused on data structures,',
      'algorithms, and systems that need to stay fast',
      'under real load.'
    ],
    skills: () => [
      'languages : [Add your languages here]',
      'ds & algo : trees, graphs, heaps, hashing, DP',
      'systems   : [Add systems / infra tools here]',
      'type "cd projects" to see these in action'
    ],
    contact: () => [
      'github    -> github.com/BobbyFisherman',
      'linkedin  -> linkedin.com/in/basil-adam-0b9228429'
    ],
    clear: () => { output.innerHTML = ''; return null; },
    'cd projects': () => { navigate('projects.html'); return ['opening projects.html ...']; },
    'cat resume': () => { navigate('resume.html'); return ['opening resume.html ...']; },
  };

  function navigate(href){
    setTimeout(() => { window.location.href = href; }, 500);
  }

  function printLine(html, extraClass){
    const div = document.createElement('div');
    div.className = extraClass || '';
    div.innerHTML = html;
    output.appendChild(div);
    term.scrollTop = term.scrollHeight;
  }

  function runCommand(raw){
    const cmd = raw.trim().toLowerCase();
    printLine(`<span class="prompt">visitor@portfolio</span>:<span class="path">~$</span> ${escapeHtml(raw)}`);
    if(cmd === ''){ return; }
    const handler = commands[cmd];
    if(!handler){
      printLine(`<span class="out">command not found: ${escapeHtml(cmd)} — type "help"</span>`, 'comment');
      return;
    }
    const lines = handler();
    if(lines){
      lines.forEach(l => printLine(`<span class="out">${escapeHtml(l)}</span>`));
    }
  }

  function escapeHtml(str){
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // Boot sequence typing animation
  let bootIndex = 0;
  function typeBootLine(){
    if(bootIndex >= bootLines.length){
      if(input) input.focus({preventScroll:true});
      return;
    }
    const line = bootLines[bootIndex];
    const div = document.createElement('div');
    output.appendChild(div);
    let charIndex = 0;
    const speed = line.startsWith('$') ? 28 : 10;
    const typer = setInterval(() => {
      div.innerHTML = `<span class="${line.startsWith('$') ? 'prompt' : 'out'}">${escapeHtml(line.slice(0, charIndex + 1))}</span>`;
      charIndex++;
      if(charIndex >= line.length){
        clearInterval(typer);
        bootIndex++;
        setTimeout(typeBootLine, 130);
      }
    }, speed);
  }
  typeBootLine();

  if(input){
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        const val = input.value;
        input.value = '';
        runCommand(val);
      }
    });
    // clicking anywhere in the terminal focuses the input
    term.addEventListener('click', () => input.focus());
  }

  // quick-command chips (data-cmd attribute)
  term.querySelectorAll('[data-cmd]').forEach(btn => {
    btn.addEventListener('click', () => {
      if(input){ input.value = btn.dataset.cmd; input.focus(); }
      runCommand(btn.dataset.cmd);
    });
  });
}

// ---------- Resume table-of-contents active state ----------
function initResumeTOC(){
  const toc = document.querySelectorAll('.resume-toc a');
  if(!toc.length) return;
  const sections = Array.from(toc).map(a => document.querySelector(a.getAttribute('href')));

  function onScroll(){
    let current = sections[0];
    const y = window.scrollY + 100;
    sections.forEach(sec => { if(sec && sec.offsetTop <= y) current = sec; });
    toc.forEach(a => a.classList.remove('active'));
    const match = Array.from(toc).find(a => document.querySelector(a.getAttribute('href')) === current);
    if(match) match.classList.add('active');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Projects page filtering ----------
function initProjectFilters(){
  const bar = document.querySelector('.filter-bar');
  if(!bar) return;
  const buttons = bar.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');
  const countEl = document.querySelector('.proj-count');

  function applyFilter(tag){
    let visible = 0;
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(',');
      const show = tag === 'all' || tags.includes(tag);
      card.classList.toggle('hidden', !show);
      if(show) visible++;
    });
    if(countEl) countEl.textContent = `showing ${visible} of ${cards.length} projects`;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter('all');
}
