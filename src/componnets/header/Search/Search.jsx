import {InputGroup,  Input,  InputGroupText} from "reactstrap";

function SiteSearch(){
    return(
        <div>
            <InputGroup>
                <Input placeholder="Search" />
                <InputGroupText>To the Right!</InputGroupText>
            </InputGroup>
        </div>
    )
}
export default SiteSearch;