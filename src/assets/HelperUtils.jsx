// Helpers for my HelperUtils
function capitalize(str) {
  if (typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// Auto-Gen Level Options List
export function LevelNumberSelectionGenerator({ min = 1, max = 20, ...props }) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  return (
    <select {...props}>
      {numbers.map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  );
}

// Auto-Gen Generic Options List
export function GenericSelect({ items = [],
                                value,
                                onChange, placeholder = "Select...",
                                includePlaceholder = true,
                                ...props }) {

  const defaultGetValue = (item) =>
    typeof item === "string" ? item : item?.value ?? item?.id ?? item?.code ?? item?.name;

  const defaultGetLabel = (item) =>
    typeof item === "string" ? capitalize(item)
      : item?.label ?? item?.name ?? String(defaultGetValue(item));

  const valGetter = defaultGetValue;
  const labelGetter = defaultGetLabel;

  return (
    <select value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}>

      {includePlaceholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {items.map((item, index) => {
        const v = valGetter(item);
        const l = labelGetter(item);

        return (
          <option key={v ?? index}
                  value={v ?? value}>
            {l}
          </option>
        )
      })}


    </select>
  )
}

