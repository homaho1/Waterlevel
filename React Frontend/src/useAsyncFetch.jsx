// A custom hook that calls fetch.
// A hook is a function that can be called by React components.
// This one is wrapped around the built-in effect hook.  

import React, {useEffect} from 'react';

// const useAsyncFetch = function (url, month, year, thenFun, catchFun ) {
//   console.log("in useAsyncFetch");
//   // console.log("url is:", url,"params is: ", params);
//   // the usual function that does a fetch
//   async function fetchData() {
//     // Send request to origin server at appropriate endpoint
//   let obj = {"month":month, "year":year};
//   let params = {
//     method: 'POST', 
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(obj)};
    
//     let response = await fetch(url,params);
//     // console.log("url is:", url,"params is: ", params);
//     // Wait for origin server to send back JSON object
//     let json = await response.json();

//     // Sanity check the contents of the JSON
//     console.log(json);
//     thenFun(json);
//   }

//   useEffect(function () {
//     console.log("Calling fetch");
//     fetchData();
//   }, []);

// }

// export default useAsyncFetch;


  // let obj = {"month":month, "year":year};
  // let params = {
  //   method: 'POST', 
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(obj)};

  // useAsyncFetch("query/getWaterData",params,thenFun,catchFun);

  // function thenFun (result) {
  // // console.log("thenFun", result);
  // setLevel(result);
  //   // render the list once we have it
  // }
  // function catchFun (error) {
  //   console.log(error);
  // }