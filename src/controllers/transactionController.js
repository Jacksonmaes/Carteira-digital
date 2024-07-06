import transactionService from "../services/transactionService.js";

async function create(req, res){
    const body = req.body;
    const { _id: id } = res.locals.user;

    try {
        const transaction = await transactionService.create(body, id);
        return res.status(201).send(transaction);

    } catch (err){
        res.status(409).send(err.message);
    }
}

async function findAllByUser(req, res){
    const { _id: id } = res.locals.user;

    try {
        const transactions = await transactionService.findAllByUser(id);
        return res.send(transactions);
    }catch (err) {
        res.status(500).send(err.message);
    }
}


const transactionController = {
    create: async (req, res) => {
        // logica para criar uma transação
    },
  
    findAllByUser: async (req, res) => {
      // Lógica para encontrar todas as transações de um usuário
    },
  
    update: async (req, res) => {
      const { id } = req.params;
      const { amount, description } = req.body;
      // Lógica para atualizar uma transação
    },
  
    delete: async (req, res) => {
      const { id } = req.params;
      // Lógica para excluir uma transação
    },
  };
  
 
  


export default { create, findAllByUser, transactionController};