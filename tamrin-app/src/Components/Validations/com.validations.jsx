Validations = () => {

    addValidation = (selector, descriptor, validationError) => {

        let ret = true;
        let epos = strValidateStr.search("=");
        let command = "";
        let cmdvalue = "";
        if (epos >= 0)
        {
            command = strValidateStr.substring(0, epos);
            cmdvalue = strValidateStr.substr(epos + 1);
        }
        else
        {
            command = strValidateStr;
        }

        switch (descriptor) {
            case value: "req"
                
                break;
            case value: "req"
            
            break;
        
            default:
                break;
        }
    }

}