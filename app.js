import { COURSES, POSTS, WORKSHEETS } from "./data.js";
import {
  watchAuth, loginWithGoogle, logout,
  getCourseProgress, setCourseProgress,
  saveWorksheet, loadWorksheet
} from "./firebase.js";

import {
  getGuestProgress, setGuestProgress,
  getAllGuestProgress, clearGuestProgress
} from "./guestStorage.js";

export const state = { user: null };

export function qs(sel) { return document.querySelector(sel); }
export function qsa(sel) { return [...document.querySelectorAll(sel)]; }
export function param(name) { return new URLSearchParams(location.search).get(name); }

export function mountNav() {
  const loginBtn = qs("#btnLogin");
  const logoutBtn = qs("#btnLogout");
  const userLabel = qs("#userLabel");

  if (loginBtn) loginBtn.onclick = () => loginWithGoogle();
  if (logoutBtn) logoutBtn.onclick = () => logout();

  watchAuth(async (user) => {
    const prevWasGuest = !state.user; // vorheriger Zustand (einfacher Indikator)
    state.user = user || null;

    if (userLabel) {
      userLabel.textContent = user ? (user.displayName || user.email) : "Gast";
    }
    if (loginBtn) loginBtn.style.display = user ? "none" : "inline-flex";
    if (logoutBtn) logoutBtn.style.display = user ? "inline-flex" : "none";

    // ✅ Gast-Fortschritt beim Login in den Account übernehmen
    if (user && prevWasGuest) {
      try {
        const all = getAllGuestProgress(); // { courseId: { completedLessons:[...] } }
        const entries = Object.entries(all || {});
        if (entries.length) {
          for (const [courseId, data] of entries) {
            const remote = await getCourseProgress(user.uid, courseId);
            const remoteDone = new Set(remote?.completedLessons || []);
            for (const x of (data?.completedLessons || [])) remoteDone.add(x);

            await setCourseProgress(user.uid, courseId, { completedLessons: [...remoteDone] });
          }
          clearGuestProgress();
        }
      } catch (e) {
        console.error("Merge guest progress failed:", e);
      }
    }

    if (window.onUserChanged) window.onUserChanged(user);
  });
}

function tagRow(tags = []) {
  return `<div class="tagRow">${tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>`;
}

// ---------- HOME HIGHLIGHTS ----------
export function renderHomeHighlights() {
  const coursesWrap = qs("#homeCourses");
  const postsWrap = qs("#homePosts");

  if (coursesWrap) {
    const pick = COURSES.slice(0, 3);
    coursesWrap.innerHTML = pick.map(c => `
      <a class="card" href="course.html?id=${c.id}">
        <h3>${c.title}</h3>
        <p>${c.blurb}</p>
        ${tagRow(c.tags)}
        <div class="small" style="margin-top:10px">Level: ${c.level} • ${c.priceLabel}</div>
      </a>
    `).join("");
  }

  if (postsWrap) {
    const pick = POSTS.slice(0, 3);
    postsWrap.innerHTML = pick.map(p => `
      <a class="card" href="post.html?id=${p.id}">
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        ${tagRow(p.tags)}
        <div class="small" style="margin-top:10px">${p.author} • ${p.date}</div>
      </a>
    `).join("");
  }
}

// ---------- COURSES LIST ----------
export async function renderCoursesList() {
  const wrap = qs("#coursesGrid");
  if (!wrap) return;

  wrap.innerHTML = COURSES.map(c => `
    <a class="card" href="course.html?id=${c.id}">
      <h3>${c.title}</h3>
      <p>${c.blurb}</p>
      ${tagRow(c.tags)}
      <div class="small" style="margin-top:10px">Level: ${c.level} • ${c.priceLabel}</div>
    </a>
  `).join("");
}

