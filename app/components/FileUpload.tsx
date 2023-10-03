import { InputGroup } from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
  name: string;
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple = false, children, name } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick} cursor="pointer">
      <input
        type={'file'}
        name={name}
        multiple={multiple}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

export default FileUpload;
