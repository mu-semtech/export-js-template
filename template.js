export default function template(strings, ...keys) {
    return (function(values) {
        var result = [strings[0]];
        keys.forEach(function(key, i) {
            var value = values[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}
