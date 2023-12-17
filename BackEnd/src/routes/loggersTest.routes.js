import { Router } from "express";
import { getDebug, getError, getFatal, getHttp, getInfo, getWarning } from "../controller/loggersTest.controller.js";

const loggersTest = Router ();

loggersTest.get("/debug", getDebug);
loggersTest.get("/https", getHttp);
loggersTest.get("/info", getInfo);
loggersTest.get("/warning", getWarning);
loggersTest.get("/error", getError);
loggersTest.get("/fatal", getFatal);

export default loggersTest;