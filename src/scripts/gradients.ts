// This helps with gradients generation + hold default values

const defaults = {
  blue: { color1: '#4570ff', color2: '#35c2ff' },
  red: { color1: '#ff4545ff', color2: '#ff8b68ff' },
  yellow: { color1: '#be720eff', color2: '#ecc958ff' },
  green: { color1: '#62915dff', color2: '#79b663ff' },
  grey: { color1: '#6b6b6bff', color2: '#c0c0c0ff' },
}

//Returns an object with either color 1 and 2 or one of the default gradient if corresponding:
export function generateGradient(color1?: string, color2?: string) {
  if (color1 && !color2 && color1 in defaults) {
    // If only first one and a property then return the corresponding default:
    const key = color1 as keyof typeof defaults
    return defaults[key]
  } else if (color1 && color2) {
    // If both ok
    return { color1: color1, color2: color2 }
  } else return defaults.blue
}
