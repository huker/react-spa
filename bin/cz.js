/**
 * Created by huk on 2018/12/24.
 */

const fs = require('fs');

fs.readFile(__dirname, './cz.config.js', (value) => {
    console.log(value)
});

