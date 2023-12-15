import { Router } from "express";
//import { passportError,authorization } from "../utils/messagesError.js";
import { getTickets, getTicket, getTicketByCode, getTicketsByEmail } from "../controller/tickets.controller.js";

const ticketRouter = Router ();

ticketRouter.get ("/", getTickets);
ticketRouter.get ("/:tid", getTicket);
ticketRouter.get ("/codigo/:tcode", getTicketByCode);
ticketRouter.get ("/email/:email", getTicketsByEmail);

export default ticketRouter;