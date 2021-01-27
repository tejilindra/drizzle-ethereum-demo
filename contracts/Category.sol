pragma solidity >=0.5.1 <0.7.0;

contract Category {
    address owner;
   
    struct Category {
        uint activationTime;
        bool isActive;
        string categoryType;
    }
   
    string[] public categoryTypes;
    
    Category[] public categoryLists;
   
    mapping(address  => Category) public category;
    
    uint public categoryCount;

    event StateChanged(address categoryHolder, bool newState, uint timestamp);
    
    event CategoryAdded(address categoryHolder, uint activationTime, string categoryType);

    modifier onlyOwner() {
        require(msg.sender == owner, "Access not granted.");
        _;
    }

    constructor()
    public {
        owner = msg.sender;
    }

    function addCategory(address _categoryHolder,uint _categoryType) public 
    onlyOwner {
        require(_categoryHolder != address(0), "Please provide a valid address.");
        category[_categoryHolder] = Category(now, true, categoryTypes[_categoryType]);
        categoryLists.push(category[_categoryHolder]);
        categoryCount++;

        emit CategoryAdded(_categoryHolder, now, categoryTypes[_categoryType]);
    }
    
    function changeState(address _categoryHolder,bool _newState) public
    onlyOwner {
        require(_categoryHolder != address(0), "Please provide a valid address.");
        require(category[_categoryHolder].activationTime != 0, "Address is not a Category holder.");
        require(category[_categoryHolder].isActive != _newState, "Already in the similar state.");
        category[_categoryHolder].isActive = _newState;

        emit StateChanged(_categoryHolder, _newState, now);
    }

    function addCategoryType(string memory _categoryType) public
    onlyOwner {
        require(bytes(_categoryType).length != 0, "Category type cannot be an empty string.");
        categoryTypes.push(_categoryType);
    }

    function getCategoryListLength() public onlyOwner view returns (uint) {
        return categoryLists.length;
    }
    
    function getCategoryListItem(uint index) public onlyOwner view returns (uint, bool, string memory){
       Category memory categoryItem = categoryLists[index];
       return(categoryItem.activationTime, categoryItem.isActive, categoryItem.categoryType);
    }
}
