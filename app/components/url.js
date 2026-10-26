export function hrefWith(params, changes) {
  const search = new URLSearchParams();
  const all = { ...params, ...changes };

  for (const key in all) {
    if (all[key] !== undefined && all[key] !== "") {
      search.set(key, all[key]);
    }
  }

  const text = search.toString();
  return text ? `/?${text}` : "/";
}

export function HiddenParams({ params, skip }) {
  return Object.keys(params)
    .filter((key) => key !== skip)
    .map((key) => (
      <input key={key} type="hidden" name={key} value={params[key]} />
    ));
}
