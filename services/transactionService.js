const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  try {
    const { description, value, category, type, yearMonthDay } = req.body;

    const dataInfo = yearMonthDay.split('-');
    const year = dataInfo[0];
    const month = dataInfo[1];
    const day = dataInfo[2];

    const data = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: `${year}-${month}`,
      yearMonthDay,
      type,
    };

    const transaction = new TransactionModel(data);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Falha ao salvar transação' });
  }
};

const findAll = async (req, res) => {
  const period = req.query.period;

  if (!period || period === '') {
    res.status(400).send({
      error:
        'É necessário informar o parâmetro "period", que deve estar no formato yyyy-mm',
    });
    return;
  }

  try {
    const data = await TransactionModel.find({ yearMonth: period });

    if (!data || data.length === 0) {
      res.status(400).send({
        message: 'Nenhuma transação encontrada para o périodo informado',
      });
      return;
    }

    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar as transações' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findById(id);
    if (!data || data.length === 0) {
      res.status(400).send({ message: 'Transação não encontrada' });
      return;
    }

    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao consultar a transação.',
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message:
        'Não foi possível atualizar os registros. Os dados a serem alterados não foram informados',
    });
  }

  const id = req.params.id;

  try {
    //prettier-ignore
    const transaction = await TransactionModel.findOneAndUpdate({ _id: id }, req.body);

    if (!transaction || transaction.length === 0) {
      res.status(400).send({ message: 'Nenhuma transação encontrada' });
      return;
    }

    res.send({ message: 'Transação atualizada com sucesso' });
  } catch (error) {
    res.status(500).send({
      message: 'Nao foi possível atualizar a transação.',
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (!transaction || transaction.length === 0) {
      res.status(400).send({ message: 'Nenhum transação encontrada' });
      return;
    }
    res.send({ message: 'Transação excluída com sucesso' });
  } catch (error) {
    res.status(500).send({
      message: 'Nao foi possível excluir a transação.',
      error: error.message,
    });
  }
};

module.exports = { findAll, findOne, create, update, remove };
