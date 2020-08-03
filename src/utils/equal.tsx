
const isEqual = (array: any[], b: any): boolean => {
    let status:boolean = false;
    var bProps = Object.getOwnPropertyNames(b);
    
    array.forEach((item: any) => {

        if(status === true){
            return status;
        }
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(item);
        
        // If number of properties is different,
        // objects are not equivalent
        if(aProps.length != bProps.length) {
            status = false;
        }
    
        // for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[1];
    
            // If values of same property are not equal,
            // objects are not equivalent
            if (item[propName] === b[propName]) {
                // console.log(item[propName], b[propName]);
                
                status = true;
                return status;
            }
        // }
    
        // If we made it this far, objects
        // are considered equivalent
        status = false;
    });

    return status;
    
}

export default isEqual;