// ---------- COURSE DETAIL + PROGRESS ----------
export async function renderCourseDetail() {
  const id = param("id");
  const course = COURSES.find(c => c.id === id);
  const title = qs("#courseTitle");
  const meta = qs("#courseMeta");
  const desc = qs("#courseDesc");
  const list = qs("#lessonList");
  const progBar = qs("#progBar");
  const progText = qs("#progText");
  const bookBtn = qs("#bookBtn");

  if (!course || !title || !list) return;

  title.textContent = course.title;
  if (meta) meta.textContent = `Level: ${course.level} • ${course.priceLabel}`;
  if (desc) desc.textContent = course.blurb;

  if (bookBtn) {
    bookBtn.onclick = () => {
      alert("Demo: Hier würdest du einen Checkout/Buchungsflow einbauen (Stripe/PayPal).");
    };
  }

  const allLessons = course.chapters.flatMap(ch => ch.lessons.map(l => `${ch.id}:${l.id}`));

  async function refreshProgress() {
    // ✅ Fortschritt laden: Firestore (Login) oder localStorage (Gast)
    let done = [];
    if (state.user) {
      const p = await getCourseProgress(state.user.uid, course.id);
      done = (p?.completedLessons || []);
    } else {
      const p = getGuestProgress(course.id);
      done = (p?.completedLessons || []);
    }

    const pct = allLessons.length ? Math.round((done.length / allLessons.length) * 100) : 0;
    if (progBar) progBar.style.width = `${pct}%`;

    if (progText) {
      progText.textContent = state.user
        ? `Fortschritt: ${pct}% (${done.length}/${allLessons.length} Lektionen)`
        : `Fortschritt: ${pct}% (${done.length}/${allLessons.length}) (Gast — wird lokal gespeichert)`;
    }

    list.innerHTML = course.chapters.map(ch => `
      <div class="card" style="padding:14px">
        <div style="display:flex;justify-content:space-between;gap:14px;align-items:flex-end;flex-wrap:wrap">
          <div>
            <h3 style="margin:0 0 6px">${ch.title}</h3>
            <div class="small">${ch.lessons.length} Lektionen</div>
          </div>
          <div class="small">${course.title}</div>
        </div>
        <div class="list">
          ${ch.lessons.map(l => {
            const key = `${ch.id}:${l.id}`;
            const isDone = done.includes(key);
            return `
              <div class="item">
                <div>
                  <strong>${l.title}</strong>
                  <span>${l.duration}</span>
                </div>
                <button class="btn btn--ghost" data-lesson="${key}">
                  ${isDone ? "✅ Erledigt" : "Markieren"}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `).join("");

    qsa("[data-lesson]").forEach(btn => {
      btn.onclick = async () => {
        const key = btn.getAttribute("data-lesson");

        // aktuelle Liste holen (abhängig von Login/Gast)
        let curDone = [];
        if (state.user) {
          const cur = await getCourseProgress(state.user.uid, course.id);
          curDone = cur?.completedLessons || [];
        } else {
          const cur = getGuestProgress(course.id);
          curDone = cur?.completedLessons || [];
        }

        const completed = new Set(curDone);
        completed.add(key);

        // ✅ speichern: Firestore oder localStorage
        if (state.user) {
          await setCourseProgress(state.user.uid, course.id, { completedLessons: [...completed] });
        } else {
          setGuestProgress(course.id, [...completed]);
        }

        await refreshProgress();
      };
    });
  }

  window.onUserChanged = refreshProgress;
  await refreshProgress();
}

// ---------- POSTS LIST ----------
export function renderPostsList() {
  const wrap = qs("#postsGrid");
  if (!wrap) return;

  wrap.innerHTML = POSTS.map(p => `
    <a class="card" href="post.html?id=${p.id}">
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      ${tagRow(p.tags)}
      <div class="small" style="margin-top:10px">${p.author} • ${p.date}</div>
    </a>
  `).join("");
}

// ---------- POST DETAIL ----------
export function renderPostDetail() {
  const id = param("id");
  const post = POSTS.find(p => p.id === id);
  if (!post) return;

  qs("#postTitle").textContent = post.title;
  qs("#postMeta").textContent = `${post.author} • ${post.date}`;
  qs("#postTags").innerHTML = tagRow(post.tags);
  qs("#postBody").innerHTML = post.body.map(x => `<p class="p">${x}</p>`).join("");
}

// ---------- WORKSHEETS LIST ----------
export function renderWorksheetsList() {
  const wrap = qs("#wsGrid");
  if (!wrap) return;

  wrap.innerHTML = WORKSHEETS.map(w => `
    <a class="card" href="worksheet.html?id=${w.id}">
      <h3>${w.title}</h3>
      <p>${w.intro}</p>
      ${tagRow(w.tags)}
      <div class="small" style="margin-top:10px">Speichern pro Account • jederzeit wieder öffnen</div>
    </a>
  `).join("");
}

// ---------- WORKSHEET DETAIL ----------
export async function renderWorksheetDetail() {
  const id = param("id");
  const ws = WORKSHEETS.find(w => w.id === id);
  if (!ws) return;

  qs("#wsTitle").textContent = ws.title;
  qs("#wsIntro").textContent = ws.intro;

  const form = qs("#wsForm");
  const saveBtn = qs("#wsSave");
  const status = qs("#wsStatus");
  const hint = qs("#wsHint");

  async function fill() {
    const saved = (state.user) ? await loadWorksheet(state.user.uid, ws.id) : null;
    const answers = saved?.answers || {};

    if (hint) {
      hint.textContent = state.user
        ? "Du bist eingeloggt — dein Lernblatt wird gespeichert."
        : "Du bist nicht eingeloggt — du kannst ausfüllen, aber zum Speichern bitte einloggen.";
    }

    form.innerHTML = ws.questions.map(q => {
      const val = answers[q.id] || "";
      if (q.type === "textarea") {
        return `
          <div class="card">
            <h3>${q.label}</h3>
            <textarea name="${q.id}" rows="5">${val}</textarea>
          </div>
        `;
      }
      return `
        <div class="card">
          <h3>${q.label}</h3>
          <input class="input" name="${q.id}" value="${val}" />
        </div>
      `;
    }).join("");
  }

  saveBtn.onclick = async () => {
    if (!state.user) {
      alert("Bitte einloggen, um zu speichern.");
      return;
    }
    const fd = new FormData(form);
    const answers = {};
    for (const [k, v] of fd.entries()) answers[k] = String(v);
    await saveWorksheet(state.user.uid, ws.id, answers);
    status.textContent = "✅ Gespeichert";
    setTimeout(() => status.textContent = "", 2200);
  };

  window.onUserChanged = fill;
  await fill();
}

// ---------- PROFILE ----------
export async function renderProfile() {
  const nameEl = qs("#pName");
  const emailEl = qs("#pEmail");
  const stateEl = qs("#pState");

  async function refresh() {
    if (!state.user) {
      if (nameEl) nameEl.textContent = "Gast";
      if (emailEl) emailEl.textContent = "-";
      if (stateEl) stateEl.textContent = "Du bist als Gast unterwegs: Kurs-Fortschritt wird lokal gespeichert. Logge dich ein, um geräteübergreifend zu speichern.";
      return;
    }
    if (nameEl) nameEl.textContent = state.user.displayName || "User";
    if (emailEl) emailEl.textContent = state.user.email || "-";
    if (stateEl) stateEl.textContent = "Du bist eingeloggt: Fortschritt wird in deinem Account gespeichert (Firestore).";
  }

  window.onUserChanged = refresh;
  await refresh();
}
