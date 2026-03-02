const KEY = "ilmhub_guest_progress_v1";

function readAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch { return {}; }
}

function writeAll(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

export function getGuestProgress(courseId) {
    const all = readAll();
    return all[courseId] || { completedLessons: [] };
}

export function setGuestProgress(courseId, completedLessons) {
    const all = readAll();
    all[courseId] = { completedLessons, updatedAt: Date.now() };
    writeAll(all);
}

export function getAllGuestProgress() {
    return readAll();
}

export function clearGuestProgress() {
    localStorage.removeItem(KEY);
}