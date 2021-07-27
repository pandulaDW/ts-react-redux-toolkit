import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FilePicker } from "evergreen-ui";
import { fetchData } from "../../redux/dq";
import Button from "../Common/Button";
import { fileToBase64 } from "../../helpers/utils";

const DQHeader = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);

  const clickHandler = async () => {
    if (!file) return;
    try {
      const fileContent = await fileToBase64(file);
      dispatch(fetchData({ uploaded_file: fileContent }));
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <div>
      <FilePicker
        multiple={false}
        width={250}
        placeholder="Select the file here!"
        marginRight="1.5rem"
        onChange={(fileList) => setFile(fileList[0])}
      />
      <Button text="Upload" type="Animated" clickHandler={clickHandler} />
    </div>
  );
};

export default DQHeader;
