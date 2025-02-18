
function isCamelCase(str: string): boolean {
  return /^[a-z]+([A-Z][a-z]*)+$/.test(str);
}
function isPascalCase(str: string): boolean {
  return /^[A-Z][a-z]+([A-Z][a-z]*)+$/.test(str);
}
function isSnakeCase(str: string): boolean {
  return /^[a-z]+(_[a-z]+)+$/.test(str);
}
function isKebabCase(str: string): boolean {
  return /^[a-z]+(-[a-z]+)+$/.test(str);
}
function isScreamingSnakeCase(str: string): boolean {
  return /^[A-Z]+(_[A-Z]+)+$/.test(str);
}
function isUpperCase(str: string): boolean {
  return /^[A-Z]+$/.test(str);
}

export function convertName(name: string): string {
  if (isCamelCase(name)||isPascalCase(name)) {
    return name.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase()).trim();
  }
  if (isSnakeCase(name)||isScreamingSnakeCase(name)) {
    return name.replace(/_/g, ' ').toLowerCase().replace(/^./, str => str.toUpperCase()).trim();
  }
  if (isKebabCase(name)) {
    return name.replace(/-/g, ' ').toLowerCase().replace(/^./, str => str.toUpperCase()).trim();
  }
  if (isUpperCase(name)) {
    return name.toLowerCase().replace(/^./, str => str.toUpperCase()).trim();
  }
  return name.toLowerCase().replace(/^./, str => str.toUpperCase());
  
}