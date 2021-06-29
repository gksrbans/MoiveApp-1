import React, { useEffect, useState, useRef } from 'react';

// function Counter() {
//     console.log('Counter 호출중')
//     const [counter, setCounter] = useState(0);
//     useEffect(() => {
//       const timer = setInterval(() => {
//         setCounter(counter => counter + 1);
//       }, 1000);
//       return () => {
//         clearInterval(timer);
//         alert(counter);
//         console.log(counter, '이거냐?')
//       };
//     }, []);
//     return (
//       <div>
//         <p>{counter}</p>
        
//       </div>
//     );
//   }

function Counter() {
  
  const counter = useRef(0);
  console.log(counter.current, 'Counter 호출중')
  useEffect(() => {
    const timer = setInterval(() => {
      counter.current += 1;
      console.log(counter.current, 'Counter 호출중 useEffect 내부')
    }, 1000);
    console.log(counter.current, 'Counter 호출중')

    return () => {
      clearInterval(timer);
    
    };
  }, []);
  return (
    <div>
      <p>{counter.current}</p>
    </div>
  );
}
  export default Counter