function parseRef(ref: React.RefObject<HTMLInputElement>) {
  if (ref?.current?.value) return ref.current.value;
  console.error("Tried to parse invalid ref")
  return undefined
}

export default parseRef;
