const API_BASE = 'https://saavn.sumit.co';

const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const searchQualitySelect = document.getElementById('quality-search');
const controlQualitySelect = document.getElementById('quality-control');
const resultsEl = document.getElementById('results');
const statusEl = document.getElementById('status');
const titleEl = document.getElementById('now-title');
const artistEl = document.getElementById('now-artist');
const albumEl = document.getElementById('now-album');
const detailEl = document.getElementById('now-detail');
const coverEl = document.getElementById('now-cover');
const progressEl = document.getElementById('progress');
const timeEl = document.getElementById('time');
const playBtn = document.getElementById('play-toggle');
const prevBtn = document.getElementById('prev-track');
const nextBtn = document.getElementById('next-track');
const downloadBtn = document.getElementById('download-track');
const player = document.getElementById('player');
const autoplayToggle = document.getElementById('autoplay');
const autoplayLabel = autoplayToggle?.nextElementSibling;
const chips = document.querySelectorAll('[data-query]');

const fallbackQuery = 'Arijit Singh';
let queue = [];
let currentIndex = -1;
let currentTrack = null;
let currentStream = '';

function getPreferredQuality() {
  return String(controlQualitySelect?.value || searchQualitySelect?.value || '320');
}

function syncQualitySelectors(source) {
  if (!source) return;
  if (source === searchQualitySelect && controlQualitySelect) {
    controlQualitySelect.value = searchQualitySelect.value;
  }
  if (source === controlQualitySelect && searchQualitySelect) {
    searchQualitySelect.value = controlQualitySelect.value;
  }
}

function pickBestImage(images) {
  if (!images) return '';
  if (typeof images === 'string') return images;
  if (Array.isArray(images)) {
    return images.find((item) => item?.quality?.includes('500'))?.url
      || images.find((item) => item?.quality?.includes('150'))?.url
      || images[0]?.url
      || '';
  }
  if (typeof images === 'object') {
    return Object.values(images).find((item) => item?.url)?.url || '';
  }
  return '';
}

function artistsFromSong(song) {
  if (!song) return 'Unknown artist';
  if (song.primaryArtists) return song.primaryArtists;
  const primary = song?.artists?.primary || song?.artists?.all || [];
  if (Array.isArray(primary)) {
    return primary.map((artist) => artist?.name).filter(Boolean).join(', ') || 'Unknown artist';
  }
  return 'Unknown artist';
}

function albumName(song) {
  return song?.album?.name || song?.album || 'Single';
}

function formatDuration(seconds) {
  const total = Number(seconds || 0);
  const minutes = Math.floor(total / 60);
  const remaining = String(Math.floor(total % 60)).padStart(2, '0');
  return `${minutes}:${remaining}`;
}

