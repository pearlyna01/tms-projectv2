//Block access to Express routes until route has finished

let lock = false;
router.put('/update-db-state', (req, res) => {
   if (lock) {
       // send a res.end and return or do whatever you need like use a timeout etc etc
   }
   // when starting you process
   lock = true;
   //... does a buch of database related stuff.
   // when complete
   lock = false;
});