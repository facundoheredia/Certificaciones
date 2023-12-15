import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { getTickets,getTicket} from "../controller/tickets.controller.js";

const ticketRouter = Router ();

ticketRouter.get ("/", getTickets);
ticketRouter.get ("/:tid",getTicket, passportError("jwt"), authorization("user"));

export default ticketRouter;