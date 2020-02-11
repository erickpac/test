const splitString = (string, limit) => {
    let splited = string
        .split('')
        .filter((item, position, self) => {
            return self.indexOf(item) == position;
        })
        .join('');

    return splited
}

const getOccurrence = (array) => {
    let counts = {}, duplicate = 0;

    array.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
    });

    for (let key in counts) {
        if (counts.hasOwnProperty(key)) {
            counts[key] >= 1 ? duplicate++ : duplicate;
        }
    }

    return duplicate
}

console.log('Remove characters => ', splitString('aaaabbcc', 2))
console.log('number that appears most => ', getOccurrence([3, 3, 3, 3, 2, 2, 2, 3, 1, 6]))