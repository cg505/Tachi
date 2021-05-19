import { KtLogger, ParserFunctionReturnsSync } from "../../../../types";
import GenericParseEamIIDXCSV from "../../common/eamusement-iidx-csv/parser";
import {
    IIDXEamusementCSVContext,
    IIDXEamusementCSVData,
} from "../../common/eamusement-iidx-csv/types";

function ParseEamusementIIDXCSV(
    fileData: Express.Multer.File,
    body: Record<string, unknown>,
    logger: KtLogger
): ParserFunctionReturnsSync<IIDXEamusementCSVData, IIDXEamusementCSVContext> {
    return GenericParseEamIIDXCSV(fileData, body, "e-amusement", logger);
}

export default ParseEamusementIIDXCSV;
