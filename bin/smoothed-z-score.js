#! /usr/bin/env node
// javascript port of: https://stackoverflow.com/questions/22583391/peak-signal-detection-in-realtime-timeseries-data/48895639#48895639

//import * as szc from '../src/smoothed-z-score.js'
const szc = require('../src/smoothed-z-score')

// SYNC reading of an csv file
function read_csv_file(fname) {
    const fs = require('fs');
    var txt = fs.readFileSync(fname, 'utf8');

    const parse = require('csv-parse/lib/sync')
    var samples = parse(txt, {
        cast: function(value, context){
            return Number(value)
        }
    })

    return samples
}

// default test data used in case no csv file given as argument
var samples = [
    [ 1, 1, 1.1, 1, 0.9, 1, 1, 1.1, 1, 0.9, 1, 1.1, 1, 1, 0.9, 1, 1, 1.1, 1, 1,
        1, 1, 1.1, 0.9, 1, 1.1, 1, 1, 0.9, 1, 1.1, 1, 1, 1.1, 1, 0.8, 0.9, 1,
        1.2, 0.9, 1, 1, 1.1, 1.2, 1, 1.5, 1, 3, 2, 5, 3, 2, 1, 1, 1, 0.9, 1, 1,
        3, 2.6, 4, 3, 3.2, 2, 1, 1, 0.8, 4, 4, 2, 2.5, 1, 1, 1]
]


const av = process.argv
if(2 < av.length) {
    samples = read_csv_file(av[2]);
}

try {
    samples.forEach(function(sample) {
        const peaks = szc(sample, {lag: 5})// , {influence: 87})
        console.log(peaks.length + ": " + peaks.toString())
    })
} catch(e) {
    console.log(e)
}
