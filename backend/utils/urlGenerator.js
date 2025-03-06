import { parse } from "dataurl";
import DataUriParser from "dataurl/parser.js";

const getDataUrl = (file) => {
    const parser = new DataUriParser()

    const extName = Path.extName(file.originalname).toString();

    return parser.format(extName, file.buffer);
}

export default getDataUrl;