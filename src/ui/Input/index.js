import { Input, InputNumber } from "antd";
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
  InputNumberWrapper,
} from "./Input.style";


const { Search, TextArea, Group } = Input;

const StyledInput = InputWrapper(Input);
const InputGroup = InputGroupWrapper(Group);
const InputSearch = InputSearchWrapper(Search);
const Textarea = TextAreaWrapper(TextArea);

const NumberInput = InputNumberWrapper(InputNumber);

export default StyledInput;
export { InputSearch, InputGroup, Textarea, NumberInput };
