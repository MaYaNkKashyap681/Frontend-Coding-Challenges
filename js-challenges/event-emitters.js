class Emitter {
   constructor() {
     this.eventCbMap = {};
   } 

   subscribe(eventName, callback) {
       if (!(eventName in this.eventCbMap)) {
           this.eventCbMap[eventName] = [];
       }
       this.eventCbMap[eventName].push(callback);

       return {
           unsubscribe: (eventNames = []) => {
               for (let eventName of eventNames) {
                   const index = 
this.eventCbMap[eventName].indexOf(callback);
                   if (index !== -1) {
                       this.eventCbMap[eventName].splice(index, 1);
                   }
               }
           }
       };
   }

   emit(eventName, args = []) {
      const cbList = this.eventCbMap[eventName] || [];
      let ans = [];
      for (let cb of cbList) {
        ans.push(cb(args));
      }
      return ans;
   }
}

const emitter = new Emitter();

let sub1, sub2, sub3;

sub1 = emitter.subscribe('firstFunction', function cb1() {
  console.log(5);
});
sub2 = emitter.subscribe('secondFunction', function cb2() {
  console.log(6);
});
sub3 = emitter.subscribe('thirdFunction', function cb3() {
  console.log(7);
});

console.log(sub1);

emitter.emit('firstFunction');
emitter.emit('secondFunction');
emitter.emit('thirdFunction');

sub1.unsubscribe(['firstFunction', 'thirdFunction']);

console.log("After unsubscribe:");

emitter.emit('firstFunction');
emitter.emit('secondFunction');
emitter.emit('thirdFunction');

