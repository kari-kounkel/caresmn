// Tiny history router — no dependency, matches the founders pattern.
// Components call go("/learn"); App listens for "popstate" and re-renders.
export function go(path) {
  if (path === window.location.pathname) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}
