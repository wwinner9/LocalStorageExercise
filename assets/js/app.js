
//Normalize Some setUps //
const $ = document.querySelector.bind(document) // bind the doc with the queryselector 
const c = console.log // set c linke console.log

// Global Variables //

    const textArea= $('#tweet')
    const tweetList = $('#tweet-list')
    


    listenTo()
// listenners //

    function listenTo(){
        $('#form').addEventListener('submit', addTweet)
        tweetList.addEventListener('click', remTweet)
        document.addEventListener('DOMContentLoaded', printTweetsFromLocalStorage)

    }

    // init Function
    


//# Function //
    function addTweet(){
        //e.preventDefault()
        //get the  textarea Value
        let text = textArea.value;  
        
        //Validate the textArea
        if(text!==''){
            //Invoke the Function to create the Element/tag
            createElement(text)

            //Invoke the function to add tweet into the local 
            addTweetToStorage(text)
        }       

    }

    //Function to Create an Element and append it 
    function createElement(content){

        //Creating the Tag <li> 
        let li = document.createElement('li')
        li.textContent=content

        // Create the <a> tag that represent the button to remove
        let a = document.createElement('a')
        a.textContent='X' 
        a.classList='remove-tweet' // Adding a class to remove Tweets

        //add <a> to <li>
        li.appendChild(a)

        //add the tag into the tweetList
        tweetList.appendChild(li)
        
    }

    //Function to remove the tweets in DOM
    function remTweet(e){

        let target=e.target  
        let tweetName;  
        //Delegation , verify the clicked space
        if(target.classList.contains('remove-tweet'))
            target.parentElement.remove()

            // get the name of the tweet without 'X' using slice to remove the last letter into the string
            tweetName= target.parentElement.textContent.slice(0, target.parentElement.textContent.length -1)
        //Invoke the function to remove tweet into the localStorage receiving the Tweetname 
        remTweetOnTheStorage(tweetName)
    }

    //function to add tweets into the localStorage
    function addTweetToStorage(tweet){
        
        let tweets= getItemsLs()
        
        // add the tweet into the tweetArray
        tweets.push(tweet) 
        c(tweets)

        //set the item in the ls ,where the item will be the converted array in a string
        localStorage.setItem('tweet', JSON.stringify(tweets))

    }

    //Function to get The tweets return the array of tweets
    function getItemsLs(){
        
        //Getting the localStorage with key:tweet
        let lsTweet= localStorage.getItem('tweet')    
        let tweetArray ; //Creating an empty variable

        if(lsTweet===null){
            tweetArray = [] //transform th empty variable in an Array

        }
        else{
            
            // convert the ls in a array
            tweetArray= JSON.parse(lsTweet)  
        }

        return tweetArray;
    }

    //Function to Print the tweets coming from the localStorage to tweet-list
    function printTweetsFromLocalStorage(){
        let tweetArray= getItemsLs()
        tweetArray.forEach(tweet=>(
            createElement(tweet)
        ))
    }

    //Function to remove tweets on the LocalStorage
    function remTweetOnTheStorage(tweetName){
        let tweetArray= getItemsLs()
           
        // Loop in the tweetArray to find the tweetName index and
        //compare with the tweet in the forEach and after to splice it in that position 
        tweetArray.forEach(function(tweet,index){
            if(tweet===tweetName) //compare the names
                tweetArray.splice(index,1) //Remove the tweet by index
            
        })
        
        //Insert the new array into the localStorage
        localStorage.setItem('tweet', JSON.stringify(tweetArray))    
    }

