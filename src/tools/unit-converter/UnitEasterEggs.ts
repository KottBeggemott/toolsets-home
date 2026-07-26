export type EasterEggResult = {
  title: string;
  subtitle: string;
};

export function getEasterEgg(
  input: string
): EasterEggResult | null {
  const text = input.trim().toLowerCase();


  if (
  text === "your mom" ||
  text === "your mum" ||
  text === "ur mom" ||
  text === "ur mum" ||
  text === "your momma" ||
  text === "your mama" ||
  text === "ur momma" ||
  text === "ur mama"
) {
  return {
    title: "is a nice lady",
    subtitle: "she really is",
  };
}
if (text === "hello there") {
  return {
    title: "General Kenobi",
    subtitle: "You are a bold one",
  };
}
const rickrollAliases = [
  "rickroll",
  "rick roll",
  "never gonna give you up",
];

if (rickrollAliases.includes(text)) {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");

  return {
    title: "Never gonna give you up",
    subtitle: "You've been rickrolled",
  };
}
if (
  text === "may the force be with you" ||
  text === "the force be with you"
) {
  return {
    title: "And also with you",
    subtitle: "Jedi approved",
  };
}
if (text.startsWith("sudo make me a ")) {
  const thing = text.replace("sudo make me a ", "").trim();

  return {
    title: "Okay.",
    subtitle: `Poof! You're a ${thing}.`,
  };
}
  return null;
}