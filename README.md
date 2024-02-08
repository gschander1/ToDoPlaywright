
### To run test  in headless mode on webkit, chromium and firefox 

`npx playwright test` 

or 

`npx playwright test ./tests/todoListOperations.spec.js`

to run in headled mode on Chromium

`npx playwright test --project chromium`

`todo.js` contains all the fields locator for the todo page and functions to perform basci operations
`todo.js` is imported into test class `todoListOperations.spec.js`


### Test Scenarios are as follows: 

### adding item to the list
    - add an item to the list
    - add two items to the list

### apply filter
    - show all active items

### marking items
    - mark item as complete    
    - mark a completed item to active
    - check the items todo count field has correct value


In most of the tests, I have followed the approach of retrieving the multiple items list and toggle(checkbox) list into an array and performing the actions on one of the item as required by the test. This approach will help to scale when testing with large set of data. In one test case I have called a nested class to locate the exact element to perform the operation.

I have set the config property **fullyParallel** as *true* to run the test parallelly to speed up the testing. Please set it to false if test needs to be run in sequence.

1. In order to improve the quality, we can further keep the sort the diffetent functions and their locators into a separate class and import it. 
2. I can also add `dot` reporting and integrate it with `CI` pipeline ensuring the it fails the build when the test fails. 
3. I have noticed that the test are taking long time on Firefox. I would further investigate it in future and see if there is any reason behind that and if I can improve that.
4. For this particular application, I can also reduce the wait time to fail quickly, this can be configured in config file. I can also add more workers to run multiple tests simultaneously.
5. I can further run the test in mobile web view.

