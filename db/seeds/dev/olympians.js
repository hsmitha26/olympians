// import seeder from 'knex-csv-seeder';

exports.seed = seeder({
  table: 'olympians',
  file: '../olympians.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  // parser: {
  //   delimiter: ',',
  //   quote: '"',
  //   escape: '\\'
  // }
});

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('olympians').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('olympians').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