function formatCount(value) {
  const number = Number(value || 0);
  if (number >= 1e9) return `${(number / 1e9).toFixed(1)}B`;
  if (number >= 1e6) return `${(number / 1e6).toFixed(1)}M`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(1)}K`;
  return String(number);
}

function pickBestAudio(downloadUrl) {
  if (!downloadUrl) return '';
  const items = Array.isArray(downloadUrl) ? downloadUrl : Object.values(downloadUrl || {});
  const normalized = items
    .map((item) => ({
      quality: String(item?.quality || item?.label || ''),
      url: item?.url || item?.link || '',
    }))
    .filter((item) => item.url);

  if (!normalized.length) return '';

  const preferred = getPreferredQuality();
  const exact = normalized.find((item) => item.quality.includes(preferred));
  if (exact?.url) return exact.url;

  const q320 = normalized.find((item) => item.quality.includes('320'));
  if (q320?.url) return q320.url;

  return normalized[normalized.length - 1].url;
}

function setStatus(message) {
  if (statusEl) statusEl.textContent = message;
}

function setNowPlaying(song, streamUrl) {
  currentTrack = song || null;
  currentStream = streamUrl || '';

  if (!song) {
    titleEl.textContent = 'No track selected';
    artistEl.textContent = 'Use search to pick a song';
    albumEl.textContent = 'Waiting';
    detailEl.textContent = 'Press play on any result';
    coverEl.src = 'https://placehold.co/640x640/0b1220/66e3d6?text=Saavn';
    return;
  }

  titleEl.textContent = song.name || song.title || 'Unknown track';
  artistEl.textContent = artistsFromSong(song);
  albumEl.textContent = albumName(song);
  detailEl.textContent = `${formatDuration(song.duration)} · ${song.language || 'unknown language'} · ${formatCount(song.playCount)} plays`;
  coverEl.src = pickBestImage(song.image) || 'https://placehold.co/640x640/0b1220/66e3d6?text=Saavn';
}

function updateProgress() {
  if (!player?.duration || Number.isNaN(player.duration)) return;
  const percent = Math.min((player.currentTime / player.duration) * 100, 100);
  progressEl.style.width = `${percent}%`;
  timeEl.textContent = `${formatDuration(player.currentTime)} / ${formatDuration(player.duration)}`;
}

function syncButtons() {
  playBtn.textContent = player.paused ? 'Play' : 'Pause';
}

async function resolveSong(song) {
  if (!song?.id) return null;
  try {
    const response = await fetch(`${API_BASE}/api/songs/${encodeURIComponent(song.id)}`);
    const payload = await response.json();
    const data = payload?.data || [];
    return Array.isArray(data) ? data[0] : data;
  } catch {
    return null;
  }
}

async function playSong(song, index = -1) {
  const resolved = song?.downloadUrl ? song : await resolveSong(song);
  if (!resolved) {
    setStatus('Could not resolve track details');
    return;
  }

  const streamUrl = pickBestAudio(resolved.downloadUrl);
  if (!streamUrl) {
    setStatus('No playable stream available');
    return;
  }

  if (index >= 0) currentIndex = index;
  setNowPlaying(resolved, streamUrl);
  player.src = streamUrl;
  player.load();

  try {
    await player.play();
    setStatus(`Playing ${resolved.name || resolved.title || 'track'}`);
  } catch {
    setStatus('Playback is ready. Tap play again if the browser blocks autoplay.');
  }

  syncButtons();
}

function downloadSong(song) {
  if (!song) return;
  const streamUrl = song?.downloadUrl ? pickBestAudio(song.downloadUrl) : currentStream;
  if (!streamUrl) return;

  const anchor = document.createElement('a');
  anchor.href = streamUrl;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.click();
}

function renderResults(results, query) {
  queue = Array.isArray(results) ? results : [];
  currentIndex = -1;
  resultsEl.innerHTML = '';

  if (!queue.length) {
    resultsEl.innerHTML = '<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-800/75 dark:text-slate-100"><h4 class="font-semibold">No results</h4><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Try a different search query or one of the chips above.</p></div>';
    setStatus(`No matches for ${query}`);
    return;
  }

  setStatus(`Showing ${queue.length} songs for ${query}`);

  queue.forEach((song, index) => {
    const card = document.createElement('article');
    card.className = 'grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800/75 dark:text-slate-100 md:grid-cols-[68px_1fr_auto] md:items-center';

    const image = pickBestImage(song.image) || 'https://placehold.co/96x96/111b2f/66e3d6?text=%E2%99%AA';
    const title = song.name || song.title || 'Unknown song';
    const artist = artistsFromSong(song);
    const meta = [albumName(song), song.language || 'unknown', formatDuration(song.duration)].filter(Boolean).join(' · ');

    card.innerHTML = `
      <figure>
        <img src="${image}" alt="${title} cover" class="h-[68px] w-[68px] rounded-xl object-cover shadow-lg">
      </figure>
      <div>
        <h4 class="text-lg font-semibold">${title}</h4>
        <div class="text-sm text-slate-700 dark:text-slate-200">${artist}</div>
        <div class="text-sm text-slate-500 dark:text-slate-400">${meta}</div>
        <small class="text-xs text-slate-500 dark:text-slate-400">${formatCount(song.playCount)} plays · ${song.explicitContent ? 'Explicit' : 'Clean'}</small>
      </div>
      <div class="flex flex-wrap gap-2 md:justify-end">
        <button class="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-gradient-to-r dark:from-teal-300 dark:to-sky-400 dark:text-slate-950" data-action="play">Play</button>
        <button class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700" data-action="download">Download</button>
      </div>
    `;

    card.querySelector('[data-action="play"]').addEventListener('click', () => playSong(song, index));
    card.querySelector('[data-action="download"]').addEventListener('click', () => downloadSong(song));

    resultsEl.appendChild(card);
  });
}

async function searchSongs(query) {
  const normalized = String(query || '').trim();
  if (!normalized) return;

  setStatus(`Searching for ${normalized}...`);
  resultsEl.innerHTML = '<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-800/75 dark:text-slate-100"><h4 class="font-semibold">Loading</h4><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Fetching live results from Saavn.</p></div>';

  try {
    const url = new URL(`${API_BASE}/api/search/songs`);
    url.searchParams.set('query', normalized);
    url.searchParams.set('limit', '12');

    const response = await fetch(url.toString());
    const payload = await response.json();
    renderResults(payload?.data?.results || [], normalized);
  } catch (error) {
    setStatus('Search failed, showing no results.');
    resultsEl.innerHTML = `<div class="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"><h4 class="font-semibold">Search error</h4><p class="mt-1 text-sm">${error.message}</p></div>`;
  }
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  searchSongs(queryInput.value);
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    queryInput.value = chip.dataset.query || '';
    searchSongs(queryInput.value);
  });
});

searchQualitySelect?.addEventListener('change', () => {
  syncQualitySelectors(searchQualitySelect);
  if (currentTrack) playSong(currentTrack, currentIndex);
});

controlQualitySelect?.addEventListener('change', () => {
  syncQualitySelectors(controlQualitySelect);
  if (currentTrack) playSong(currentTrack, currentIndex);
});

autoplayToggle?.addEventListener('change', () => {
  if (autoplayLabel) {
    autoplayLabel.textContent = autoplayToggle.checked ? 'Autoplay next track: enabled' : 'Autoplay next track: disabled';
  }
});

playBtn?.addEventListener('click', async () => {
  if (!currentTrack) {
    searchSongs(queryInput.value || fallbackQuery);
    return;
  }

  if (player.paused) {
    try {
      await player.play();
    } catch {
      setStatus('Autoplay was blocked. Press play again.');
    }
  } else {
    player.pause();
  }

  syncButtons();
});

prevBtn?.addEventListener('click', () => {
  if (!queue.length) return;
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
  playSong(queue[nextIndex], nextIndex);
});

nextBtn?.addEventListener('click', () => {
  if (!queue.length) return;
  const nextIndex = currentIndex >= 0 && currentIndex < queue.length - 1 ? currentIndex + 1 : 0;
  playSong(queue[nextIndex], nextIndex);
});

downloadBtn?.addEventListener('click', () => {
  if (!currentTrack) return;
  downloadSong(currentTrack);
});

player?.addEventListener('loadedmetadata', updateProgress);
player?.addEventListener('timeupdate', updateProgress);
player?.addEventListener('play', syncButtons);
player?.addEventListener('pause', syncButtons);
player?.addEventListener('ended', () => {
  if (!queue.length) return;
  const nextIndex = currentIndex >= 0 && currentIndex < queue.length - 1 ? currentIndex + 1 : 0;
  if (autoplayToggle?.checked) {
    playSong(queue[nextIndex], nextIndex);
    return;
  }
  syncButtons();
});

document.getElementById('load-demo')?.addEventListener('click', () => {
  queryInput.value = fallbackQuery;
  searchSongs(fallbackQuery);
});

window.addEventListener('load', () => {
  queryInput.value = fallbackQuery;
  searchSongs(fallbackQuery);
  setNowPlaying(null, '');
  syncButtons();
});