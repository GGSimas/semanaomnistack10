export default function ParseStringAsArray(arrayAsString) {
    return arrayAsString.split(",").map(tech => tech.trim());
}