import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validationSchemaMiddleware } from "../middlewares/validationSchemaMiddleware.js";
import { CreateTransaction } from "../schemas/validation/CreateTransaction.js";
import { UpdateTransaction } from "./UpdateTransaction.js";


const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.post("/transactions",
     validationSchemaMiddleware(CreateTransaction),
     transactionController.create);

transactionRouter.get('/transactions', 
    transactionController.findAllByUser);

    transactionRouter.put('/transactions/:id',
        validationSchemaMiddleware(UpdateTransaction),
        transactionController.update);
    
    transactionRouter.delete('/transactions/:id',
        transactionController.delete);

export default transactionRouter;