import transactionService from "../services/transactionService.js";

const transactionController = {
  create: async (req, res) => {
    const body = req.body;
    const { _id: id } = res.locals.user;

    try {
      const transaction = await transactionService.create(body, id);
      return res.status(201).send(transaction);
    } catch (err) {
      res.status(409).send(err.message);
    }
  },

  findAllByUser: async (req, res) => {
    const { _id: id } = res.locals.user;

    try {
      const transactions = await transactionService.findAllByUser(id);
      return res.send(transactions);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { amount, description } = req.body;

    try {
      const updatedTransaction = await transactionService.update(id, { amount, description });
      return res.send(updatedTransaction);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await transactionService.delete(id);
      return res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

export default transactionController;
