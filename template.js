import { sparqlEscape } from 'mu';

export default function template(strings, ...replacements) {
  return (function(values) { // object with query param values to inline
    const result = [strings[0]]; // string parts without variables
    replacements.forEach(function(replacement, i) { // replacement = [key, type]
      const value = values[replacement[0]];
      if (value == null) {
        throw new Error(`No value provided for key ${replacement[0]}`);
      }
      const escapedValue = sparqlEscape(value, replacement[1]);
      result.push(escapedValue, strings[i + 1]);
    });
    return result.join('');
  });
}
