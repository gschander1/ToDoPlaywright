
### To run test  in headless mode on webkit, chromium and firefox 

`npx playwright test` 

or 

`npx playwright test ./tests/todoListOperations.spec.js`

to run in headed mode on Chromium

`npx playwright test --project chromium`

`todo.js` contains all the fields locator for the todo page and functions to perform basic operations
`todo.js` is imported into test spec `todoListOperations.spec.js`


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

The config property **fullyParallel** is set as *true* to run the test parallelly to speed up the testing. Please set it to false if test needs to be run in sequence.

1. In order to improve the quality, we can further keep the sort the diffetent functions and their locators into a separate class and import it. 
2. `dot` and `list` reporting can also be added and integrate it with `CI` pipeline ensuring build fails when the test fails. 
3. I have noticed that the test are taking long time on Firefox. I would further investigate it in future and see if there is any reason behind that and if it can be improved.
4. For this particular application, I can also reduce the wait time to fail quickly, this can be configured in config file. I can also add more workers to run multiple tests simultaneously.
5. I can further run the test in mobile web view.

## Future Scenarios:

### Adding to the list
- Test that adding a new item is displayed as active
- Test that adding a second item adds to the end of the list

### Mark the item as done
- Test the an item can be set as done
- Test that when the item is set as done, then text is striked out
- Test that when the item is set as done, then radio button is checked
- Test that when the item is set as done, then count of items left is decresed


### Set the item as active
- Test the a completed item can be set as active
- Test that when the completed item is set as active, then text is not striked out
- Test that when the completed item is set as active, then radio button is not checked
- Test that when the completed item is set as active, then count of items left is incremented

### Editing the item
- Test that an active item can be edited and updated
- Test that a completed item can be edited and updated
- Test that when a completed item is edited the state is not changed
- Test that when an active item is edited the state is not changed

### Deleting an item
- Test that an active item is *deleted* when cross is clicked
-  Test that a completed item is *deleted* when cross is clicked

- ### Filters
- Test *Completed* filter is showing all completed item and not active items
- Test *Active* filter is showing all Active items and not completed items
- Test *All* filter is showing all active and completed items
- Test that *Clear completed* filter is only displayed when there is atleasy one completed item
- Test that *Clear completed* filter is not displayed when completed item is marked active
- Test *Clear completed* filter will remove all completed items from the list
- Test that the *toggle all* filter will set all active items as completed
- Test that the *toggle all* filter will set all completed items as active
- Test that the *toggle all* filter will set all items as active when the list contains active and completed items