import { Router } from "express";
//import { passportError,authorization } from "../utils/messagesError.js";
import { getTicket} from "../controller/tickets.controller.js";

const ticketRouter = Router ();

ticketRouter.get ("/:tid", getTicket);

export default ticketRouter;

/*
ticketRouter.get ("/:tid",passportError("jwt"), authorization("user"), getTicket);
*/