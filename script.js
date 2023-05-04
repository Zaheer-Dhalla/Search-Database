/*-----------------------------------

DON'T DELETE THIS

This is the inital data for you project. You MUST use this data. You can use these just like regular variables, don't over think what this line of code is doing.

-----------------------------------*/

import { firstNames, lastNames, uids, titles } from 'data.js'

//------------------------------------
app.UseCors(builder => builder
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader()

//------------------------- HTML CODE ----------------------- \\

// Dark mode button (because why not)
// O(1)
window.darkMode = function darkMode(){
  var wholeDoc = document.body;
  wholeDoc.classList.toggle("dark-mode");
}

// This function shows the options to filter when you click the button
// O(1)
window.toggleList = function toggleList(visible){
  document.getElementById(visible).classList.toggle("show");
}

// This will set the filter that the search will use
// O(1)
window.buttonChange = function buttonChange(name){
  let correctFilter;
  let buttonWord = document.getElementById("filterPlaceHolder");
  if (name == "firstName"){
    correctFilter = document.getElementById("fnFilterClicked");
  }
  else if (name == "lastName"){
    correctFilter = document.getElementById("lnFilterClicked");
  }
  else if (name == "uID"){
    correctFilter = document.getElementById("uIDFilterClicked");
  }
  else if (name == "bookTitle"){
    correctFilter = document.getElementById("bTFilterClicked");
  }
  document.getElementById("drops").classList.toggle("show");
  correctFilter = correctFilter.innerText;
  buttonWord.innerText = correctFilter;
}
// If there are multiple entries, add them into an array to be formatted. It will be formatted within the function after taking in parameters for first, last, title, and uid. [The amount of times this runs is dependent on the number of results that appear]
// O(n)
window.addEntry = function addEntry(firstName,lastName,title,uid){
  const firstEntry = document.getElementById("output");
  const subsequentEntries = document.createElement("li");
  subsequentEntries.innerText = "Author: " + firstName + ' ' + lastName + '\n' + 'Book: ' + title + '\n' + 'Author ID: ' + uid + '\n' + '\n';
  firstEntry.appendChild(subsequentEntries);
}

//------------------------------------------------------------\\



//------------------------- JS CODE ------------------------- \\


// When you click the search button, check to see what you want to search and sort by
// O(1). Since the function calls another function and the time complexity for that function is O(n), this function techniquely has a full time complexity of O(n)
window.delegateSort = function delegateSort(){
  let filterButtonWord = document.getElementById("filterPlaceHolder");
  filterButtonWord = filterButtonWord.innerText;
  if (filterButtonWord === "Filters"){
    alert("Please pick a filter");
  }
  else if (filterButtonWord === "First Name"){
    // Run first name filter with the appropriate arrays passed in
    searchPressed(sortedFirst[0], sortedFirst[1], sortedFirst[3], sortedFirst[2], 'FirstName');
  }
  else if (filterButtonWord === "Last Name"){
    // Run last name filter with the appropriate arrays passed in
    searchPressed(sortedLast[1], sortedLast[0], sortedLast[3], sortedLast[2], 'LastName');
  }
  else if (filterButtonWord === "UID"){
    // Run last name filter here with the appropriate arrays passed in
    searchPressed(sortedUid[1], sortedUid[2], sortedUid[3], sortedUid[0], 'Uids');
  }
  else if (filterButtonWord === "Book Title"){
    // Run last name filter here with the appropriate arrays passed in
    searchPressed(sortedTitles[1], sortedTitles[2], sortedTitles[0], sortedTitles[3], 'Titles');
  }
}

//------------------ Parralel Array Setup -------------------\\

console.time('Boot Time');
// For these arrays, the first names are merge sorted and the other arrays are sorted in parallel
let sortedFirst = mergeSort(firstNames, lastNames, uids, titles);

// For these arrays, the last names are merge sorted and the other arrays are sorted in parallel
let sortedLast = mergeSort(lastNames, firstNames, uids, titles);

// For these arrays, the unique ids are merge sorted and the other arrays are sorted in parallel 
let sortedUid = mergeSort(uids, firstNames, lastNames, titles);

// For these arrays, the book titles are merge sorted and the other arrays are sorted in parallel 
let sortedTitles = mergeSort(titles, firstNames, lastNames, uids);

console.timeEnd('Boot Time');

//---------------------------------------------------------------//

//----------------------------------Method Replacement Functions--------------------------------------//
// This function replaces the splice method
// O(n)
function spliceArray(arr, start, end)
{
  // Declaring an empty array that will be the result
  let splitArray = [];
  
  // This for loop initializes the empty array to start at the index (start), and end at the index (end). These numbers correspond to elements found in the array passed throuh as an argument
  for (let i = 0; i < end-start; i++)
  {
    splitArray[i] = arr[start+i];
  }
  // Return the new spliced array
  return splitArray;
}

// This function replaces the concatenating feature that can be used with ... 
// This is only used for merge sorting
// O(n)
function concatenateArrays(sortedArr, arr1,arr2)
  {
    // Declaring an empty resultant array
    let resultant = [];
    // This for loop declares the first set of elements to match that of the first array passed through
    for(let i = 0; i < sortedArr.length; i++) 
    {
      resultant[i] = sortedArr[i];
    }
    // This for loop declares the elements after the previous elements as the second array passed through
    for(let i = 0; i < arr1.length; i++) 
    {
      resultant[i + sortedArr.length] = arr1[i];
    }
    // This for loop declares the elements after the previous elements as the third array passed through
    for(let i = 0; i < arr2.length; i++) 
    {
      resultant[i + sortedArr.length + arr1.length] = arr2[i];
    }
    // Return the array that now consists of all the elements from the inputted arrays
    return resultant;
  }

// This function replaces the shift method
// O(n)
function shiftArrayLeft(arr)
{
  // This for loop makes every element move to the left, and deletes the 0th index
  for (let i = 1; i < arr.length; i++)
  {
    arr[i-1] = arr[i];
  }
  arr.length--;
  // Returning the left shifted array
  return arr;
}

// This function replaces the delete method
//O(n)
function deleteElement(array, arrayIndex)
{
  // Only deletes an element if the index number exists
  if (arrayIndex > array.length - 1 )
  {
    return array;
  }
  // If the index number inputted exists in the array, that index is deleted from the array
  else
  {
    for(let n = arrayIndex; n < array.length; n++)
    {
      array[n] = array[n+1];
    }
    array.length--;
    return array;
  }
}

// This function is used to create a copy of the inputted array
// O(n)
function copyArray(arr)
  {
    // This array will eventually be identical to the array passed in
    let resultant = [];
    for(let i = 0; i < arr.length; i++) 
    {
      resultant[i] = arr[i];
    }
    return resultant;
  }

// Capitalize the first letter in a string
// O(1), since this function uses the spliceString function below, they have a O(n) when used together
function makeFirstLetterCapital(string)
  {
    return string.charAt(0).toUpperCase() + spliceString(string,1,string.length);
  }

// This function replaces the splice method for strings. This is different because letters are added to an empty string rather than added as elements in an array
// O(n)
function spliceString(string, start, end)
  {
    // This string will eventually hold the appropriate letters depending on the arguments
    let finalString = '';
    for (let i = 0; i < end-start; i++)
    {
      finalString += string[start+i];
    }
    return finalString;
  }

//---------------------Parallel Array Picking-------------------------------------\\


// This function will be called when the search button is pressed. The arrays used will change depending on which array is the main array and parallel arrays, which is controlled by the delegateSort function.
// The last argument is used as a variable that confirms which array is being searched through. Depending on the value of the string argument, different arrays will be searched. This argument also controls if the first letter of the users input is capitalized or not

// This function has a time complexity of O(n)
window.searchPressed = function searchPressed(first, last, title, uid, string)
  {
    // Starting to track the time it takes to output results
    const t0 = performance.now();

    // Reseting the output paragraph to an empty string so multiple results don't get stacked on top of each other
    document.getElementById('output').innerText = '';

    // Making copies of arrays that will be used to search and output information. Since these are copies, we can delete elements from them without tampering with any of the data
    let firstCopy = copyArray(first);
    let lastCopy = copyArray(last);
    let titlesCopy = copyArray(title);
    let uidsCopy = copyArray(uid);

    // Storing the users input as a variable. The first letter of the inputted name will then be capitalized using a function defined above only if the array being searched through is the first names array or the last names array (line 203)
    let userInput = document.getElementById('userInput').value;
    if (string === 'FirstName' || string === 'LastName')
    {
      userInput = makeFirstLetterCapital(userInput);
    }
    
    // These statements control which array will be searched through. The string argument controls this.
    let arraySearched;
    if (string === 'FirstName')
    {
      arraySearched = firstCopy;
    }
    else if (string === 'LastName')
    {
      arraySearched = lastCopy;
    }
    else if (string === 'Titles')
    {
      arraySearched = titlesCopy;
    }
    else if (string === 'Uids')
    {
      arraySearched = uidsCopy;
    }

//--------------------------- Sorting Results by Last Name -------------\\
    
    // Storing the element that will match up with what the user inputted. This element number is used to output the appropriate data
    let binarySearchedElement = binarySearch(arraySearched, userInput);

    // This variable tracks how many profiles are found when the button is pressed
    let numberOfResults = 0;

    //this will keep track of the given profiles' first name so they can be sorted later.
    let profilesFN = []
    //this will keep track of the given profiles' last name so they can be sorted later.
    let profilesLN = []
    //this will keep track of the given profiles' titles so they can be sorted later.
    let profilesTitles = []
    //this will keep track of the given profiles' uid so they can be sorted later.
    let profilesUID = []
        
    // If at least one profile exists, profiles will be found and outputted
    if (binarySearchedElement >= 0)
    {
      // This while loop continues to search for profiles who have the inputted first name. The binarySearchedElement variable will be -1 if no profiles are found
      while (binarySearchedElement != -1)
      {
        // This is the formatting that pieces all of the information together nicely. It is saved into a string so it can be added to the list in the box on the webpage

        profilesFN[numberOfResults] = firstCopy[binarySearchedElement];
        
        profilesLN[numberOfResults] = lastCopy[binarySearchedElement];

        profilesTitles[numberOfResults] = titlesCopy[binarySearchedElement];

        profilesUID[numberOfResults] = uidsCopy[binarySearchedElement];
        
        // Deleting all of the elements that are used in the output so new profiles can be found
        deleteElement(firstCopy, binarySearchedElement);
        deleteElement(lastCopy, binarySearchedElement);
        deleteElement(uidsCopy, binarySearchedElement);
        deleteElement(titlesCopy, binarySearchedElement);

        // Searching for more profiles that match with the users input
        binarySearchedElement = binarySearch(arraySearched, userInput);
        numberOfResults++;
      }
      let sorted = mergeSort(profilesLN,profilesFN,profilesTitles,profilesUID);
      for (let i = 0; i < numberOfResults; i++){
        addEntry(sorted[1][i],sorted[0][i],sorted[2][i],sorted[3][i])
      }
    }
    // If not even one profile is found, the user will be told that no profiles were found
    else
    {
      document.getElementById('output').innerText = 'No Profiles Found!';
    }

    // Displaying how many profiles were found using the numberOfResults variable
    document.getElementById('numberResults').innerText = numberOfResults + ' Profiles Found!';
    
    // Tracking the time when the algorithm finishes so it can be displayed for the user
    const t1 = performance.now();
    document.getElementById('performance').innerText = "Your search took " + (t1 - t0) + ' milliseconds.'; 

    // This clears the input field after searching
    document.getElementById('userInput').value = '';
  }

// -------------------Merges, Searches and Sorts--------------\\

// This Merge Sort function works with 4 parallel Arrays. The first array passed through is merge sorted and the the rest of the arrays are sorted in parallel
// O(n), since the mergeSort function and the merge function work together, the final time complexity would be O(nlog n)
function merge(arr1, arr2, accomplice, accomplice2, accomplice3)
{
  // Array that stores the sorted initial array
  let sorted = [];
  
  // Arrays that stores the sorted parallel arrays
  let friendArray=[];
  let friend2Array=[];
  let friend3Array=[];

  // This variable tracks which element is being stored at any given time
  let sortedElement = 0;
  
  // Checks the number arrays for both sides
  while (arr1[0].length !== 0 && arr2[0].length !== 0) 
  {
    // This variable tracks which array is being shifted after saving elements
    let array;
    // The reason for the double square brackets is that I am trying to find the first number in the initial array's index. The inputted array has arrays as elements so to obtain the first number/letter, 2 square brackets are needed. The parallel arrays will experience the same changes as the initial array
    if (arr1[0][0] < arr2[0][0]) 
    {
      array = arr1;
      sorted[sortedElement] = arr1[0][0];
      friendArray[sortedElement] = arr1[1][0];
      friend2Array[sortedElement] = arr1[2][0];
      friend3Array[sortedElement] = arr1[3][0];
    } 
    else 
    {
      array = arr2;
      sorted[sortedElement] = arr2[0][0];
      friendArray[sortedElement] = arr2[1][0];
      friend2Array[sortedElement] = arr2[2][0];
      friend3Array[sortedElement] = arr2[3][0];
      
    }
    shiftArrayLeft(array[0]);
    shiftArrayLeft(array[1]);
    shiftArrayLeft(array[2]);
    shiftArrayLeft(array[3]);
    
    // Incrementing the index number so the next sorted element can go in the next element
    sortedElement++;
  }
  // Return the initial array as one array and the parallel arrays as arrays afterwards. This is done using the concatenateArrays function which is defined above (line 130)
  return [concatenateArrays(sorted, arr1[0],arr2[0]), concatenateArrays(friendArray, arr1[1],arr2[1]), concatenateArrays(friend2Array, arr1[2],arr2[2]), concatenateArrays(friend3Array, arr1[3], arr2[3])];
}

// This function recurses the left and right portions of the given arrays until they are individual elements. The arguments needed are the initial array that will be sorted, and parallel arrays that will experiece the same sorting as the first array
// O(log n), since the mergeSort function and the merge function work together, the final time complexity would be O(nlog n)

function mergeSort(arr, accomplice, accomplice2, accomplice3)
{
  // Once every element is isolated, return the number and letter array (Base Case)
  if (arr.length <= 1) 
  {
    return [arr, accomplice, accomplice2, accomplice3];
  }
  // Finding the midpoint for the initial array
  let mid = Math.floor(arr.length/2);
  
  // Splits up left side of the array using the midpoint
  let left = mergeSort(spliceArray(arr,0, mid), spliceArray(accomplice,0, mid), spliceArray(accomplice2,0,mid), spliceArray(accomplice3,0,mid));
  
    // Splits up right side of the array using the midpoint
  let right = mergeSort(spliceArray(arr,mid, arr.length), spliceArray(accomplice,mid,accomplice.length), spliceArray(accomplice2,mid,accomplice2.length), spliceArray(accomplice3,mid, accomplice3.length));
  
  // Merge the initial array and the parallel arrays back after it has been fully split
  return merge(left, right, accomplice, accomplice2, accomplice3);
}
// Binary search function that can be used for any array and target value, as long as the arrays are sorted beforehand
// O(log n)
window.binarySearch = function binarySearch(array, target)
{
  // The left post is initially defined as the first element's position
  let leftPost = 0;
  
  // The right post is initially defined as the last element's position
  let rightPost = array.length - 1;
  
  // This loop runs until the right post is less than or equal to the right post
  while(leftPost <= rightPost)
  {
    // The midpoint is the element inbetween the right and left post. Math.floor is used to round down in the case of any decimals
    let midPoint = Math.floor((leftPost+rightPost)/2);
    
    // This conditional statement moves the left post to the element on the right side of the midpoint only if the target value is greater than the element at the midpoint
    if (target > array[midPoint])
    {
      leftPost = midPoint+1;
    }
      
    // If the target value is less than the element at the midpoint, the right post is moved to the element just before the midpoint 
    else if (target < array[midPoint])
    {
      rightPost = midPoint - 1;
    }
      
    // If the target value is equal to the element at the midpoint, the midpoint is returned and the function breaks
    else
    {
      return midPoint;
    }
  }
  // If the target value is not found in the array, return -1
  return -1;
}